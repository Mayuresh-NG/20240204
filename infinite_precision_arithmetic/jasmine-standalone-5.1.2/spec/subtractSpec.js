describe("Infinite Precision Subtraction", function () {
  it("should subtract two arrays with smaller from larger", function () {
    expect(
      sub(
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
      )
    ).toEqual(0);
  });

  it("should subtract two arrays with larger from smaller", function () {
    expect(sub([5, 5, 0], [1, 2])).toEqual(538);
  });

  it("should subtract even if number starts with 0", function () {
    expect(sub([0, 1, 2], [1, 0])).toEqual(2);
  });

  it("should return error if input is having negative value", function () {
    expect(function () {
      sub([-1, 1, 2], [1, 0]);
    }).toThrowError("Negative values in the array are not allowed.");
  });

  it("should return error if null arrays is given", function () {
    expect(function () {
      sub([], [1, 0]);
    }).toThrowError("Null arrays are not accepted");
  });

  it("should return error if each element of array is not single digit", function () {
    expect(function () {
      sub([15], [1, 0]);
    }).toThrowError(
      "Only single digits are allowed in the first position of the arrays"
    );
  });

  it("should return negative value if first number is smaller than second", function () {
    expect(sub([2, 1], [3, 0])).toEqual(-9);
  });
});
