export const splitArray = (array = [], itemAmount = 1) => {
  const arrayToSplit = array.slice();
  const splitedArrays = [];
  while (arrayToSplit.length > 0) {
    splitedArrays.push(arrayToSplit.splice(0, itemAmount));
  }
  return splitedArrays;
};

export const insertArray = (array = [], insertItem, interval = 1, insertFirst = false) => {
  const splitedArrays = splitArray(array, interval);
  if (insertFirst) {
    splitedArrays.forEach((splitedArray) => {
      splitedArray.unshift(insertItem);
    });
    if (splitedArrays[splitedArrays.length - 1].length === interval + 1) {
      splitedArrays[splitedArrays.length - 1].push(insertItem);
    }
  } else {
    splitedArrays.forEach((splitedArray, index) => {
      if (index < splitedArrays.length - 1) {
        splitedArray.push(insertItem);
      }
    });
  }
  return splitedArrays.reduce((p, c) => p.concat(c));
};
