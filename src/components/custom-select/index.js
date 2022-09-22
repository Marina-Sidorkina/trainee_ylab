import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import arrow from "@src/components/custom-select/custom-select-arrow.svg";

const cn = bem('CustomSelect');

const CustomSelect = () => undefined;

CustomSelect.Container = ({children}) => (
  <div className={cn('container')}>{children}</div>
);

CustomSelect.Control = ({children}) => (
  <button className={cn('control')}>
    {children}
    <img className={cn('arrow')} src={arrow} alt='dropdown arrow icon'/>
  </button>
);

CustomSelect.Dropdown = ({children}) => (
  <div className={cn('dropdown')}>{children}</div>
);

CustomSelect.Search = ({onChange}) => (
  <input className={cn('search')}
         type='text'
         placeholder='Поиск'
         tabIndex='0'
         onChange={(evt) => onChange(evt.target.value)}/>
);

CustomSelect.Item = ({code, title, current, hover}) => (
  <li className={cn('item', {current, hover})} tabIndex='0'>
    <span className={cn('code')}>{code}</span>
    <span className={cn('title')}>{title}</span>
  </li>
);

CustomSelect.List = ({data, currentCode}) => (
  <ul className={cn('list')}>
    {data.map(item => (
      <CustomSelect.Item title={item.title}
                         code={item.code}
                         current={item.code === currentCode}
                         key={item.code}/>
    ))}
  </ul>
);

// PropTypes
CustomSelect.Container.propTypes = {
  children: propTypes.node,
}

CustomSelect.Container.defaultProps = {
  children: null,
}

CustomSelect.Control.propTypes = {
  children: propTypes.node,
}

CustomSelect.Control.defaultProps = {
  children: null,
}

CustomSelect.Dropdown.propTypes = {
  children: propTypes.node,
}

CustomSelect.Dropdown.defaultProps = {
  children: null,
}

CustomSelect.Search.propTypes = {
  onChange: propTypes.func,
}

CustomSelect.Search.defaultProps = {
  onChange: () => {},
}

CustomSelect.Item.propTypes = {
  code: propTypes.string,
  title: propTypes.string,
  current: propTypes.bool,
  hover: propTypes.bool,
}

CustomSelect.Item.defaultProps = {
  code: '',
  title: '',
  current: false,
  hover: true,
}

CustomSelect.List.propTypes = {
  data: propTypes.array,
  currentCode: propTypes.string,
}

CustomSelect.List.defaultProps = {
  data: [],
  currentCode: '',
}

// Export
export default CustomSelect;
