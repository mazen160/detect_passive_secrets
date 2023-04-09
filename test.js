const assert = require('assert');
const secrets_detector = require("./detect_passive_secrets.js")
const fs = require("fs")
function readFile(filepath) {
    return fs.readFileSync(filepath,
            {encoding:'utf8', flag:'r'});
        }


var data = readFile("tests/wikipedia-usa.txt")
var x = secrets_detector.scan_text(data)
assert(x.length == 0)

data = readFile("tests/test-key")
x = secrets_detector.scan_text(data)
assert(x.length > 0)

data = readFile("tests/test-key.pub")
x = secrets_detector.scan_text(data)
assert(x.length > 0)

data = readFile("tests/secret-1.txt")
x = secrets_detector.scan_text(data)
assert(x.length > 0)

data = readFile("tests/secret-2.txt")
x = secrets_detector.scan_text(data)
assert(x.length > 0)
data = readFile("tests/normal-1.txt")
x = secrets_detector.scan_text(data)
assert(x.length == 0)

console.log("✅ tests passed.")