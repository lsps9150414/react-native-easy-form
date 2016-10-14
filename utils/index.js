export const splitArray = (array, itemAmount = 1) => {
  if ((Array.isArray(array) === false)) {
    return array;
  } else if (array.length <= itemAmount) {
    return [array];
  }
  const arrayToSplit = array.slice();
  const splitedArrays = [];
  while (arrayToSplit.length > 0) {
    splitedArrays.push(arrayToSplit.splice(0, itemAmount));
  }
  return splitedArrays;
};

export const insertArray = (array, insertItem, interval = 1, insertFirst = false) => {
  if ((Array.isArray(array) === false) || array.length <= interval) {
    return array;
  }
  const splitedArrays = splitArray(array, interval);
  if (!Array.isArray(splitedArrays[0])) { return array; }
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

export const extendArray = (array, extendItem, targetLength) => {
  if (!Array.isArray(array)) { return array; }
  if (array.length < targetLength) {
    while (array.length !== targetLength) {
      array.push(extendItem);
    }
    return array;
  }
  return array;
};
