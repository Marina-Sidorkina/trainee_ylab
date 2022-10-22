import React, {useCallback} from "react";
import CanvasOOP from "@src/components/canvas-oop";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";

function CanvasOOPContainer() {
  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    objects: state.canvasOOP.objects,
    x: state.canvasOOP.figure.x,
    y: state.canvasOOP.figure.y,
  }));

  const callbacks = {
    onFigureAdd: useCallback((type) => {
      store.get('canvasOOP').createObject(type);
    }, []),
    onReset: useCallback(() => {
      store.get('canvasOOP').deleteObjects();
    }, []),
    updateFigureStoreData: useCallback((index, x, y) => {
      store.get('canvasOOP').updateFigureStoreData(index, x, y);
    }, []),
  };

  return (
    <CanvasOOP objects={select.objects}
               onFigureAdd={callbacks.onFigureAdd}
               onReset={callbacks.onReset}
               resetTitle={t('filter.reset')}
               updateFigureStoreData={callbacks.updateFigureStoreData}
               x={select.x}
               y={select.y}/>
  )
}

export default React.memo(CanvasOOPContainer);
