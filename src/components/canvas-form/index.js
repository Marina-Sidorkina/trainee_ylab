import React, {useEffect, useRef} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';
import PropTypes from "prop-types";
import createObjects from "@src/components/canvas-form/createObjects";
import resize from "@src/utils/canvas/resize";

function CanvasForm(
  {
    objects,
    onFillRectangleAdd,
    onStrokeRectangleAdd,
    onFillCircleAdd,
    onStrokeCircleAdd,
    onFillTriangleAdd,
    onStrokeTriangleAdd,
    onReset,
    resetTitle
  }) {
  const cn = bem('CanvasForm');
  const canvas = useRef();

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    resize(canvas.current);
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    objects.forEach((item) => createObjects(ctx, item));
  }, [objects])

  return (
    <div className={cn()}>
      <div className={cn('controls')}>
        <div className={cn('options')}>
          <button className={cn('fillRectangle')}
                  type='button'
                  onClick={() =>{onFillRectangleAdd(canvas.current)}} />
          <button className={cn('strokeRectangle')}
                  type='button'
                  onClick={() =>{onStrokeRectangleAdd(canvas.current)}} />
          <button className={cn('fillCircle')}
                  type='button'
                  onClick={() =>{onFillCircleAdd(canvas.current)}} />
          <button className={cn('strokeCircle')}
                  type='button'
                  onClick={() =>{onStrokeCircleAdd(canvas.current)}} />
          <button className={cn('triangle')}
                  type='button'
                  onClick={() =>{onFillTriangleAdd(canvas.current)}}>{'▲'}</button>
          <button className={cn('triangle')}
                  type='button'
                  onClick={() =>{onStrokeTriangleAdd(canvas.current)}}>{'△'}</button>
        </div>
        <div className={cn('buttons')}>
          <button className={cn('reset')}
                  type='button'
                  onClick={onReset}>{resetTitle}</button>
        </div>
      </div>
      <canvas ref={canvas}></canvas>
    </div>
  )
}

CanvasForm.propTypes = {
  objects: PropTypes.array,
  onFillRectangleAdd: PropTypes.func,
  onStrokeRectangleAdd: PropTypes.func,
  onFillCircleAdd: PropTypes.func,
  onStrokeCircleAdd: PropTypes.func,
  onFillTriangleAdd: PropTypes.func,
  onStrokeTriangleAdd: PropTypes.func,
  onReset: PropTypes.func,
  resetTitle: PropTypes.string,
}

CanvasForm.defaultProps = {
  objects: [],
  onFillRectangleAdd: () => {},
  onStrokeRectangleAdd: () => {},
  onFillCircleAdd: () => {},
  onStrokeCircleAdd: () => {},
  onFillTriangleAdd: () => {},
  onStrokeTriangleAdd: () => {},
  onReset: () => {},
  resetTitle: ''
}

export default React.memo(CanvasForm);
