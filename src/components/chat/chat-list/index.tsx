import React, {LegacyRef, ReactElement} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';
import {IItem} from "@src/store/chat/types";

function ChatList(props: {
  items: IItem[];
  renderItem: (item: IItem) => ReactElement;
  lastMessageRef: LegacyRef<HTMLDivElement> | undefined;
  onScroll: (value: number) => void;
  listBlockRef: LegacyRef<HTMLDivElement> | undefined;
}) {
  const cn = bem('ChatList');

  return (
    <div className={cn()}
         onScroll={(evt) => props.onScroll((evt.target as HTMLElement).scrollTop)}
         ref={props.listBlockRef}>
      {props.items.map((item, id) =>
        <div className={cn('item')}
             key={item._key}
             ref={(id === ( props.items.length - 1) ? props.lastMessageRef : null) as LegacyRef<HTMLDivElement> | undefined}>
          {props.renderItem(item)}
        </div>)}
    </div>
  )
}

export default React.memo(ChatList);
