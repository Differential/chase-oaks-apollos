import { FeatureFeed } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';

const { dataSource } = FeatureFeed;

const resolver = {
  ...FeatureFeed.resolver,
  Query: {
    ...FeatureFeed.resolver.Query,
    tvFeedFeatures: (root, args, { dataSources }) =>
      dataSources.FeatureFeed.getFeed({
        type: 'apollosConfig',
        args: { section: 'TV_FEATURES', ...args },
      }),
  },
};

const schema = gql`
  extend enum Tab {
    TV
  }
`;

export { resolver, dataSource, schema };
