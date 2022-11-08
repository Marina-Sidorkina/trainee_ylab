import React, {useCallback, useEffect, useRef, useState, useMemo, ReactComponentElement} from "react";
import './style.css';

const CustomScroll = (
  props: {
    showScroll: boolean;
    scrollHeight: number;
    scrollWidth: number;
    pinHeight: number;
    pinWidth: number;
    itemHeight: number;
    children: React.ReactNode | React.ReactNode[];
  }
) => {
  const scroll = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const movementLength = props.scrollHeight - props.pinHeight;
  const percent = (movementLength) / 100;
  const [step, setStep] = useState(0);
  const [start, setStart] = useState(0);

  const checkMoveCoordinateValue = (coordinate: number) => {
    let value = coordinate;

    if (value < 0) { value = 0 }
    else if (value > movementLength) { value = movementLength }

    return value;
  };

  const setCoordinates = (shift: number) => {
    (pin.current as HTMLElement).style.top = checkMoveCoordinateValue((pin.current as HTMLElement).offsetTop - shift) + 'px';
    (container.current as HTMLElement).scrollTop = ((pin.current as HTMLElement).offsetTop / percent) * step;
  };

  const returnTextSelect = () => document.body.classList.remove('noTextSelect');

  const callbacks = {
    onMouseDown: useCallback((evt: any) => {
      if (evt.target === pin.current) {
        callbacks.onClientMove(evt);
        document.body.classList.add('noTextSelect');
      }
    }, [pin.current]),
    onScroll: useCallback(() => {
      let dist = start - (track.current as HTMLElement).getBoundingClientRect().y;
      (pin.current as HTMLElement).style.top = (dist / step) * percent + 'px';
    }, [pin.current, track.current]),
    onClientMove: useCallback((evt: any) => {
      let startCoordinates = evt.clientY;

      const onMouseMove = (moveEvt: any) => {
        setCoordinates(startCoordinates - moveEvt.clientY);
        startCoordinates = moveEvt.clientY;
      }

      const onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }, [pin.current]),
  };

  const options = {
    customScrollStyle: useMemo(() => ({
      height: (props.children as ReactComponentElement<any>).props.children.length > 7
        ? props.scrollHeight + 'px'
        : (props.itemHeight * (props.children as ReactComponentElement<any>).props.children.length) + 'px',
      maxHeight: props.scrollHeight + 'px',
      width: props.scrollWidth + 'px'
    }), [props.scrollHeight, props.scrollWidth, (props.children as ReactComponentElement<any>).props.children.length]),
    customScrollPinStyle: useMemo(() => ({
      height: props.pinHeight + 'px',
      width: props.pinWidth + 'px',
    }), [props.scrollHeight, props.scrollWidth]),
    customScrollLineStyle: useMemo(() => ({
      height: props.scrollHeight + 'px',
      width: props.pinWidth + 'px'
    }), [props.scrollHeight, props.scrollWidth]),
    customScrollTrackStyle: useMemo(() => ({
      ...props.showScroll ? {} : {top: '0'},
      width: props.scrollWidth + 'px'
    }), [props.scrollHeight, props.scrollWidth, props.showScroll]),
  }

  useEffect(() => {
    if(props.showScroll) setStart((track.current as HTMLElement).getBoundingClientRect().y);
    setStep((parseInt(getComputedStyle(track.current as HTMLElement).getPropertyValue("height"), 10) - props.scrollHeight) / 100);
    document.body.classList.add('noScroll');
    document.addEventListener('mouseup', returnTextSelect)
    return () => {
      document.body.classList.remove('noScroll');
      document.addEventListener('mouseup', returnTextSelect)
    };
  }, [props.showScroll])

  return (
    <div className="CustomScroll"
         style = {options.customScrollStyle}>
      { props.showScroll &&
        <div className="CustomScroll-line"
                ref={scroll}
                style = {options.customScrollLineStyle}>
          <div className="CustomScroll-pin"
               ref={pin}
               onMouseDown={callbacks.onMouseDown}
               style = {options.customScrollPinStyle}/>
        </div> }
      <div className="CustomScroll-container"
           ref={container}
           onScroll={callbacks.onScroll}
           style = {options.customScrollStyle}>
        <div className="CustomScroll-track"
             ref={track}
             style={options.customScrollTrackStyle}>
          { props.children }
        </div>
      </div>
    </div>
  )
}

// Export
export default React.memo(CustomScroll);
