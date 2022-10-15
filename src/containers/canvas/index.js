import React, {useCallback} from "react";
import CanvasForm from "@src/components/canvas-form";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";

function CanvasContainer() {
  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    objects: state.canvas.objects,
  }));

  const callbacks = {
    // Добавление в корзину
    onFillRectangleAdd: useCallback((canvas) => {
      store.get('canvas').createObject('fillRectangle', canvas);
    }, [select.objects]),
    onStrokeRectangleAdd: useCallback((canvas) => {
      store.get('canvas').createObject('strokeRectangle', canvas);
    }, [select.objects]),
    onFillCircleAdd: useCallback((canvas) => {
      store.get('canvas').createObject('fillCircle', canvas);
    }, [select.objects]),
    onStrokeCircleAdd: useCallback((canvas) => {
      store.get('canvas').createObject('strokeCircle', canvas);
    }, [select.objects]),
    onFillTriangleAdd: useCallback((canvas) => {
      store.get('canvas').createObject('fillTriangle', canvas);
    }, [select.objects]),
    onStrokeTriangleAdd: useCallback((canvas) => {
      store.get('canvas').createObject('strokeTriangle', canvas);
    }, [select.objects]),
    onReset: useCallback(() => {
      store.get('canvas').deleteObjects();
    }, [select.objects]),
  };

  return (
    <CanvasForm objects={select.objects}
                onFillRectangleAdd={callbacks.onFillRectangleAdd}
                onStrokeRectangleAdd={callbacks.onStrokeRectangleAdd}
                onFillCircleAdd={callbacks.onFillCircleAdd}
                onStrokeCircleAdd={callbacks.onStrokeCircleAdd}
                onFillTriangleAdd={callbacks.onFillTriangleAdd}
                onStrokeTriangleAdd={callbacks.onStrokeTriangleAdd}
                onReset={callbacks.onReset}
                resetTitle={t('filter.reset')}/>
  )
}

export default React.memo(CanvasContainer);
