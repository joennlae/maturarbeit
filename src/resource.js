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
	arrow_ru	: "res/arrow_rightup.png"
};
var posNumbers = [0.5,3];
var startUpMessages = ["yolo","My Name..","Pizza?","Hungry?","Good guy","Brou?","GG WP","Gl hf","RKO","invade?"];
var messages = ["So close...","Next Time","Keep on","Never surrender", "Biip Biip","Hungry?","Pizzasalami?"];
var ranks = ["uncompleted","Finisher","Silber","Global Master Elite"];

var levelsArray =  [[10,10,1,0,0,100,10,11000,12000,1],   //rows | columns | seed | red quads | blue quads | min points | max Moves | points for rank 2 | points for rank 3
					[25,26,2,3,0,100,200,16000,17000,1],
					[30,30,3,0,0,100,200,26000,27000,1]];

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
