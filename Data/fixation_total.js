const fs = require('fs');

var generalTree = [];
var generalGraph = [];
var expertTree = [];
var expertGraph = [];
var data;

for (var i = 1; i <= 36; i++) {
    var treeFXDPath = './Data/json_data/p' + i + '/p' + i + 'treeFXD.json';
    var graphFXDPath = './Data/json_data/p' + i + '/p' + i + 'graphFXD.json';
    var treeGZDPath = './Data/json_data/p' + i + '/p' + i + 'treeGZD.json';
    var graphGZDPath = './Data/json_data/p' + i + '/p' + i + 'graphGZD.json';
    if (i % 2 == 1) {
        if (fs.existsSync(treeFXDPath) && fs.existsSync(graphFXDPath)) {
            console.log(i + ": Tree General -> Graph Expert");
            fxd = addAveragePupil(JSON.parse(fs.readFileSync(treeFXDPath)), treeGZDPath);
            generalTree.push(fxd);
            fxd = addAveragePupil(JSON.parse(fs.readFileSync(graphFXDPath)), graphGZDPath);
            expertGraph.push(fxd);
        }
    } else {
        if (fs.existsSync(treeFXDPath) && fs.existsSync(graphFXDPath)) {
            console.log(i + ": Graph General -> Tree Expert");
            fxd = addAveragePupil(JSON.parse(fs.readFileSync(graphFXDPath)), graphGZDPath);
            generalGraph.push(fxd);
            fxd = addAveragePupil(JSON.parse(fs.readFileSync(treeFXDPath)), treeGZDPath);
            expertTree.push(fxd);
        }
    }
}

write(generalTree, './Data/combined_data/generalTree.js');
write(generalGraph, './Data/combined_data/generalGraph.js');
write(expertTree, './Data/combined_data/expertTree.js');
write(expertGraph, './Data/combined_data/expertGraph.js');

function write(list, filepath) {
    fs.writeFile(filepath, JSON.stringify(list), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

function addAveragePupil(fxd, filePath) {
    gzd = JSON.parse(fs.readFileSync(filePath));
    fxd.forEach(element => {
        const filtered = gzd.filter(e => parseFloat(e.Time) >= parseFloat(element.Time) && parseFloat(e.Time) < parseFloat(element.Time) + parseFloat(element.Duration));
        var leftPupil = 0;
        var rightPupil = 0;
        if (filtered.length != 0) {
            leftPupil = filtered[0].LeftPupil;
            rightPupil = filtered[0].RightPupil;
        }
        element.LeftPupil = leftPupil;
        element.RightPupil = rightPupil;
    });

    return fxd;
}