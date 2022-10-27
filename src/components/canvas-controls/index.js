import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';
import PropTypes from "prop-types";

function CanvasControls(
  {
    onFillRectangleAdd, onStrokeRectangleAdd, onFillCircleAdd,
    onStrokeCircleAdd, onFillTriangleAdd, onStrokeTriangleAdd,
    onReset, resetTitle, canvas
  }) {
  const cn = bem('CanvasControls');

  return (
    <div className={cn()}>
      <div className={cn('options')}>
        <button className={cn('fillRectangle')}
                type='button'
                onClick={() =>{onFillRectangleAdd(canvas)}} />
        <button className={cn('strokeRectangle')}
                type='button'
                onClick={() =>{onStrokeRectangleAdd(canvas)}} />
        <button className={cn('fillCircle')}
                type='button'
                onClick={() =>{onFillCircleAdd(canvas)}} />
        <button className={cn('strokeCircle')}
                type='button'
                onClick={() =>{onStrokeCircleAdd(canvas)}} />
        <button className={cn('triangle')}
                type='button'
                onClick={() =>{onFillTriangleAdd(canvas)}}>{'▲'}</button>
        <button className={cn('triangle')}
                type='button'
                onClick={() =>{onStrokeTriangleAdd(canvas)}}>{'△'}</button>
      </div>
      <div className={cn('buttons')}>
        <button className={cn('reset')}
                type='button'
                onClick={onReset}>{resetTitle}</button>
      </div>
    </div>
  )
}

CanvasControls.propTypes = {
  onFillRectangleAdd: PropTypes.func,
  onStrokeRectangleAdd: PropTypes.func,
  onFillCircleAdd: PropTypes.func,
  onStrokeCircleAdd: PropTypes.func,
  onFillTriangleAdd: PropTypes.func,
  onStrokeTriangleAdd: PropTypes.func,
  onReset: PropTypes.func,
  resetTitle: PropTypes.string,
  canvas: PropTypes.object,
}

CanvasControls.defaultProps = {
  onFillRectangleAdd: () => {},
  onStrokeRectangleAdd: () => {},
  onFillCircleAdd: () => {},
  onStrokeCircleAdd: () => {},
  onFillTriangleAdd: () => {},
  onStrokeTriangleAdd: () => {},
  onReset: () => {},
  resetTitle: '',
  canvas: {}
}

export default React.memo(CanvasControls);
