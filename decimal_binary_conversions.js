// function to add 1 to binary string considering carry case
function addOneToBinary(binaryString, length) {
  let result = "";
  let carry = 1;

  for (let i = binaryString.length - 1; i >= 0; i--) {
    const bit = binaryString[i];
    const sum = parseInt(bit) + carry;
    result = (sum % 2).toString() + result;
    carry = sum > 1 ? 1 : 0;
  }

  if (carry) {
    result = carry.toString() + result;
  }

  let arr = [];
  let toreturn = length - result.length;

  for (let i = 0; i < length; i++) {
    while (toreturn != 0) {
      arr.push(result[0]);
      toreturn--;
    }
  }

  if (toreturn === 0) {
    for (let i = 0; i < result.length; i++) {
      const digit = parseInt(result[i], 10);
      arr.push(digit);
    }
  }
  return arr;
}

/**getSimple2sComplement - function to convert decimal to binary , if decimal is negative 
 * it will be converted to 2s complement form
 * @param {Number} num - Its a decimal number to be taken from user
 * @param {Number} length - Its the length of an array
 * @returns {Array} - the resultant arry
 */
function getSimple2sComplement(num, length) {
  if (num < 0) {
    posnum = -num;

    let resstring = "";
    resneg = "0" + posnum.toString(2);

    for (let i = 0; i < resneg.length; i++) {
      resneg[i] === "1" ? (resstring += "0") : (resstring += "1");
    }
    return addOneToBinary(resstring, length);
  } else {
    let arr = [];
    res = num.toString(2);
    let toreturn = length - res.length;

    for (let i = 0; i < length; i++) {
      while (toreturn != 0) {
        arr.push(0);
        toreturn--;
      }
    }

    if (toreturn === 0) {
      for (let i = 0; i < res.length; i++) {
        const digit = parseInt(res[i], 10);
        arr.push(digit);
      }
    }
    return arr;
  }
}

/**It is a function to convert any binary form(2S complement form) to its decima
 * @param {Array} arr - binary number which is to be converted into decimal
 */
function getSimpleDecimalFrom2sComplement(arr) {
  let carry = 0;

  for (let i = 0; i < arr.length; i++) {
    arr[i] == 0 ? (arr[i] = 1) : (arr[i] = 0);
  }

  if (arr[arr.length - 1] == 0) {
    arr[arr.length - 1] = 1;
  }

  let finres = parseInt(arr.join(""), 10);

  return -parseInt(finres, 2);
}

/**This is a function to give a 64-bit javascript binary representation
 * @param {Number} number the number that you want to convert
 * @throws {Error} when the input number is not valid
 * @returns {String} the output of the conversion
 */
function getJsNumberRepresentation(num) {
  // Check if the input is a valid num
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Invalid input. Please provide a valid num.');
  }

  // Create a Float64Array with a single element
  var float64Array = new Float64Array(1);
  
  // Set the value of the array to the given num
  float64Array[0] = num;
  
  // Get the DataView of the array
  var dataView = new DataView(float64Array.buffer);
  
  // Extract the 64-bit binary representation as a string
  var binaryRepresentation = '';
  for (var i = 7; i >= 0; i--) {
    binaryRepresentation += ('00000000' + dataView.getUint8(i).toString(2)).slice(-8);
  }
  
  return binaryRepresentation;
}


/**This is a function to give a number from the 64-bit representation
* @param {*} num the input to convert in decimal
* @throws {Error} when there is some issue while converting
* @returns {Number} the number representation of the 64-bit binary
*/
function getNumericFromJsRepresentation(num) {
  let binaryRepresentation;

  // Check if the num is a number and convert it to a binary string
  if (typeof num === 'number') {
    binaryRepresentation = num.toString(2);
    // Pad with zeros to ensure it's 64 bits long
    binaryRepresentation = '0'.repeat(64 - binaryRepresentation.length) + binaryRepresentation;
  } else if (Array.isArray(num)) {
    // Check if the num is an array of binary digits
    if (!num.every(bit => bit === 0 || bit === 1)) {
      throw new Error('Invalid num. Please provide a valid array of binary digits (0 or 1).');
    }
    // Join the array into a string
    binaryRepresentation = num.join('');
    // Pad with zeros to ensure it's 64 bits long
    binaryRepresentation = '0'.repeat(64 - binaryRepresentation.length) + binaryRepresentation;
  } else if (typeof num === 'string') {
    // Check if the num is a valid binary string
    if (!/^[01]+$/.test(num)) {
      throw new Error('Invalid num. Please provide a valid binary string.');
    }
    // Pad with zeros to ensure it's 64 bits long
    binaryRepresentation = '0'.repeat(64 - num.length) + num;
  } else {
    throw new Error('Invalid num. Please provide a number, an array of binary digits, or a binary string.');
  }

  // Split the binary string into sign, exponent, and fraction parts
  const sign = parseInt(binaryRepresentation.charAt(0), 2) === 0 ? 1 : -1;
  const exponent = parseInt(binaryRepresentation.substr(1, 11), 2) - 1023;
  const fraction = parseInt(binaryRepresentation.substr(12), 2) / Math.pow(2, 52);

  // Calculate the final number
  const result = sign * Math.pow(2, exponent) * (1 + fraction);

  return result;
 }

// INPUTS
console.log(
  "Postive number: " + 
  getSimple2sComplement(15, 11)
  );

console.log("Negative number: " +
 getSimple2sComplement(-3, 10)
 );

console.log(
  "Decimal number is: " +
    getSimpleDecimalFrom2sComplement([1,1,1,0,1,1,0,1])
);

console.log(
  "JS NUmber Representation: " + getJsNumberRepresentation(3.14)
);

console.log(
  "JS NUmber Representation: " + getNumericFromJsRepresentation("0100000000001001000111101011100001010001111010111000010100011111")
);
