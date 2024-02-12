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
  // Handle special cases: Infinity, -Infinity, NaN
  if (!isFinite(num)) {
    return num.toString();  // Return string representation for special cases
  }

  // Get sign bit
  let signBit = num < 0 ? 1 : 0;

  // Make input positive for easier processing
  num = Math.abs(num);

  // Handle zero separately
  if (num === 0) {
    return (signBit << 63).toString(2).padStart(64, '0');
  }

  // Calculate exponent and mantissa
  let exponent = Math.floor(Math.log2(num));
  let normalizedMantissa = num * Math.pow(2, 52 - exponent);

  // Convert to binary strings
  let exponentBits = (exponent + 1023).toString(2).padStart(11, '0');
  let mantissaBits = Math.floor(normalizedMantissa).toString(2).padStart(52, '0');

  // Combine sign, exponent, and mantissa bits
  let ieee754Bits = signBit + exponentBits + mantissaBits;

  // Ensure the result is exactly 64 bits
  ieee754Bits = ieee754Bits.padEnd(64, '0').slice(0, 64);

  return ieee754Bits;
}

// return number from 52 array
function getNumericFromJsRepresentation(binaryString) {
  // Extract sign, exponent, and mantissa bits
  let signBit = parseInt(binaryString.charAt(0), 2);
  let exponentBits = binaryString.slice(1, 12);
  let mantissaBits = binaryString.slice(12);

  // Convert binary strings to decimal numbers
  let exponent = parseInt(exponentBits, 2) - 1023;
  let mantissa = parseInt(mantissaBits, 2) / Math.pow(2, 52);

  // Calculate the final value
  let result = Math.pow(-1, signBit) * (1 + mantissa) * Math.pow(2, exponent);

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
  "JS NUmber Representation: " + getNumericFromJsRepresentation("0100000000001100100011110101110000101000111101011100001010001111")
);
