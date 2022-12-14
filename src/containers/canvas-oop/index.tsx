import React, {useCallback} from "react";
import CanvasOOP from "@src/components/canvas-oop";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import {IState} from "@src/store/types";

function CanvasOOPContainer() {
  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector((state: IState) => ({
    objects: state.canvasOOP.objects,
    x: state.canvasOOP.input.x,
    y: state.canvasOOP.input.y,
  }));

  const callbacks = {
    // Добавление нового объекта с данными для фигуры в стор
    onFigureAdd: useCallback((type: string) => {
      store.get('canvasOOP').createObject(type);
    }, []),
    // Добавление нового объекта с данными для листочка в стор
    onLeafAdd: useCallback((mod: number) => {
      store.get('canvasOOP').createLeaf(mod);
    }, []),
    // Сброс значений в сторе
    onReset: useCallback(() => {
      store.get('canvasOOP').reset();
    }, []),
    // Обновление данных инпута в сторе
    updateInputStoreData: useCallback((index: string, x: number, y: number) => {
      store.get('canvasOOP').updateInputStoreData(index, x, y);
    }, []),
  };

  return (
    <CanvasOOP objects={select.objects}
               onFigureAdd={callbacks.onFigureAdd}
               onReset={callbacks.onReset}
               resetTitle={t('filter.reset')}
               updateInputStoreData={callbacks.updateInputStoreData}
               x={select.x}
               y={select.y}
               onLeafAdd={callbacks.onLeafAdd}/>
  )
}

export default React.memo(CanvasOOPContainer);
