myApp = angular.module('myApp',['ngMaterial']);

myApp.controller('firstController', firstController);

function firstController ($scope, $rootScope, $http, $filter, $mdDialog) {   
    $scope.firstInningWin;
    $scope.firstInningLost;
    $scope.secondInningWin;
    $scope.secondInningLost;
    $scope.win = 0;
    $scope.lost = 0;
    $scope.tieMatches = 0;
    
    $scope.firstInningScore ={
        "0_to_49": 0,
        "50_to_99":0,
        "100_to_149":0,
        "150_to_199":0,
        "200_to_249":0,
        "250_to_299":0
    };
    
    $scope.secondInningScore ={
        "0_to_49": 0,
        "50_to_99":0,
        "100_to_149":0,
        "150_to_199":0,
        "200_to_249":0,
        "250_to_299":0
    };
    
    $scope.dataFormat = function(data){
        var category = [];
        var win = [];
        var lost = [];
        angular.forEach(data,function(value,key){
            category.push({"label": value.team});
            win.push({"value": value.win});
            lost.push({"value": value.lost});
        });
        return [category,win, lost];
    };
    
//  $scope.match = [];
    $scope.firstInning = [];
    $scope.secondInning = [];
    
    $scope.analysis = function(){
        console.log($scope.firstInningWin,"anand");
        if($scope.firstInningWin>$scope.firstInningLost){
            $scope.firstInningValue  = "Sachin is good in first Inning batting";
        }
        else{
            $scope.firstInningValue  = "Sachin is not good in first Inning batting";
        }
        
        if($scope.secondInningWin>$scope.secondInningLost){
            $scope.secondInningValue  = "Sachin is good in second Inning batting";
        }
        else{
            $scope.secondInningValue  = "Sachin is not good in second Inning batting";
        }
        
        if( ($scope.firstInningWin + $scope.secondInningWin)> ($scope.firstInningLost + $scope.secondInningLost) ){
            $scope.totalInningValue  = "Sachin is good in over all match winning Inning batting";
        }
        else{
            $scope.totalInningValue  = "Sachin is not good in over all match winning Inning batting";
        }
    }
    
    $scope.checkMatchResult = function(result, opposition, match){
        if(result=="won"){
                $scope.win = $scope.win+1;
                var found = false;
                for (var i = 0; i < match.length; i++) {
                    
                    if (match[i].team === opposition) { // modify whatever property you need
                        match[i].win = match[i].win + 1;
                        found = true;
                        break;
                    }
                }
                if(!found){
                    match.push({
                        "team":opposition,
                        "win":1,
                        "lost":0
                    });
                }
            }
            if(result=="lost"){
                $scope.lost = $scope.lost+1;
                var found = false;
                for (var i = 0; i < match.length; i++) {
                    
                if (match[i].team === opposition) { // modify whatever property you need
                        match[i].lost = match[i].lost + 1;
                        found = true;
                        break;
                    }
                }
                if(!found){
                    match.push({
                        "team": opposition,
                        "win": 0,
                        "lost": 1
                    });
                }
            }
        return match;
    }
    
    $scope.scoreRange = function(score, match){
            if(score>=0 && score<50)   
                match["0_to_49"] = match["0_to_49"] + 1;
            else if(score>=50 && score<100)
                match["50_to_99"] = match["50_to_99"] + 1;
            else if(score>=100 && score<150)
                match["100_to_149"] = match["100_to_149"] + 1;
            else if(score>=150 && score<200)
                match["150_to_199"] = match["150_to_199"] + 1;
            else if(score>=200 && score<250)
                match["200_to_249"] = match["200_to_249"] + 1;
            else if(score>=250 && score<300)
                match["250_to_299"] = match["250_to_299"] + 1;    
        return match;
    }
    
    $scope.yearWiseTotal = [];
    $scope.yearTotalScore = function(year,run){
        var found = false;
//        console.log(year, run);
//        run = run.replace(/\*$/, '');
        run = String(run);
        if (run.charAt(run.length - 1) == '*') {
            run = run.substr(0, run.length - 1);
        }
        var isANumber = isNaN(run) === false;
        for(var i =0;i<$scope.yearWiseTotal.length;i++){
            if($scope.yearWiseTotal[i].year ==year){
                if (isANumber){
                    $scope.yearWiseTotal[i].score = $scope.yearWiseTotal[i].score + parseInt(run);
                }
                found = true;
                break;
            }
        }
        if(!found && isANumber){
            $scope.yearWiseTotal.push({
               "label":year,
                "value":parseInt(run)
            });
        }
    }

    
    function piechart1(){
        FusionCharts.ready(function () {
        var revenueChart = new FusionCharts({
            type: 'doughnut3d',
            renderAt: 'chart-container',
            width: '450',
            height: '300',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "Split of Revenue by Product Categories",
                    "subCaption": "Last year",
                    "numberPrefix": "$",
                    "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
                    "bgColor": "#ffffff",
                    "showBorder": "0",
                    "use3DLighting": "0",
                    "showShadow": "0",
                    "enableSmartLabels": "0",
                    "startingAngle": "310",
                    "showLabels": "0",
                    "showPercentValues": "1",
                    "showLegend": "1",
                    "legendShadow": "0",
                    "legendBorderAlpha": "0",                                
                    "decimals": "0",
                    "captionFontSize": "14",
                    "subcaptionFontSize": "14",
                    "subcaptionFontBold": "0",
                    "toolTipColor": "#ffffff",
                    "toolTipBorderThickness": "0",
                    "toolTipBgColor": "#000000",
                    "toolTipBgAlpha": "80",
                    "toolTipBorderRadius": "2",
                    "toolTipPadding": "5",
                },
                "data":[
                    {
                        "label": "Food",
                        "value": "28504"
                    }, 
                    {
                        "label": "Apparels",
                        "value": "14633"
                    }, 
                    {
                        "label": "Electronics",
                        "value": "10507"
                    }, 
                    {
                        "label": "Household",
                        "value": "4910"
                    }
                ]
            }
        }).render();
    });
    
}
    
    
    var Url   = "sachin.json";
    $http.get(Url).then(function(response){
    console.log("-- csv start --", response.data);
    angular.forEach(response.data, function(value, key) {
            
            var year = new Date(value['date']).getFullYear();
            $scope.yearTotalScore(year,value['batting_score']);
            
            if(value['batting_innings']=="1st"){
                if(value['match_result'] == "won"){
                    $scope.firstInningWin = ($scope.firstInningWin | 0) + 1;
                }
                else if(value['match_result'] == "lost"){
                    $scope.firstInningLost = ($scope.firstInningLost | 0)+ 1;   
                }
                else{
                    $scope.tieMatches = $scope.tieMatches +1; 
                }
                $scope.firstInningScore = $scope.scoreRange(value['batting_score'],$scope.firstInningScore);
                $scope.firstInning = $scope.checkMatchResult(value['match_result'],value['opposition'],$scope.firstInning);
            }
            if(value['batting_innings']=="2nd"){
                if(value['match_result'] == "won"){
                    $scope.secondInningWin = ($scope.secondInningWin | 0)+ 1;
                }
                else if(value['match_result'] == "lost"){
                    $scope.secondInningLost = ($scope.secondInningLost | 0) + 1;
                }
                else{
                    $scope.tieMatches = $scope.tieMatches +1; 
                }
                $scope.secondInningScore = $scope.scoreRange(value['batting_score'],$scope.secondInningScore);
                $scope.secondInning = $scope.checkMatchResult(value['match_result'],value['opposition'],$scope.secondInning);
            }
    });
    
    var array = $scope.dataFormat($scope.firstInning);
    $scope.xyz("firstInning", array[0], array[1], array[2]);  
    
    array = $scope.dataFormat($scope.secondInning);
    $scope.xyz("secondInning", array[0], array[1], array[2]);
    $scope.analysis();
    
    console.log($scope.firstInningScore);
    console.log($scope.secondInningScore);
    var category = [];
        category.push({"label": "0 to 49 "});
        category.push({"label": "50 to 99"});
        category.push({"label": "100 to 149"});
        category.push({"label": "150 to 199"});
        category.push({"label": "200 to 249"});
        category.push({"label": "250 to 399"});
        
    var score1 =[];
        score1.push({"value":$scope.firstInningScore["0_to_49"]});
        score1.push({"value":$scope.firstInningScore["50_to_99"]});
        score1.push({"value":$scope.firstInningScore["100_to_149"]});
        score1.push({"value":$scope.firstInningScore["150_to_199"]});
        score1.push({"value":$scope.firstInningScore["200_to_249"]});
        score1.push({"value":$scope.firstInningScore["250_to_299"]});
    var score2 =[];
        score2.push({"value":$scope.secondInningScore["0_to_49"]});
        score2.push({"value":$scope.secondInningScore["50_to_99"]});
        score2.push({"value":$scope.secondInningScore["100_to_149"]});
        score2.push({"value":$scope.secondInningScore["150_to_199"]});
        score2.push({"value":$scope.secondInningScore["200_to_249"]});
        score2.push({"value":$scope.secondInningScore["250_to_299"]});
    
    console.log(score1,score2,"00000000000000000000000000000000000000000000");
    $scope.xyz("batting_score", category, score1,score2);
    console.log($scope.yearWiseTotal,"year wise score");
    piechart1();
        
    });
    
    $scope.xyz = function(id, category, win, lost){ 
//        $scope.analysis();
    FusionCharts.ready(function () {
    var revenueChart = new FusionCharts({
        type: 'mscolumn2d',
        renderAt: id,
//        width: '',
        height: '300',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Comparison of win & lost of teams",
                "xAxisname": "Teams",
                "yAxisName": "Matches ",
//                "numberPrefix": "$",
                "plotFillAlpha" : "80",

                //Cosmetics
                "paletteColors" : "#0075c2,#1aaf5d",
                "baseFontColor" : "#333333",
                "baseFont" : "Helvetica Neue,Arial",
                "captionFontSize" : "14",
                "subcaptionFontSize" : "49",
                "subcaptionFontBold" : "0",
                "showBorder" : "0",
                "bgColor" : "#ffffff",
                "showShadow" : "0",
                "canvasBgColor" : "#ffffff",
                "canvasBorderAlpha" : "0",
                "divlineAlpha" : "100",
                "divlineColor" : "#999999",
                "divlineThickness" : "1",
                "divLineIsDashed" : "1",
                "divLineDashLen" : "1",
                "divLineGapLen" : "1",
                "usePlotGradientColor" : "0",
                "showplotborder" : "0",
                "valueFontColor" : "#ffffff",
                "placeValuesInside" : "1",
                "showHoverEffect" : "1",
                "rotateValues" : "1",
                "showXAxisLine" : "1",
                "xAxisLineThickness" : "1",
                "xAxisLineColor" : "#999999",
                "showAlternateHGridColor" : "0",
                "legendBgAlpha" : "0",
                "legendBorderAlpha" : "0",
                "legendShadow" : "0",
                "legendItemFontSize" : "30",
                "legendItemFontColor" : "#666666"                
            },
            "categories": [
                {
                    "category": category,
                }
            ],
            "dataset": [
                {
                    "seriesname": "win",
                    "data": win
                }, 
                {
                    "seriesname": "lost",
                    "data": lost
                }
            ]
        }
    }); 
    revenueChart.render();
});    
}
}

