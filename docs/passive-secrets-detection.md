# Passive Secrets Detection through Shannon Entropy

# Introduction

This document discusses passive secrets detection on agnostic text and codebases. It also focuses on introducing a solution developed to solve challenge that can also be used in prompt engineering and filtering queries sent to ChatGPT, Microsoft Azure OpenAI, and OpenAI APIs.

# Topic

Shannon entropy is a measure of the unpredictability of information. It is often used to measure the amount of "randomness" in a sequence of characters or bytes. In the context of security, it can be used to detect secrets in code or text.

The basic idea is that secrets tend to have higher entropy than non-secrets. For example, a randomly generated password consisting of a mix of uppercase and lowercase letters, digits, and symbols will have higher entropy than a common word like "password". Similarly, cryptographic keys tend to have higher entropy than other types of data.

Passive secrets detection through Shannon entropy involves analyzing a text or codebase and looking for sequences of characters with high entropy. These sequences are then flagged as potential secrets or keys that should be further investigated.

## Using the `detect_passive_secrets.js` Library

The `detect_passive_secrets.js` library is a Node.js library that can be used to detect passive secrets in a codebase or text. It uses Shannon entropy to identify sequences of characters with high entropy and flags them as potential secrets.

To use the library, you can install it using npm:

```$javascript
npm install detect_passive_secrets
```

Then, you can use the `scan_text` function to scan a text or codebase for potential secrets. For example:

```javascript
const detect_passive_secrets = require("detect_passive_secrets");

const text =
  "This is a text that might contain secrets like an API key: ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 or 190565d07dcd5de159931361f924b50f";
const secrets = detect_passive_secrets.scan_text(text);

console.log(secrets);
```

This will output:

```javascript
> [ 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' , '190565d07dcd5de159931361f924b50f']

```

In this example, the library has detected the sequence of characters `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789` and `190565d07dcd5de159931361f924b50f` as a potential secret.

## Prompt Engineering and passive secrets detection

In the context of Prompt Engineering, the `detect_passive_secrets.js` library can be used to scan code and text inputs for potential secrets and keys before they are passed to the OpenAI API or Microsoft Azure OpenAI. This helps ensure that sensitive information is not unintentionally exposed to third parties.

For example, if a user submits a code snippet or text input that contains an API key or other sensitive information, the library can detect it and alert the user or prevent the input from being processed. This helps ensure that the user's data remains private.

By incorporating passive secrets detection into the Prompt Engineering workflow, we can help preventing secrets from being leaked into OpenAI and similar APIs where an input is known to be agnostic and may include secrets that should not be exposed.
