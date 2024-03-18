describe("Infinite Precision Multiplication", function () {
  it("should multiply two positive numbers", function () {
    expect(multiply([1, 2], [3, 4])).toEqual(408);
  });

  it("should multiply a positive number with zero", function () {
    expect(multiply([1, 2], [0])).toEqual(0);
  });

  it("should multiply a positive number with one", function () {
    expect(multiply([1, 2], [1])).toEqual(12);
  });

  it("should multiply two positive numbers with leading zeros", function () {
    expect(multiply([0, 1, 2], [0, 1])).toEqual(12);
  });

  it("should multiply two positive numbers with different lengths", function () {
    expect(multiply([1, 2], [3, 4, 5])).toEqual(4140);
  });

  it("should multiply a negative number with a positive number", function () {
    expect(multiply([-1, 2], [3, 4])).toEqual(-408);
  });

  it("should multiply two negative numbers", function () {
    expect(multiply([-1, 2], [-3, 4])).toEqual(408);
  });

  it("should multiply a negative number with zero", function () {
    expect(multiply([-1, 2], [0])).toEqual(0);
  });

  it("should multiply a negative number with one", function () {
    expect(multiply([-1, 2], [1])).toEqual(-12);
  });

  it("should multiply two negative numbers with different lengths", function () {
    expect(multiply([-1, 2], [-3, 4, 5])).toEqual(4140);
  });
});
