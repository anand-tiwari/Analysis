myApp = angular.module('myApp',['ngMaterial']);

myApp.controller('firstController', firstController);

function firstController ($scope, $rootScope, $http, $filter, $mdDialog, $q, $mdMedia) {   
    
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    
    $scope.heading;
    $scope.html = 'openDialog.html';
    /* -------------- Start of Dialog Box ----------------------------- */
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showCustom = function(event) {
               var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
               $mdDialog.show({
                  clickOutsideToClose: true,    
                  targetEvent: event,
                  scope: $scope,
                  preserveScope: true,           
                  templateUrl: $scope.html,
                  fullscreen: useFullScreen,
                  controller: function () { this.parent = $scope; }
                });
    };
    
    
    //-----------------------------------  ground lost win  1st option ----------------------------------------------------------------------//

    $scope.Innings = [
        {"name": "1stInning"},
        {"name": "2ndInning"},
        {"name": "BothInning"},
        {"name":"IndianGrounds"},
        {"name":"OutOfIndiaGrounds"}
    ];
    $scope.onGroundBattingInning = "1stInning";
    $scope.InningChange = function(){
        var data1=[],
            data2=[],
            groundfirstlevel=[];
        var array = [];
        if($scope.onGroundBattingInning.name=="1stInning"){
            array = $scope.groundFirst;
        }
        else if($scope.onGroundBattingInning.name=="2ndInning"){
            array = $scope.groundSecond;
        }
        else if($scope.onGroundBattingInning.name=="BothInning"){
            array = $scope.groundBoth;
        }
        else if($scope.onGroundBattingInning.name=="IndianGrounds"){
            array = indiaGroundRecord;
        }
        else if($scope.onGroundBattingInning.name=="OutOfIndiaGrounds"){
            array = outOfIndiaGroundRecord;
        }
        
        for(var i=0;i<array.length;i++){
            groundfirstlevel.push({"label":array[i].label});
            data1.push({"value":array[i].won});
            data2.push({"value":array[i].lost});
        }
        
        $scope.msChart("groundChart", groundfirstlevel, data1, data2);        
    };
    $scope.groundLostWon = function($event){
        
        $scope.html = 'groundAnalysisDialog.html';
        $scope.heading = "Number of win & lost on each Ground";
        $scope.showCustom($event);
        var data1=[],
            data2=[],
            groundfirstlevel=[];
        var array = $scope.groundFirst;
        for(var i=0;i<array.length;i++){
            groundfirstlevel.push({"label":array[i].label});
            data1.push({"value":array[i].won});
            data2.push({"value":array[i].lost});
        }

        setTimeout(function() {
        $scope.msChart("groundChart", groundfirstlevel, data1, data2);
        },1000);
 }    
//-------------------------------------end---------------------------------------------------------------------------------------------//

//------------------------- winInIndiaOrForeign ------------// 
    $scope.WinInIndiaOrForeign = function($event){
        $scope.heading = "Percentage Won Matches chart";
        $scope.html = 'openDialog.html';
        $scope.showCustom($event);
        var dataGround = [
                    {
                        "label":"India",
                        "value":($scope.inIndiaWon *100)/($scope.inIndiaMatch+$scope.outOfIndiaMatch)
                    },
                    {
                        "label":"OutSide Of India",
                        "value":($scope.outOfIndiaWon*100)/($scope.inIndiaMatch+$scope.outOfIndiaMatch)
                    }
                ];
        setTimeout(function() {
        pieChart("chart",dataGround);
        },1000);
    };
//-------------------------------------- end --------------//

//---------------------------------- score and winning Percentage -----------------------------------------------------------------------------//
    $scope.scoreAndWinPercentage = [
        {
            "label":"0-49",
            "value":0,
            "total":0
        },
        {
            "label":"50-99",
            "value":0,
            "total":0
        },
        {
            "label":"100-149",
            "value":0,
            "total":0
        },
        {
            "label":"150-199",
            "value":0,
            "total":0
        },
        {
            "label":"200-249",
            "value":0,
            "total":0
        },
         {
            "label":"250-299",
            "value":0,
            "total":0
        }
    ];
    
    $scope.scoreWithChance = [];
    $scope.scoreWithWin = function($event){
        $scope.heading = "Score and Range Percentage";
        $scope.html = 'openDialog.html';
        $scope.showCustom($event);
        if($scope.scoreWithChance.length==0){
            for(var i=0;i<$scope.scoreAndWinPercentage.length;i++){
                var v = ( ($scope.scoreAndWinPercentage[i].value *100)/$scope.scoreAndWinPercentage[i].total );
                v = v.toFixed(2);
                $scope.scoreWithChance.push({
                    "label":$scope.scoreAndWinPercentage[i].label,
                    "value":v
                });
            }
        }
        
        var property = {
            caption:"score in Range ",
            numberSuffix:"%",
            labelDisplay:"ROTATE",
            yAxisMaxValue:"100"
        };
        setTimeout(function() {
        printChart("chart",$scope.scoreWithChance,property,"column2d");
        });
    }
    
//---------------------------------------------- end -----------------------------------------------------------------------------------------//

 //------------------------------------ No of wickets taken And match winning percentage -----------------------------------------------------//
    var wicketsData = []
    $scope.wicketsDrawChart = function($event){
        $scope.html = 'openDialog.html';
        $scope.heading = "Wickets and Match Result Analysis";
         $scope.showCustom($event);
        if(wicketsData.length==0){
            for(var i=0;i<wickets.length;i++){
                var v = ((wickets[i].value*100)/wickets[i].total);
                v = v.toFixed(2);
                wicketsData.push({
                    "label":wickets[i].label,
                    "value":v
                });
            }
        }
        var property = {
            caption:"Number Of Wickets in Match",
            numberSuffix:"%",
            xaxisname:"NO Of Wickets",
            labelDisplay:"",
            yAxisMaxValue:"100"
        };
        setTimeout(function() {
        printChart("chart",wicketsData,property,"bar2d");
        });
    }
    //--------------------------------------------- end -----------------------------------------------------------------------------------//
     //------------------------------------ No of wickets taken And match winning percentage --------------------------------------------------//
     var catchData = []
    $scope.catchDrawChart = function($event){
        $scope.heading = "Catchess and Match Result Analysis";
        $scope.html = 'openDialog.html';
        $scope.showCustom($event);
        if(catchData.length==0){
            for(var i=0;i<catches.length;i++){
                var v = ((catches[i].value*100)/catches[i].total);
                    v = v.toFixed(2);
                catchData.push({
                    "label":catches[i].label,
                    "value":v
                });
            }
        }
        var property = {
            caption:"Number Of Catches in Match",
            numberSuffix:"%",
            xaxisname:"NO Of Catches",
            labelDisplay:"",
            yAxisMaxValue:"100"
        };
        setTimeout(function() {
        printChart("chart",catchData,property,"column3d");
        });
    }
    
    //--------------------------------------------- end -----------------------------------------------------------------------------------//
    
    //------------------- Match winning percentage Against Different opposition -----------------------------------------------------------//
    $scope.winPercentageAgainstOposstion = function($event){
        $scope.heading = "Winning Chances Against oppositions Analysis";
        $scope.html = 'openDialog.html';
        $scope.showCustom($event);
      var array = [];
        angular.forEach($scope.bothInning,function(value,key){
            var percentage = (parseInt(value.win)*100)/(parseInt(value.win)+parseInt(value.lost));
            percentage = percentage.toFixed(2);
            var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            
            array.push({
            "label":value.team,
            "value":percentage,
            "color":randomColor
            })
        });
        
         var property = {
            caption:"Win Percentage Against",
            subCaption:"Each Teams",
            numberSuffix:"%",
            yAxisMaxValue:"100"
        };
        setTimeout(function() {
        printChart("chart",array,property,"column2d");
        });
    };
    
    //------------------ end ------------------------------------------------------------------------------------------------------------//
    
    //------------------- count of particular range of runs against different opposition-------------------//
    $scope.runAgainstOppostion = 1;
    $scope.options = [
        {"name": "0-49"},
        {"name": "50-99"},
        {"name": "100-149"},
        {"name": "150-199"},
        {"name": "200-249"},
        {"name": ">=250"}
    ];
    
    $scope.selectOtherRange = function(){
         var property = {
            caption:"Number Of times Run(In Selected Range)",
            subCaption:"By Teams",
            yaxisname:"Number Of times", 
            labelDisplay:"ROTATE"
        };
        $scope.html = 'noOfRunRangeVsTeam.html';
        var array = [];
        if($scope.runAgainstOppostion.name=="0-49")
            array = lessThanfifty;
        else if($scope.runAgainstOppostion.name=="50-99")
            array = fiftyToNintyNine;
        else if($scope.runAgainstOppostion.name=="100-149")
            array = HundredToOneFortyNine;
        else if($scope.runAgainstOppostion.name=="150-199")
            array = OneFiftyToOneNintyNine;
        else if($scope.runAgainstOppostion.name=="200-249")
            array = twoHunderdToTwoFifty;
        else if($scope.runAgainstOppostion.name==">=250")
            array = greaterThanTwoFifty;
         printChart("runId",array,property,"column3d");
    }
    $scope.runAndCountAgainstOpposition = function($event){
        $scope.heading = "Counting the number of Times Run like (50, 100, 150, 200) Scored against opposition";
        $scope.html = 'noOfRunRangeVsTeam.html';
        $scope.showCustom($event);
        var property = {
            caption:"Number Of times Run(In Selected Range)",
            subCaption:"By Teams",
            yaxisname:"Number Of times",
            labelDisplay:"ROTATE"
        };
        setTimeout(function() {
            printChart("runId",lessThanfifty,property,"column3d");
        },1000);
    }
    //-------------------- end -------------------------------------------------------------------------------------------------------//    
    
    //---------------- Batting Average against differnt oppositions-------------------------//
    var battingAverageJson = [];
    $scope.battingAverageFunction = function($event){
        $scope.heading = " Average Batting Score against different teams";
        $scope.html = 'openDialog.html';
        $scope.showCustom($event);
        if(battingAverageJson.length==0){
            for(var i=0;i<battingAverage.length;i++){
                var v = battingAverage[i].totalRun/battingAverage[i].totalMatch;
                v = v.toFixed(2);
                battingAverageJson.push({
                    "label":battingAverage[i].team,
                    "value":v
                });
            }
        }
        var property = {
            caption:"Batting Average vs Team",
            subCaption:"",
            yaxisname:"Batting Average",
            labelDisplay:"ROTATE"
        };
        setTimeout(function() {
        printChart("chart",battingAverageJson,property,"bar3d");
        });
        
    };
    //---------------- End    -----------------------------//
    
    //---------------------- Batting Average on basis of different grounds-----------------------------//
    var groundAverageJson = [];
    $scope.averageRunAtGround = function($event){
        $scope.heading = "Average Run on ground";
        $scope.html = 'openDialog.html';
        $scope.showCustom($event);
        if(groundAverageJson.length==0){
            for(var i=0;i<groundAverage.length;i++){
                var v = groundAverage[i].totalRun/groundAverage[i].totalMatch;
                v = v.toFixed(2);
                groundAverageJson.push({
                    "label":groundAverage[i].ground,
                    "value":v
                });
            }
        }
        var property = {
            caption:"Average score on the Grounds",
            captionFontSize:"25px",
            subCaption:"",
            labelDisplay:"",
            yAxisMinValue:"0",
            yaxisname:"Average Run"
        };
        setTimeout(function() {
        printChart("chart",groundAverageJson,property, "column2d");
        });
    };
    //-----------------------------------------------------end ---------------------------------------------------------------------//
    
    //------------------------------  total runs scored in each year graph ----------------------------------------------------------//
    $scope.yearWiseRuns = function($event){
        $scope.heading = "Total Runs Scored in a particular Calendar year";
        $scope.html = 'openDialog.html';
        $scope.showCustom($event);
        var property = {
            caption:"Total runs in a year",
            subCaption:"",
            xaxisname:"YEAR",
            yaxisname:"Runs",
            labelDisplay:"ROTATE"
        };
        var arr = [];
        for(var i=0;i<$scope.yearWiseTotal.length;i++){
                arr.push({
                    "label":new String($scope.yearWiseTotal[i].label),
                    "value":new String($scope.yearWiseTotal[i].value)
                });
        };
        setTimeout(function() {
            printChart("chart", arr,property, "bar3d");
        },1000);
    }
    //----------------------------------  end -------------------------------------------------------------------------------------//
    
    //------------------  Win / Lost win percentage on basis of run scored in match --------------------------------------------//
    $scope.winLostPercentagrWithScoreRange = function($event){
        $scope.heading = "Match Result On the Basis Of Sachin Score Analysis";
        $scope.html = 'openDialog.html';
        var category = [],
            score1 =[],
            score2 =[];
        angular.forEach($scope.firstInningScore,function(key,value){
            category.push({"label": value});
            score1.push({"value":key});
        });
        angular.forEach($scope.secondInningScore,function(key,v){
            score2.push({"value":key});
        });
        $scope.showCustom($event);        
        setTimeout(function() {
        $scope.msChart("chart", category, score1, score2);
        },1000);   
    };
    
    //-----------------------------------------  end -------------------------------------------------------------------------//
    
    
    //------------ innings Won / Lost graph------------------------------------------------------------------------------//
    $scope.wonLostInInning = "";
    $scope.selectingOptions = [
        {"name": "1stInning"},
        {"name": "2ndInning"},
        {"name": "bothInning"}
    ];
    $scope.selectInning = function(){
        var array =[];
        if($scope.wonLostInInning.name=="1stInning")
            array = $scope.firstInning;
        else if($scope.wonLostInInning.name=="2ndInning")
            array = $scope.secondInning;
        else if($scope.wonLostInInning.name=="bothInning")
            array = $scope.bothInning;
        
        array = $scope.dataFormat(array);
        $scope.msChart("inningId", array[0], array[1], array[2]);
    };
    
    $scope.inningWonLost = function($event){
        $scope.heading = "Inning won And lost (count) of matches";
        $scope.html = 'winlostDialog.html';
        $scope.showCustom($event);
        var array = $scope.dataFormat($scope.firstInning);
        setTimeout(function() {
            $scope.msChart("inningId", array[0], array[1], array[2]);
        },1000);     
    };
    
    //------------------------ end ----------------------------------------------------------------------------------------//
    
    
/* ----------  Number of win / lost -------------------------------------------------
    1. firstInning batting 
    2. secondinning batting
    3. including bothinning batting
*/
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
    
    $scope.firstInning = [];
    $scope.secondInning = [];
    $scope.bothInning = [];
      
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

    
/*-------------------------------------------- Wicket & catches Analysis start--------------------------------------------------------
1. each number of wickets taken in match
        total: no of times
        value: no of times india won the match
        
2. each number of catch taken in match
        total: no of times
        value: no of times india won the match
        
 so on the basis of those we can easily calculate the win % on the basis of wickets and catches ...
*/
var wickets = [];
var catches = [];
function wicketAnalysis(wicket, result, wickets){
    var isANumber = isNaN(wicket) === false;
    if(isANumber){
        var found = false;
        for(var i=0;i<wickets.length;i++){
            if(wickets[i].label==wicket){
                if(result=="won")
                    wickets[i].value += 1;
                wickets[i].total += 1;
                found = true;
                break;
            }
        }
        if(!found){
            var v=0;
            if(result=="won")
                v=1;
            wickets.push({
                "label":wicket,
                "value":v,
                "total":1
            });
        }
    }
}
    
    
    
    
    
/*-------------------------------------- Average Batting Analysis  -----------
 
1. Batting Average on the Basis of Ground
2. Batting Average on the Basis of opposition 
3. Count of run score against Different opposition (run like- 50 , 100, 150, 200)

 */
    
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
    
    $scope.totalMatch = 0;
    var lessThanfifty = [],
        fiftyToNintyNine = [],
        HundredToOneFortyNine = [],
        OneFiftyToOneNintyNine = [],
        twoHunderdToTwoFifty = [],
        greaterThanTwoFifty = [];
    // note - a store all 
    function updateTeam(array,team){
        var found = false;
        for(var i=0;i<array.length;i++){
            if(array[i].label==team){
                array[i].value += 1;
                found = true;
                break;
            }
        }
        if(!found){
            array.push({
                "label":team,
                "value":1
            });
        }
     }
    var battingAverage = [],
        groundAverage = [];
$scope.scoreRange = function(score, match, result, team, ground){
        score = String(score);
        var notout = false;
        if (score.charAt(score.length - 1) == '*') {
            score = score.substr(0, score.length - 1);
            notout = true;
        }
            score = parseInt(score);
            var index = -1;
            $scope.totalMatch = $scope.totalMatch+1;
            if(score>=0 && score<50){
                match["0_to_49"] = match["0_to_49"] + 1;
                updateTeam(lessThanfifty,team);
                index = 0;
            }
            else if(score>=50 && score<100){
                match["50_to_99"] = match["50_to_99"] + 1;
                updateTeam(fiftyToNintyNine,team);
                index=1;
            }
            else if(score>=100 && score<150){
                match["100_to_149"] = match["100_to_149"] + 1;
                updateTeam(HundredToOneFortyNine,team);
                index=2;
            }
            else if(score>=150 && score<200){
                match["150_to_199"] = match["150_to_199"] + 1;
                updateTeam(OneFiftyToOneNintyNine,team);
                index=3;
            }
            else if(score>=200 && score<250){
                match["200_to_249"] = match["200_to_249"] + 1;
                updateTeam(twoHunderdToTwoFifty,team);
                index=4;
            }
            else if(score>=250 && score<300){
                match["250_to_299"] = match["250_to_299"] + 1;
                updateTeam(greaterThanTwoFifty,team);
                index=5;
            }
        if(index!=-1){
            $scope.scoreAndWinPercentage[index].total+=1;
            if(result=="won"){
                $scope.scoreAndWinPercentage[index].value+=1;
            }
        }
        var isANumber = isNaN(score) === false;
        
        if(isANumber){
            var found = false,
                v = 1;
            
            if(notout)
                v = 0;
            for(var i=0;i<battingAverage.length;i++){
                
                if(battingAverage[i].team==team){
                    battingAverage[i].totalRun += score;
                    battingAverage[i].totalMatch += v;
                    found = true;
                    break;
                }
            }
            if(!found){
                battingAverage.push({
                    "team":team,
                    "totalRun":score,
                    "totalMatch":v
                });
            }
        }
        
        var found = false;
        for(var i=0;i<groundAverage.length;i++){
                if(groundAverage[i].ground==ground){
                    groundAverage[i].totalRun += score;
                    groundAverage[i].totalMatch += 1;
                    found = true;
                    break;
                }
            }
            if(!found){
                groundAverage.push({
                    "ground":ground,
                    "totalRun":score,
                    "totalMatch":1
                });
            }
        return match;
    }
    
/*----------------------------------------------- Start of Analysis on the Total run / year 
1. Year wise run list
2. first inning runs
3. seconds inning runs
4. total match played in first inning
5. total match played in second inning
-----------------------------------
*/
$scope.yearWiseTotal = [];
$scope.firstInningRuns;
$scope.secondInningRuns;
$scope.firstInningMatch;
$scope.secondInningMatch;
$scope.yearTotalScore = function(year,run,inning){
        var found = false,
            out=true;
        run = String(run);
        if (run.charAt(run.length - 1) == '*') {
            out = false;
            run = run.substr(0, run.length - 1);
        }
        var isANumber = isNaN(run) === false;
        for(var i =0;i<$scope.yearWiseTotal.length;i++){
            if($scope.yearWiseTotal[i].label ==year){
                if (isANumber){
                    $scope.yearWiseTotal[i].value = $scope.yearWiseTotal[i].value + parseInt(run)*1000;
                }
                found = true;
                break;
            }
        }
        if(!found && isANumber){
            $scope.yearWiseTotal.push({
               "label":year,
                "value":parseInt(run)*1000
            });
            
        }
        
        if(inning=="1st" && isANumber){
            $scope.firstInningRuns = ($scope.firstInningRuns|0) + parseInt(run);
            if(out){
            $scope.firstInningMatch = ($scope.firstInningMatch|0)+1;
            }
        }
        else if(inning=="2nd" && isANumber){
            $scope.secondInningRuns = ($scope.secondInningRuns|0)+ parseInt(run);
            if(out){
            $scope.secondInningMatch = ($scope.secondInningMatch|0)+1;
            }
        }
    }

//----------------------------------------------- End of Analysis on the Total run / year -----------------------------------//
        
/*-------------------------------------------Ground Analysis Start-----------------------------------------------------------
On the Basis of Grounds:- 
    1. 1st inning -
         1. no of match won
         2. no of match lost
         store it in  $scope.groundFirst
    2. 2nd inning -
         1. no of match won
         2. no of match lost
         store it in  $scope.groundSecond
    3. 1st & 2nd inning both.
        store it in  $scope.groundBoth
        
*/
$scope.groundFirst = [];
$scope.groundSecond = [];
$scope.groundBoth = [];
function update(array, index, res){
    if(res=="won"){
        array[index].won += 1;
    }
    else if(res=="lost"){
        array[index].lost += 1;
    }
    return array;
}
    
$scope.groundAnalysis = function(ground, inning , result){
    if(inning=="1st"){
        var found = false;
      for(var i=0;i<$scope.groundFirst.length;i++){
          if($scope.groundFirst[i].label==ground){
               $scope.groundFirst = update($scope.groundFirst, i, result);
                found = true;
                break;
           }
      }
      if(!found){
          var w, l;
          if(result=="won"){
              w =1;
              l=0;
          }
          else{
            w =0;
            l=1;
          }
          
          $scope.groundFirst.push({
             "label":ground,
             "won":w,
             "lost":l
          });
      }
    }
    else if(inning=="2nd"){
        var found = false;
        for(var i=0;i<$scope.groundSecond.length;i++){
          if($scope.groundSecond[i].label==ground){
               $scope.groundSecond = update($scope.groundSecond, i, result);
                found = true;
                break;
           }
      }
        if(!found){
          var w, l;
          if(result=="won"){
              w =1;
              l=0;
          }
          else{
            w =0;
            l=1;
          }
          
          $scope.groundSecond.push({
             "label":ground,
             "won":w,
             "lost":l
          });
      }
    }
    var found = false;
    for(var i=0;i<$scope.groundBoth.length;i++){
          if($scope.groundBoth[i].label==ground){
               $scope.groundBoth = update($scope.groundBoth, i, result);
                found =true;
                break;
           }
      }
    if(!found){
          var w, l;
          if(result=="won"){
              w =1;
              l=0;
          }
          else{
            w =0;
            l=1;
          }
          
          $scope.groundBoth.push({
             "label":ground,
             "won":w,
             "lost":l
          });
      }
    
}

//--------------------------------------------  ground analysis end-------------------------------------------------------//
    
//----------------------------------------- Indian/foreign ground records ------------------------------------------------//
var groundRecord = [];
var indianGround = [
	"Mumbai",
	"Mohali",
	"Ahmedabad",
	"Chennai",
	"Nagpur",
	"Delhi",
	"Bangalore",
	"Gwalior",
	"Jaipur",
	"Kolkata",
	"Cuttack",
	"Rajkot",
	"Guwahati",
	"Hyderabad (Deccan)",
	"Vadodara",
	"Kanpur",
    "Jamshedpur",
    "Faridabad",
    "Pune",
    "Indore",
    "Jalandhar",
    "Visakhapatnam",
    "Amritsar",
    "Mumbai (BS)",
    "Hyderabad (Sind)",
    "Kochi",
    "Jodhpur",
    "Chandigarh"
];

$scope.inIndiaHundred=0;
$scope.inIndiaRun=0;
$scope.inIndiaMatch=0;
$scope.inIndiaWon=0;
$scope.outOfIndiaHundred=0;
$scope.outOfIndiaRun=0;
$scope.outOfIndiaMatch=0;
$scope.outOfIndiaWon=0;
        
var indiaGroundRecord =[],
    outOfIndiaGroundRecord =[];
    
//console.log(inIndiaHundred, inIndiaRun, inIndiaMatch, inIndiaWon,indiaGroundRecord);
//console.log(outOfIndiaHundred, outOfIndiaRun, outOfIndiaMatch, outOfIndiaWon, outOfIndiaGroundRecord);
    
function groundAndRecords(ground, result, score){
    score = String(score);
    if (score.charAt(score.length - 1) == '*') {
        score = score.substr(0, score.length - 1);
    }
    var isANumber = isNaN(score) === false;
    if(!isANumber)
        score=0;
    if(indianGround.indexOf(ground)>-1){
        if(score>=100){
           $scope.inIndiaHundred +=1; 
        }
        if(result=="won")
            $scope.inIndiaWon +=1;
        $scope.inIndiaRun +=parseInt(score);
        $scope.inIndiaMatch +=1;
        var found = false;
        for(var i=0;i<indiaGroundRecord.length;i++){
            if(indiaGroundRecord[i].label==ground){
                if(result=="won"){
                    indiaGroundRecord[i].won += 1;
                }
                else
                    indiaGroundRecord[i].lost += 1;    
                found = true;
                break;
            }
        }
        if(!found){
            var v=0,l=0;
            if(result=="won")
                v=1;
            else
                l=1;
            indiaGroundRecord.push({
                "label":ground,
                "won":v,
                "lost":l
            });
        }
    }
    else{
        if(score>=100){
           $scope.outOfIndiaHundred +=1; 
        }
        if(result=="won")
            $scope.outOfIndiaWon +=1;
        $scope.outOfIndiaRun +=parseInt(score);
        $scope.outOfIndiaMatch +=1;
        var found = false;
        for(var i=0;i<outOfIndiaGroundRecord.length;i++){
            if(outOfIndiaGroundRecord[i].label==ground){
                if(result=="won"){
                    outOfIndiaGroundRecord[i].won += 1;
                }
                else
                    outOfIndiaGroundRecord[i].lost += 1;
                found=true;
                break;
            }
        }
        if(!found){
            var v=0,l=0;
            if(result=="won")
                v=1;
            else
                l=1;
            outOfIndiaGroundRecord.push({
                "label":ground,
                "won":v,
                "lost":l
            });
        }
    }    
}

//----------------------------------------- End of Indian/foreign ground records -----------------------//
//----------------------------------------------Start of Url -------------------------------------------------------------//
$scope.firstInningWin;
$scope.firstInningLost;
$scope.secondInningWin;
$scope.secondInningLost;
$scope.win = 0;
$scope.lost = 0;
$scope.tieMatches = 0;
   
var Url   = "sachin.json";
$scope.initialize = function(){
    $http.get(Url).then(function(response){
     var deferred = $q.defer();
    //---------------------start of loop for getting method calls on the basis of data-----------------------------------//
    angular.forEach(response.data, function(value, key) {
            
            var year = new Date(value['date']).getFullYear();
            $scope.yearTotalScore(year,value['batting_score'],value['batting_innings']);
            
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
                $scope.firstInningScore = $scope.scoreRange(value['batting_score'],$scope.firstInningScore, value['match_result'], value['opposition'], value['ground']);
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
                $scope.secondInningScore =$scope.scoreRange(value['batting_score'],$scope.secondInningScore,value['match_result'],value['opposition'], value['ground']);
                $scope.secondInning = $scope.checkMatchResult(value['match_result'],value['opposition'],$scope.secondInning);
            }
            
            $scope.bothInning = $scope.checkMatchResult(value['match_result'],value['opposition'],$scope.bothInning);
            $scope.groundAnalysis(value['ground'],value['batting_innings'],value['match_result']);
        
            wicketAnalysis(value['wickets'],value['match_result'],wickets);
            wicketAnalysis(value['catches'],value['match_result'],catches);
            groundAndRecords(value['ground'], value['match_result'], value['batting_score']);
    });
    
    //---------------------------------- end of loop ------------------------------------------------------------------//
//console.log(inIndiaHundred, inIndiaRun, inIndiaMatch, inIndiaWon,indiaGroundRecord);
//console.log(outOfIndiaHundred, outOfIndiaRun, outOfIndiaMatch, outOfIndiaWon, outOfIndiaGroundRecord);
        return deferred.promise;
        
    });

};
//----------------------------- End of get Api call-------------------------------------------------------------------------------//
    
//------------------- Start of Pie Charts -----------------------------------//
function pieChart(id,data){
    FusionCharts.ready(function () {
    var demographicsChart = new FusionCharts({
        type: 'pie3d',
        renderAt: id,
        width: '450',
        height: '300',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Win Percentage in India Vs OutOfIndia",
                "startingAngle": "120",
                "showLabels": "0",
                "showLegend": "1",
                "enableMultiSlicing": "0",
                "slicingDistance": "15",
                //To show the values in percentage
                "showPercentValues": "1",
                "showPercentInTooltip": "0",
                "plotTooltext": "Area : $label",
                "theme": "fint"
            },
            "data": data
        }
    });
    demographicsChart.render();
});
}
//------------------- End of Pie Charts -----------------------------------//
    
//-------------------------Columns & Bar charts ----------------------------------------------------------------------------------// 
function printChart(id,array, p,type){
    FusionCharts.ready(function(){  
        var fusioncharts = new FusionCharts({
            type: type,
            renderAt: id,
            width: '100%',
            height: '400',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "theme": "fint,zune,ocean",
                    "subCaption": "winning percentage ",
                    "xaxisname": "teams",
                    "yaxisname": "percentage",
                    "yAxisMinValue": "0",
                    "placeValuesInside": "0",
                    "valueFontColor": "#FFFFFF",
                    "valueBgColor": "#000000",
                    "valueBgAlpha": "50",
                    "labelDisplay":"ROTATE",
                    "slantLabels":'1',
                    "thousandSeparatorPosition": "2,3"
                },
                "data": array
            }
        });
    fusioncharts.render();
    fusioncharts.setChartAttribute(p);
    });
}
    
//-------------------------- End of Percenatge chart -----------------------------------------------------------------//
    
$scope.msChart = function(id, category, win, lost){
    FusionCharts.ready(function () {
    var revenueChart = new FusionCharts({
        type: 'mscolumn2d',
        renderAt: id,
        width: '100%',
//        height: '100%',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Comparison of win & lost of teams",
                "xAxisname": "Teams",
                "yAxisName": "Matches ",
                "plotFillAlpha" : "80",

                //Cosmetics
                "paletteColors" : "#1aaf5d,#e12727",
                "baseFontColor" : "#333333",
                "baseFont" : "Helvetica Neue,Arial",
//                "labelDisplay":"ROTATE",
//                "slantLabels":'1',
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
                "legendItemFontSize" : "10",
                "legendItemFontColor" : "#666666"                
            },
            "categories": [
                {"category": category}
            ],
            "dataset": [
                {   "seriesname": "win",
                    "data": win
                }, 
                {   "seriesname": "lost",
                    "data": lost
                }
            ]
        }
    }); 
    revenueChart.render();
});    
}
}