//#region stem test

const assert = require("assert");
const dropsuit_stem = require("../index.js");
const json_data = require("../jsobj.js");
const localFile = "./test/intents.json";
let intentData = json_data.jsonIntStrct(localFile);

//#region Testing data

let expected_output_stem_00 = [
  "hi",
  "language",
  "for",
  "beginner",
  "program",
  "recommend",
  "language",
  "for",
  "new",
  "program",
  "program",
  "program",
];

let expected_output_stem_01 = [
  "hi",
  "languag",
  "for",
  "beginner",
  "progra",
  "recommen",
  "languag",
  "for",
  "new",
  "progra",
  "progra",
  "progra",
];

let expected_output_stem_10 = [
  "hi",
  "language",
  "for",
  "beginner",
  "program",
  "recommend",
  "language",
  "for",
  "new",
  "program",
  "program",
  "program",
];

let expected_output_stem_11 = [
  "hi",
  "languag",
  "for",
  "beginner",
  "progra",
  "recommen",
  "languag",
  "for",
  "new",
  "progra",
  "progra",
  "progra",
];

let input =
  "hi, language for beginner programmers recommended languages for new programmers programming program?";

//#endregion

describe("dropsuit-stem", () => {
  describe("stem()", () => {
    it("should return the stemmed words array with parameter arguments 0, 0", () => {
      let dsstem = new dropsuit_stem(intentData, 0, true);
      let stem_output = dsstem.stem(input, 0, 0, true);
      assert.deepEqual(stem_output, expected_output_stem_00);
      console.log("\nOutput stem(null, 0, 0):", stem_output, "\n");
    });
    it("should return the stemmed words array with parameter arguments 1, 0", () => {
      let dsstem = new dropsuit_stem(intentData, 0, true);
      let stem_output = dsstem.stem(input, 1, 0, true);
      assert.deepEqual(stem_output, expected_output_stem_10);
      /// console.log('\nOutput stem(null, 1, 0):',stem_output, '\n');
    });
    it("should return the stemmed words array with parameter arguments 0, 1", () => {
      let dsstem = new dropsuit_stem(intentData, 0, true);
      let stem_output = dsstem.stem(input, 0, 1, true);
      assert.deepEqual(stem_output, expected_output_stem_01);
      /// console.log('\nOutput stem(null, 0, 1):',stem_output, '\n');
    });
    it("should return the stemmed words array with parameter arguments 1, 1", () => {
      let dsstem = new dropsuit_stem(intentData, 0, true);
      let stem_output = dsstem.stem(input, 1, 1, true);
      assert.deepEqual(stem_output, expected_output_stem_11);
      /// console.log('\nOutput stem(null, 1, 1):',stem_output, '\n');
    });
  });
});

//#endregion
