import React, {useCallback, useEffect, useRef, useState} from "react";
import './style.css';
import propTypes from "prop-types";

const CustomScroll = ({children}) => {
  const scroll = useRef(null);
  const track = useRef(null);
  const pin = useRef(null);
  const percent = 60 / 100;
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep((parseInt(getComputedStyle(track.current).getPropertyValue("height"), 10) - 120) / 100);
  }, [])

  const checkMoveCoordinateValue = coordinate => {
    let value = coordinate;
    if (value < 0) {
      value = 0;
    } else if (value > 60) {
      value = 60;
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
  };

  return (
    <div className="CustomScroll" onSelect={(evt) => evt.preventDefault()}>
      <div className="CustomScroll-line" ref={scroll}>
        <div className="CustomScroll-pin" ref={pin} onMouseDown={callbacks.onMouseDown}/>
      </div>
      <div className="CustomScroll-track" ref={track}
           onKeyDown={(evt) => {
             if(evt.key === 'Tab') {
               pin.current.style.display = 'none'
             }}}>
        {children}
      </div>
    </div>
  )
}

// PropTypes
CustomScroll.propTypes = {
  children: propTypes.node,
}

CustomScroll.defaultProps = {
}

// Export
export default React.memo(CustomScroll);
