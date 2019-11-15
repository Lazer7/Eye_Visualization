function getOverviewDataForRadarChart(ontologyType)
{
    var ovMeanData;
    var ovMeanFile = "./Data/overview_data/overview_mean.csv";

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

    console.log('Setting scales for overview radar chart.');
    var taskTimeScale = d3.scaleLinear()
        .domain([0, 36])
        .range([0, 100])
        .nice();
    var totalFixScale = d3.scaleLinear()
        .domain([0, 4300])
        .range([0, 100])
        .nice();
    var scanPathScale = d3.scaleLinear()
        .domain([0, 550000])
        .range([0, 100])
        .nice();
    var saccadicLengthScale = d3.scaleLinear()
        .domain([0, 151])
        .range([0, 100])
        .nice();
    var convexAreaScale = d3.scaleLinear()
        .domain([0, 4100])
        .range([0, 100])
        .nice();
    var totalClickScale = d3.scaleLinear()
        .domain([0, 750])
        .range([0, 100])
        .nice();

    console.log("Making radar data objects for '"+ontologyType+"'.");
    var radarData = [];
    
    ovMeanData.forEach(function(d,i) {
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