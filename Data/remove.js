const fs = require('fs')
var jsonFolder = 'json_data'
var filteredFolder  = 'filtered_data'

var numberFolder = '/p1'
var dataType = 'graph'

var jsonDirectory = 'C:/Repository/Eye_Visualization/Data/' + jsonFolder + numberFolder + numberFolder + dataType + 'GZD.json'
var filteredDirectory = 'C:/Repository/Eye_Visualization/Data/' + filteredFolder + numberFolder + numberFolder + dataType + 'GZD.js'

var data = require(jsonDirectory)

var final = [];
data.forEach(element => {
    if (element.LeftPupil > 0.0 &&
        element.RightPupil > 0.0) {
        final.push(element)
    }
});


var finalResult = final.map(({Time, LeftPupil, RightPupil}) => ({Time, LeftPupil, RightPupil}))

fs.unlinkSync(jsonDirectory)

fs.writeFile(filteredDirectory, JSON.stringify(finalResult), function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});