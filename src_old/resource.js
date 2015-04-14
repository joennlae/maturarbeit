var res = {
    rails_plist : "res/rails.plist",
    rails_png   : "res/rails.png",
	font		: "res/Quicksand-Light.ttf",
	vote_true	: "res/vote_true.png",
	vote_false	: "res/vote_false.png",
	forward		: "res/forward.png",
	arrow_ld	: "res/arrow_leftdown.png",
	arrow_lu	: "res/arrow_leftup.png",
	arrow_rd	: "res/arrow_rightdown.png",
	arrow_ru	: "res/arrow_rightup.png",
	sound		: "res/background.wav"
};
var posNumbers = [0.5,3,-1,1];
var startUpMessages = ["Feel it!","Ouuuh","Pizza?","Hungry?","Good guy","Bro?","Tüüüt","Gl hf","RKO","invade?"];
var messages = ["So close...","Next Time","Keep on","/ff ?", "Biip Biip","Hungry?","Pizzasalami?"];
var ranks = ["DNF","Finisher","QuiteGood","SüperElite"];

var positionMarkerArray =   [[10,10,0.5],[0,0,0.5],[0,0,0.5],[0,0,0.5],[0,5,0.5],[0,0,0.5],[0,0,0.35],[-5,2,0.5],[0,-2,0.5],[0,0,0.5],[0,-5,0.5],/*11*/[0,0,0.5],[0,3,0.5],[0,-5,0.5],[0,2,0.45],[0,-2,0.5],[0,0,0.5],[0,3,0.5],[0,2,0.45],[0,0,1.5],[0,0,0.5],[0,0,0.5],[0,0,0.5],[0,0,0.5]];

//gen Levels with pointscalc https://jsfiddle.net/sye41f83/

var levelsArray = [ [15,15,101,1,0,1,25,5680,7680,1],  	//rows | columns | seed | red quads | blue quads | min points > 0 | max Moves | points for rank 2 | points for rank 3 | Gamemode
					[20,10,66,3,0,1,40,9800,16800,1],
					[20,15,65,3,0,1,40,13320,22320,1],
					[20,10,102,3,0,1,45,13320,19320,1],
					[20,5,102,1,0,1,30,11320,20320,1],
					[20,10,57,5,0,1,55,15800,32800,1],
					[20,10,65,4,0,1,45,8320,14320,1],
					[25,15,68,7,0,1,90,50600,63600,1],
					[25,15,69,8,0,1,90,18960,44960,1],
					[25,15,70,6,0,1,75,32600,49600,1],//10
					[25,10,70,19,0,1,110,39440,72440,1],
					[25,10,72,50,0,1,180,846600,904600,1],
					[25,15,74,3,0,1,45,10280,14280,1],
					[30,20,72,14,0,1,100,88400,105400,1],
					[30,15,70,8,0,1,85,29400,41400,1],
					[30,15,77,6,0,1,85,17080,24080,1],
					[30,20,77,6,0,1,80,19080,25080,1],
					[30,15,81,10,0,1,100,38920,82920,1],
					[30,20,81,5,0,1,90,10920,19920,1],
					[30,15,84,10,0,1,110,52400,61400,1],//20 
					[20,10,119,1,2,1,50,17640,45640,3],
					[25,10,120,4,3,1,80,21400,39400,3],
					[25,10,123,2,2,1,70,13600,20600,3],
					[25,10,124,0,4,1,80,15600,25600,3],
					[25,10,126,0,3,1,75,16960,20960,3],
					[30,15,127,2,1,1,65,13080,20080,3],
					[25,15,129,0,3,1,60,13600,17600,3],
					[30,10,130,5,4,1,90,23240,30240,3],
					[30,15,134,5,6,1,140,42240,46240,3],
					[30,10,79,14,13,1,185,69400,111400,3]];



var levelsArrayOld =  [[10,10,1,0,0,100,10,11000,12000,1],  //rows | columns | seed | red quads | blue quads | min points > 0 | max Moves | points for rank 2 | points for rank 3 | Gamemode
					[15,15,101,1,0,1,25,5680,7680,1], 
					[25,26,2,3,0,100,200,16000,17000,1],
					[30,30,3,3,0,100,200,26000,27000,3]];

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
