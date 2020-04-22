import React from 'react';
import Proptypes from 'prop-types';

import sprite from '../../../assets/sprite.svg';

const Icon = ({
                width, height, color, id,
              }) => (
  <svg width={width} height={height} fill={color}>
  <use xlinkHref={`${sprite}#${id}`} />
</svg>
);

Icon.propTypes = {
  width: Proptypes.number,
  height: Proptypes.number,
  id: Proptypes.string.isRequired,
  color: Proptypes.string,
};

Icon.defaultProps = {
  width: 24,
  height: 24,
  color: 'white',
};

export default Icon;