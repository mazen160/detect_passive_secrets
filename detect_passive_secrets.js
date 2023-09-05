const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
const HEX_CHARS = "1234567890abcdefABCDEF"

const DEFAULT_HEX_ENTROPY = 3.5
const DEFAULT_BASE64_ENTROPY = 4.05


// Create an array of character frequencies.
const getFrequencies = str => {
    let dict = new Set(str);
    const bad_chars = ["", "+", "*", "[", "]", "{", "}"]
    return [...dict].map(chr => {
        if (bad_chars.includes(chr)) {
            return 0
        }
        return str.match(new RegExp(chr, 'g')).length;
    });
};

// Measure the entropy of a string in bits per symbol.
const shannon_entropy = str => getFrequencies(str)
    .reduce((sum, frequency) => {
        let p = frequency / str.length;
        return sum - (p * Math.log(p) / Math.log(2));
    }, 0);

// Measure the entropy of a string in total bits.
const shannon_entropy_bits = str => shannon_entropy(str) * str.length;

function get_strings_of_set(word, charset, threshold = 20) {
    let count = 0
    let letters = ""
    let strings = []
    Array.from(word).forEach(c => {
        if (charset.includes(c)) {
            letters += c
            count += 1
            if (count > threshold) {
                strings.push(letters)
                letters = ""
                count = 0
            }
        }
    });
    if (letters.length > 0) {
        strings.push(letters)
        letters = ""
    }

    return strings
}

function get_tokenized_strings(text) {
    let strings = []
    lines = text.split("\n")
    lines.forEach(c => {
        c.split(" ").forEach(v => {
            if (!strings.includes(v)) {
                strings.push(v)
            }
        })
    })
    return strings
}

function scan_text(text, string_length_threshold = 20, allowed_bas64_entropy = DEFAULT_BASE64_ENTROPY, allowed_hex_entropy = DEFAULT_HEX_ENTROPY) {
    let strings_found = []
    let tokenized_strings = get_tokenized_strings(text)
    tokenized_strings.forEach(word => {

        let b64_strings = get_strings_of_set(word, BASE64_CHARS, threshold = string_length_threshold)
        b64_strings.forEach(c => {
            b64_entropy = shannon_entropy(c)
            if (b64_entropy > allowed_bas64_entropy) {
                // console.debug(`B64 Entropy of ${c} is ${b64_entropy}`)
                if (!strings_found.includes(word)) {
                    strings_found.push(word)
                }
            }
        })

        let hex_strings = get_strings_of_set(word, HEX_CHARS, threshold = string_length_threshold)
        hex_strings.forEach(c => {
            hex_entropy = shannon_entropy(c)
            if (hex_entropy > allowed_hex_entropy) {
                // console.debug(`Hex Entropy of ${c} is ${hex_entropy}`)
                if (!strings_found.includes(word)) {
                    strings_found.push(word)
                }
            }
        })
    });

    return strings_found
}


module.exports.scan_text = scan_text
module.exports.shannon_entropy = shannon_entropy