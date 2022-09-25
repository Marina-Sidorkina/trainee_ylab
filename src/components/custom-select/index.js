import React, {useEffect, useState, useCallback, useMemo} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import arrow from "@src/components/custom-select/custom-select-arrow.svg";
import CustomScroll from "@src/components/custom-scroll";


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
  const [shift, setShift] = useState(false);

  const extendedChildren = React.Children.map(children, child => {
    if (child.props.title.toLowerCase().startsWith(searchValue.toLowerCase())) {
      return React.cloneElement(child, {
        onSelect: ({code, title}) => {
          setCurrentCodeValue(code);
          setCurrentTitleValue(title);
          onSelect({code, title});
        },
        current: child.props.code === currentCodeValue && child.props.title === currentTitleValue
      })
    } else {
      return null;
    }
  });

  const onCustomSelectClose = (evt) => {
    if(evt.type === 'keyup' && evt.key === 'Shift') {
      setShift(false)
    }

    if(evt.type === 'keydown' && evt.key === 'Shift') {
      setShift(true)
    }

    if(evt.type === 'keydown' && evt.key === 'Escape') {
      setOpen(false)
    }

    if(evt.type === 'keydown' && evt.key === 'Tab' && !shift
      && !evt.target.parentNode.classList.contains('CustomSelect-container')
      && evt.target === evt.target.parentNode.lastElementChild) {
      evt.preventDefault();
    }

    if(evt.type === 'keydown' && evt.key === 'Tab' && shift
      && !evt.target.parentNode.classList.contains('CustomSelect-container')
      && evt.target === evt.target.parentNode.firstElementChild
      && !evt.target.classList.contains('CustomSelect-option')) {
      evt.preventDefault();
    }

    if(evt.type === 'click'
      && !evt.target.classList.contains('CustomSelect-container')
      && !evt.target.classList.contains('CustomSelect-search')
      && !evt.target.classList.contains('CustomSelect-dropdown')
      && !evt.target.classList.contains('CustomSelect-control')
      && !evt.target.classList.contains('CustomSelect-option')
      && !evt.target.classList.contains('CustomSelect-code')
      && !evt.target.classList.contains('CustomSelect-title')
      && !evt.target.classList.contains('CustomSelect-arrow')
      && !evt.target.classList.contains('CustomScroll')
      && !evt.target.classList.contains('CustomScroll-pin')) {
      setOpen(false)
    }
  }

  const callbacks = {
    onCustomSelectClose: useCallback(onCustomSelectClose, [open, shift]),
  };

  const options = {
    scrollParams: useMemo(() => ({
      height: 120,
      width: 230,
      pinHeight: 60,
      pinWidth: 8,
    }), []),
  }

  useEffect(() => {
    if(open) {
      document.addEventListener('click', callbacks.onCustomSelectClose);
      document.addEventListener('keydown', callbacks.onCustomSelectClose);
      document.addEventListener('focus', callbacks.onCustomSelectClose);
      document.addEventListener('keyup', callbacks.onCustomSelectClose);
      document.addEventListener('focus', callbacks.onCustomSelectClose);
    } else {
      document.removeEventListener('click', callbacks.onCustomSelectClose);
      document.removeEventListener('keydown', callbacks.onCustomSelectClose);
      document.removeEventListener('focus', callbacks.onCustomSelectClose);
      document.removeEventListener('keyup', callbacks.onCustomSelectClose);
    }

    return () => {
      document.removeEventListener('click', callbacks.onCustomSelectClose);
      document.removeEventListener('keydown', callbacks.onCustomSelectClose);
      document.removeEventListener('focus', callbacks.onCustomSelectClose);
      document.removeEventListener('keyup', callbacks.onCustomSelectClose);
      setSearchValue('');
    }
  }, [open, shift])

  return (
    <div className={cn('container')}
         onKeyDown={(evt) => {
           if(evt.key === 'Escape') {
             evt.preventDefault();
             setOpen(false)
           }
         }}>
      <div className={cn('control')}
           tabIndex='0'
           onKeyDown={(evt) => {
             if (evt.key === 'ArrowDown') setOpen(true)
           }}
           onClick={() => setOpen((value) => !value)}
           aria-label={`Выпадающий список. Чтобы открыть список, нажмите стрелку вниз.
             Для перехода по элементам используйте кнопку tab`}>
        <div className={cn('option', {current: false, hover: false})}
             title={currentTitleValue}>
          <span className={cn('code')}>{currentCodeValue.slice(0, 2).toUpperCase()}</span>
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
                               onChange={(evt) => setSearchValue(evt.target.value)}
                               aria-label="Поле поиска по опциям выпадающего списка"/>
        }
        <CustomScroll showScroll={extendedChildren.length > 4}
                      scrollHeight={options.scrollParams.height}
                      scrollWidth={options.scrollParams.width}
                      pinHeight={options.scrollParams.pinHeight}
                      pinWidth={options.scrollParams.pinWidth}>
          <ul className={cn('list')}
              onClick={() => setOpen(false)}
              onKeyPress={(evt) => {
                if(evt.key === 'Enter') setOpen(false);
              }}
              role='list'
              aria-labelledby='selectLabel'
              onMouseMove={(evt) => evt.preventDefault()}>
            {extendedChildren}
          </ul>
        </CustomScroll>
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
      aria-label={`Опция выпадающего списка. Значение ${title}. Для выбора нажмите Enter`}
      id={title}
      title={title}
      role='listitem'>
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
