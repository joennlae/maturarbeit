var gameBetaOverLayer = cc.LayerColor.extend({
    labelCoin: null,
    labelMeter: null,
    points: 0,
    quads: 0,
    moves: 0,
    quadsBlue: 0,
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

        this.labelQuads = new cc.LabelTTF(this.quads+ " Quads", "Quicksand-Light", 80);
        this.labelQuads.setColor(cc.color(0,0,0));//black color
        this.labelQuads.setPosition(cc.p(winsize.width/2, winsize.height/2));
        this.addChild(this.labelQuads);

        this.labelQuadsBlue = new cc.LabelTTF(this.quadsBlue+ " QuadsBlue", "Quicksand-Light", 80);
        this.labelQuadsBlue.setColor(cc.color(0,0,0));//black color
        this.labelQuadsBlue.setPosition(cc.p(winsize.width/2, winsize.height/2+200));
        this.labelQuadsBlue.visible = false;
        this.addChild(this.labelQuadsBlue);

        this.labelPoints = new cc.LabelTTF(this.points+" Points", "Quicksand-Light", 80);
        this.labelPoints.setPosition(cc.p(winsize.width/2, winsize.height/2-100));
        this.labelPoints.setColor(cc.color(0,0,0));
        this.addChild(this.labelPoints);

        if(this.ls.getItem(666)==2 || this.ls.getItem(666)==3){
            this.labelQuadsBlue.visible = true;
        }

        this.movesLabel = new cc.LabelTTF(this.moves+" Moves", "Quicksand-Light", 80);
        this.movesLabel.setPosition(cc.p(winsize.width/2, winsize.height/2+100));
        this.movesLabel.setColor(cc.color(0,0,0));
        this.addChild(this.movesLabel);
		
		this.recognizer = new SimpleRecognizer();
		
		this.swipeLabel = new cc.LabelTTF("Swipe to continue", "Quicksand-Light", winsize.height/20);
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
		
    },
    onRestart:function (sender) {
        cc.director.resume();
        cc.director.runScene(new menuScene());
    },
    getPoints:function(){
        var ls = cc.sys.localStorage;
        this.quads = ls.getItem(2);
        this.points = ls.getItem(1);
        this.moves = ls.getItem(3);
        if (ls.getItem(666)==2 || ls.getItem(666)==3) this.quadsBlue = JSON.parse(ls.getItem(4));
        cc.log(this.moves);
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
