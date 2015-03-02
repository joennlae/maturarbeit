var res = {
    start_n_png : "res/start_n.png",
    start_s_png : "res/start_s.png",
    rails_plist : "res/rails.plist",
    rails_png   : "res/rails.png",
    restart_n	: "res/restart_n.png",
    restart_s	: "res/restart_s.png",
	font		: "res/Quicksand-Light.ttf"
};

var levelsArray =  [[25,26,1,3,0,10000,50],   //rows | columns | seed | red quads | blue quads | min points | max Moves
					[25,26,2,3,0,15000,50],
					[30,30,3,4,0,25000,54]];

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
