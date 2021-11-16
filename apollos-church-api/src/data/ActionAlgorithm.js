import { get } from 'lodash';

import { ActionAlgorithm } from '@apollosproject/data-connector-rock';

const { resolver } = ActionAlgorithm;

class dataSource extends ActionAlgorithm.dataSource {
  ACTION_ALGORITHMS = {
    ...this.ACTION_ALGORITHMS,
    OPEN_URL_CONTENT_FEED: this.openUrlContentFeedAlgorithm.bind(this),
    PRIORITY_CONTENT_FEED: this.priorityContentFeedAlgorithm.bind(this),
    SERMON_CONTENT_FEED: this.sermonContentFeedAlgorithm.bind(this),
    TAGGED_CONTENT_FEED: this.taggedContentFeedAlgorithm.bind(this),
  };

  async sermonContentFeedAlgorithm({
    channelIds = [],
    limit = 20,
    skip = 0,
  } = {}) {
    const { ContentItem } = this.context.dataSources;
    const items = await ContentItem.byContentChannelIds(channelIds)
      .top(limit)
      .skip(skip)
      .get();
    return items.map((item, i) => ({
      id: `${item.id}${i}`,
      title: item.title,
      subtitle: get(item, 'contentChannel.name'),
      relatedNode: { ...item, __type: ContentItem.resolveType(item) },
      image: ContentItem.getCoverImage(item),
      action: 'READ_CONTENT',
      summary: item.attributeValues.seoMetaDescription.value,
    }));
  }

  async openUrlContentFeedAlgorithm(...args) {
    const { Feature } = this.context.dataSources;
    const contentFeed = await this.contentFeedAlgorithm(...args);

    return contentFeed.map((item) => ({
      ...item,
      ...(item.relatedNode.attributeValues?.buttonLink?.value
        ? Feature.attachActionIds({
            ...item,
            action: 'OPEN_URL',
            relatedNode: {
              __typename: 'Url',
              url: item.relatedNode.attributeValues.buttonLink.value,
            },
          })
        : {}),
    }));
  }

  async priorityContentFeedAlgorithm({
    channelIds = [],
    limit = 20,
    skip = 0,
  } = {}) {
    const { ContentItem } = this.context.dataSources;
    const items = await ContentItem.byContentChannelIds(channelIds)
      .top(limit)
      .skip(skip)
      .sort([{ field: 'Priority', direction: 'asc' }])
      .get();

    return items.map((item, i) => ({
      id: `${item.id}${i}`,
      title: item.title,
      subtitle: get(item, 'contentChannel.name'),
      relatedNode: { ...item, __type: ContentItem.resolveType(item) },
      image: ContentItem.getCoverImage(item),
      action: 'READ_CONTENT',
      summary: ContentItem.createSummary(item),
    }));
  }

  async taggedContentFeedAlgorithm({ tag, limit = 20, skip = 0 } = {}) {
    const { ContentItem } = this.context.dataSources;

    const cursor = await ContentItem.byTaggedContent(tag);
    const items = await cursor
      .top(limit)
      .skip(skip)
      .get();

    return items.map((item, i) => ({
      id: `${item.id}${i}`,
      title: item.title,
      subtitle: get(item, 'contentChannel.name'),
      relatedNode: { ...item, __type: ContentItem.resolveType(item) },
      image: ContentItem.getCoverImage(item),
      action: 'READ_CONTENT',
      summary: ContentItem.createSummary(item),
    }));
  }
}

export { resolver, dataSource };
