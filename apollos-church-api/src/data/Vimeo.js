/* eslint-disable class-methods-use-this */
import ApollosConfig from '@apollosproject/config';
import { RESTDataSource } from 'apollo-datasource-rest';

class dataSource extends RESTDataSource {
  get token() {
    return ApollosConfig.VIMEO.TOKEN;
  }

  baseURL = 'https://api.vimeo.com/';

  willSendRequest = (request) => {
    request.headers.set('Authorization', `Bearer ${this.token}`);
  };

  getHLSForVideo = async (embed) => {
    const { Cache } = this.context.dataSources;
    // captures either vimeo/123 or 123
    const matches = embed.match(/(?<=vimeo.com\/video\/).*?(?=["])/);
    if (matches && matches[0]) {
      const cachedVideo = await Cache.get({
        key: ['vimeo', embed],
      });
      if (cachedVideo) return cachedVideo;

      const video = JSON.parse(await this.get(`videos/${matches[0]}`));
      const source = this.findHLSSource(video);

      if (source) Cache.set({ key: ['vimeo', embed], data: source });

      return source;
    }
    return null;
  };

  findHLSSource({ files = [] }) {
    const hls = files.find(({ quality }) => quality === 'hls');

    return hls ? hls.link : null;
  }
}

const baseResolver = {
  videos: (root, args, { dataSources: { ContentItem, Vimeo } }) => {
    const videoUrls = ContentItem.getVideos(root);
    return videoUrls.map((video) => ({
      ...video,
      sources: video.sources.map(({ uri }) => ({
        // if it's not a URI, we're assuming it's a Vimeo ID
        uri: uri.startsWith('http') ? uri : Vimeo.getHLSForVideo(uri),
      })),
    }));
  },
};

// overrides the video urls for all content item resolvers
const contentItemTypes = Object.keys(ApollosConfig.ROCK_MAPPINGS.CONTENT_ITEM);

const resolver = contentItemTypes.reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: baseResolver,
  }),
  {}
);

export { dataSource, resolver };
