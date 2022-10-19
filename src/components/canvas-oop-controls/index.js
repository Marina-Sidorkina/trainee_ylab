import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';
import PropTypes from "prop-types";

function CanvasOOPControls({onFigureAdd, onReset, resetTitle}) {
  const cn = bem('CanvasControls');

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
}

CanvasOOPControls.defaultProps = {
  onFigureAdd: () => {},
  onReset: () => {},
  resetTitle: '',
}

export default React.memo(CanvasOOPControls);
