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

//#region Include required usage import

const fs = require("fs");

//#endregion

//#region  json load

function jsonIntStrct(path) {
  var data = fs.readFileSync(path, "utf8"); // fs.readFile("assets/json/test1.json", "utf8", function (err, data) { if (err) throw err; ... });
  const file = JSON.parse(data);
  var requests = file.intents.map(({ requests }) => requests);
  var tags = file.intents.map(({ tag }) => tag);
  var responses = file.intents.map(({ responses }) => responses);
  const obj = {
    req_arr: requests,
    res_arr: responses,
    tag_arr: tags,
  };
  return obj;
}

//#endregion

//#region Modules

module.exports = {
  jsonIntStrct,
};

//#endregion
