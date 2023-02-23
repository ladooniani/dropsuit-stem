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

function Constructor(onbase, filter, dsout) {
  this.filter = filter;
  this.onbase = onbase;
  this.dsout = dsout;
}

//#endregion

//#region stem

/**
 * @function stem
 * @description - stem(null/string/array, 0, 0)
 * function - Stemming words. Processes function direct string/array
 * input or using NULL returns default object instance key value (req_arr: requests).
 * @param {(string|array)} [input=null] input - Input string/array.
 * @param {number} serchtype - Argument (0) seraches by 'program', (1) searches by 'progra-m'
 * @param {number} returntype - Argument (0) returns 'program', (1) returns 'progra-m'
 * @param {boolean} singlechar -  Set to true to include single characters
 * in the stemmed output preprocessing, or false to exclude them. This provides a processing option
 * using JSON data as the base of words for the stemming algorithm.
 * @returns {array} - Stemmed array of words.
 */

Constructor.prototype.stem = function (
  input,
  serchtype,
  returntype,
  singlechar
) {
  // input = objOrFncInp(input, this.input);
  let out = stem_f(
    input,
    serchtype,
    returntype,
    singlechar,
    this.onbase,
    this.filter,
    this.dsout
  );
  return out;
};

//#endregion

//#region stem_f

const dropsuit_clnstr = require("../dropsuit-clnstr/index.js");
var ds_clnstr = new dropsuit_clnstr(null, false);

const dropsuit_tok = require("../dropsuit-tok/index.js");
let dstok = new dropsuit_tok(null, false);

let arrPass = [];
let cont;

/**
 * Stemming.
 * @param {(string|array)} [input=null] input - Input string/array
 * or using NULL returns default object instance key value (req_arr: requests).
 * @param {number} serchtype - (0) seraches by 'program', (1) searches by 'progra-m'
 * @param {number} returntype - (0) returns 'program', (1) returns 'progra-m'
 * @param {boolean} singlechar -  Set to true to include single characters
 * in the stemmed output preprocessing, or false to exclude them. This provides a processing option
 * using JSON data as the base of words for the stemming algorithm.
 * @param {(object|array)} onbase - An object containing the requests and responses data from the intents.json file.
 * This data will be used for stemming the words in the input sentence.
 * @param {number} filter - Return option parameter arguments (0) keep duplicate (1) remove duplicate.
 * @param {boolean} dispout - (true/false) Display processing output results in terminal.
 * @returns {array} - Stemmed array of words.
 * @example stem_f(array, number, number, boolean)
 */

function stem_f(
  input,
  serchtype,
  returntype,
  singlechar,
  onbase,
  filter,
  dispout
) {
  arrPass = [];
  let groupArr = [];
  let arrTemp = [];
  serchtype = checkType(serchtype, 1);
  returntype = checkType(returntype, 1);
  let aos = arrStrChecker(input);
  let base = defineInput(input, filter, aos);
  onbase = onBase(onbase, base);
  onbase = onbase.sort((a, b) => a.length - b.length);
  for (let i = 0; i < onbase.length; i++) {
    arrTemp = [];
    let inp;
    for (let o = 0; o < onbase.length; o++) {
      if (onbase[i].length > 1) {
        if (serchtype == 0) {
          inp = onbase[i];
        } else if (serchtype == 1) {
          inp = onbase[i].slice(0, -1);
        }
        let inputWordChars = inp.split("");
        let arrayWordChars = onbase[o].split("");
        let count = 0;
        for (let s = 0; s < inputWordChars.length; s++) {
          if (inputWordChars[s] == arrayWordChars[s]) {
            count++;
          }
        }
        if (count >= inputWordChars.length) {
          if (!arrPass.includes(onbase[o])) {
            arrTemp.push(onbase[o]);
          }
        }
      }
    }
    if (arrTemp.length !== 0) {
      arrPass = arrPass + arrTemp;
      if (returntype == 1) {
        arrTemp.push(onbase[i].slice(0, -1));
      }
      groupArr.push(arrTemp);
    }
  }
  let out = getShortFromArr(groupArr, singlechar);
  let stemInput = [];
  for (let i = 0; i < base.length; i++) {
    cont = 0;
    for (let b = 0; b < out.length; b++) {
      const fc1 = base[i].charAt(0);
      const fc2 = out[b].charAt(0);
      if (fc1 == fc2) {
        if (isSubstring(base[i], out[b])) {
          let isSng = isSingleCharacter(out[b]);
          if (cont == 0) {
            if (isSng == true) {
              stemInput.push(out[b]);
              cont = 1;
            } else {
              stemInput.push(base[i]);
              cont = 1;
            }
          }
        }
      }
    }
  }

  display(
    base,
    stemInput,
    filter,
    returntype,
    serchtype,
    singlechar,
    input,
    aos,
    dispout
  );
  return stemInput;
}

function isSingleCharacter(value) {
  let length = value.length;
  if (length <= 2) {
    return false;
  } else {
    return true;
  }
}

function onBase(onbase, base) {
  let out;
  if (onbase != null) {
    const baseArr = Object.values(onbase).flat();
    const baseComb = [].concat(...baseArr, ...base);
    out = dstok.tok(baseComb, 1).tokArr();
  }
  if (onbase == null) {
    out = dstok.tok(base, 1).tokArr();
  }
  return out;
}

function isSubstring(str, substr) {
  for (let i = 0; i < str.length; i++) {
    let match = true;
    for (let j = 0; j < substr.length; j++) {
      if (str[i + j] !== substr[j]) {
        match = false;
        break;
      }
    }
    if (match) {
      return true;
    }
  }
  return false;
}

function getShortFromArr(groupArr, singlechar) {
  let shortsArr = [];
  for (let i = 0; i < groupArr.length; i++) {
    let out = groupArr[i].reduce((a, b) => (a.length <= b.length ? a : b));
    shortsArr.push(out);
  }
  if (singlechar == false) {
    shortsArr = shortsArr.filter((str) => str.length > 1);
  }
  shortsArr = dstok.tok(shortsArr, 1).tokArr();
  return shortsArr;
}

function defineInput(input, filter, aos) {
  let out;
  if (aos == "string") {
    out = ds_clnstr.clnstr(input).txt();
    var outArr = out.split(" ");
    out = dstok.tok(outArr, filter).tokArr();
  } else if (aos == "array") {
    out = dstok.tok(input, filter).tokArr();
  }
  return out;
}

function checkType(type, range) {
  if (range == 1) {
    if (type == 0 || type == 1) {
      return type;
    } else {
      return (type = 0);
    }
  }
  if (range == 2) {
    if (type == 0 || type == 1 || type == 2) {
      return type;
    } else {
      return (type = 0);
    }
  }
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

function display(
  base,
  stemInput,
  filter,
  returntype,
  serchtype,
  singlechar,
  input,
  aos,
  dispout
) {
  let tp1, tp2, tp3, filtr;
  if (returntype == 0) {
    tp1 = "PROGRAM";
  } else if (returntype == 1) {
    tp1 = "PROGRA-M";
  }

  if (serchtype == 0) {
    tp2 = "PROGRAM";
  } else if (serchtype == 1) {
    tp2 = "PROGRA-M";
  }

  if (singlechar == false) {
    tp3 = "- Exclude";
  } else if (singlechar == true) {
    tp3 = "- Include";
  }

  if (filter == 0) {
    filtr =
      "\n\nInput Array Size: (" +
      base.length +
      ") Condition: (" +
      filter +
      ") - Keep duplicate:\n\n";
  } else if (filter == 1) {
    filtr =
      "\n\nInput Array Size: (" +
      base.length +
      ") Condition: (" +
      filter +
      ") - Remove duplicate:\n\n";
  }
  if (dispout == true) {
    console.log(
      description,
      "\n\nInput type (",
      aos.toUpperCase(),
      "):\n\n",
      input,
      "\n\nSingle Char: (",
      singlechar,
      ")",
      tp3,
      "\nSearch type condition: (",
      serchtype,
      ") -->",
      tp2,
      "\nReturn type condition: (",
      returntype,
      ") <--",
      tp1,
      filtr,
      base,
      "\n\nStemming Array Size: (" +
        stemInput.length +
        ") condition (" +
        serchtype +
        returntype +
        "):\n\n",
      stemInput,
      "\n",
      line
    );
  }
}

//#endregion

//#region Export Module Constructor

module.exports = Constructor;

//#endregion
