import { FeatureFeed } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';

const { dataSource } = FeatureFeed;

const resolver = {
  ...FeatureFeed.resolver,
  Query: {
    ...FeatureFeed.resolver.Query,
    watchPlatformFeedFeatures: (root, args, { dataSources }) =>
      dataSources.FeatureFeed.getFeed({
        type: 'apollosConfig',
        args: { section: 'WATCH_PLATFORM_FEATURES', ...args },
      }),
  },
};

const schema = gql`
  extend enum Tab {
    WATCH_PLATFORM
  }
`;

export { resolver, dataSource, schema };
