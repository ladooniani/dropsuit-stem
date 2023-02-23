//#region stem test

const assert = require("assert");
const dropsuit_stem = require("../index.js");
const json_data = require("../jsobj.js");
const localFile = "./test/intents.json";
let intentData = json_data.jsonIntStrct(localFile);

//#region Testing data

let expected_output_stem1_00 = [
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
let expected_output_stem1 = ["programming"];
let expected_output_stem2 = ["program"];
let input1 =
  "hi, language for beginner programmers recommended languages for new programmers programming program?";
let input2 = "programming";

//#endregion

describe("dropsuit-stem", () => {
  describe("stem()", () => {
    it("Stemmed words array with parameter arguments 0, 0", () => {
      let dsstem = new dropsuit_stem(intentData, 0, true);
      let stem_output1 = dsstem.stem(input1, 0, 0, true);
      let stem_output2 = dsstem.stem(input2, 0, 0, true);
      assert.deepEqual(stem_output1, expected_output_stem1_00);
      assert.deepEqual(stem_output2, expected_output_stem1);

      //#region output additional display
      /*
      console.log(
        "\nOutput stem(null, 0, 0) 1:",
        stem_output1,
        "\n2:",
        stem_output2
      );
      */
      //#endregion
    });
    it("Stemmed words array with parameter arguments 1, 0", () => {
      let dsstem = new dropsuit_stem(intentData, 0, true);
      let stem_output1 = dsstem.stem(input1, 1, 0, true);
      assert.deepEqual(stem_output1, expected_output_stem_10);

      //#region output additional display
      /*
      console.log(
        "\nOutput stem(null, 1, 0) 1:",
        stem_output1,
        "\n2:",
        expected_output_stem2
      );
      */
      //#endregion
    });
    it("Stemmed words array with parameter arguments 0, 1", () => {
      let dsstem = new dropsuit_stem(intentData, 0, true);
      let stem_output1 = dsstem.stem(input1, 0, 1, true);
      let stem_output2 = dsstem.stem(input2, 0, 1, true);
      assert.deepEqual(stem_output1, expected_output_stem_01);
      assert.deepEqual(stem_output2, expected_output_stem2);

      //#region output additional display
      /*
      console.log(
        "\nOutput stem(null, 0, 1):",
        stem_output1,
        "\n2:",
        expected_output_stem2
      );
      */
      //#endregion
    });
    it("Stemmed words array with parameter arguments 1, 1", () => {
      let dsstem = new dropsuit_stem(intentData, 0, true);
      let stem_output1 = dsstem.stem(input1, 1, 1, true);
      let stem_output2 = dsstem.stem(input2, 1, 1, true);
      assert.deepEqual(stem_output1, expected_output_stem_11);
      assert.deepEqual(stem_output2, expected_output_stem2);

      //#region output additional display
      /*
      console.log(
        "\nOutput stem(null, 1, 1):",
        stem_output1,
        "\n2:",
        expected_output_stem2
      );
      */
      //#endregion
    });
  });
});

//#endregion
