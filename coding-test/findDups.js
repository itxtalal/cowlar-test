/**
 * Function to find duplicate elements between two arrays
 * @param {*} array1  the first array of integers or floats
 * @param {*} array2  the second array of integers or floats
 * @param {*} thres  the threshold for the difference between two elements
 * if the difference is less than or equal to the threshold, then the elements are considered the same
 * @returns  an array of the common elements between the two arrays
 */
const duplicateNums = (array1, array2, thres = 0) => {
  if (array1.length === 0 || array2.length === 0) return [];

  // duplicate the arrays, so we don't mutate the original arrays passed by reference
  const arr1 = [...array1];
  const arr2 = [...array2];

  // array to hold the common elements
  const dupsArr = [];

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      const diff = Math.abs(arr1[i] - arr2[j]);
      const isCommon = diff >= 0 && diff <= thres;

      if (isCommon) {
        // add the element to the array of common elements
        dupsArr.push(arr1[i]);
        // remove the element from the array, so we don't count it again
        arr2.splice(j, 1);

        // To avoid removing and pushing duplicate elements, we can break out of the inner loop
        break;
      }
    }
  }

  return dupsArr;
};

/**
 * Function to find duplicate elements between arrays in a 2d array
 * @param {*} array2d the 2d array of arrays of integers or floats
 * @param {*} thres the threshold for the difference between two elements
 * if the difference is less than or equal to the threshold, then the elements are considered the same
 * @returns the number of common elements between the arrays in the 2d array
 */
const duplicateNumsIn2DArray = (array2d, thres = 0) => {
  // if the array is empty or has only one element, then there are no common elements
  if (array2d.length < 2) return 0;

  // array to hold the common elements
  let matchingElements = [];

  for (let i = 0; i < array2d.length - 1; i++) {
    // if there are no matching elements, then there is no point in continuing
    if (matchingElements.length === 0 && i !== 0) {
      return 0;
    }

    // if this is the first iteration, then we need to compare the first two arrays
    // otherwise, we need to compare the common elements from the previous iteration and the next arrays
    if (i === 0) {
      matchingElements = duplicateNums(array2d[i], array2d[i + 1], thres);
    } else {
      matchingElements = duplicateNums(
        duplicateNums(array2d[i], array2d[i + 1], thres),
        matchingElements,
        thres
      );
    }
  }

  return matchingElements.length;
};

/**
 * Function to compare two values
 * @param {*} value  the value to be compared
 * @param {*} shouldBe  the value that the value should be compared to
 * @returns true if the value is equal to the shouldBe value, false otherwise
 */
const isEqual = (value, shouldBe) => value === shouldBe;

/**
 * Function to run the tests for the duplicateNums function
 */
const runTests = () => {
  // Test integer arrays
  const intArr1 = [1, 2, 23, 4, 5, 5, 4];
  const intArr2 = [1, 1, 1, 2, 3, 4, 5, 6, 7];

  // Test float arrays
  const floatArr1 = [1.0, 2.0, 3.0, 4.0, 2.095];
  const floatArr2 = [1.001, 2.0, 3.002, 3.999, 2.1];

  // Test empty arrays
  const emptyArr1 = [];
  const emptyArr2 = [];

  console.log('\n--------- INT[] ARRAY OF INTEGER --------------\n');

  // Run the tests
  console.log(
    'INT[] Different Arrays: ',
    isEqual(duplicateNums(intArr1, intArr2).length, 4)
  );
  console.log(
    'INT[] Same Arrays: ',
    isEqual(duplicateNums(intArr1, intArr1).length, 7)
  );
  console.log(
    'INT[] Empty + Filled Array: ',
    isEqual(duplicateNums(emptyArr1, intArr1).length, 0)
  );
  console.log(
    'INT[] Empty Arrays: ',
    isEqual(duplicateNums(emptyArr1, emptyArr2).length, 0)
  );

  console.log('\n--------- FLOAT[] ARRAY OF FLOAT --------------\n');

  console.log(
    'FLOAT[] Different Arrays +- 0.001: ',
    isEqual(duplicateNums(floatArr1, floatArr2, 0.001).length, 3)
  );
  console.log(
    'FLOAT[] Empty + Filled Arrays +- 0.001: ',
    isEqual(duplicateNums(emptyArr1, floatArr2, 0.001).length, 0)
  );
  console.log(
    'FLOAT[] Empty Arrays +- 0.001:',
    isEqual(duplicateNums(emptyArr1, emptyArr2, 0.001).length, 0)
  );
  console.log(
    'FLOAT[] Same Arrays +- 0.001: ',
    isEqual(duplicateNums(floatArr2, floatArr2, 0.001).length, 5)
  );
  console.log(
    'FLOAT[] Different Arrays +- 0: ',
    isEqual(duplicateNums(floatArr1, floatArr2, 0).length, 1)
  );
  console.log(
    'FLOAT[] Different Arrays +- 0.002: ',
    isEqual(duplicateNums(floatArr1, floatArr2, 0.002).length, 4)
  );
  console.log(
    'FLOAT[] Different Arrays +- 0.005: ',
    isEqual(duplicateNums(floatArr1, floatArr2, 0.005).length, 5)
  );
};

/**
 * Function to run the tests for the duplicateNumsIn2DArray function
 */
const run2DTests = () => {
  console.log(
    '\n--------- INT[][] 2D ARRAY OF INTEGER ARRAYS --------------\n'
  );
  console.log(
    'INT[][] Empty Arrays: ',
    isEqual(duplicateNumsIn2DArray([[], []]), 0)
  );
  console.log(
    'INT[][] 2 Similar Arrays + Empty: ',
    isEqual(duplicateNumsIn2DArray([[1, 2, 3], [1, 2, 3], []]), 0)
  );
  console.log('INT[][] Empty: ', isEqual(duplicateNumsIn2DArray([]), 0));

  const arr1 = [
    [1, 2, 3, 4, 5, 423, 4],
    [1, 2, 4, 5, 6],
    [1, 2, 4, 5, 3],
  ];
  const arr2 = [[], [0, 2, 4, 5, 0], [2, 4, 5, 3]];

  console.log(
    'INT[][] 3 Different Arrays: ',
    isEqual(duplicateNumsIn2DArray(arr1), 4)
  );
  console.log(
    'INT[][] Empty + 2 Different: :',
    isEqual(duplicateNumsIn2DArray(arr2), 0)
  );
  console.log(
    'INT[][] 2 Similar Arrays:',
    isEqual(
      duplicateNumsIn2DArray([
        [1, 2, 3],
        [1, 2, 3],
      ]),
      3
    )
  );
  console.log(
    'INT[][] 2 Similar Arrays + 1 Different: ',
    isEqual(
      duplicateNumsIn2DArray([
        [1, 2, 3, 4],
        [1, 2, 3],
        [1, 2, 3, 4],
      ]),
      3
    )
  );

  console.log(
    '\n--------- FLOAT[][] 2D ARRAY OF FLOAT ARRAYS --------------\n'
  );

  console.log(
    'Float[][] Empty Arrays: ',
    isEqual(duplicateNumsIn2DArray([[], []]), 0)
  );
  console.log(
    'Float[][] 2 Similar Arrays + Empty: ',
    isEqual(duplicateNumsIn2DArray([[1.0, 2.0, 3.0], [1.0, 2.0, 3.0], []]), 0)
  );
  console.log('Float[][] Empty: ', isEqual(duplicateNumsIn2DArray([]), 0));

  const floatArr1 = [1.0, 2.0, 3.0, 4.0, 2.095];
  const floatArr2 = [1.001, 2.0, 3.002, 3.999, 2.1];
  const floatArr3 = [1.0, 2.0, 3.0, 4.0];
  const floatArr4 = [1.001, 2.0, 3.002, 4.0, 2.1];
  const floatArr5 = [1.0, 2.0, 3.0, 4.0, 5.0];

  const arr12D = [floatArr1, floatArr2, floatArr3];
  const arr22D = [[], floatArr4, floatArr5];

  console.log(
    'Float[][] 3 Different Arrays: ',
    isEqual(duplicateNumsIn2DArray(arr12D), 1)
  );
  console.log(
    'Float[][] Empty + 2 Different: ',
    isEqual(duplicateNumsIn2DArray(arr22D), 0)
  );
  console.log(
    'Float[][] 2 Similar Arrays: ',
    isEqual(duplicateNumsIn2DArray([floatArr1, floatArr1]), floatArr1.length)
  );
  console.log(
    'Float[][] 2 Similar Arrays + 1 Different: ',
    isEqual(duplicateNumsIn2DArray([floatArr1, floatArr1, floatArr3]), 4)
  );
};

runTests();
run2DTests();
