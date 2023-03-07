[<img alt="TAI Lab." width="39px" src="https://github.com/ladooniani/tailab/blob/master/assets/tai_lab_terbinari_cbm_project_logo.png" />](https://github.com/ladooniani/dropsuit#readme)

<!-- 
[![npm version](https://img.shields.io/npm/v/dropsuit-stem.svg?style=flat)](https://www.npmjs.com/package/dropsuit-stem) [![npm](https://img.shields.io/npm/dt/dropsuit-stem.svg?style=flat-square)](https://www.npmjs.com/package/dropsuit-stem) [![License](https://img.shields.io/npm/l/dropsuit-stem.svg)](https://www.npmjs.com/package/dropsuit-stem)
-->

# Overview of [DropSuit](https://github.com/ladooniani/dropsuit#readme) NLP's stem function for word stemming

[DropSuit](https://github.com/ladooniani/dropsuit#readme)  NLP is an open-source JavaScript and Node.js library that provides a variety of functions for natural language processing and data manipulation. One of these functions is the stem function, which is designed to reduce words to their base or root form. As part of the DropSuit NLP library, the stem function is available under the Apache License 2.0.

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

This Stemmer function uses a context-dependent approach to reduce similar words in a sentence or corpus of documents. Instead of relying on suffix stripping to produce a complete morphological root, it extracts possible roots based on similar words in the provided input.

Refer to the [tests](https://github.com/ladooniani/dropsuit-stem/blob/main/test/index.test.js) for more information on how to use options for Stemming.

Use the following constructor to create an instance of the Stem class:

```
let dsstem = new dropsuit_stem(processingType, loadData, displayResults);

```

- Set 'processingType' (0) to differentiate short roots like 'Cars=Car' and 'Caring=Caring' and (1) to do not differentiate 'Cars=Car' snd 'Caring=Car'.

- Set (true) to for second argument to process input array of strings with load from the input array and save the data file or (false) to process input string with load from the data file and do not save the data file.

- Set the boolean parameter to true to display processing results in the terminal:

```
let dsstem = new dropsuit_stem(0, true, true);

```

#### stem(input)

- **input**: Input 'String/Array'.

#### Output options:

- **stem()** Stemmed data array.
- **root()** Roots and pseudo roots.
- **short()** Short roots.
- **score()** Root equality score.
- **ends()** Suffix and pseudo suffix endings.
- **unroot()** Unrootable words.

To process an array of sentences, pass an array of strings to the stem function:

```
let output = dsstem.stem(sentencesArrayInput);
```

Result:

```

Input:

[
  "tech",
  "As programmers program programs programmatically with programming languages, using a language stem and stemming techniques to use the stemmed data technically.",
  "Programmers love to program rubber ducks into their programs as a debugging tool, but when it comes to programming chess-playing programs, they need to be blue to win and be winner.",
  "The linguistics professor and other professors professorial study and professional profesion would be teaching his students about the process and processor of stemming showing the how to reduce words to roots like",
  "begin begins beginning and change changing changings eat eats eater eating where accept accepted but not accepts unacceptable where regular regularly  must be different with irregural",
  "as well as car cars with care cares or caring and storing stored store and save saver but still saving to the common root",
]

Output:

{
  unrootable: [
    'using',       'use',
    'love',        'ducks',
    'debugging',   'when',
    'comes',       'chess',
    'need',        'blue',
    'linguistics', 'study',
    'would',       'his',
    'students',    'reduce',
    'like',        'not',
    'must',        'different',
    'well',        'still',
    'common'
  ],
  suffix_end: [
    'ng',  'ing', 'es',  'ly',
    'lly', 'rs',  'ers', 'am',
    'ram', 'ms',  'ams', 'er',
    'al',  'ut',  'ss',  'ess',
    'sor', 'ts',  'in',  'ge',
    'ed',  're',  'ere', 'll',
    'on'
  ],
  root_score: {
    'tech-techniques=TECH': 4,
    'programmers-program=PROGRAM': 7,
    'programmatically-programmers=PROGRAMM': 8,
    'languages-language=LANGUAGE': 8,
    'stem-stemming=STEM': 4,
    'professor-professors=PROFESSOR': 9,
    'study-students=STUD': 4,
    'professional-professor=PROFESS': 7,
    'profesion-professor=PROFES': 6,
    'process-processor=PROCESS': 7,
    'roots-root=ROOT': 4,
    'begin-begins=BEGIN': 5,
    'change-changing=CHANG': 5,
    'accept-accepted=ACCEPT': 6,
    'regular-regularly=REGULAR': 7,
    'care-cares=CARE': 4,
    'storing-stored=STOR': 4,
    'save-saver=SAVE': 4
  },
  short_root: [ 'win', 'eat', 'car' ],
  roots: [
    'tech',     'program',
    'programm', 'language',
    'stem',     'professor',
    'stud',     'profess',
    'profes',   'process',
    'root',     'begin',
    'chang',    'accept',
    'regular',  'care',
    'stor',     'save'
  ],
  stemming: [
    'tech',
    'as program program program program with program language using a language stem and stem tech to use the stem data tech',
    'program love to program rubber ducks into their program as a debugging tool but when it comes to program chess playing program they need to be blue to win and be win',
    'the linguistics professor and other profes profes stud and profes profes would be teaching his stud about the process and process of stem showing the how to reduce words to root like',
    'begin begin begin and chang chang chang eat eat eater eating where accept accept but not accept unacceptable where regular regular must be different with irregural',
    'as well as car car with care care or caring and stor stor stor and save save but still saving to the common root'
  ],
  unroot: [Function: unroot],
  ends: [Function: ends],
  score: [Function: score],
  short: [Function: short],
  root: [Function: root],
  stem: [Function: stem]
}


```

To use stemming data as a base for single input after processing the array, change 'loadData' from 'true' to 'false':

```
let dsstem = new dropsuit_stem(0, false, true);

```

Then, pass the input word or sentence string:

```
let output = dsstem.stem("programming");

```

Output:

```
 [ 'program' ],
```

## Links

- npm: https://www.npmjs.com/package/dropsuit-stem

## Supporting DropSuit

DropSuit is an open-source library and I am dedicated to ensuring its continued development and improvement. If you have any questions, feedback, or encounter any issues, please reach out through the [support via PayPal](https://www.paypal.com/paypalme/dropsuit?country.x=GE&locale.x=en_US), and read more about [support details](https://github.com/ladooniani/dropsuit/blob/main/Support.md).

Your support is crucial for the library's success. You can also contribute to the project by submitting bug reports, feature requests, or by providing feedback. Sharing the library with others who may find it useful and giving it a star on GitHub are also great ways to show your support. Thank you for using DropSuit!

## License

[Apache License 2.0](LICENSE.txt)
