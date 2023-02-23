[<img alt="TAI Lab." width="59px" src="https://github.com/ladooniani/tailab/blob/master/assets/tai_lab_terbinari_cbm_project_logo.png" />](https://github.com/ladooniani/dropsuit#readme)

[![npm version](https://img.shields.io/npm/v/dropsuit-stem.svg?style=flat)](https://www.npmjs.com/package/dropsuit-stem) [![npm](https://img.shields.io/npm/dt/dropsuit-stem.svg?style=flat-square)](https://www.npmjs.com/package/dropsuit-stem) [![License](https://img.shields.io/npm/l/dropsuit-stem.svg)](https://www.npmjs.com/package/dropsuit-stem)

# Overview of [DropSuit](https://github.com/ladooniani/dropsuit#readme) NLP and the stem Function

[DropSuit](https://github.com/ladooniani/dropsuit#readme) NLP is an open-source JavaScript and Node.js library offering diverse functions for natural language processing and data manipulation. The stem function is one of its modules, designed for reducing words to their base or root form. It is available under the Apache License 2.0.

## DropSuit NLP Method: A JavaScript and Node.js function for word stemming

The stem function is a part of the DropSuit NLP library, it's a JavaScript and Node.js function that reduces words to their base or root form. It's open-source and available under the Apache License 2.0.

### Installation

Add the library function by installing it via npm:

```
npm install dropsuit-stem
```

### Usage

Import the library in your project:

```
const dropsuit_stem = require("dropsuit-stem");

```

Process [intents.json](https://github.com/ladooniani/dropsuit-stem/blob/main/test/intents.json) using 'jsonIntStrct' function:

```
const json_data = require("dropsuit-stem/jsobj.js");
let intentData = json_data.jsonIntStrct("assets/json/intents.json");

```

This stemmer function utilizes the input data to generate different stemming results based on the provided corpus and does not rely on any external database of words. To enhance the stemming process, you can add an 'array' or an 'intentData' object with all key values, or specify a particular key value such as 'intentData.req_arr' from the [intents.json](https://github.com/ladooniani/dropsuit-stem/blob/main/test/intents.json) file. If no additional data is provided, the function will still perform stemming by using the input's own consistency with respect to the words included in it. Refer to the [tests](https://github.com/ladooniani/dropsuit-stem/blob/main/test/index.test.js) for more information on how to use options for Stemming.

Use the filter parameter to keep or remove duplicates (0 or 1).

Set the boolean parameter to true to display processing results in the terminal:

```
let dsstem = new dropsuit_stem(intentData.req_arr, filter, false);

```

#### stem(input, searchType, returnType, singlechar)

- **input**: Input 'myInputString/Array'.
- **searchType**: Argument (0) searches by 'program', (1) searches by 'progra-m'
- **returnType**: Argument (0) returns 'program', (1) returns 'progra-m'
- **singlechar**: Boolean value (true or false) to specify whether to include or exclude single characters for preprocessing. This provides a processing option using JSON data as the base of words for the stemming algorithm.

#### Output:

- Stemmed array of words.

```
let dsstem_output = dsstem.stem(myInputString, 0, 0, true);
```

Result:

```

Input type ( STRING ):

 hi, language for beginner programmers recommended languages for new programmers programming program?

Single Char: ( true ) - Include
Search type condition: ( 0 ) --> PROGRAM
Return type condition: ( 0 ) <-- PROGRAM

Input Array Size: (12) Condition: (0) - Keep duplicate:

 [
  'hi',          'language',
  'for',         'beginner',
  'programmers', 'recommended',
  'languages',   'for',
  'new',         'programmers',
  'programming', 'program'
]

Stemming Array Size: (12) condition (00):

 [
  'hi',       'language',
  'for',      'beginner',
  'program',  'recommend',
  'language', 'for',
  'new',      'program',
  'program',  'program'
]

```

## Links

- npm: https://www.npmjs.com/package/dropsuit-stem

## Supporting DropSuit

DropSuit is an open-source library and I am dedicated to ensuring its continued development and improvement. If you have any questions, feedback, or encounter any issues, please reach out through the [support via PayPal](https://www.paypal.com/paypalme/dropsuit?country.x=GE&locale.x=en_US), and read more about [support details](https://github.com/ladooniani/dropsuit/blob/main/Support.md).

Your support is crucial for the library's success. You can also contribute to the project by submitting bug reports, feature requests, or by providing feedback. Sharing the library with others who may find it useful and giving it a star on GitHub are also great ways to show your support. Thank you for using DropSuit!

## License

[Apache License 2.0](LICENSE.txt)
