const fs = require('fs')
var data = require('./p6GZD.json')
var fix = require('./p6graphFXD.json')

var counter = 0;
var final = [];
data.forEach(element => {
    if (element.LeftCode < 2 &&
        element.RightCode < 2 &&
        element.LeftScreenX > -1000 &&
        element.RightScreenX > -1000 &&
        element.LeftScreenY > -1000 &&
        element.RightScreenY > -1000 &&
        element.LeftPupil < 8.0 &&
        element.RightPupil < 8.0) {
        counter++;
        final.push(element)
    }
});
var fixCounter = 0;
var finalResult = [];
console.log(final.length);
for (var i = 0; i < final.length; i++) {
    if (fix.length < fixCounter + 1) {
        break;
    }
    var fixation = fix[fixCounter];
    if ((fixation.Time-0) < (final[i].Time-0)) {
        fixCounter++;
    }
    if (((fixation.Time - 300) < (final[i].Time - 0)) && ((fixation.Time - 0) > (final[i].Time - 0))) {
        finalResult.push(final[i]);
    }
}



fs.writeFile("p6graphGZD.js", JSON.stringify(finalResult), function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});


console.log(finalResult.length);