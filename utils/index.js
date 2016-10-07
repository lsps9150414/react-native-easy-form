import React from 'react';

export const insertSeparator = (itemArray = [], SeparatorComponent) => {
  const itemArrayWithSeparator = itemArray;
  const length = itemArray.length;
  for (let i = 1; i < length; i++) {
    itemArrayWithSeparator.splice(
      (i * 2 - 1), 0,
      (<SeparatorComponent key={`Separator-${i}`} />)
    );
  }
  return itemArrayWithSeparator;
};
