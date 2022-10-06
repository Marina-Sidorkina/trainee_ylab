import React from 'react';
import './style.less';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";

function CatalogButton({onClick, title, modal, basket}) {
  const cn = bem('CatalogButton');

  return (
    <button className={cn({modal, basket})} type='button' onClick={onClick}>{title}</button>
  )
}

CatalogButton.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  modal: PropTypes.bool,
  basket: PropTypes.bool,
}

CatalogButton.defaultProps = {
  onClick: () => {},
  title: 'Кнопка',
  modal: false,
  basket: false,
}

export default React.memo(CatalogButton);
