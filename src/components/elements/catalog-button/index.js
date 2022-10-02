import React from 'react';
import propTypes from "prop-types";
import './style.less';

function CatalogButton({onClick, title}) {
  return (
    <button className='CatalogButton' type='button' onClick={onClick}>{title}</button>
  )
}

CatalogButton.propTypes = {
  onClick: propTypes.func,
  title: propTypes.string,
}

CatalogButton.defaultProps = {
  onClick: () => {},
  title: 'Кнопка',
}


export default React.memo(CatalogButton);
