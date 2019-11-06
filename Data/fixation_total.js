const fs = require('fs');

var generalTree = [];
var generalGraph = [];
var expertTree = [];
var expertGraph = [];

for (var i = 1; i <= 36; i++) {
    var treePath = './Data/json_data/p' + i + '/p' + i + 'treeFXD.json';
    var graphPath = './Data/json_data/p' + i + '/p' + i + 'graphFXD.json';
    if (i % 2 == 1) {
        if (fs.existsSync(treePath) && fs.existsSync(graphPath)) {
            console.log(i + ": Tree General -> Graph Expert");
            generalTree.push(JSON.parse(fs.readFileSync(treePath)));
            expertGraph.push(JSON.parse(fs.readFileSync(graphPath)));
        }
    } else {
        if (fs.existsSync(treePath) && fs.existsSync(graphPath)) {
            console.log(i + ": Graph General -> Tree Expert");
            generalGraph.push(JSON.parse(fs.readFileSync(graphPath)));
            expertTree.push(JSON.parse(fs.readFileSync(treePath)));
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