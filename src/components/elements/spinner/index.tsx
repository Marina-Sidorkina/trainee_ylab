import React from 'react';
import './style.css';

function Spinner(props: {
  active: boolean;
  children: React.ReactNode | React.ReactNode[];
}): any {

  if (props.active){
    return (
      <div className="Spinner">
        {props.children}
      </div>
    )
  } else {
    return props.children;
  }
}

export default React.memo(Spinner);
