import React, {useCallback, useEffect, useRef, useState} from "react";
import './style.css';
import propTypes from "prop-types";

const CustomScroll = (
  {
    showScroll,
    scrollHeight,
    scrollWidth,
    pinHeight,
    pinWidth,
    children
  }
) => {
  const scroll = useRef(null);
  const track = useRef(null);
  const pin = useRef(null);
  const movementLength = scrollHeight - pinHeight;
  const percent = (movementLength) / 100;
  const [step, setStep] = useState(0);
  const [start, setStart] = useState(0);

  useEffect(() => {
    setStep((parseInt(getComputedStyle(track.current).getPropertyValue("height"), 10) - scrollHeight) / 100);
    setStart(scroll.current.getBoundingClientRect().y);
  }, [])

  const checkMoveCoordinateValue = coordinate => {
    let value = coordinate;
    if (value < 0) {
      value = 0;
    } else if (value > movementLength) {
      value = movementLength;
    }
    return value;
  };

  const setRangePinCoordinates = (shift, start) => {
    pin.current.style.top = checkMoveCoordinateValue((pin.current.offsetTop - shift), start) + 'px';
    track.current.style.top = '-' + ((pin.current.offsetTop / percent) * step) + 'px';
  };

  const callbacks = {
    onMouseDown: useCallback((evt) => {
      let startCoordinates = evt.clientY;

      const onMouseMove = (moveEvt) => {
        setRangePinCoordinates(startCoordinates - moveEvt.clientY, startCoordinates);
        startCoordinates = moveEvt.clientY;
      }

      const onMouseUp = function () {
        scroll.current.removeEventListener('mousemove', onMouseMove);
        scroll.current.removeEventListener('mouseup', onMouseUp);
      };

      const onMouseLeave = function () {
        scroll.current.removeEventListener('mousemove', onMouseMove);
        scroll.current.removeEventListener('mouseup', onMouseUp);
        scroll.current.removeEventListener('mouseup', onMouseLeave);
      };

      scroll.current.addEventListener('mousemove', onMouseMove);
      scroll.current.addEventListener('mouseup', onMouseUp);
      scroll.current.addEventListener('mouseleave', onMouseLeave);
    }, [scroll.current]),
    onScroll: useCallback(() => {
      const dist = start - scroll.current.getBoundingClientRect().y;
      let topValue = dist + ((dist / step) * percent);
      if(topValue >= ((step * 100) + movementLength)) topValue = (step * 100) + movementLength;
      pin.current.style.top = topValue + 'px';
    }, [pin.current]),
  };

  return (
    <div className="CustomScroll"
         onScroll={callbacks.onScroll}
         style = {{
           height: scrollHeight.toString() + 'px',
           width: scrollWidth.toString() + 'px'}}>
      {showScroll && <div className="CustomScroll-line"
                          ref={scroll}
                          style = {{
                            height: scrollHeight.toString() + 'px',
                            width: pinWidth.toString() + 'px'}}>
        <div className="CustomScroll-pin"
             ref={pin} onMouseDown={callbacks.onMouseDown}
             style = {{
               height: pinHeight.toString() + 'px',
               width: pinWidth.toString() + 'px',
             }}/>
      </div>}
      <div className="CustomScroll-track"
           ref={track}
           onKeyDown={(evt) => {
             if(evt.key === 'Tab') {
               //pin.current.classList.add('hidden');
             }
           }}
           style={{
             ...showScroll ? {} : {top: '0'},
             width: scrollWidth.toString() + 'px'
            }}>
        {children}
      </div>
    </div>
  )
}

// PropTypes
CustomScroll.propTypes = {
  children: propTypes.node,
  showScroll: propTypes.bool.isRequired,
  scrollHeight: propTypes.number.isRequired,
  scrollWidth: propTypes.number.isRequired,
  pinHeight: propTypes.number.isRequired,
  pinWidth: propTypes.number.isRequired,
}

// Export
export default React.memo(CustomScroll);
