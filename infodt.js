//#region Dysplay info data

function displayInfoData() {
  const liblink =
    "DropSuit: https://github.com/ladooniani/DropSuit#readme\n" +
    "Copyright © 2016-" +
    getYear() +
    " Lado Oniani - DropSuit. All Rights Reserved.\n\n";
  const libName = "DropSuit NLP module library function:\n";
  const line =
    "\n———————————————————————————————————————————————————————————\n\n";
  const divider =
    "\n-----------------------------------------------------------\n";
  const libraryInformation = line + liblink + libName;
  const functionDescription = `${libraryInformation}
  stem(null/string-array, integer, integer, boolean)
  Input: 
    string-array: Input 'myInputString/Array', 
                  or keep NULL to process constructor (req_arr: requests).
    integer: Argument (0) searches by 'program', (1) searches by 'progra-m'
    integer: Argument (0) returns 'program', (1) returns 'progra-m'
    boolean: Value (true or false) to specify whether to include or exclude 
                  single characters for preprocessing.

  Output: 
    Stemmed array of words.
  ${divider}`;

  const displayInfoData = {
    descript: functionDescription,
    line: line,
  };

  return displayInfoData;
}

function getYear() {
  return new Date().getFullYear();
}

//#endregion

//#region Modules

module.exports = {
  displayInfoData,
};

//#endregion
