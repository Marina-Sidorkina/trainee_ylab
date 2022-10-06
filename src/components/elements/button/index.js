import React from 'react';
import './style.less';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";

function Button({onClick, title, submit}) {
  const cn = bem('Button');

  if (submit) {
    return (
      <button className={cn()} type='submit'>{title}</button>
    )
  }

  return (
    <button className={cn()} type='button' onClick={onClick}>{title}</button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
}

Button.defaultProps = {
  onClick: () => {},
  title: 'Кнопка',
}

export default React.memo(Button);
