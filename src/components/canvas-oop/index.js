import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';
import Graphics from "@src/components/canvas-oop/graphics";
import CanvasOOPControls from "@src/components/canvas-oop-controls";
import PropTypes from "prop-types";

function CanvasOOP({objects, onFigureAdd, onReset, resetTitle}) {
  const cn = bem('CanvasOOP');
  const dom = useRef();
  const graphics = useMemo(() => new Graphics(), []);

  useEffect(()=>{
    graphics.mount(dom.current);
    return () => {
      graphics.unmount();
      onReset();
    };
  }, []);

  useEffect(() => {
    if (graphics && objects.length) graphics.addElement(objects[objects.length - 1]);
  }, [objects]);

  const callbacks = {
    onReset: useCallback(() => {
      onReset();
      graphics.reset();
    }, []),
  };

  return (
    <div className={cn()} ref={dom}>
      <CanvasOOPControls onFigureAdd={onFigureAdd} onReset={callbacks.onReset} resetTitle={resetTitle}/>
    </div>
  )
}

CanvasOOP.propTypes = {
  objects: PropTypes.array,
  onFigureAdd: PropTypes.func,
  onReset: PropTypes.func,
  resetTitle: PropTypes.string,
}

CanvasOOP.defaultProps = {
  objects: [],
  onFigureAdd: () => {},
  onReset: () => {},
  resetTitle: '',
}

export default React.memo(CanvasOOP);
