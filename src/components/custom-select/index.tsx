import React, {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import CustomScroll from "@src/components/custom-scroll";
const arrow = require("@src/components/custom-select/custom-select-arrow.svg") as string;

const cn = bem('CustomSelect');

const CustomSelect = (
  props: {
    showSearch: boolean;
    currentSearchValue: string;
    currentCode: string;
    currentTitle: string;
    onSelect: (value: {code: string, title: string}) => any;
    children: React.ReactNode |  React.ReactNode[];
  }) => {

  const [open, setOpen] = useState(false);
  const [currentCodeValue, setCurrentCodeValue] = useState(props.currentCode);
  const [currentTitleValue, setCurrentTitleValue] = useState(props.currentTitle);
  const [searchValue, setSearchValue] = useState(props.currentSearchValue || '');
  const [shift, setShift] = useState(false);
  const select = useRef<HTMLDivElement>(null);

  const extendedChildren = React.Children.map(props.children, (child: any) => {
    if (child.props.title.toLowerCase().startsWith(searchValue.toLowerCase())) {
      return React.cloneElement((child), {
        onSelect: (value: {code: string; title: string}) => {
          setCurrentCodeValue(value.code);
          setCurrentTitleValue(value.title);
          props.onSelect({code: value.code, title: value.title});
        },
        current: child.props.code === currentCodeValue && child.props.title === currentTitleValue
      })
    } else {
      return null;
    }
  });

  const onCustomSelectClose = (evt: any) => {
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
      && !(select.current as HTMLElement).contains(evt.target)) {
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
      optionHeight: 30
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
    <div className={cn('container')} ref={select}
         onKeyDown={(evt) => {
           if(evt.key === 'Escape') {
             evt.preventDefault();
             setOpen(false)
           }
         }}>
      <div className={cn('control')}
           tabIndex={0}
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
          props.showSearch && <input className={cn('search')} type='text'
                               placeholder='Поиск'
                               tabIndex={0}
                               value={searchValue}
                               onChange={(evt) => setSearchValue(evt.target.value)}
                               aria-label="Поле поиска по опциям выпадающего списка"/>
        }
        <CustomScroll showScroll={extendedChildren ? extendedChildren.length > 4 : false}
                      scrollHeight={options.scrollParams.height}
                      scrollWidth={options.scrollParams.width}
                      pinHeight={options.scrollParams.pinHeight}
                      pinWidth={options.scrollParams.pinWidth}
                      itemHeight={options.scrollParams.optionHeight}>
          <ul className={cn('list')}
              onClick={() => setOpen(false)}
              onKeyDown={(evt) => {
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

CustomSelect.Option = (props: {
  code: string;
  title: string;
  current: boolean;
  onSelect: (value: {code: string, title: string}) => any;
}) => (
  <li className={cn('option', {current: props.current, hover: true})}
      tabIndex={0}
      onKeyDown={(evt) => {
        if (evt.key === 'Enter') props.onSelect({code: props.code, title: props.title});
      }}
      onClick={() => props.onSelect({code: props.code, title: props.title})}
      aria-label={`Опция выпадающего списка. Значение ${props.title}. Для выбора нажмите Enter`}
      id={props.title}
      title={props.title}
      role='listitem'>
    <span className={cn('code')}>{props.code.slice(0,2).toUpperCase()}</span>
    <span className={cn('title')}>{props.title.length < 20 ? props.title : props.title.slice(0,20) + '...'}</span>
  </li>
);

// Export
export default CustomSelect;
