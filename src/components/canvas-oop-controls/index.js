import React, {useCallback, useEffect} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';
import PropTypes from "prop-types";
import {useThrottle} from '@react-hook/throttle'

function CanvasOOPControls({onFigureAdd, onReset, resetTitle, index, x, y, onValuesSubmit}) {
  const cn = bem('CanvasControls');
  const [xValue, setXValue] = useThrottle(0, 10);
  const [yValue, setYValue] = useThrottle(0, 10);

  useEffect(() => {
    setXValue(x);
    setYValue(y);
  }, [index, x, y])

  const callbacks = {
    onXChange: useCallback((evt) => {
      setXValue(evt.target.value);
    }, []),
    onYChange: useCallback((evt) => {
      setYValue(evt.target.value);
    }, []),
    onValuesSubmit: useCallback(() => {
      onValuesSubmit(xValue, yValue);
    }, [xValue, yValue]),
  }

  return (
    <div className={cn()}>
      <div className={cn('options')}>
        <button className={cn('fillRectangle')}
                type='button'
                onClick={() => onFigureAdd('fillRectangle')} />
        <button className={cn('strokeRectangle')}
                type='button'
                onClick={() => onFigureAdd('strokeRectangle')} />
        <button className={cn('fillCircle')}
                type='button'
                onClick={() => onFigureAdd('fillCircle')} />
        <button className={cn('strokeCircle')}
                type='button'
                onClick={() => onFigureAdd('strokeCircle')} />
        <button className={cn('triangle')}
                type='button'
                onClick={() => onFigureAdd('fillTriangle')}>{'▲'}</button>
        <button className={cn('triangle')}
                type='button'
                onClick={() => onFigureAdd('strokeTriangle')}>{'△'}</button>
      </div>
      <div className={cn('coordinates')}>
        <label htmlFor='x-coordinate' className={cn('x-label')}>X : </label>
        <input type='number'
               id='x-coordinate'
               className={cn('x-input')}
               value={index !== -1 ? xValue : ''}
               onChange={callbacks.onXChange}/>
        <label htmlFor='y-coordinate' className={cn('y-label')}>Y : </label>
        <input type='number'
               id='y-coordinate'
               className={cn('y-input')}
               value={index !== -1 ? yValue : ''}
               onChange={callbacks.onYChange}/>
        <button className={cn('submit')}
                type='button'
                onClick={callbacks.onValuesSubmit}>✎</button>
      </div>
      <div className={cn('buttons')}>
        <button className={cn('reset')}
                type='button'
                onClick={onReset}>{resetTitle}</button>
      </div>
    </div>
  )
}

CanvasOOPControls.propTypes = {
  onFigureAdd: PropTypes.func,
  onReset: PropTypes.func,
  resetTitle: PropTypes.string,
  index: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  onValuesSubmit: PropTypes.func,
}

CanvasOOPControls.defaultProps = {
  onFigureAdd: () => {},
  onReset: () => {},
  resetTitle: '',
}

export default React.memo(CanvasOOPControls);
