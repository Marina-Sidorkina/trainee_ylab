import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import arrow from "@src/components/custom-select/custom-select-arrow.svg";

const cn = bem('CustomSelect');

const CustomSelect = (
  {
    showSearch,
    currentSearchValue,
    currentCode,
    currentTitle,
    onSelect,
    children,
  }) => {

  const [open, setOpen] = useState(false);
  const [currentCodeValue, setCurrentCodeValue] = useState(currentCode);
  const [currentTitleValue, setCurrentTitleValue] = useState(currentTitle);
  const [searchValue, setSearchValue] = useState(currentSearchValue || '');

  const extendedChildren = React.Children.map(children, child => {
    if (child.props.title.toLowerCase().startsWith(searchValue.toLowerCase())) {
      return React.cloneElement(child, {
        onSelect: ({code, title}) => {
          setCurrentCodeValue(code);
          setCurrentTitleValue(title);
          onSelect({code, title});
        },
        current: child.props.code === currentCodeValue
      })
    } else {
      return null;
    }
  });

  return (
    <div className={cn('container')}>
      <div className={cn('control')}
           tabIndex='0'
           onKeyDown={(evt) => {
             if(evt.key === 'ArrowDown') setOpen(true);
           }}
           onClick={() => setOpen((value) => !value)}>
        <div className={cn('option', {current: false, hover: false})} tabIndex='-1'>
          <span className={cn('code')}>{currentCodeValue}</span>
          <span className={cn('title')}>{currentTitleValue}</span>
        </div>
        <img className={cn('arrow')} src={arrow} alt='dropdown arrow icon'/>
      </div>
      {
        open && <div className={cn('dropdown')}>
        {
          showSearch && <input className={cn('search')} type='text'
                               placeholder='Поиск'
                               tabIndex='0'
                               value={searchValue}
                               onChange={(evt) => setSearchValue(evt.target.value)}/>
        }
        <ul className={cn('list')}
            onClick={() => setOpen(false)}
            onKeyPress={(evt) => {
              if(evt.key === 'Enter') setOpen(false);
            }}>
          {extendedChildren}
        </ul>
      </div>
      }
    </div>
  )
};

CustomSelect.Option = ({code, title, current, onSelect}) => (
  <li className={cn('option', {current, hover: true})}
      tabIndex='0'
      onKeyPress={(evt) => {
        if (evt.key === 'Enter') onSelect({code, title});
      }}
      onClick={() => onSelect({code, title})}
      role="option">
    <span className={cn('code')}>{code}</span>
    <span className={cn('title')}>{title}</span>
  </li>
);

// PropTypes
CustomSelect.propTypes = {
  showSearch: propTypes.bool,
  currentCode: propTypes.string,
  currentTitle: propTypes.string,
  children: propTypes.node,
  currentSearchValue: propTypes.string,
}

CustomSelect.defaultProps = {
  showSearch: false,
  currentCode: '',
  currentTitle: '',
  currentSearchValue: '',
}

CustomSelect.Option.propTypes = {
  code: propTypes.string,
  title: propTypes.string,
  current: propTypes.bool,
  onSelect: propTypes.func,
}

CustomSelect.Option.defaultProps = {
  code: '',
  title: '',
  current: false,
  onSelect: () => {},
}

// Export
export default CustomSelect;
