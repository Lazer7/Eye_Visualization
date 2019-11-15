//file
// var ovMeanFile = "./Data/overview_data/overview_mean.csv";
// var ovPartFile = "./Data/overview_data/overview.csv";

//data
var ovMeanData;   //overview of ont-vis pairs
var ovPartData;   //overview of each participants

//scales
var taskTimeScale;      //1
var totalFixScale       //2
var fixDurationScale;
var scanPathScale;      //3
var saccadicLengthScale;//4
var avgPupilScale;
var convexAreaScale;    //5
var totalClickScale;    //6

// //svg
// var svgDiv;
// var svg, svgWidth, svgHeight;

// //view option
// var OntologyOption = {
//     GENERAL: 1,
//     EXPERT: 2
// };
// var currentOntOption = OntologyOption.GENERAL;

// // const basicOpacity = 0.7; //better to put this in .css
// // const highOpacity = 0.9;
// // const mutedOpacity = 0.2;
// const delayValue = 0.3;

// // window.addEventListener('resize', resizeSVG);

var radarData_general;
var radarData_expert;

function getOverviewDataForRadarChart(ontologyType)
{
    var ovMeanData = fetchOverviewData();
    setScales(ovMeanData);
    return makeRadarData(ovMeanData, ontologyType);
}

// Fetch overview data and call other functions
function fetchOverviewData()
{
    var ovMeanFile = "./Data/overview_data/overview_mean.csv";
    var ovMeanData;

    console.log('Fetching overview data for radar chart!');
    d3.csv(ovMeanFile)
    .then(function(data){
        //converting all rows to int
        data.forEach(function(d,i) {
            d.ont_type = d.ont_type;
            d.vis_type = d.vis_type;
            d.success = +d.success;
            d.time = +d.time;
            d.totalfix = +d.totalfix;
            d.avg_fix_duration = +d.avg_fix_duration;
            d.scanpath = +d.scanpath;
            d.avg_saccadic_length = +d.avg_saccadic_length;
            d.avg_pupil = +d.avg_pupil;
            d.convexhull_area = +d.convexhull_area;
            d.totalcount = +d.totalclick;
        });
        ovMeanData = data;
    });

    console.log(ovMeanData);
    return ovMeanData;
}

// Set scale to make data to range from 0 to 100
function setScales(data)
{
    console.log('Setting scales for overview radar chart.');
    
    const timeValue = function(d){return d.time};
    const fixCountValue = function(d){return d.totalfix};
    const scanPathValue = function(d){return d.scanpath};
    const avgSaccadeValue = function(d){return d.avg_saccadic_length};
    const convexAreaValue = function(d){return d.convexhull_area};
    const clickCountValue = function(d){return d.totalclick};

    //scales...
    // taskTimeScale = d3.scaleLinear()
    //     .domain([0, d3.max(data, timeValue)])
    //     .range([0, 100])
    //     .nice();
    // totalFixScale = d3.scaleLinear()
    //     .domain([0, d3.max(data, fixCountValue)])
    //     .range([0, 100])
    //     .nice();
    // scanPathScale = d3.scaleLinear()
    //     .domain([0, d3.max(data, scanPathValue)])
    //     .range([0, 100])
    //     .nice();
    // saccadicLengthScale = d3.scaleLinear()
    //     .domain([0, d3.max(data, avgSaccadeValue)])
    //     .range([0, 100])
    //     .nice();
    // convexAreaScale = d3.scaleLinear()
    //     .domain([0, d3.max(data, convexAreaValue)])
    //     .range([0, 100])
    //     .nice();
    // totalClickScale = d3.scaleLinear()
    //     .domain([0, d3.max(data, clickCountValue)])
    //     .range([0, 100])
    //     .nice();
    
    //WARNING: hard coded
    taskTimeScale = d3.scaleLinear()
        .domain([0, 36])
        .range([0, 100])
        .nice();
    totalFixScale = d3.scaleLinear()
        .domain([0, 4300])
        .range([0, 100])
        .nice();
    scanPathScale = d3.scaleLinear()
        .domain([0, 550000])
        .range([0, 100])
        .nice();
    saccadicLengthScale = d3.scaleLinear()
        .domain([0, 151])
        .range([0, 100])
        .nice();
    convexAreaScale = d3.scaleLinear()
        .domain([0, 4100])
        .range([0, 100])
        .nice();
    totalClickScale = d3.scaleLinear()
        .domain([0, 750])
        .range([0, 100])
        .nice();

}

function render(data)
{
    console.log('Drawing radar chart.');
    var tooltip;
}

// Make radarData objects to fit to radarchart library
function makeRadarData(data, ontologyType)
{
    // var data = ovMeanData;
    console.log("Making radar data objects for '"+ontologyType+"'.");
    var radarData = [];

    data.forEach(function(d,i) {
        if(d.ont_type == ontologyType) {
            var className = d.ont_type;
            var axes = [];
            axes.push({axis: "time", value: taskTimeScale(d.time)});
            axes.push({axis: "fixation count", value: totalFixScale(d.totalfix)});
            axes.push({axis: "scanpath", value: scanPathScale(d.scanpath)});
            axes.push({axis: "avg saccades", value: saccadicLengthScale(d.avg_saccadic_length)});
            axes.push({axis: "convexhull", value: convexAreaScale(d.convexhull_area)});
            axes.push({axis: "click count", value: totalClickScale(d.totalclick)});

            var radarD = {className: className, axes: axes};
            console.log(radarD);
            
            radarData.push(radarD);
        }
    });

    return radarData;
}