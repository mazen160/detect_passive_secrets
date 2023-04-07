const assert = require('assert');
const passive_code_secrets_detector = require("./passive_code_secrets_detector.js")
const fs = require("fs")
function readFile(filepath) {
    return fs.readFileSync(filepath,
            {encoding:'utf8', flag:'r'});
        }


var data = readFile("tests/wikipedia-usa.txt")
var x = passive_code_secrets_detector.scan_text(data)
assert(x.length == 0)

data = readFile("tests/test-key")
x = passive_code_secrets_detector.scan_text(data)
assert(x.length > 0)

data = readFile("tests/test-key.pub")
x = passive_code_secrets_detector.scan_text(data)
assert(x.length > 0)

data = readFile("tests/secret-1.txt")
x = passive_code_secrets_detector.scan_text(data)
assert(x.length > 0)

data = readFile("tests/secret-2.txt")
x = passive_code_secrets_detector.scan_text(data)
assert(x.length > 0)
data = readFile("tests/normal-1.txt")
x = passive_code_secrets_detector.scan_text(data)
assert(x.length == 0)

console.log("✅ tests passed.")