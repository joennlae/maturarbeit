var pauseLayer = cc.LayerColor.extend({
    labelCoin: null,
    labelMeter: null,
    points: 0,
    quads: 0,
    moves: 0,
	ls: null,
    // constructor
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super(cc.color(0, 0, 0, 50));
        var winSize = cc.director.getWinSize();
        this.getPoints();
		this.ls = cc.sys.localStorage;

        this.labelQuads = new cc.LabelTTF(this.quads+ " Quads" + " (" + (this.quads-levelsArray[this.ls.getItem(99)-1][3]) + ")", "Quicksand-Light", 80);
        this.labelQuads.setColor(cc.color(0,0,0));//black color
        this.labelQuads.setPosition(cc.p(winsize.width/2, winsize.height/2));
        this.addChild(this.labelQuads);

        this.labelPoints = new cc.LabelTTF(this.points+" Points" + " (" + (this.points-levelsArray[this.ls.getItem(99)-1][5]) + ")", "Quicksand-Light", 80);
        this.labelPoints.setPosition(cc.p(winsize.width/2, winsize.height/2-100));
        this.labelPoints.setColor(cc.color(0,0,0));
        this.addChild(this.labelPoints);

        this.movesLabel = new cc.LabelTTF(this.moves+" Moves" + " (" + (this.moves-levelsArray[this.ls.getItem(99)-1][6]) + ")", "Quicksand-Light", 80);
        this.movesLabel.setPosition(cc.p(winsize.width/2, winsize.height/2+100));
        this.movesLabel.setColor(cc.color(0,0,0));
        this.addChild(this.movesLabel);

        if (this.quads >= levelsArray[this.ls.getItem(99)-1][3]){
            this.labelQuads.setString(this.quads+ " Quads" + " (" + "+" + (this.quads-levelsArray[this.ls.getItem(99)-1][3]) + ")");
            this.labelQuads.setColor(cc.color(0,150,0));
        }
        else {
            this.labelQuads.setString(this.quads+ " Quads" + " (" + (this.quads-levelsArray[this.ls.getItem(99)-1][3]) + ")");
            this.labelQuads.setColor(cc.color(150,0,0));
        }

        if (this.points >= levelsArray[this.ls.getItem(99)-1][5]){
            this.labelPoints.setString(this.points+" Points" + " (" + "+" + (this.points-levelsArray[this.ls.getItem(99)-1][5]) + ")");
            this.labelPoints.setColor(cc.color(0,150,0));
        }
        else {
            this.labelPoints.setString(this.points+" Points" + " (" + (this.points-levelsArray[this.ls.getItem(99)-1][5]) + ")");
            this.labelPoints.setColor(cc.color(150,0,0));
        }

        if (this.moves <= levelsArray[this.ls.getItem(99)-1][6]){
            this.movesLabel.setString(this.moves+" Moves" + " (" + (this.moves-levelsArray[this.ls.getItem(99)-1][6]) + ")");
            this.movesLabel.setColor(cc.color(0,150,0));
        }
        else{
            this.movesLabel.setString(this.moves+" Moves" + " (" + "+" + (this.moves-levelsArray[this.ls.getItem(99)-1][6]) + ")");
            this.movesLabel.setColor(cc.color(150,0,0));
        }
		
		this.recognizer = new SimpleRecognizer();
		
		this.swipeLabel = new cc.LabelTTF("Swipe to continue", "Quicksand-Light", winsize.height/20);
        this.swipeLabel.setColor(cc.color(0,0,0,100));//black color
		this.swipeLabel.setPosition(cc.p(winsize.width/2, winsize.height/4));
        this.addChild(this.swipeLabel);

        this.backLabel = new cc.LabelTTF("Back", "Quicksand-Light" , winsize.height/16);
        this.backLabel.setColor(cc.color(0,0,0));//black color
        //this.startLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
        this.backLabelP = new cc.LabelTTF("Back", "Quicksand-Light", winsize.height/16);
        this.backLabelP.setColor(cc.color(0,0,150));

        var backItemLabel = new cc.MenuItemSprite(
            this.backLabel,
            this.backLabelP, 
            this.onBack, this);
        var backMenu = new cc.Menu(backItemLabel);  
        //backMenu.setAnchorPoint(1,0); 
        backMenu.setPosition(cc.p(100,winsize.height-(winsize.height/16+10)));
        this.addChild(backMenu,0,13);
		
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
        this.getParent().addPauseLabel();
        this.removeFromParent();
    },
    onBack : function(){
        cc.director.resume();
        cc.director.runScene(new levelSelectorScene());
    },
    getPoints:function(){
        var ls = cc.sys.localStorage;
        this.quads = ls.getItem(2);
        this.points = ls.getItem(1);
        this.moves = ls.getItem(3);
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
