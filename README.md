# passive_code_secrets_detector

A library to detect secrets in codebases and texts through Shannon entropy.

## Usage

```javscript
> passive_code_secrets_detector.scan_text("HELLO WORLD")
[]
> passive_code_secrets_detector.scan_text("b3BlbnNzaC1rZXktdjEAA")
["b3BlbnNzaC1rZXktdjEAA"]
# Assume that data is a variable that holds large sum of texts.
> passive_code_secrets_detector.scan_text(data)
["Secret38c18bB2F9FDc84D8Ac93", "SecretCfc67D1DE9B2C279Bf1df"] # for example
```

Note: This is a WIP project.

## TODOs

1. Documentation
2. CI tests

# License

MIT - Mazin Ahmed (2023)
