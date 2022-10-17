import React, {useCallback, useEffect, useRef, useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';
import PropTypes from "prop-types";
import createObjects from "@src/components/canvas/createObjects";
import resize from "@src/utils/canvas/resize";
import CanvasControls from "@src/components/canvas-controls";

function Canvas(
  {
    objects, onFillRectangleAdd, onStrokeRectangleAdd, onFillCircleAdd, onStrokeCircleAdd,
    onFillTriangleAdd, onStrokeTriangleAdd, onReset, resetTitle, onWheel, addOffset, scale
  }) {
  const cn = bem('Canvas');
  const canvas = useRef();
  const [movedY, setMovedY] = useState(0);
  const [movedX, setMovedX] = useState(0);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    // Получаем контекст канваса
    setCtx(canvas.current.getContext('2d'));
    // Приведение в соответсвие размера области отрисовки с областью элемента в пикселях
    resize(canvas.current);
  }, []);

  // Отрисовка при добавлении фигур и при перетаскивании мышкой
  useEffect(() => {
    if (ctx) {
      // Очищение канваса
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
      // Отрисовка элементов канваса на основе данных из массива объектов в сторе
      objects.forEach((item) => createObjects(ctx, item, movedY, movedX, scale));
    }
  }, [movedY, movedX, scale]);

  // Отрисовка при добавлении объектов + вертикальный scroll
  useEffect(() => {
    if (ctx) {
      // Очищение канваса
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
      // Отрисовка элементов канваса на основе данных из массива объектов в сторе
      objects.forEach((item) => createObjects(ctx, item, 0, 0, scale));
    }
  }, [objects, scale]);

  const callbacks = {
    // Слушаем событие перемещения при нажатии на кнопку мыши
    onMouseDown: useCallback(evt => {
      // Стартовые координаты X и Y курсора мыши
      let startY = evt.clientY;
      let startX = evt.clientX;
      // Переменные для записи смещения по осям X и Y для отправки в стор на событие mouseUp
      let offsetForY = 0;
      let offsetForX = 0;

      const onMouseMove = (evt) => {
        // Сохраняем в локальный стейт смещение по осям X и Y
        setMovedY(startY - evt.clientY);
        setMovedX(startX - evt.clientX);
        // Запись смещения по осям X и Y для отправки в стор на событие mouseUp
        offsetForY = startY - evt.clientY;
        offsetForX = startX - evt.clientX;
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        // Отправка в стор последнего значения смещения по осям X и Y
        addOffset(offsetForX, offsetForY);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    }, [movedY, movedX]),
  };

  return (
    <div className={cn()}>
      <CanvasControls onFillRectangleAdd={onFillRectangleAdd}
                      onStrokeRectangleAdd={onStrokeRectangleAdd}
                      onFillCircleAdd={onFillCircleAdd}
                      onStrokeCircleAdd={onStrokeCircleAdd}
                      onFillTriangleAdd={onFillTriangleAdd}
                      onStrokeTriangleAdd={onStrokeTriangleAdd}
                      onReset={onReset}
                      resetTitle={resetTitle}
                      canvas={canvas.current}/>
      <canvas ref={canvas} onMouseDown={callbacks.onMouseDown} onWheel={onWheel}></canvas>
    </div>
  )
}

Canvas.propTypes = {
  objects: PropTypes.array,
  onFillRectangleAdd: PropTypes.func,
  onStrokeRectangleAdd: PropTypes.func,
  onFillCircleAdd: PropTypes.func,
  onStrokeCircleAdd: PropTypes.func,
  onFillTriangleAdd: PropTypes.func,
  onStrokeTriangleAdd: PropTypes.func,
  onReset: PropTypes.func,
  resetTitle: PropTypes.string,
  onWheel: PropTypes.func,
  addOffset: PropTypes.func,
}

Canvas.defaultProps = {
  objects: [],
  onFillRectangleAdd: () => {},
  onStrokeRectangleAdd: () => {},
  onFillCircleAdd: () => {},
  onStrokeCircleAdd: () => {},
  onFillTriangleAdd: () => {},
  onStrokeTriangleAdd: () => {},
  onReset: () => {},
  resetTitle: '',
  onWheel: () => {},
  addOffset: () => {},
}

export default React.memo(Canvas);
