//#region stem test

const assert = require("assert");
const dropsuit_stem = require("../index.js");

//#region Testing data

let testArray = [
  "hello world of worlds how are you",
  "programming",
  "programmers",
  "program",
  "programs",
  "programmer",
  "programming",
  "programmers",
  "change",
  "changing",
  "changes",
  "changed",
  "changer",
  "eating",
  "eats",
  "car",
  "care",
  "caring",
  "eat",
  "eater",
  "eating",
  "start",
  "starting",
];
let expected_output_stem_00 = [
  "of",
  "how",
  "are",
  "you",
  "car",
  "eat",
  "hello",
  "world",
  "start",
  "change",
  "program",
  "changing",
];

let expected_output_stem_10 = [
  "of",
  "how",
  "are",
  "you",
  "car",
  "eat",
  "hello",
  "world",
  "start",
  "change",
  "program",
];

let expected_output_stem_01 = [
  "o",
  "ho",
  "ar",
  "yo",
  "ca",
  "ea",
  "hell",
  "worl",
  "star",
  "chang",
  "progra",
  "changin",
];

let expected_output_stem_11 = [
  "o",
  "ho",
  "ar",
  "yo",
  "ca",
  "ea",
  "hell",
  "worl",
  "star",
  "chang",
  "progra",
];

//#endregion

describe("dropsuit-stem", () => {
  describe("stem()", () => {
    it("should return the stemmed words array with parameter arguments 0, 0", () => {
      let dsstem = new dropsuit_stem(testArray, true);
      let stem_output = dsstem.stem(null, 0, 0);
      assert.deepEqual(stem_output, expected_output_stem_00);
      /// console.log('\nOutput stem(null, 0, 0):',stem_output, '\n');
    });
    it("should return the stemmed words array with parameter arguments 1, 0", () => {
      let dsstem = new dropsuit_stem(testArray, true);
      let stem_output = dsstem.stem(null, 1, 0);
      assert.deepEqual(stem_output, expected_output_stem_10);
      /// console.log('\nOutput stem(null, 1, 0):',stem_output, '\n');
    });
    it("should return the stemmed words array with parameter arguments 0, 1", () => {
      let dsstem = new dropsuit_stem(testArray, true);
      let stem_output = dsstem.stem(null, 0, 1);
      assert.deepEqual(stem_output, expected_output_stem_01);
      /// console.log('\nOutput stem(null, 0, 1):',stem_output, '\n');
    });
    it("should return the stemmed words array with parameter arguments 1, 1", () => {
      let dsstem = new dropsuit_stem(testArray, true);
      let stem_output = dsstem.stem(null, 1, 1);
      assert.deepEqual(stem_output, expected_output_stem_11);
      /// console.log('\nOutput stem(null, 1, 1):',stem_output, '\n');
    });
  });
});

//#endregion
