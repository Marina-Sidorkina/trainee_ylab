import React, {LegacyRef, useEffect, useRef} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';
import Button from "@src/components/elements/button";

interface IProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  labelClose: string;
}

function LayoutModal(props: IProps) {
  const cn = bem('LayoutModal');

  const frame = useRef<HTMLElement>(null);

  useEffect(() => {
    let top = 10;
    if (frame.current && window.innerWidth > (frame.current as HTMLElement).clientHeight) {
      if (frame.current) top = Math.max(top, (window.innerHeight - (frame.current as HTMLElement).clientHeight) / 2 - top);
    }
    if (frame.current) (frame.current as HTMLElement).style.marginTop = `${top}px`;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    }
  });

  return (
    <div className={cn()}>
      <div className={cn('frame')} ref={frame as LegacyRef<HTMLDivElement> | undefined}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>
            {props.title}
          </h1>
          <Button onClick={props.onClose} title={props.labelClose} submit={false}/>
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default React.memo(LayoutModal);
