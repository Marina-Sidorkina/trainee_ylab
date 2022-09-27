import React, {useCallback, useEffect, useRef, useState, useMemo} from "react";
import './style.css';
import propTypes from "prop-types";

const CustomScroll = (
  {
    showScroll,
    scrollHeight,
    scrollWidth,
    pinHeight,
    pinWidth,
    itemHeight,
    children
  }
) => {
  const scroll = useRef(null);
  const track = useRef(null);
  const pin = useRef(null);
  const container = useRef(null);
  const movementLength = scrollHeight - pinHeight;
  const percent = (movementLength) / 100;
  const [step, setStep] = useState(0);
  const [start, setStart] = useState(0);

  const checkMoveCoordinateValue = coordinate => {
    let value = coordinate;

    if (value < 0) { value = 0 }
    else if (value > movementLength) { value = movementLength }

    return value;
  };

  const setCoordinates = (shift) => {
    pin.current.style.top = checkMoveCoordinateValue(pin.current.offsetTop - shift) + 'px';
    container.current.scrollTop = (pin.current.offsetTop / percent) * step;
  };

  const returnTextSelect = () => document.body.classList.remove('noTextSelect');

  const callbacks = {
    onMouseDown: useCallback((evt) => {
      if (evt.target === pin.current) {
        const onMouseUp = () => pin.current.removeEventListener('mouseup', onMouseUp);

        callbacks.onClientMove(evt);
        pin.current.addEventListener('mouseup', onMouseUp);
        document.body.classList.add('noTextSelect');
      }
    }, [pin.current]),
    onScroll: useCallback(() => {
      let dist = start - track.current.getBoundingClientRect().y;
      pin.current.style.top = (dist / step) * percent + 'px';
    }, [pin.current, track.current]),
    onClientMove: useCallback((evt) => {
      let startCoordinates = evt.clientY;

      const onMouseMove = (moveEvt) => {
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
      height: children.props.children.length > 7
        ? scrollHeight + 'px'
        : (itemHeight * children.props.children.length) + 'px',
      maxHeight: scrollHeight + 'px',
      width: scrollWidth + 'px'
    }), [scrollHeight, scrollWidth, children.props.children.length]),
    customScrollPinStyle: useMemo(() => ({
      height: pinHeight + 'px',
      width: pinWidth + 'px',
    }), [scrollHeight, scrollWidth]),
    customScrollLineStyle: useMemo(() => ({
      height: scrollHeight + 'px',
      width: pinWidth + 'px'
    }), [scrollHeight, scrollWidth]),
    customScrollTrackStyle: useMemo(() => ({
      ...showScroll ? {} : {top: '0'},
      width: scrollWidth + 'px'
    }), [scrollHeight, scrollWidth, showScroll]),
  }

  useEffect(() => {
    if(showScroll) setStart(track.current.getBoundingClientRect().y);
    setStep((parseInt(getComputedStyle(track.current).getPropertyValue("height"), 10) - scrollHeight) / 100);
    document.body.classList.add('noScroll');
    document.addEventListener('mouseup', returnTextSelect)
    return () => {
      document.body.classList.remove('noScroll');
      document.addEventListener('mouseup', returnTextSelect)
    };
  }, [showScroll])

  return (
    <div className="CustomScroll"
         style = {options.customScrollStyle}>
      { showScroll &&
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
          { children }
        </div>
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
  itemHeight: propTypes.number.isRequired,
}

// Export
export default React.memo(CustomScroll);
