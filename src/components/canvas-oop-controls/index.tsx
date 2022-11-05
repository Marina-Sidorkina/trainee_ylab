import React, {useCallback, useEffect} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';
import {useThrottle} from '@react-hook/throttle'

function CanvasOOPControls(props: {
  onFigureAdd: (value: string) => void;
  onReset: () => void;
  resetTitle: string;
  x: number;
  y: number;
  onValuesSubmit: (x: number, y: number) => void;
}) {
  const cn = bem('CanvasControls');
  const [xValue, setXValue] = useThrottle('', 10);
  const [yValue, setYValue] = useThrottle('', 10);

  useEffect(() => {
    // @ts-ignore
    setXValue(props.x);
    // @ts-ignore
    setYValue(props.y);
  }, [props.x, props.y])

  const callbacks = {
    // Изменение стейта для координаты x
    onXChange: useCallback((evt: any) => {
      setXValue(evt.target.value);
    }, []),
    // Изменение стейта для координаты y
    onYChange: useCallback((evt: any) => {
      setYValue(evt.target.value);
    }, []),
    // Передача значений из стейта для изменения координат выбранной фигуры
    onValuesSubmit: useCallback(() => {
      props.onValuesSubmit(Number(xValue), Number(yValue));
    }, [xValue, yValue]),
  }

  return (
    <div className={cn()}>
      <div className={cn('options')}>
        <button className={cn('fillRectangle')}
                type='button'
                onClick={() => props.onFigureAdd('fillRectangle')} />
        <button className={cn('strokeRectangle')}
                type='button'
                onClick={() => props.onFigureAdd('strokeRectangle')} />
        <button className={cn('fillCircle')}
                type='button'
                onClick={() => props.onFigureAdd('fillCircle')} />
        <button className={cn('strokeCircle')}
                type='button'
                onClick={() => props.onFigureAdd('strokeCircle')} />
        <button className={cn('triangle')}
                type='button'
                onClick={() => props.onFigureAdd('fillTriangle')}>{'▲'}</button>
        <button className={cn('triangle')}
                type='button'
                onClick={() => props.onFigureAdd('strokeTriangle')}>{'△'}</button>
      </div>
      <div className={cn('coordinates')}>
        <label htmlFor='x-coordinate' className={cn('x-label')}>X : </label>
        <input type='number'
               id='x-coordinate'
               className={cn('x-input')}
               value={xValue !== '' ? xValue : ''}
               onChange={callbacks.onXChange}/>
        <label htmlFor='y-coordinate' className={cn('y-label')}>Y : </label>
        <input type='number'
               id='y-coordinate'
               className={cn('y-input')}
               value={yValue !== '' ? yValue : ''}
               onChange={callbacks.onYChange}/>
        <button className={cn('submit')}
                type='button'
                onClick={callbacks.onValuesSubmit}>✎</button>
      </div>
      <div className={cn('buttons')}>
        <button className={cn('reset')}
                type='button'
                onClick={props.onReset}>{props.resetTitle}</button>
      </div>
    </div>
  )
}

export default React.memo(CanvasOOPControls);
