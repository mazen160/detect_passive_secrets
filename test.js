const assert = require('assert');
const secrets_detector = require("./detect_passive_secrets.js")
const fs = require("fs")

function readFile(filepath) {
    return fs.readFileSync(filepath, {
        encoding: 'utf8',
        flag: 'r'
    });
}


var data = readFile("tests/wikipedia-usa.txt")
var result = secrets_detector.scan_text(data)
assert(result.length == 0)

data = readFile("tests/test-key")
result = secrets_detector.scan_text(data)
assert(result.length > 0)

data = readFile("tests/test-key.pub")
result = secrets_detector.scan_text(data)
assert(result.length > 0)

data = readFile("tests/secret-1.txt")
result = secrets_detector.scan_text(data)
assert(result.length > 0)
assert(result[0] == data.trim())

data = readFile("tests/secret-2.txt")
result = secrets_detector.scan_text(data)
assert(result.length > 0)
assert(result[0] == data.trim())

data = readFile("tests/normal-1.txt")
result = secrets_detector.scan_text(data)
assert(result.length == 0)

data = readFile("tests/github-key-1.txt")
result = secrets_detector.scan_text(data)
assert(result.length > 0)

data = readFile("tests/github-key-2.txt")
result = secrets_detector.scan_text(data)
assert(result.length > 0)
assert(result[0] == data.trim())


data = readFile("tests/aws-secret-key-1.txt")
result = secrets_detector.scan_text(data)
assert(result.length > 0)
assert(result[0] == data.split("\n")[0])

data = readFile("tests/test-normal-code-with-high-entropy.txt")
result = secrets_detector.scan_text(data)
assert(result.length < 5) // Ideally, it should not detect any secrets here, but it's hard to achieve this.

console.log("✅ tests passed.")