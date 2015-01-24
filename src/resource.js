var res = {
    start_n_png : "res/start_n.png",
    start_s_png : "res/start_s.png",
    rails_plist : "res/rails.plist",
    rails_png   : "res/rails.png",
    restart_n	: "res/restart_n.png",
    restart_s	: "res/restart_s.png",
	font		: "res/Quicksand-Light.ttf"
};

var levelsArray =  [[25,26,1,3,0,15000,0],   //rows | columns | seed | red quads | blue quads | min points
					[25,26,2,3,0,15000,0]];

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
