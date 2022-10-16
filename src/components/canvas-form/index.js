import React, {useCallback, useEffect, useRef, useState} from 'react';
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
    resetTitle,
    offsetY,
    addOffsetY,
    offsetX,
    addOffsetX
  }) {
  const cn = bem('CanvasForm');
  const canvas = useRef();
  const [movedY, setMovedY] = useState(0);
  const [movedX, setMovedX] = useState(0);
  const [ctx, setCtx] = useState(null)

  useEffect(() => {
    setCtx(canvas.current.getContext('2d'));
    resize(canvas.current);
  }, [])

  useEffect(() => {
    if (ctx) {
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
      objects.forEach((item) => createObjects(ctx, item, movedY, movedX, offsetY, offsetX));
    }
  }, [objects, movedY, movedX, ctx]);

  const callbacks = {
    onMouseDown: useCallback(evt => {
      let startY = evt.clientY;
      let startX = evt.clientX;
      let offsetForY;
      let offsetForX;

      const onMouseMove = (evt) => {
        setMovedY(startY - evt.clientY);
        setMovedX(startX - evt.clientX);
        offsetForY = startY - evt.clientY;
        offsetForX = startX - evt.clientX;
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        addOffsetY(offsetForY);
        addOffsetX(offsetForX);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    }, [movedY, offsetY, movedX, offsetX]),
  };

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
      <canvas ref={canvas}
              onMouseDown={callbacks.onMouseDown}></canvas>
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
