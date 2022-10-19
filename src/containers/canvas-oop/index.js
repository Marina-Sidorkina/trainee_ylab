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
  }));

  const callbacks = {
    onFigureAdd: useCallback((type) => {
      store.get('canvasOOP').createObject(type);
    }, []),
    onReset: useCallback(() => {
      store.get('canvasOOP').deleteObjects();
    }, []),
  };

  return (
    <CanvasOOP objects={select.objects}
               onFigureAdd={callbacks.onFigureAdd}
               onReset={callbacks.onReset}
               resetTitle={t('filter.reset')}/>
  )
}

export default React.memo(CanvasOOPContainer);
