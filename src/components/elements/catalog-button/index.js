import React from 'react';
import propTypes from "prop-types";
import './style.less';
import {cn as bem} from "@bem-react/classname";

function CatalogButton({onClick, title, modal}) {
  const cn = bem('CatalogButton');

  return (
    <button className={cn({modal})} type='button' onClick={onClick}>{title}</button>
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
