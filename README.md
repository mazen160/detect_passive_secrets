# detect_passive_secrets

detect_passive_secrets.js is a Node.JS library that detects secrets in codebases and texts through Shannon entropy. It is designed to be a passive tool that scans for potential secrets without making any relying on pre-defined lists of Regular Expression patterns.

## Installation

To install detect_passive_secrets.js, simply run:

```
npm install detect_passive_secrets
```

## Usage

```
npm i detect_passive_secrets
```

```javscript
> const secrets_detector = require("detect_passive_secrets")

> secrets_detector.scan_text("HELLO WORLD")
[]
> secrets_detector.scan_text("b3BlbnNzaC1rZXktdjEAA")
["b3BlbnNzaC1rZXktdjEAA"]
# Assume that data is a variable that holds large sum of texts.
> secrets_detector.scan_text(data)
["Secret38c18bB2F9FDc84D8Ac93", "SecretCfc67D1DE9B2C279Bf1df"] # for example
```

The `scan_text` function takes in a string as an input, and returns an array of detected secrets, if any.

Note: This library does not guarantee 100% accuracy. Users should run thorough tests to validate its results against planned use-cases.

# License

The project is released under the MIT license. See LICENSE.txt for more details.
