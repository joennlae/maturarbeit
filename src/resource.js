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
var startUpMessages = ["yolo","My Name..","Pizza?","Hungry?","Good guy","Brou?","GG WP","Gl hf","RKO","invade?"];
var messages = ["So close...","Next Time","Keep on","Never surrender", "Biip Biip","Hungry?","Pizzasalami?"];
var ranks = ["uncompleted","Finisher","Silber","Global Master Elite"];

var positionMarkerArray =   [[10,10,0.5],[0,0,0.5],[0,0,0.5],[0,0,0.5],[0,5,0.5],[0,0,0.5],[0,0,0.35],[-5,2,0.5],[0,-2,0.5],[0,0,0.5],[0,-5,0.5],/*11*/[0,0,0.5],[0,3,0.5],[0,-5,0.5],[0,2,0.45],[0,-2,0.5],[0,0,0.5],[0,3,0.5],[0,2,0.45],[0,0,1.5],[0,0,0.5],[0,0,0.5],[0,0,0.5],[0,0,0.5]];

//gen Levels with pointscalc https://jsfiddle.net/sye41f83/

var levelsArray =  [[10,10,1,0,0,100,10,11000,12000,1],  //rows | columns | seed | red quads | blue quads | min points > 0 | max Moves | points for rank 2 | points for rank 3 | Gamemode
					[15,15,101,1,0,1,25,5680,7680,1], 
					[25,26,2,3,0,100,200,16000,17000,1],
					[30,30,3,3,0,100,200,26000,27000,3]];

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
