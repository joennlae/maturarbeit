var gameOverLayer = cc.LayerColor.extend({
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
        this._super(cc.color(0, 0, 0, 20));
        var winSize = cc.director.getWinSize();
        this.getPoints();
		this.ls = cc.sys.localStorage;
        saveArray = JSON.parse(this.ls.getItem(101));

        this.levelCompleteLabel = new cc.LabelTTF("Level completed", "Quicksand-Light", winSize.height/6);
        this.levelCompleteLabel.setPosition(cc.p(winsize.width/2, winsize.height/4*3));
        this.levelCompleteLabel.setColor(cc.color(0,150,0));

        this.againLabel = new cc.LabelTTF("You did it again!", "Quicksand-Light", winSize.height/6);
        this.againLabel.setPosition(cc.p(winsize.width/2, winsize.height/4*3));
        this.againLabel.setColor(cc.color(0,150,0));

        this.closeLabel = new cc.LabelTTF("So close...", "Quicksand-Light", winSize.height/8);
        this.closeLabel.setPosition(cc.p(winsize.width/2, winsize.height/4*3));
        this.closeLabel.setColor(cc.color(0,0,0));


        if (saveArray[this.ls.getItem(99)-1][5] == 0 && this.points >= levelsArray[this.ls.getItem(99)-1][5] && this.quads >= levelsArray[this.ls.getItem(99)-1][3] && this.moves <= levelsArray[this.ls.getItem(99)-1][6]){
            this.addChild(this.levelCompleteLabel);
            this.save();
        }
        else if (saveArray[this.ls.getItem(99)-1][5] == 1 && this.points >= levelsArray[this.ls.getItem(99)-1][5] && this.quads >= levelsArray[this.ls.getItem(99)-1][3] && this.moves <= levelsArray[this.ls.getItem(99)-1][6]){
            this.addChild(this.againLabel);
            this.save();
        }
        else{
            this.addChild(this.closeLabel);
        }

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
        cc.director.runScene(new levelSelectorScene());
    },
    getPoints:function(){
        var ls = cc.sys.localStorage;
        this.quads = ls.getItem(2);
        this.points = ls.getItem(1);
        this.moves = ls.getItem(3);
        cc.log(this.moves);
    },
	save : function(){ //TODO Moves Adding
		if (this.ls.getItem(99) == this.ls.getItem(100)){
			var levelNum = this.ls.getItem(99);
			
			saveArray = JSON.parse(this.ls.getItem(101));
			//cc.log(saveArray);
			saveArray[levelNum-1][0] = JSON.parse(this.ls.getItem(1));//points
			saveArray[levelNum-1][1] = JSON.parse(this.ls.getItem(2));//redquads
			//saveArray[levelNum][2] = this.ls.getItem(3);//bluequads
			saveArray[levelNum-1][3] = 3; //starfunction TODO
            saveArray[levelNum-1][4] = JSON.parse(this.ls.getItem(3));
            saveArray[levelNum-1][5] = 1; //LevelCheck Number | done

			this.ls.setItem(101, JSON.stringify(saveArray));
			this.ls.setItem(100, JSON.parse(this.ls.getItem(99)) + 1);
			//cc.log(this.ls.getItem(101));
		}
		else {
			var levelNum = JSON.parse(this.ls.getItem(99))-1;
			var saveArray = JSON.parse(this.ls.getItem(101));
			if (saveArray[levelNum][0] < this.ls.getItem(1)) saveArray[levelNum][0] = JSON.parse(this.ls.getItem(1));
			if (saveArray[levelNum][1] < this.ls.getItem(2)) saveArray[levelNum][1] = JSON.parse(this.ls.getItem(2));
			//if (saveArray[levelNum][2] < this.ls.getItem(3)) saveArray[levelNum][2] = this.ls.getItem(3);
			if (saveArray[levelNum][3] < 3 ) saveArray[levelNum][3] = 3;//starfunction
            if (saveArray[levelNum][4] > this.ls.getItem(3)) saveArray[levelNum][4] = JSON.parse(this.ls.getItem(3));
			this.ls.setItem(101, JSON.stringify(saveArray));
			//cc.log(this.ls.getItem(101));
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
