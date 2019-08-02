// @flow

import React, { memo, useCallback } from 'react';
import './ListItem.css';

import type { Item } from './List';

type Props = {|
  item: Item,
  removeItem: (item: Item) => void,
  toggleItem: (item: Item) => void,
|};

function ListItem({ item, removeItem, toggleItem }: Props) {
  const handleDelete = useCallback(() => {
    removeItem(item);
  }, [item, removeItem]);

  const handleToggle = useCallback(() => {
    toggleItem(item);
  }, [item, toggleItem]);

  return (
    <li className="ListItem">
      <button className="IconButton" onClick={handleDelete}>
        🗑
      </button>
      <label className="Label">
        <input
          className="Input"
          checked={item.isComplete}
          onChange={handleToggle}
          type="checkbox"
        />{' '}
        {item.text}
      </label>
    </li>
  );
}

export default memo<Props>(ListItem);
