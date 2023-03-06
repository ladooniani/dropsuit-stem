//#region stem test

const assert = require("assert");
const dropsuit_stem = require("../index.js");

//#region Testing data

let inputCorpusArray = [
  "tech",
  "As programmers program programs programmatically with programming languages, using a language stem and stemming techniques to use the stemmed data technically.",
  "Programmers love to program rubber ducks into their programs as a debugging tool, but when it comes to programming chess-playing programs, they need to be blue to win and be winner.",
  "The linguistics professor and other professors professorial study and professional profesion would be teaching his students about the process and processor of stemming showing the how to reduce words to roots like",
  "begin begins beginning and change changing changings eat eats eater eating where accept accepted but not accepts unacceptable where regular regularly  must be different with irregural",
  "as well as car cars with care cares or caring and storing stored store and save saver but still saving to the common root",
];

let expectedInputCorpusArray0 = [
  "tech",
  "as program program program program with program language using a language stem and stem tech to use the stem data tech",
  "program love to program rubber ducks into their program as a debugging tool but when it comes to program chess playing program they need to be blue to win and be win",
  "the linguistics professor and other profes profes stud and profes profes would be teaching his stud about the process and process of stem showing the how to reduce words to root like",
  "begin begin begin and chang chang chang eat eat eater eating where accept accept but not accept unacceptable where regular regular must be different with irregural",
  "as well as car car with care care or caring and stor stor stor and save save but still saving to the common root",
];

let expectedInputCorpusArray1 = [
  "tech",
  "as program program program program with program language using a language stem and stem tech to use the stem data tech",
  "program love to program rubber ducks into their program as a debugging tool but when it comes to program chess playing program they need to be blue to win and be win",
  "the linguistics professor and other profes profes stud and profes profes would be teaching his stud about the process and process of stem showing the how to reduce words to root like",
  "begin begin begin and chang chang chang eat eat eat eat where accept accept but not accept unacceptable where regular regular must be different with irregural",
  "as well as car car with care care or car and stor stor stor and save save but still saving to the common root",
];

let inputWordStr = "programming";
let expectedOutput = ["program"];
//#endregion

describe("dropsuit-stem", () => {
  describe("stem()", () => {
    it("Stemmed sentences array option (0) or (1), True", () => {
      let dsstem0 = new dropsuit_stem(0, true, true);
      let inputCorpusArrayOutput0 = dsstem0.stem(inputCorpusArray).stem();
      assert.deepEqual(inputCorpusArrayOutput0, expectedInputCorpusArray0);
    });
    it("Stemmed sentences array option (0) or (1) False", () => {
      // let dsstem0 = new dropsuit_stem(0, false, true);
      // let inputSentenceStrOutput0 = dsstem0.stem(inputWordStr).stem();
      // assert.deepEqual(expectedOutput, inputSentenceStrOutput0);
    });
  });
});

//#endregion
