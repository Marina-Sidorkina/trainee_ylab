import React, {useCallback} from 'react';
import './style.css';

function Select(props: {
  options: any[],
  value: any;
  onChange: (value: any) => void;
}){

  const onSelect = useCallback((e: any) => {
    props.onChange(e.target.value);
  }, [props.onChange])

  return (
    <select className="Select" onChange={onSelect} value={props.value}>
      {props.options.map(item => (
        <option key={item.value} value={item.value}>{item.title}</option>
      ))}
    </select>
  )
}

export default React.memo(Select);
