import { ContentItem } from '@apollosproject/data-connector-rock';
import moment from 'moment';
import ApollosConfig from '@apollosproject/config';

const { ROCK } = ApollosConfig;

const { resolver, schema } = ContentItem;

class dataSource extends ContentItem.dataSource {
  LIVE_CONTENT = () => {
    const date = moment()
      .tz(ROCK.TIMEZONE)
      .format()
      .split(/[-+]\d+:\d+/)[0];
    // the only difference between this and core is that this only looks
    // at startdatetime. Sermon Messages have fake expire dates, so we ignore those.
    const filter = `((StartDateTime lt datetime'${date}') or (StartDateTime eq null)) and ((Status eq 'Approved') or (ContentChannel/RequiresApproval eq false))`;
    return filter;
  };

  attributeIsVideo = ({ key }) =>
    key.toLowerCase().includes('video') || key.toLowerCase().includes('vimeo');

  getFeatures = async (item) => {
    const features = await super.getFeatures(item);
    const { Feature } = this.context.dataSources;
    if (item.contentChannelId === 23) {
      // sermon channel
      features.push(
        Feature.createHorizontalCardListFeature({
          title: 'Your Next Steps',
          // TODO, just grabs top 5 from one of their existing channels
          algorithms: [
            {
              type: 'CONTENT_FEED',
              arguments: { limit: 5, channelIds: [364] },
            },
          ],
        })
      );
    }
    return features;
  };

  byTaggedContent = async (tag) => {
    if (!tag) return this.request().empty();

    // 212 is App Content Category defined type
    const value = await this.request('DefinedValues')
      .filter(`DefinedTypeId eq 212 and Value eq '${tag}'`)
      .first();
    if (!value?.guid) return this.request().empty();

    const attributeValues = await this.request('AttributeValues')
      .filter(
        // 13054 is the Category attribute
        `AttributeId eq 13054 and Value eq '${value.guid}'`
      )
      .get();
    const contentIds = attributeValues.map(({ entityId }) => entityId);

    return this.getFromIds(contentIds)
      .cache({ ttl: 60 })
      .orderBy('StartDateTime', 'desc');
  };
}

export { resolver, schema, dataSource };
