import { FeatureFeed } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';

const { dataSource, resolver } = FeatureFeed;

const schema = gql`
  extend enum Tab {
    TV
  }
`;

export { resolver, dataSource, schema };
