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
      d="M16.6244 22.7492V17.4991C16.6244 17.267 16.5322 17.0444 16.3681 16.8803C16.204 16.7162 15.9814 16.6241 15.7494 16.6241H12.2494C12.0173 16.6241 11.7947 16.7162 11.6306 16.8803C11.4665 17.0444 11.3744 17.267 11.3744 17.4991V22.7492C11.3744 22.9812 11.2822 23.2038 11.1181 23.3678C10.954 23.5319 10.7315 23.6241 10.4995 23.6242L5.25011 23.6249C5.13519 23.6249 5.0214 23.6023 4.91523 23.5583C4.80906 23.5143 4.71258 23.4499 4.63132 23.3686C4.55006 23.2874 4.4856 23.1909 4.44162 23.0847C4.39764 22.9786 4.375 22.8648 4.375 22.7499V12.637C4.375 12.5151 4.40047 12.3945 4.44978 12.2831C4.4991 12.1716 4.57116 12.0716 4.66136 11.9896L13.4108 4.03424C13.5718 3.8878 13.7817 3.80665 13.9994 3.80664C14.2171 3.80663 14.4269 3.88777 14.588 4.0342L23.3386 11.9896C23.4288 12.0716 23.5009 12.1716 23.5502 12.2831C23.5995 12.3946 23.625 12.5151 23.625 12.637V22.7499C23.625 22.8648 23.6024 22.9786 23.5584 23.0847C23.5144 23.1909 23.4499 23.2874 23.3687 23.3686C23.2874 23.4499 23.1909 23.5143 23.0848 23.5583C22.9786 23.6023 22.8648 23.6249 22.7499 23.6249L17.4992 23.6242C17.2672 23.6241 17.0447 23.5319 16.8806 23.3679C16.7165 23.2038 16.6244 22.9812 16.6244 22.7492V22.7492Z"
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
