import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';
import Graphics from "@src/components/canvas-oop/graphics";
import CanvasOOPControls from "@src/components/canvas-oop-controls";
import PropTypes from "prop-types";

function CanvasOOP({objects, onFigureAdd, onReset, resetTitle, updateInputStoreData, index, x, y}) {
  const cn = bem('CanvasOOP');
  const dom = useRef();
  const graphics = useMemo(() => new Graphics(updateInputStoreData), []);

  useEffect(()=>{
    graphics.mount(dom.current);
    return () => {
      graphics.unmount();
      onReset();
    };
  }, []);

  // При добавлении объекта в стор вызываем для него добавление новой фигуры для отрисовки на канвасе
  useEffect(() => {
    if (graphics && objects.length) graphics.addElement(objects[objects.length - 1], objects.length - 1);
  }, [objects]);

  const callbacks = {
    // Сброс всех значений
    onReset: useCallback(() => {
      onReset();
      graphics.reset();
    }, []),
    // Изменение координат выбранной фигуры
    onValuesSubmit: useCallback((x, y) => {
      graphics.changeFigureCoordinates(x, y);
    }, []),
  };

  return (
    <div className={cn()} ref={dom}>
      <CanvasOOPControls onFigureAdd={onFigureAdd}
                         onReset={callbacks.onReset}
                         resetTitle={resetTitle}
                         index={index}
                         x={x}
                         y={y}
                         onValuesSubmit={callbacks.onValuesSubmit}/>
    </div>
  )
}

CanvasOOP.propTypes = {
  objects: PropTypes.array,
  onFigureAdd: PropTypes.func,
  onReset: PropTypes.func,
  resetTitle: PropTypes.string,
  updateInputStoreData: PropTypes.func,
  index: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
}

CanvasOOP.defaultProps = {
  objects: [],
  onFigureAdd: () => {},
  onReset: () => {},
  resetTitle: '',
  updateInputStoreData: () => {},
}

export default React.memo(CanvasOOP);