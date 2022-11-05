import React, {LegacyRef, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';
import Graphics from "@src/components/canvas-oop/graphics";
import CanvasOOPControls from "@src/components/canvas-oop-controls";
import {v4 as uuidv4} from 'uuid';
import generateRandomNumber from "@src/utils/generateRandomNumber";

function CanvasOOP(props: {
  objects: any[];
  onFigureAdd: (value: string) => void;
  onReset: () => void;
  resetTitle: string;
  updateInputStoreData: (index: string, x: number, y: number) => void;
  x: number;
  y: number;
  onLeafAdd: (value: number) => void;
}) {
  const cn = bem('CanvasOOP');
  const dom = useRef<HTMLElement>(null);
  const graphics = useMemo(() => new Graphics(props.updateInputStoreData), []);
  const [leavesCount, setLeavesCount] = useState(0);

  useEffect(() => {
    if(leavesCount < 50) {
      setTimeout(() => {
        props.onLeafAdd(generateRandomNumber(1, 5));
        setLeavesCount(prev => prev + 1);
      }, 700);
    }
  }, [leavesCount]);

  useEffect(()=>{
    graphics.mount(dom.current as HTMLElement);
    return () => {
      graphics.unmount();
      props.onReset();
    };
  }, []);

  // При добавлении объекта в стор вызываем для него добавление новой фигуры для отрисовки на канвасе
  useEffect(() => {
    if (graphics && props.objects.length) graphics.addElement(props.objects[props.objects.length - 1], uuidv4())
  }, [props.objects]);

  const callbacks = {
    // Сброс всех значений
    onReset: useCallback(() => {
      props.onReset();
      graphics.reset();
      setLeavesCount(0);
    }, []),
    // Изменение координат выбранной фигуры
    onValuesSubmit: useCallback((x: number, y: number) => {
      graphics.changeFigureCoordinates(x, y);
    }, []),
  };

  return (
    <div className={cn()} ref={dom as LegacyRef<HTMLDivElement> | undefined}>
      <CanvasOOPControls onFigureAdd={props.onFigureAdd}
                         onReset={callbacks.onReset}
                         resetTitle={props.resetTitle}
                         x={props.x}
                         y={props.y}
                         onValuesSubmit={callbacks.onValuesSubmit}/>
    </div>
  )
}

export default React.memo(CanvasOOP);
