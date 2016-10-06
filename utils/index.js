import React from 'react';

export const insertSeparator = (itemArray = [], SeperatorComponent) => {
  const itemArrayWithSeperator = itemArray;
  const length = itemArray.length;
  for (let i = 1; i < length; i++) {
    itemArrayWithSeperator.splice(
      (i * 2 - 1), 0,
      (<SeperatorComponent key={`seperator-${i}`} />)
    );
  }
  return itemArrayWithSeperator;
};
