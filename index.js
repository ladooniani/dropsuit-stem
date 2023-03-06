//#region Info

/**
 * @file <h3>DropSuit</h3>
 * <p>
 *   DropSuit is a JavaScript(ES6) and Node.js(v14.x) module library
 *   created by Lado Oniani that offers a diverse collection of functions
 *   for natural language processing (NLP) and data manipulation.
 *   It provides a curated collection of original and classic techniques and methods
 *   for tasks such as text analysis, language understanding and generation,
 *   as well as for data manipulation tasks. Additionally,
 *   it includes unique tools and features for chatbot dialog flow logic
 *   and other specific use cases.
 *   The library is open-source and available under the Apache License 2.0.
 *   Whether you're a researcher, developer, or data scientist,
 *   DropSuit offers a range of tools to enhance your work,
 *   with a focus on diversity and experimentation.
 * </p>
 * @author Lado Oniani
 * {@link https://github.com/ladooniani GitHub}
 * @see mailto:ladooniani@gmail.com
 * @version 1.0.0
 * @see https://github.com/ladooniani/DropSuit#readme
 * @copyright 2016-2023 Lado Oniani - DropSuit. All Rights Reserved.
 * @license Apache License 2.0
 */

//#endregion

//#region  Constructor

function Constructor(type, base, dsout) {
  this.type = type;
  this.base = base;
  this.dsout = dsout;
}

//#endregion

//#region stem

/**
 * Prototype function for stemming words.
 * @function stem
 * @description Processes a string or array of strings, stemming each word in the input.
 * @param {(string|array)} input - The input string or array of strings to be stemmed.
 * @returns {object} Processing options including the stemmed array of words.
 */

Constructor.prototype.stem = function (input) {
  let out = stem_f(input, this.type, this.base, this.dsout);
  return out;
};

//#endregion

//#region stem_f

//#region import and variables

const dropsuit_clnstr = require("../dropsuit-clnstr/index.js");
var ds_clnstr = new dropsuit_clnstr(null, false);

const dropsuit_tok = require("../dropsuit-tok/index.js");
let dstok = new dropsuit_tok(null, false);

//#region Stem

/**
 * Stemming function.
 * @param {(string|array)} input - The input string or array of strings to be stemmed.
 * @param {number} type - Specifies whether to differentiate short roots or not.
 *      - 0: Differentiate short roots (e.g., "Cars" becomes "Car" and "Caring" becomes "Caring").
 *      - 1: Do not differentiate short roots (e.g., "Cars" and "Caring" both become "Car").
 * @param {boolean} base - Specifies whether to process an input array of strings with load from the input array
 *      and save the data file or to process an input string with load from the data file and not save the data file.
 *      - true: Process input array of strings with load from the input array and save the data file.
 *      - false: Process input string with load from the data file and don't save the data file.
 * @param {boolean} dispout - Specifies whether to display processing output results in terminal.
 *      - true: Display processing output results in terminal.
 *      - false: Do not display processing output results in terminal.
 * @returns {object} An object containing the input and output data, as well as the options used for processing.
 * @example stem_f(array|string, number, boolean, boolean)
 */

function stem_f(input, type, base, dispout) {
  let result = loadData(base);
  input = defineInput(input, base);
  let rootEqualityScoreOutput = rootEqualityScore(input);
  let selectAndCutByScoresOutput = selectAndCutByScores(
    rootEqualityScoreOutput, /// Score Count
    input
  );
  let selectAndCutByScoresOutput_p;
  if (base == false) {
    selectAndCutByScoresOutput_p = result[0]; /// Load Roots
  } else {
    selectAndCutByScoresOutput_p = selectAndCutByScoresOutput[0];
  }

  let extractShortRootOutput = extractShortRoot(
    input,
    selectAndCutByScoresOutput_p
  ); /// Short Roots

  if (base == false) {
    extractShortRootOutput = result[1]; /// Load Short Roots
  }
  let extractSuffixEndingsOutput;
  if (base == true) {
    extractSuffixEndingsOutput = extractSuffixEndings(input);
  }
  if (base == false) {
    extractSuffixEndingsOutput = result[2]; /// Load Endings
  }

  let extractNonRootableOutput = extractNonRootable(input); /// Non Rootables
  let replaceToAvailableRootOutput = replaceToAvailableRoot(
    type, /// Type of processing
    selectAndCutByScoresOutput_p, /// Roots
    extractShortRootOutput, /// Shot Roots
    extractSuffixEndingsOutput, /// Suffix endings
    input
  );

  saveData(
    base,
    selectAndCutByScoresOutput_p,
    extractShortRootOutput,
    extractSuffixEndingsOutput
  );

  let output = stemObject(
    extractNonRootableOutput, ///  Non Rootables
    extractSuffixEndingsOutput, /// Suffix endings
    extractShortRootOutput, ///  Short Roots
    selectAndCutByScoresOutput[1], /// Score
    selectAndCutByScoresOutput_p, /// Roots
    replaceToAvailableRootOutput, /// Stemming
    type, /// Type of processing
    dispout
  );

  display(
    output,
    type, /// Type of processing
    dispout
  );
  return output;
}

function stemObject(
  extractNonRootableOutput, ///  Non Rootables
  extractSuffixEndingsOutput, /// Suffix endings
  extractShortRootOutput, ///  Short Roots
  score, /// Score
  extractedRoots, /// Roots
  replaceToAvailableRootOutput, /// Stemming
  type /// Type of processing
) {
  const object = {
    unrootable: extractNonRootableOutput,
    suffix_end: extractSuffixEndingsOutput,
    root_score: score,
    short_root: extractShortRootOutput,
    roots: extractedRoots,
    stemming: replaceToAvailableRootOutput,
    unroot: function () {
      return this.unrootable;
    },
    ends: function () {
      return this.suffix_end;
    },
    score: function () {
      return this.root_score;
    },
    short: function () {
      return this.short_root;
    },
    root: function (type) {
      return this.roots;
    },
    stem: function () {
      return this.stemming;
    },
  };
  return object;
}

//#endregion

//#region Prefix Equality Score Count

/*
 * ["technically", "techniques", "technically"] and ["tech", "techno"]
 * Result:  ["techni", "tech"]
 */

function rootEqualityScore(wordsArray) {
  wordsArray = dstok.tok(wordsArray, 0).tokArr();
  let rootEqualScore = [];
  for (let w = 0; w < wordsArray.length; w++) {
    for (let s = 0; s < wordsArray.length; s++) {
      let word1 = wordsArray[w];
      let word2 = wordsArray[s];
      if (word1.length > 3 && word2.length > 3) {
        let equalPartSize = 3;
        let isLimit = limitSize(word1, word2, equalPartSize);
        if (isLimit == true) {
          if (word1 !== word2) {
            let count = 0;
            let A, B;
            let wordCharA = wordsArray[w].split("");
            let wordCharB = wordsArray[s].split("");
            for (let a = 0; a < wordCharA.length; a++) {
              A = wordCharA[a];
              B = wordCharB[a];
              if (B == A) {
                count++;
              } else {
                /// c~00 Brake count to avoid case: 'pro(f)ess-or' and 'pro(c)ess' otherwise will be equal to 6
                break;
              }
            }
            if (count > 1) {
              rootEqualScore.push([wordsArray[w], wordsArray[s], count]);
            }
          }
        }
      }
    }
  }

  //let output = selectAndCutByScores(prefixEqualScore, wordsArray);
  //console.log("c~00 Output: (Prefix Equality Score:", output, ") 00^");
  // output = replaceToAvailableRoot(output, passArray);
  return rootEqualScore;
}

function limitSize(a, b, equalPartSize) {
  var alc = a.substr(a.length - 1);
  if (a.length <= 4 && b.length <= 4) {
    if (a.length > b.length && alc != "s") {
      equalPartSize = a.length;
    } else {
      equalPartSize = b.length;
    }
  }
  let A = "";
  let B = "";
  for (let i = 0; i < equalPartSize; i++) {
    A += a.charAt(i);
    B += b.charAt(i);
  }
  return A === B;
}

function selectAndCutByScores(collector, wordsArray) {
  wordsArray = dstok.tok(wordsArray, 0).tokArr();
  let temp = [];
  let result = [];
  let score = {};
  for (let w = 0; w < wordsArray.length; w++) {
    let scoreSize = 0;
    for (let c = 0; c < collector.length; c++) {
      let actualWord = wordsArray[w];
      let innerArray = collector[c];
      let tagWord = innerArray[0];
      let getWord = innerArray[1];
      let equalSz = innerArray[2];
      if (actualWord === tagWord && equalSz > 3) {
        if (equalSz > scoreSize) {
          if (!temp.includes(tagWord)) {
            // && !temp.includes(getWord)) {
            temp.push(getWord);
            temp.push(tagWord);
            scoreSize = equalSz;
            let tag = tagWord.slice(0, scoreSize);
            let get = getWord.slice(0, scoreSize);
            if (tag === get) {
              if (!result.includes(tag)) {
                result.push(tag);
                score[tagWord + "-" + getWord + "=" + tag.toUpperCase()] =
                  scoreSize;
              }
            }
          }
        }
      }
    }
  }

  return [result, score];
}

//#endregion

//#region Replace To Available Root

function replaceToAvailableRoot(
  type,
  roots,
  shortroots,
  suffixendings,
  corpusArray
) {
  roots = [].concat(...roots, ...shortroots);
  roots = roots.sort((a, b) => b.length - a.length);
  for (let i = 0; i < corpusArray.length; i++) {
    let cleanStr = ds_clnstr.clnstr(corpusArray[i]).txt();
    let words = cleanStr.split(" ");
    for (let j = 0; j < words.length; j++) {
      let word = words[j];
      for (let k = 0; k < roots.length; k++) {
        let root = roots[k];
        if (root !== word && word.includes(root)) {
          let regex = new RegExp("\\b" + root + "\\w*\\b", "gi");
          let match = word.match(regex);
          if (match && !(roots.includes(match[0]) && match[0] !== root)) {
            if (root.length < 4) {
              let containsRoot = false;
              for (let r = 0; r < roots.length; r++) {
                let actRoot = roots[r];
                if (actRoot !== root && match[0].includes(actRoot)) {
                  containsRoot = true;
                  break;
                }
              }
              if (!containsRoot) {
                if (type == 0) {
                  // cars=car | caring=caring
                  for (let e = 0; e < suffixendings.length; e++) {
                    const combination = root.trim() + suffixendings[e].trim();
                    const matchStr = match[0].trim();
                    if (matchStr == combination) {
                      words[j] = word.replace(match[0], combination);
                      break;
                    } else {
                      words[j] = word.replace(match[0], root);
                    }
                  }
                } else if (type == 1) {
                  // cars=car | caring=car
                  words[j] = word.replace(match[0], root);
                }
              }
            } else {
              words[j] = word.replace(match[0], root);
            }
          }
        }
      }
    }
    corpusArray[i] = words.join(" ");
  }
  return corpusArray;
}

//#endregion

//#region Extract Root

function extractShortRoot(CorpusArray, ExistRoots) {
  let skipWord = setAvoidWords();
  CorpusArray = dstok.tok(CorpusArray, 1).tokArr();
  let extractRoots = []; // let non_extract = []
  for (let i = 0; i < CorpusArray.length; i++) {
    for (let j = 0; j < CorpusArray.length; j++) {
      if (i !== j && CorpusArray[j].includes(CorpusArray[i])) {
        if (CorpusArray[i].length > 2) {
          if (
            !ExistRoots.includes(CorpusArray[i]) &&
            !skipWord.includes(CorpusArray[i]) &&
            CorpusArray[i].length < 4
          ) {
            extractRoots.push(CorpusArray[i]);
          }
        } // else { non_extract.push(CorpusArray[i]); }
        break;
      }
    }
  }
  // let output = replaceToAvailableRoot(extractRoots, passArray);
  return extractRoots; // return [extract, non_extract];
}

function setAvoidWords() {
  const getList = require("./skipword.js");
  let skipWords = getList.avoidWords();
  return skipWords;
}
//#endregion

//#region Extract Non-Rootable Words (SEMI-USED)

function extractNonRootable(corpus) {
  corpus = dstok.tok(corpus, 0).tokArr();
  const roots = []; // const non_roots = [];
  for (let i = 0; i < corpus.length; i++) {
    let isRoot = true;
    for (let j = 0; j < corpus.length; j++) {
      if (
        i !== j &&
        (corpus[j].includes(corpus[i]) || corpus[i].includes(corpus[j]))
      ) {
        isRoot = false;
        break;
      }
    }
    if (isRoot) {
      roots.push(corpus[i]);
    } // else { non_roots.push(corpus[i]); }
  }
  return roots; // return [roots, non_roots];
}

//#endregion

//#region Extract Endings Suffixes

//#region Extract suffix

function extractSuffixEndings(wordsArray) {
  let shorts = wordsArray
    .join(" ")
    .split(/\W+/)
    .filter((word) => word.length <= 2);
  wordsArray = dstok.tok(wordsArray, 0).tokArr();
  const suffixes = {};
  const result = [];
  for (let i = 0; i < wordsArray.length; i++) {
    const word = wordsArray[i];
    for (let j = 2; j <= 5 && j <= word.length; j++) {
      if (word.length > 4) {
        const suffix = word.slice(-j);
        if (suffixes[suffix]) {
          if (!result.includes(suffix) && !shorts.includes(suffix)) {
            result.push(suffix);
          }
          delete suffixes[suffix];
        }
      }
    }
    for (let j = 2; j <= 3 && j <= word.length; j++) {
      const suffix = word.slice(-j);
      suffixes[suffix] = true;
    }
  }

  return result;
}

//#endregion

//#endregion

//#region load data

const fs = require("fs");
const path = require("path");

function loadData(base) {
  if (base == false) {
    // false = load from the file and dont save the file
    const filePath = path.join(__dirname, "data", "data.json");
    if (fs.existsSync(filePath)) {
      try {
        const jsonData = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(jsonData);
        roots = data.roots;
        short_roots = data.short_roots;
        endings = data.endings;
        let load = [roots, short_roots, endings];
        console.log(load);
        return load;
      } catch (err) {
        console.error("Error reading data.json file:", err);
      }
    } else {
      console.warn("Warn: data.json file does not exist.");
    }
  } else {
    return false;
  }
}
function saveData(base, rootsarr, shortrootsarr, endingsarr) {
  if (base == true) {
    let roots, short_roots, endings;

    if (
      rootsarr &&
      shortrootsarr &&
      endingsarr &&
      Array.isArray(rootsarr) &&
      Array.isArray(shortrootsarr) &&
      Array.isArray(endingsarr)
    ) {
      roots = rootsarr;
      short_roots = shortrootsarr;
      endings = endingsarr;
      // Create directory to store the file if it doesn't exist
      const dirPath = path.join(__dirname, "data");
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }

      // Check if data.json file exists
      const filePath = path.join(dirPath, "data.json");
      if (!fs.existsSync(filePath)) {
        // Create and save data.json file with keys and values for each list
        const data = {
          roots: roots,
          short_roots: short_roots,
          endings: endings,
        };
        const jsonData = JSON.stringify(data);
        fs.writeFileSync(filePath, jsonData, "utf-8");
      } else {
        // Overwrite data.json file with new inputs
        const data = {
          roots: roots,
          short_roots: short_roots,
          endings: endings,
        };
        const jsonData = JSON.stringify(data);
        fs.writeFileSync(filePath, jsonData, "utf-8");
      }
    }
  }
}

//#endregion

//#region Accessory

function defineInput(input, base) {
  let aos = arrStrChecker(input);
  if (base == false && aos != "array") {
    input = [input];
  } else if (base == true && aos == "string") {
    input = [input];
  }
  return input;
}

function arrStrChecker(inputdtwords) {
  let isArray = arrChecker(inputdtwords);
  var isString = stringChecker(inputdtwords);
  if (isString == true) {
    return "string";
  } else if (isArray == true) {
    return "array";
  }
}

function arrChecker(array) {
  const result = Array.isArray(array);
  if (result) {
    return true;
  } else {
    return false;
  }
}

function stringChecker(string) {
  if (typeof string === "string") {
    return true;
  } else {
    return false;
  }
}

//#endregion

//#region console log

const getdt = require("./infodt.js");
let fnctit = getdt.displayInfoData();
const line = fnctit.line;
var description = fnctit.descript;

function display(output, type, dispout) {
  if (dispout == true) {
    let tp;
    if (type == 0) {
      tp =
        "Option Property Argument (" +
        type +
        ") value Condition:\n\n- Differentiate Short Roots -";
    } else if (type == 1) {
      tp =
        "Option Property Argument (" +
        type +
        ") value Condition:\n\n- Do Not Differentiate Short Roots -";
    }
    console.log(description, "\n", tp, "\n\nOutput:", output, "\n", line);
  }
}

//#endregion

//#region Export Module Constructor

module.exports = Constructor;

//#endregion
