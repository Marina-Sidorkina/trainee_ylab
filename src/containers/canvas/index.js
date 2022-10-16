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
    offsetY: state.canvas.offsetY,
    offsetX: state.canvas.offsetX,
  }));

  const callbacks = {
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
    }, [select.objects, select.offsetY, select.offsetX]),
    addOffsetY: useCallback((value) => {
      store.get('canvas').addOffsetY(value);
    }, [select.offsetY]),
    addOffsetX: useCallback((value) => {
      store.get('canvas').addOffsetX(value);
    }, [select.offsetX]),
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
                resetTitle={t('filter.reset')}
                offsetY={select.offsetY}
                addOffsetY={callbacks.addOffsetY}
                offsetX={select.offsetX}
                addOffsetX={callbacks.addOffsetX}/>
  )
}

export default React.memo(CanvasContainer);
