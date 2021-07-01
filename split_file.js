var fs = require('fs');
const natural = require('natural');
const tokenizer = new natural.SentenceTokenizer();

fs.readFile('file/plainText.txt', 'utf8', async function (err, data) {
    if (err) throw err;
    if (!data) return;
    console.log(data.length)
    console.log('data.length:')
    var test = tokenizer.tokenize(data)
    arr = test.filter(function (item) {
        return item.length > 10;
    });
    console.log(arr.length)

    //data = data.slice(0,1);
    // console.log(data.length);
    var linebreak = 100000;
    var i = 0;
    var line = 0;
    var plainText = ''
    arr2 = sliceIntoChunks(arr, linebreak)
    for (var value of arr2) {
        // console.log(value);
        // break;
        // plainText = plainText + value + "\n";
        // line++;
        // console.log(plainText)
        // if (line > (linebreak * i)){
            i++;
        plainText= value.join("\n")
            fs.appendFile('file/plainText_strip_'+i+'.txt', plainText + "\n", function (err) {
                if (err) throw err;
                // console.log('Saved!');
            });
            // plainText = ''
        // }
        // break;
    }

});

function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}
