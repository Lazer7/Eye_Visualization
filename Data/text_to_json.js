const fs = require('fs')

fs.readFile('./Raw_Data/p6/p6.treeFXD.txt', 'utf8', function (err, contents) {
    var data = contents.split('');
    var temp = "";
    var final = [];
    for (var i = 0; i < data.length; i++) {
        if (/\s/.test(data[i])) {
            if (temp !== '') final.push(temp);
            temp = "";
        } else {
            temp = temp + data[i]
        }
    }
    // createGZDJson(final);
    // createEVDJson(final);
    createFXDJson(final);
});


function createEVDJson(array) {
    var EVD = [];
    var i = 0;
    while (i < array.length) {
        var json = {
            Time: array[i],
            Event: array[i + 1],
            EventKey: array[i + 2],
            Data1: array[i + 3],
            Data2: array[i + 4]
        }
        if(isNaN(array[i+5]) ||array[i+5]<10){
            i=i+6;
            json["Description"]=array[i+5]
        } else {
            i=i+5;
        }
        EVD.push(json)
    }
    console.log(EVD.length)
    fs.writeFile("p6treeEVD.json", JSON.stringify(EVD), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    return EVD;
}

function createFXDJson(array) {
    var FXD = [];
    for (var i = 0; i < array.length; i = i + 5) {
        var json = {
            Number: array[i],
            Time: array[i + 1],
            Duration: array[i + 2],
            ScreenX: array[i + 3],
            ScreenY: array[i + 4],
        }
        FXD.push(json)
    }
    console.log(FXD.length)
    fs.writeFile("p6treeFXD.json", JSON.stringify(FXD), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    return FXD;
}

function createGZDJson(array) {
    var GZD = [];
    for (var i = 0; i < array.length; i = i + 16) {
        var json = {
            Time: array[i],
            Number: array[i + 1],
            LeftScreenX: array[i + 2],
            LeftScreenY: array[i + 3],
            LeftCamX: array[i + 4],
            LeftCamY: array[i + 5],
            LeftDistance: array[i + 6],
            LeftPupil: array[i + 7],
            LeftCode: array[i + 8],
            RightScreenX: array[i + 9],
            RightScreenY: array[i + 10],
            RightCamX: array[i + 11],
            RightCamY: array[i + 12],
            RightDistance: array[i + 13],
            RightPupil: array[i + 14],
            RightCode: array[i + 15]
        }
        GZD.push(json)
    }
    console.log(GZD.length)
    fs.writeFile("p6treeGZD.json", JSON.stringify(GZD), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    return GZD;
}