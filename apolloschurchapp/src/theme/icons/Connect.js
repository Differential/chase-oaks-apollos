import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

import { makeIcon } from '@apollosproject/ui-kit';

const Icon = makeIcon(({ size = 28, fill } = {}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/Svg"
  >
    <Path
      d="M14 24.5C19.799 24.5 24.5 19.799 24.5 14C24.5 8.20101 19.799 3.5 14 3.5C8.20101 3.5 3.5 8.20101 3.5 14C3.5 19.799 8.20101 24.5 14 24.5Z"
      stroke={fill}
      strokeWidth="2"
      strokeMiterlimit="10"
    />
    <Path
      d="M14 17.5C16.4162 17.5 18.375 15.5412 18.375 13.125C18.375 10.7088 16.4162 8.75 14 8.75C11.5838 8.75 9.625 10.7088 9.625 13.125C9.625 15.5412 11.5838 17.5 14 17.5Z"
      stroke={fill}
      strokeWidth="2"
      strokeMiterlimit="10"
    />
    <Path
      d="M6.97803 21.8065C7.63713 20.5107 8.64197 19.4225 9.88131 18.6624C11.1206 17.9023 12.5461 17.5 14 17.5C15.4538 17.5 16.8793 17.9023 18.1187 18.6624C19.358 19.4224 20.3629 20.5106 21.022 21.8065"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
