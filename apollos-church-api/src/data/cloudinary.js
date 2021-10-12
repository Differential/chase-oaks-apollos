import withCloudinary from '@apollosproject/data-connector-cloudinary/lib/cloudinary';
import { resolver as coreResolver } from '@apollosproject/data-connector-cloudinary';

const resolver = {
  ...coreResolver,
  ImageMediaSource: {
    uri: ({ uri = '' }) => {
      const options = {
        width: '1920',
      };
      if (!uri || typeof uri !== 'string') return null;
      if (uri.startsWith('http')) return withCloudinary(uri, options);
      if (uri.startsWith('//')) return withCloudinary(`https:${uri}`, options);

      return uri;
    },
  },
};

export { resolver };
