describe("Infinite Precision Addition", function () {
  it("should add two arrays upto infnite precision", function () {
    expect(
      add(
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
      )
    ).toEqual(19999999999999999998);
  });

  it("Of 0 should return 0", function () {
    expect(add([0], [0])).toEqual(0);
  });

  it("should add even if number starts with 0", function () {
    expect(add([0, 1, 2], [1, 0])).toEqual(22);
  });

  it("should return error if input is having negative value", function () {
    expect(function () {
      add([-1, 1, 2], [1, 0]);
    }).toThrowError("Negative values in the array are not allowed.");
  });

  it("should return error if null arrays is given", function () {
    expect(function () {
      add([], [1, 0]);
    }).toThrowError("you must provide two numbers to perfrom addition");
  });

  it("should return error if each element of array is not single digit", function () {
    expect(function () {
      add([15], [1, 0]);
    }).toThrowError("Each element of the array must be a single digit (0-9).");
  });
});
