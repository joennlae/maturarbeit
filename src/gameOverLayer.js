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
        this._super(cc.color(250, 250, 250, 150));
        var winsize = cc.director.getWinSize();
        this.getPoints();
		this.ls = cc.sys.localStorage;
        saveArray = JSON.parse(this.ls.getItem(101));

        this.levelCompleteLabel = new cc.LabelTTF("Level Completed", "Quicksand-Light", winsize.height/10);
        this.levelCompleteLabel.setPosition(cc.p(winsize.width/2, winsize.height/6*5));
        this.levelCompleteLabel.setColor(cc.color(0,0,0));

        this.againLabel = new cc.LabelTTF("You did it again!", "Quicksand-Light", winsize.height/10);
        this.againLabel.setPosition(cc.p(winsize.width/2, winsize.height/6*5));
        this.againLabel.setColor(cc.color(0,150,0));

        this.closeLabel = new cc.LabelTTF(messages[Math.floor(Math.random()*7)], "Quicksand-Light", winsize.height/10);
        this.closeLabel.setPosition(cc.p(winsize.width/2, winsize.height/6*5));
        this.closeLabel.setColor(cc.color(0,0,0));

        this.successfulQuads = new cc.Sprite(res.vote_true);
        this.successfulQuads.setPosition(cc.p(winsize.width/4*3,winsize.height/6*4));
        this.successfulQuads.visible = false;
        this.addChild(this.successfulQuads);

        this.unsuccessfulQuads = new cc.Sprite(res.vote_false);
        this.unsuccessfulQuads.setPosition(cc.p(winsize.width/4*3,winsize.height/6*4));
        this.unsuccessfulQuads.visible = false;
        this.addChild(this.unsuccessfulQuads);

        this.successfulMoves = new cc.Sprite(res.vote_true);
        this.successfulMoves.setPosition(cc.p(winsize.width/4*3,winsize.height/6*3));
        this.successfulMoves.visible = false;
        this.addChild(this.successfulMoves);

        this.unsuccessfulMoves = new cc.Sprite(res.vote_false);
        this.unsuccessfulMoves.setPosition(cc.p(winsize.width/4*3,winsize.height/6*3));
        this.unsuccessfulMoves.visible = false;
        this.addChild(this.unsuccessfulMoves);

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

        this.labelQuads = new cc.LabelTTF(this.quads+ " Quads"/* + " (" + (this.quads-levelsArray[this.ls.getItem(99)-1][3]) + ")"*/, "Quicksand-Light", winsize.height/10);
        this.labelQuads.setColor(cc.color(0,0,0));//black color
        this.labelQuads.setPosition(cc.p(winsize.width/8*5, winsize.height/6*4));
        this.labelQuads.setAnchorPoint(1,0.5);
        this.addChild(this.labelQuads);

        this.labelPoints = new cc.LabelTTF(this.points+" Points"/* + " (" + (this.points-levelsArray[this.ls.getItem(99)-1][5]) + ")"*/, "Quicksand-Light", winsize.height/10);
        this.labelPoints.setPosition(cc.p(winsize.width/8*5, winsize.height/6*2));
        this.labelPoints.setAnchorPoint(1,0.5);
        this.labelPoints.setColor(cc.color(0,0,0));
        this.addChild(this.labelPoints);

        this.movesLabel = new cc.LabelTTF(this.moves+" Moves" /*+ " (" + (this.moves-levelsArray[this.ls.getItem(99)-1][6]) + ")"*/, "Quicksand-Light", winsize.height/10);
        this.movesLabel.setPosition(cc.p(winsize.width/8*5, winsize.height/6*3));
        this.movesLabel.setAnchorPoint(1,0.5);
        this.movesLabel.setColor(cc.color(0,0,0));
        this.addChild(this.movesLabel);

        if (this.quads >= levelsArray[this.ls.getItem(99)-1][3]){
            this.labelQuads.setString(this.quads+ " Quads"/* + " (" + "+" + (this.quads-levelsArray[this.ls.getItem(99)-1][3]) + ")"*/);
            this.successfulQuads.visible = true;
            this.labelQuads.setColor(cc.color(0,0,0));
        }
        else {
            this.labelQuads.setString(this.quads+ " Quads"/* + " (" + (this.quads-levelsArray[this.ls.getItem(99)-1][3]) + ")"*/);
            this.unsuccessfulQuads.visible = true;
            this.labelQuads.setColor(cc.color(0,0,0));
        }

        if (this.points >= levelsArray[this.ls.getItem(99)-1][5]){
            this.labelPoints.setString(this.points+" Points" /*+ " (" + "+" + (this.points-levelsArray[this.ls.getItem(99)-1][5]) + ")"*/);
            this.labelPoints.setColor(cc.color(0,0,0));
        }
        else {
            this.labelPoints.setString(this.points+" Points"/* + " (" + (this.points-levelsArray[this.ls.getItem(99)-1][5]) + ")"*/);
            this.labelPoints.setColor(cc.color(0,0,0));
        }

        if (this.moves <= levelsArray[this.ls.getItem(99)-1][6]){
            this.movesLabel.setString(this.moves+" Moves"/* + " (" + (this.moves-levelsArray[this.ls.getItem(99)-1][6]) + ")"*/);
            this.successfulMoves.visible = true;
            this.movesLabel.setColor(cc.color(0,0,0));
        }
        else{
            this.movesLabel.setString(this.moves+" Moves"/* + " (" + "+" + (this.moves-levelsArray[this.ls.getItem(99)-1][6]) + ")"*/);
            this.unsuccessfulMoves.visible = true;
            this.movesLabel.setColor(cc.color(0,0,0));
        }
		
		this.recognizer = new SimpleRecognizer();
		
		/*this.swipeLabel = new cc.LabelTTF("", "Quicksand-Light", winsize.height/12);
        this.swipeLabel.setColor(cc.color(0,0,0,100));//black color
		this.swipeLabel.setPosition(cc.p(winsize.width/4, winsize.height/6));
        this.addChild(this.swipeLabel);*/

        var backItemLabel = new cc.MenuItemSprite(
            new cc.Sprite(res.forward),
            new cc.Sprite(res.forward), 
            this.onRestart, this);
        var backMenu = new cc.Menu(backItemLabel);  
        backMenu.setPosition(cc.p(winsize.width/2,winsize.height/6));
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
			saveArray[levelNum-1][3] = this.checkRank(); //rank function
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
			if (saveArray[levelNum][3] < 3 ) saveArray[levelNum][3] = this.checkRank();//starfunction
            if (saveArray[levelNum][4] > this.ls.getItem(3)) saveArray[levelNum][4] = JSON.parse(this.ls.getItem(3));
			this.ls.setItem(101, JSON.stringify(saveArray));
			//cc.log(this.ls.getItem(101));
		}
	},
    checkRank : function(){
        if (this.points >= levelsArray[this.ls.getItem(99)-1][8]){
            return 3;
        }
        else if (this.points >= levelsArray[this.ls.getItem(99)-1][7] && this.points < levelsArray[this.ls.getItem(99)-1][8]){
            return 2;
        }
        else return 1;
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
