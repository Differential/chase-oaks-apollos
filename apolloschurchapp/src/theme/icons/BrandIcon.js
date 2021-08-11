import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

import { makeIcon } from '@apollosproject/ui-kit';

const Icon = makeIcon(({ size = 28, fill } = {}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 768 512"
    fill={fill}
    xmlns="http://www.w3.org/2000/Svg"
  >
    <Path d="M337.69 292.488L327.374 280.04C303.827 301.405 271.786 324.442 238.63 329.497C204.678 334.682 172.636 326.833 150.722 308.009C134.753 294.283 125.944 276.062 125.944 256.655C125.944 236.375 136.547 216.271 155.005 201.515C166.397 192.544 179.669 186.264 193.829 183.142C207.99 180.021 222.672 180.14 236.78 183.49C269.606 190.948 301.576 213.387 325.488 234.012L336.27 219.964C338.656 216.841 346.788 206.541 359.286 193.278C330.411 168.61 291.005 141.52 248.459 131.844C226.605 126.716 203.874 126.597 181.968 131.496C160.062 136.395 139.547 146.185 121.959 160.133C90.8551 184.994 73 220.193 73 256.653C73 291.733 88.3569 324.232 116.236 348.198C149.854 377.073 197.376 389.342 246.602 381.836C292.081 374.92 333.353 345.839 362.69 319.397C349.087 305.93 340.224 295.543 337.69 292.488Z" />
    <Path d="M521.691 130.139C435.938 143.227 364.502 235.315 361.494 239.23L348.651 255.978L362.138 272.245C365.139 275.858 436.83 361.346 519.829 380.145C541.682 385.283 564.414 385.409 586.322 380.512C608.23 375.616 628.746 365.824 646.331 351.871C677.453 327.012 695.288 291.831 695.288 255.338C695.288 220.274 679.94 187.786 652.063 163.842C618.434 134.916 570.908 122.683 521.691 130.139ZM529.656 182.509C563.626 177.352 595.661 185.174 617.55 203.998C633.533 217.715 642.342 235.945 642.342 255.338C642.342 275.645 631.757 295.756 613.281 310.505C601.893 319.483 588.62 325.767 574.458 328.884C560.296 332.002 545.611 331.872 531.506 328.506C485.292 318.053 440.475 277.723 417.957 254.762C439.844 230.971 483.785 189.511 529.656 182.509Z" />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;