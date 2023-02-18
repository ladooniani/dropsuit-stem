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

Process  [intents.json](https://github.com/ladooniani/dropsuit-stem/blob/main/test/intents.json)  using 'jsonIntStrct' function:

```
const json_data = require("dropsuit-stem/jsobj.js");
let intentData = json_data.jsonIntStrct("assets/json/intents.json");

```

insert 'testArray' or 'intentData' and set boolean parameter (true/false) argument value to display console log processing results output information in terminal:

```
let dsstem = new dropsuit_stem(intentData.req_arr, false);

```

#### stem(input, searchType, returnType)

- **input**: Input 'myInputString/Array', or keep NULL to process default object instance key value (req_arr: requests).
- **searchType**: Argument (0) searches by 'program', (1) searches by 'progra-m'
- **returnType**: Argument (0) returns 'program', (1) returns 'progra-m'

#### Output:

- Stemmed array of words.

```
let dsstem_output = dsstem.stem(null, 0, 0);
```

Result:

```
Input type ( ARRAY ):

 [
  'hello world of worlds how are you',
  'programming',
  'programmers',
  'program',
  'programs',
  'programmer',
  'programming',
  'programmers',
  'change',
  'changing',
  'changes',
  'changed',
  'changer',
  'eating',
  'eats',
  'car',
  'care',
  'caring',
  'eat',
  'eater',
  'eating',
  'start',
  'starting'
]

Search type condition: ( 0 ) --> PROGRAM
Return type condition: ( 0 ) <-- PROGRAM

Stemming output:

 [
  'of',      'how',
  'are',     'you',
  'car',     'eat',
  'hello',   'world',
  'start',   'change',
  'program', 'changing'
]
```

## Links

- npm: https://www.npmjs.com/package/dropsuit-stem

## Supporting DropSuit

DropSuit is an open-source library and I am dedicated to ensuring its continued development and improvement. If you have any questions, feedback, or encounter any issues, please reach out through the [support via PayPal](https://www.paypal.com/paypalme/dropsuit?country.x=GE&locale.x=en_US), and read more about [support details](https://github.com/ladooniani/dropsuit/blob/main/Support.md).

Your support is crucial for the library's success. You can also contribute to the project by submitting bug reports, feature requests, or by providing feedback. Sharing the library with others who may find it useful and giving it a star on GitHub are also great ways to show your support. Thank you for using DropSuit!

## License

[Apache License 2.0](LICENSE.txt)
#   t e s t t  
 