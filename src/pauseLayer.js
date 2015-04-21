var pauseLayer = cc.LayerColor.extend({
    labelCoin: null,
    labelMeter: null,
    points: 0,
    quads: 0,
    quadsBlue: 0,
    moves: 0,
	ls: null,
    // constructor
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super(cc.color(255, 255, 255, 150));
        var winSize = cc.director.getWinSize();
        this.getPoints();
		this.ls = cc.sys.localStorage;
                                      var scaleFactor = winSize.height/1080;

        this.successfulQuads = new cc.Sprite(res.vote_true);
        this.successfulQuads.setPosition(cc.p(winsize.width/4*3,winsize.height/6*4));
                                      this.successfulQuads.scale = scaleFactor;
        this.successfulQuads.visible = false;
        this.addChild(this.successfulQuads);

        this.unsuccessfulQuads = new cc.Sprite(res.vote_false);
        this.unsuccessfulQuads.setPosition(cc.p(winsize.width/4*3,winsize.height/6*4));
                                      this.unsuccessfulQuads.scale = scaleFactor;
        this.unsuccessfulQuads.visible = false;
        this.addChild(this.unsuccessfulQuads);

        this.successfulQuadsBlue = new cc.Sprite(res.vote_true);
        this.successfulQuadsBlue.setPosition(cc.p(winsize.width/4*3,winsize.height/6*5));
                                      this.successfulQuadsBlue.scale = scaleFactor;
        this.successfulQuadsBlue.visible = false;
        this.addChild(this.successfulQuadsBlue);

        this.unsuccessfulQuadsBlue = new cc.Sprite(res.vote_false);
        this.unsuccessfulQuadsBlue.setPosition(cc.p(winsize.width/4*3,winsize.height/6*5));
                                      this.unsuccessfulQuadsBlue.scale = scaleFactor;
        this.unsuccessfulQuadsBlue.visible = false;
        this.addChild(this.unsuccessfulQuadsBlue);

        this.successfulMoves = new cc.Sprite(res.vote_true);
        this.successfulMoves.setPosition(cc.p(winsize.width/4*3,winsize.height/6*3));
                                      this.successfulMoves.scale = scaleFactor;
        this.successfulMoves.visible = false;
        this.addChild(this.successfulMoves);

        this.unsuccessfulMoves = new cc.Sprite(res.vote_false);
        this.unsuccessfulMoves.setPosition(cc.p(winsize.width/4*3,winsize.height/6*3));
                                      this.unsuccessfulMoves.scale = scaleFactor;
        this.unsuccessfulMoves.visible = false;
        this.addChild(this.unsuccessfulMoves);

        this.labelQuads = new cc.LabelTTF(this.quads+ " Quads" /*+ " (" + (this.quads-levelsArray[this.ls.getItem(99)-1][3]) + ")"*/, "Quicksand-Light", winsize.height/8);
        if(this.ls.getItem(666)==2||this.ls.getItem(666)==3){
            this.labelQuads.setColor(cc.color(150,0,0));
        }
        else this.labelQuads.setColor(cc.color(0,0,0));//black color
        this.labelQuads.setPosition(cc.p(winsize.width/8*5, winsize.height/6*4));
        this.labelQuads.setAnchorPoint(1,0.5);
        this.addChild(this.labelQuads);

        this.labelQuadsBlue = new cc.LabelTTF(this.quadsBlue + " Quads" , "Quicksand-Light", winsize.height/8);
        this.labelQuadsBlue.setColor(cc.color(0,0,150));//black color
        this.labelQuadsBlue.setPosition(cc.p(winsize.width/8*5, winsize.height/6*5));
        this.labelQuadsBlue.setAnchorPoint(1,0.5);
        if(this.ls.getItem(666)==2 || this.ls.getItem(666)==3) this.addChild(this.labelQuadsBlue);

        this.labelPoints = new cc.LabelTTF(this.points+" Points"/* + " (" + (this.points-levelsArray[this.ls.getItem(99)-1][5]) + ")"*/, "Quicksand-Light", winsize.height/8);
        this.labelPoints.setPosition(cc.p(winsize.width/8*5, winsize.height/6*2));
        this.labelPoints.setAnchorPoint(1,0.5);
        this.labelPoints.setColor(cc.color(0,0,0));
        this.addChild(this.labelPoints);

        this.movesLabel = new cc.LabelTTF(this.moves+" Moves"/* + " (" + (this.moves-levelsArray[this.ls.getItem(99)-1][6]) + ")"*/, "Quicksand-Light", winsize.height/8);
        this.movesLabel.setPosition(cc.p(winsize.width/8*5, winsize.height/6*3));
        this.movesLabel.setColor(cc.color(0,0,0));
        this.movesLabel.setAnchorPoint(1,0.5);
        this.addChild(this.movesLabel);

        if (this.quads >= levelsArray[this.ls.getItem(99)-1][3]){
            this.labelQuads.setString(this.quads+ " Quads"/* + " (" + "+" + (this.quads-levelsArray[this.ls.getItem(99)-1][3]) + ")"*/);
            this.successfulQuads.visible = true;
        }
        else {
            this.labelQuads.setString(this.quads+ " Quads"/* + " (" + (this.quads-levelsArray[this.ls.getItem(99)-1][3]) + ")"*/);
            this.unsuccessfulQuads.visible = true;;
        }
        if (this.quadsBlue >= levelsArray[this.ls.getItem(99)-1][4] && this.ls.getItem(666)==2 || this.ls.getItem(666)==3 && this.quadsBlue >= levelsArray[this.ls.getItem(99)-1][4]){
                this.labelQuads.setColor(cc.color(150,0,0));
                this.successfulQuadsBlue.visible = true;
                this.labelQuadsBlue.setString(this.quadsBlue+ " Quads");
        }
        else if (this.ls.getItem(666)==2 || this.ls.getItem(666)==3){
            this.labelQuadsBlue.setString(this.quadsBlue+ " Quads");
            this.unsuccessfulQuadsBlue.visible = true;
        }

            this.labelPoints.setString(this.points+" Points"/*  + " (" + "+" + (this.points-levelsArray[this.ls.getItem(99)-1][5]) + ")"*/);
            this.labelPoints.setColor(cc.color(0,0,0));



        if (this.moves < levelsArray[this.ls.getItem(99)-1][6]){
            this.movesLabel.setString(this.moves+" Moves" /* + " (" + (this.moves-levelsArray[this.ls.getItem(99)-1][6]) + ")"*/);
            this.successfulMoves.visible = true;
            this.movesLabel.setColor(cc.color(0,0,0));
        }
        else{
            this.movesLabel.setString(this.moves+" Moves" /*+ " (" + "+" + (this.moves-levelsArray[this.ls.getItem(99)-1][6]) + ")"*/);
            this.unsuccessfulMoves.visible = true;
            this.movesLabel.setColor(cc.color(0,0,0));
        }
		
		this.recognizer = new SimpleRecognizer();
		
		this.swipeLabel = new cc.LabelTTF("Swipe to continue", "Quicksand-Light", winsize.height/10);
        this.swipeLabel.setColor(cc.color(0,0,0));//black color
		this.swipeLabel.setPosition(cc.p(winsize.width/2, winsize.height/6));
        this.addChild(this.swipeLabel);

        this.backLabel = new cc.LabelTTF("Back", "Quicksand-Light" , winsize.height/10);
        this.backLabel.setColor(cc.color(0,0,0));//black color
        //this.startLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
        this.backLabelP = new cc.LabelTTF("Back", "Quicksand-Light", winsize.height/10);
        this.backLabelP.setColor(cc.color(0,0,150));

        var backItemLabel = new cc.MenuItemSprite(
            this.backLabel,
            this.backLabelP, 
            this.onBack, this);
                                      backItemLabel.setAnchorPoint(0,1);
        var backMenu = new cc.Menu(backItemLabel);  
        //backMenu.setAnchorPoint(1,0); 
        backMenu.setPosition(cc.p(0,winsize.height));
        this.addChild(backMenu,0,13);
		
        var retryItemLabel = new cc.MenuItemSprite(
            new cc.Sprite(res.retry),
            new cc.Sprite(res.retry), 
            this.onReplay, this);
        retryItemLabel.scale = scaleFactor;
        var retryMenu = new cc.Menu(retryItemLabel);  
        retryMenu.setPosition(cc.p(winsize.width/6,winsize.height/2));
        this.addChild(retryMenu);

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
    onReplay : function(){
        //this.ls.setItem(99, this.levelNum.value); //current Level
        //this.ls.setItem(999,1); // Beta switch
        //this.ls.setItem(666,levelsArray[this.levelNum.value-1][9]); // mode One
        cc.director.pause();
        cc.director.runScene(new PlayScene());
        cc.director.resume();
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
        if (ls.getItem(666)==2 || ls.getItem(666)==3) this.quadsBlue = ls.getItem(4);
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
