import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';
import PropTypes from "prop-types";

function ChatList({items, renderItem, lastMessageRef, onScroll, listBlockRef}) {
  const cn = bem('ChatList');

  return (
    <div className={cn()}
         onScroll={(evt) => onScroll(evt.target.scrollTop)}
         ref={listBlockRef}>
      {items.map((item, id) =>
        <div className={cn('item')}
             key={item._key}
             ref={id === ( items.length - 1) ? lastMessageRef : null}>
          {renderItem(item)}
        </div>)}
    </div>
  )
}

ChatList.propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func,
  lastMessageRef: PropTypes.object,
  onScroll: PropTypes.func,
  listBlockRef: PropTypes.object,
}

ChatList.defaultProps = {
  renderItem: () => {},
  items: [],
  lastMessageRef: null,
  onScroll: () => {},
  listBlockRef: {},
}

export default React.memo(ChatList);
