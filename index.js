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

function Constructor(inputObj, dsout) {
  this.inputObj = inputObj;
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
 * @returns {array} - Stemmed array of words.
 */

Constructor.prototype.stem = function (input, serchtype, returntype) {
  input = objOrFncInp(input, this.inputObj);
  let out = stem_f(input, serchtype, returntype, this.dsout);
  return out;
};

//#endregion

//#region stem_f

const dropsuit_clnstr = require("../dropsuit-clnstr/index.js");
var ds_clnstr = new dropsuit_clnstr(null, false);

const dropsuit_tok = require("../dropsuit-tok/index.js");
let dstok = new dropsuit_tok(null, false);

let arrPass = [];

/**
 * Stemming.
 * @param {(string|array)} [input=null] input - Input string/array
 * or using NULL returns default object instance key value (req_arr: requests).
 * @param {number} serchtype - (0) seraches by 'program', (1) searches by 'progra-m'
 * @param {number} returntype - (0) returns 'program', (1) returns 'progra-m'
 * @param {boolean} dispout - (true/false) Display processing output results in terminal.
 * @returns {array} - Stemmed array of words.
 * @example stem_f(array, number, number, boolean)
 */

function stem_f(input, serchtype, returntype, dispout) {
  arrPass = [];
  let groupArr = [];
  let arrTemp = [];
  serchtype = checkType(serchtype, 1);
  returntype = checkType(returntype, 1);
  let aos = arrStrChecker(input);
  let inputout = defineInput(input, aos);
  inputout = inputout.sort((a, b) => a.length - b.length);
  for (let i = 0; i < inputout.length; i++) {
    arrTemp = [];
    let inp;
    for (let o = 0; o < inputout.length; o++) {
      if (inputout[i].length > 1) {
        if (serchtype == 0) {
          inp = inputout[i];
        } else if (serchtype == 1) {
          inp = inputout[i].slice(0, -1);
        }
        let inputWordChars = inp.split("");
        let arrayWordChars = inputout[o].split("");
        let count = 0;
        for (let s = 0; s < inputWordChars.length; s++) {
          if (inputWordChars[s] == arrayWordChars[s]) {
            count++;
          }
        }
        if (count >= inputWordChars.length) {
          if (!arrPass.includes(inputout[o])) {
            arrTemp.push(inputout[o]);
          }
        }
      }
    }
    if (arrTemp.length !== 0) {
      arrPass = arrPass + arrTemp;
      if (returntype == 1) {
        arrTemp.push(inputout[i].slice(0, -1));
      }
      groupArr.push(arrTemp);
    }
  }
  let out = getShortFromArr(groupArr);
  display(groupArr, returntype, serchtype, out, input, aos, dispout);
  return out;
}

function getShortFromArr(groupArr) {
  let shortsArr = [];
  for (let i = 0; i < groupArr.length; i++) {
    let out = groupArr[i].reduce((a, b) => (a.length <= b.length ? a : b));
    shortsArr.push(out);
  }
  return shortsArr;
}

function defineInput(input, aos) {
  let out;
  if (aos == "string") {
    out = ds_clnstr.clnstr(input).txt();
    var outArr = out.split(" ");
    out = dstok.tok(outArr, 1).tokArr();
  } else if (aos == "array") {
    out = dstok.tok(input, 1).tokArr();
  }
  return out;
}

function objOrFncInp(function_input, constructor_input) {
  if (function_input !== "" && function_input !== null) {
    function_input = function_input;
  } else {
    function_input = constructor_input;
  }
  return function_input;
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

function display(groupArr, returntype, serchtype, out, input, aos, dispout) {
  let tp1, tp2;
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
  if (dispout == true) {
    console.log(
      description,
      "\nInput type (",
      aos.toUpperCase(),
      "):\n\n",
      input,
      "\n\nProcess:\n\n",
      groupArr,
      "\n\nSearch type condition: (",
      serchtype,
      ") -->",
      tp2,
      "\nReturn type condition: (",
      returntype,
      ") <--",
      tp1,
      "\n\nStemming output:\n\n",
      out,
      "\n",
      line
    );
  }
}

//#endregion

//#region Export Module Constructor

module.exports = Constructor;

//#endregion
