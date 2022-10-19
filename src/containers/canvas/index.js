import React, {useCallback} from "react";
import Canvas from "@src/components/canvas";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";

function CanvasContainer() {
  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    objects: state.canvas.objects,
    scale: state.canvas.scale,
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
    }, [select.objects]),
    onWheel: useCallback((evt) => {
      store.get('canvas').onWheelMove(evt.deltaY, evt.shiftKey);
    }, []),
    addOffset: useCallback((offsetX, offsetY) => {
      store.get('canvas').addOffset(offsetX, offsetY);
    }, [select.objects]),
    addFalling: useCallback((offsetY) => {
      store.get('canvas').addFalling(offsetY);
    }, []),
    setMouseMoving: useCallback((value) => {
      store.get('canvas').setMouseMoving(value);
    }, []),
  };

  return (
    <Canvas objects={select.objects}
                onFillRectangleAdd={callbacks.onFillRectangleAdd}
                onStrokeRectangleAdd={callbacks.onStrokeRectangleAdd}
                onFillCircleAdd={callbacks.onFillCircleAdd}
                onStrokeCircleAdd={callbacks.onStrokeCircleAdd}
                onFillTriangleAdd={callbacks.onFillTriangleAdd}
                onStrokeTriangleAdd={callbacks.onStrokeTriangleAdd}
                onReset={callbacks.onReset}
                resetTitle={t('filter.reset')}
                onWheel={callbacks.onWheel}
                addOffset={callbacks.addOffset}
                scale={select.scale}
                addFalling={callbacks.addFalling}
                setMouseMoving={callbacks.setMouseMoving}/>
  )
}

export default React.memo(CanvasContainer);
