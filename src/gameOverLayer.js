var gameOverLayer = cc.LayerColor.extend({
    labelCoin: null,
    labelMeter: null,
    points: 0,
    quads: 0,
	ls: null,
    // constructor
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super(cc.color(0, 0, 0, 20));
        var winSize = cc.director.getWinSize();
        this.getPoints();
		this.ls = cc.sys.localStorage;
		
		
        this.labelCoin = new cc.LabelTTF("Quads: "+this.quads, "Quicksand-Light", 80);
        this.labelCoin.setColor(cc.color(0,0,0));//black color
        this.labelCoin.setPosition(cc.p(winsize.width/2, winsize.height/2));
        this.addChild(this.labelCoin);

        this.labelMeter = new cc.LabelTTF(this.points+" Points", "Quicksand-Light", 80);
        this.labelMeter.setPosition(cc.p(winsize.width/2, winsize.height/2-100));
        this.labelMeter.setColor(cc.color(0,0,0));
        this.addChild(this.labelMeter);
		
		this.recognizer = new SimpleRecognizer();
		
		this.swipeLabel = new cc.LabelTTF("Swipe...", "Quicksand-Light", winsize.height/10);
        this.swipeLabel.setColor(cc.color(0,0,0,100));//black color
		this.swipeLabel.setPosition(cc.p(winsize.width/2, winsize.height/4));
        this.addChild(this.swipeLabel);
		
		cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
			gOL: this,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
		
		this.save();
    },
    onRestart:function (sender) {
        cc.director.resume();
        cc.director.runScene(new levelSelectorScene());
    },
    getPoints:function(){
        var ls = cc.sys.localStorage;
        this.quads = ls.getItem(2);
        this.points = ls.getItem(1);
    },
	save : function(){
		if (this.ls.getItem(99) == this.ls.getItem(100)){
			var levelNum = this.ls.getItem(99);
			
			saveArray = JSON.parse(this.ls.getItem(101));
			cc.log(saveArray);
			saveArray[levelNum-1][0] = JSON.parse(this.ls.getItem(1));//points
			saveArray[levelNum-1][1] = JSON.parse(this.ls.getItem(2));//redquads
			//saveArray[levelNum][2] = this.ls.getItem(3);//bluequads
			saveArray[levelNum-1][3] = 3; //starfunction TODO
			this.ls.setItem(101, JSON.stringify(saveArray));
			this.ls.setItem(100, JSON.parse(this.ls.getItem(99)) + 1);
			cc.log(this.ls.getItem(101));
		}
		else {
			var levelNum = JSON.parse(this.ls.getItem(99))-1;
			var saveArray = JSON.parse(this.ls.getItem(101));
			if (saveArray[levelNum][0] < this.ls.getItem(1)) saveArray[levelNum][0] = JSON.parse(this.ls.getItem(1));
			if (saveArray[levelNum][1] < this.ls.getItem(2)) saveArray[levelNum][1] = JSON.parse(this.ls.getItem(2));
			//if (saveArray[levelNum][2] < this.ls.getItem(3)) saveArray[levelNum][2] = this.ls.getItem(3);
			if (saveArray[levelNum][3] < 3 ) saveArray[levelNum][3] = 3;//starfunction
			this.ls.setItem(101, JSON.stringify(saveArray));
			cc.log(this.ls.getItem(101));
		}
	},
	onTouchBegan:function(touch, event) {
        var pos = touch.getLocation();
        event.getCurrentTarget().recognizer.beginPoint(pos.x, pos.y);
        return true;
    },

    onTouchMoved:function(touch, event) {
        var pos = touch.getLocation();
	event.getCurrentTarget().recognizer.movePoint(pos.x, pos.y);
    },

    onTouchEnded:function(touch, event) {
        var rtn = event.getCurrentTarget().recognizer.endPoint();
		cc.log(rtn);
        switch (rtn) {
			case "left":
				this.gOL.onRestart();
				break;
			case "right":
				this.gOL.onRestart();
				break;			
            default:
                break;
        }
	}
});
