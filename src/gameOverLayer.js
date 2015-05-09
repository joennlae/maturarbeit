var gameOverLayer = cc.LayerColor.extend({
    labelCoin: null,
    labelMeter: null,
    points: 0,
    quads: 0,
    quadsBlue: 0,
    moves: 0,
    movesLeft: 0,
	ls: null,
    frameCounter: null,
    pointsContainer: 0,
    animations: 0,
    updateCheck: 0,
    finalPoints: 0,
    pointsPerSec: 0,
    movesPerSec: 0,
    // constructor
    ctor:function () {
        this._super();
        this.points = {value : 0};
        this.movesLeft = {value : 0};
        this.init();
    },
    init:function () {
        this.scheduleUpdate();
        this._super(cc.color(250, 250, 250, 150));
        var winsize = cc.director.getWinSize();
        this.getPoints();
		this.ls = cc.sys.localStorage;
        saveArray = JSON.parse(this.ls.getItem(101));

        this.frameCounter = {value: 0, refreshTime: 60}; // 0.5 sec warten
        this.finalPoints = this.getFinalPoints();
        cc.log(this.finalPoints);

        this.actionTo = new cc.JumpTo(3, cc.p(winsize.width/5, winsize.height/6*4), 150, 4);
        this.actionTo.retain();
        this.actionToRank = new cc.JumpTo(3, cc.p(winsize.width/5, winsize.height/6*3), 150, 4);
        this.actionToRank.retain();
        this.actionIn = new cc.FadeIn(1.5);
        this.actionIn.retain();

        this.levelCompleteLabel = new cc.LabelTTF("Level Completed", "Quicksand-Light", winsize.height/12);
                                         if(this.ls.getItem(212)==2) this.levelCompleteLabel.fontSize = winsize.height/14;
                                         if(this.ls.getItem(212)==3) this.levelCompleteLabel.fontSize = winsize.height/16;
        this.levelCompleteLabel.setPosition(cc.p(winsize.width/2, winsize.height/6*5));
        this.levelCompleteLabel.setRotation(-30);
        this.levelCompleteLabel.setColor(cc.color(0,150,0));
        this.levelCompleteLabel.visible = false;
        this.addChild(this.levelCompleteLabel);

        this.againLabel = new cc.LabelTTF("You did it again!", "Quicksand-Light", winsize.height/12);
                                         if(this.ls.getItem(212)==2) this.againLabel.fontSize = winsize.height/14;
                                         if(this.ls.getItem(212)==3) this.againLabel.fontSize = winsize.height/16;
        this.againLabel.setPosition(cc.p(winsize.width/2, winsize.height/6*5));
        this.againLabel.setRotation(-30);
        this.againLabel.setColor(cc.color(0,150,0));
        this.againLabel.visible = false;
        this.addChild(this.againLabel);

        this.highscoreLabel = new cc.LabelTTF("New Highscore!", "Quicksand-Light", winsize.height/12);
                                         if(this.ls.getItem(212)==2) this.highscoreLabel.fontSize = winsize.height/14;
                                         if(this.ls.getItem(212)==3) this.highscoreLabel.fontSize = winsize.height/16;
        this.highscoreLabel.setPosition(cc.p(winsize.width/2, winsize.height/6*5));
        this.highscoreLabel.setRotation(-30);
        this.highscoreLabel.setColor(cc.color(0,150,0));
        this.highscoreLabel.visible = false;
        this.addChild(this.highscoreLabel);

        this.newrankLabel = new cc.LabelTTF("New Rank!", "Quicksand-Light", winsize.height/12);
                                         if(this.ls.getItem(212)==2) this.newrankLabel.fontSize = winsize.height/14;
                                         if(this.ls.getItem(212)==3) this.newrankLabel.fontSize = winsize.height/16;
        this.newrankLabel.setPosition(cc.p(winsize.width/2, winsize.height/6*5));
        this.newrankLabel.setRotation(-30);
        this.newrankLabel.setColor(cc.color(0,150,0));
        this.newrankLabel.visible = false;
        this.addChild(this.newrankLabel);

        this.closeLabel = new cc.LabelTTF(messages[Math.floor(Math.random()*7)], "Quicksand-Light", winsize.height/12);
                                         if(this.ls.getItem(212)==2) this.closeLabel.fontSize = winsize.height/14;
                                         if(this.ls.getItem(212)==3) this.closeLabel.fontSize = winsize.height/16;
        this.closeLabel.setPosition(cc.p(winsize.width/2, winsize.height/6*5));
        this.closeLabel.setRotation(-30);
        this.closeLabel.setColor(cc.color(150,0,0));
        this.closeLabel.visible = false;
        this.addChild(this.closeLabel);

        this.movesoverLabel = new cc.LabelTTF("Out of Moves", "Quicksand-Light", winsize.height/12);
                                         if(this.ls.getItem(212)==2) this.movesoverLabel.fontSize = winsize.height/14;
                                         if(this.ls.getItem(212)==3) this.movesoverLabel.fontSize = winsize.height/16;
        this.movesoverLabel.setPosition(cc.p(winsize.width/2, winsize.height/6*5));
        this.movesoverLabel.setColor(cc.color(150,0,0));
        this.movesoverLabel.setRotation(-30);
        this.movesoverLabel.visible = false;
        if(this.ls.getItem(13)==2) this.addChild(this.movesoverLabel);
                                         
        var scaleFactor = winsize.height/1080;

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
        this.successfulQuadsBlue.visible = false;
                                         this.successfulQuadsBlue.scale = scaleFactor;
        this.addChild(this.successfulQuadsBlue);

        this.unsuccessfulQuadsBlue = new cc.Sprite(res.vote_false);
        this.unsuccessfulQuadsBlue.setPosition(cc.p(winsize.width/4*3,winsize.height/6*5));
        this.unsuccessfulQuadsBlue.visible = false;
                                         this.unsuccessfulQuadsBlue.scale = scaleFactor;
        this.addChild(this.unsuccessfulQuadsBlue);

        this.successfulMoves = new cc.Sprite(res.vote_true);
        this.successfulMoves.setPosition(cc.p(winsize.width/4*3,winsize.height/6*3));
        this.successfulMoves.visible = false;
                                         this.successfulMoves.scale = scaleFactor;
        this.addChild(this.successfulMoves);

        this.unsuccessfulMoves = new cc.Sprite(res.vote_false);
        this.unsuccessfulMoves.setPosition(cc.p(winsize.width/4*3,winsize.height/6*3));
        this.unsuccessfulMoves.visible = false;
                                         this.unsuccessfulMoves.scale = scaleFactor;
        this.addChild(this.unsuccessfulMoves);
        if(this.ls.getItem(666)==1){
            if (saveArray[this.ls.getItem(99)-1][5] == 0 && this.quads >= levelsArray[this.ls.getItem(99)-1][3] && this.moves <= levelsArray[this.ls.getItem(99)-1][6] && this.ls.getItem(13)==1){
                this.levelCompleteLabel.visible = true;
                this.levelCompleteLabel.runAction(this.actionTo);
                this.save();
                //this.ls.setItem(99, JSON.parse(this.ls.getItem(99)) + 1)
                if (saveArray[this.ls.getItem(99)-1][3] < this.checkRank()){
                    this.newrankLabel.visible = true;
                    this.newrankLabel.runAction(this.actionToRank);
                    this.newrankLabel.runAction(this.actionIn);
                }
            }
            else if (saveArray[this.ls.getItem(99)-1][5] == 1 && this.quads >= levelsArray[this.ls.getItem(99)-1][3] && this.moves <= levelsArray[this.ls.getItem(99)-1][6] && this.finalPoints > saveArray[this.ls.getItem(99)-1][0] && this.ls.getItem(13)==1){ //only points countä für highscore
                this.highscoreLabel.visible = true;
                this.highscoreLabel.runAction(this.actionTo);
                this.save();
                if (saveArray[this.ls.getItem(99)-1][3] < this.checkRank()){
                    this.newrankLabel.visible = true;
                    this.newrankLabel.runAction(this.actionToRank);
                    this.newrankLabel.runAction(this.actionIn);
                }    
            }
            else if (saveArray[this.ls.getItem(99)-1][5] == 1 && this.quads >= levelsArray[this.ls.getItem(99)-1][3] && this.moves <= levelsArray[this.ls.getItem(99)-1][6] && this.ls.getItem(13)==1){
                this.againLabel.visible = true;
                this.againLabel.runAction(this.actionTo);
            }
            else if (this.ls.getItem(13)==1){
                this.closeLabel.visible = true;
                this.closeLabel.runAction(this.actionTo);
            }
            else {
                this.movesoverLabel.visible = true;
                this.movesoverLabel.runAction(this.actionTo);
                //this.ls.setItem(13,1);  
            }
        }
        else if (this.ls.getItem(666)==2 || this.ls.getItem(666)==3){
            if (saveArray[this.ls.getItem(99)-1][5] == 0 && this.quads >= levelsArray[this.ls.getItem(99)-1][3] && this.moves <= levelsArray[this.ls.getItem(99)-1][6] && this.ls.getItem(13)==1 && this.quadsBlue >= levelsArray[this.ls.getItem(99)-1][4]){
                this.levelCompleteLabel.visible = true;
                this.levelCompleteLabel.runAction(this.actionTo);
                this.save();
                //this.ls.setItem(99, JSON.parse(this.ls.getItem(99)) + 1);
                if (saveArray[this.ls.getItem(99)-1][3] < this.checkRank()){
                    this.newrankLabel.visible = true;
                    this.newrankLabel.runAction(this.actionToRank);
                    this.newrankLabel.runAction(this.actionIn);
                }
            }
            else if (saveArray[this.ls.getItem(99)-1][5] == 1 && this.quads >= levelsArray[this.ls.getItem(99)-1][3] && this.moves <= levelsArray[this.ls.getItem(99)-1][6] && this.finalPoints >= saveArray[this.ls.getItem(99)-1][0] && this.ls.getItem(13)==1 && this.quadsBlue >= levelsArray[this.ls.getItem(99)-1][4]){ 
                this.highscoreLabel.visible = true;
                this.highscoreLabel.runAction(this.actionTo);
                this.save();
                if (saveArray[this.ls.getItem(99)-1][3] < this.checkRank()){
                    this.newrankLabel.visible = true;
                    this.newrankLabel.runAction(this.actionToRank);
                    this.newrankLabel.runAction(this.actionIn);
                }    
            }
            else if (saveArray[this.ls.getItem(99)-1][5] == 1 && this.quads >= levelsArray[this.ls.getItem(99)-1][3] && this.moves <= levelsArray[this.ls.getItem(99)-1][6] && this.ls.getItem(13)==1 && this.quadsBlue >= levelsArray[this.ls.getItem(99)-1][4]){
                this.againLabel.visible = true;
                this.againLabel.runAction(this.actionTo);
            }
            else if (this.ls.getItem(13)==1){
                this.closeLabel.visible = true;
                this.closeLabel.runAction(this.actionTo);
            }
            else {
                this.movesoverLabel.visible = true;
                this.movesoverLabel.runAction(this.actionTo);
                //this.ls.setItem(13,1);  
            } 
        }


        this.labelQuads = new cc.LabelTTF(this.quads+ " Quads"/* + " (" + (this.quads-levelsArray[this.ls.getItem(99)-1][3]) + ")"*/, "Quicksand-Light", winsize.height/10);
        if (this.ls.getItem(666)==2 || this.ls.getItem(666)==3){
            this.labelQuads.setColor(cc.color(150,0,0));//black color
        }
        else this.labelQuads.setColor(cc.color(0,0,0));//black color
        this.labelQuads.setPosition(cc.p(winsize.width/8*5, winsize.height/6*4));
        this.labelQuads.setAnchorPoint(1,0.5);
        this.addChild(this.labelQuads);

        this.labelQuadsBlue = new cc.LabelTTF(this.quadsBlue+ " Quads"/* + " (" + (this.quads-levelsArray[this.ls.getItem(99)-1][3]) + ")"*/, "Quicksand-Light", winsize.height/10);
        this.labelQuadsBlue.setColor(cc.color(0,0,150));//black color
        this.labelQuadsBlue.setPosition(cc.p(winsize.width/8*5, winsize.height/6*5));
        this.labelQuadsBlue.setAnchorPoint(1,0.5);
        if (this.ls.getItem(666)==2 || this.ls.getItem(666)==3) this.addChild(this.labelQuadsBlue);

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

        this.movesLeftLabel = new cc.LabelTTF(this.movesLeft+ " Left" ,"Quicksand-Light", winsize.height/10);
        this.movesLeftLabel.setColor(cc.color(0,0,0));
        this.movesLeftLabel.setPosition(cc.p(winsize.width/8*7,winsize.height/6*2));
        this.movesLeftLabel.setAnchorPoint(1,0.5);
        this.addChild(this.movesLeftLabel);


        if (this.quads >= levelsArray[this.ls.getItem(99)-1][3]){
            this.labelQuads.setString(this.quads+ " Quads"/* + " (" + "+" + (this.quads-levelsArray[this.ls.getItem(99)-1][3]) + ")"*/);
            this.successfulQuads.visible = true;
        }
        else {
            this.labelQuads.setString(this.quads+ " Quads"/* + " (" + (this.quads-levelsArray[this.ls.getItem(99)-1][3]) + ")"*/);
            this.unsuccessfulQuads.visible = true;
        }

        if (this.quadsBlue >= levelsArray[this.ls.getItem(99)-1][4] && this.ls.getItem(666)==2 || this.ls.getItem(666)==3 && this.quadsBlue >= levelsArray[this.ls.getItem(99)-1][4]){
            this.labelQuadsBlue.setString(this.quadsBlue+ " Quads"/* + " (" + "+" + (this.quads-levelsArray[this.ls.getItem(99)-1][3]) + ")"*/);
            this.successfulQuadsBlue.visible = true;
        }
        else if (this.ls.getItem(666)==2 || this.ls.getItem(666)==3){
            this.labelQuadsBlue.setString(this.quadsBlue+ " Quads"/* + " (" + (this.quads-levelsArray[this.ls.getItem(99)-1][3]) + ")"*/);
            this.unsuccessfulQuadsBlue.visible = true;
        }

            this.labelPoints.setString(this.points+" Points" /*+ " (" + "+" + (this.points-levelsArray[this.ls.getItem(99)-1][5]) + ")"*/);
            this.labelPoints.setColor(cc.color(0,0,0));

        if (this.moves <= levelsArray[this.ls.getItem(99)-1][6] && this.ls.getItem(13)==1){
            this.movesLabel.setString(this.moves+" Moves"/* + " (" + (this.moves-levelsArray[this.ls.getItem(99)-1][6]) + ")"*/);
            this.successfulMoves.visible = true;
            this.movesLabel.setColor(cc.color(0,0,0));
        }
        else{
            this.movesLabel.setString(this.moves+"+ Moves"/* + " (" + "+" + (this.moves-levelsArray[this.ls.getItem(99)-1][6]) + ")"*/);
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
                                         backItemLabel.scale = scaleFactor;
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
    getFinalPoints:function(){
        var saveMovesLeft = this.movesLeft;
        var pointsOuh = 0;
        for ( i = this.movesLeft; i>0; i--){
            pointsOuh = ((Math.floor(saveMovesLeft/3)+1) * 1000) + pointsOuh;
            saveMovesLeft = saveMovesLeft - 1;
            }
        this.pointsContainer = pointsOuh;
        this.pointsPerSec = this.pointsContainer/180; //anim = 3sec
        this.movesPerSec = this.movesLeft/180; // anim = 3sec
        return this.points + pointsOuh;
    },
    onRestart:function (sender) {
        cc.director.pause();
        cc.director.runScene(new levelSelectorScene());
        cc.director.resume();
    },
    getPoints:function(){
        var ls = cc.sys.localStorage;
        this.quads = JSON.parse(ls.getItem(2));
        this.points = JSON.parse(ls.getItem(1));
        this.moves = JSON.parse(ls.getItem(3));
        if (ls.getItem(666)==2 || ls.getItem(666)==3) this.quadsBlue = JSON.parse(ls.getItem(4));
        this.movesLeft = JSON.parse(ls.getItem(5));
    },
	save : function(){ 
		if (this.ls.getItem(99) == this.ls.getItem(100)){
			var levelNum = this.ls.getItem(99);
			
			saveArray = JSON.parse(this.ls.getItem(101));
			saveArray[levelNum-1][0] = JSON.parse(this.finalPoints);//points
			saveArray[levelNum-1][1] = JSON.parse(this.ls.getItem(2));//redquads
            if(this.ls.getItem(666)==2 || this.ls.getItem(666)==3){
			saveArray[levelNum-1][2] = JSON.parse(this.ls.getItem(4));//bluequads
            }
			saveArray[levelNum-1][3] = JSON.parse(this.checkRank()); //rank function
            saveArray[levelNum-1][4] = JSON.parse(this.ls.getItem(3));
            saveArray[levelNum-1][5] = 1; //LevelCheck Number | done

			this.ls.setItem(101, JSON.stringify(saveArray));
			this.ls.setItem(100, JSON.parse(this.ls.getItem(99)) + 1);
		}
		else {
			var levelNum = JSON.parse(this.ls.getItem(99))-1;
			var saveArray = JSON.parse(this.ls.getItem(101));
			if (saveArray[levelNum][0] < this.finalPoints) saveArray[levelNum][0] = JSON.parse(this.finalPoints);
			if (saveArray[levelNum][1] < this.ls.getItem(2)) saveArray[levelNum][1] = JSON.parse(this.ls.getItem(2));
            if(this.ls.getItem(666)==2 || this.ls.getItem(666)==3){
			if (saveArray[levelNum][2] < this.ls.getItem(4)) saveArray[levelNum][2] = this.ls.getItem(4);
            }
			if (saveArray[levelNum][3] < this.checkRank()) saveArray[levelNum][3] = this.checkRank();
            if (saveArray[levelNum][4] > this.ls.getItem(3)) saveArray[levelNum][4] = JSON.parse(this.ls.getItem(3));
			this.ls.setItem(101, JSON.stringify(saveArray));
		}
	},
    checkRank : function(){
        if (this.finalPoints >= levelsArray[this.ls.getItem(99)-1][8]){
            return 3;
        }
        else if (this.finalPoints >= levelsArray[this.ls.getItem(99)-1][7] && this.finalPoints < levelsArray[this.ls.getItem(99)-1][8]){
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
	},
    update:function(dt) {
        this.frameCounter.value = this.frameCounter.value + 1;
        if(this.pointsContainer>0){
            this.points = this.points + this.pointsPerSec;
            this.pointsContainer = this.pointsContainer - this.pointsPerSec;
            this.movesLeft = this.movesLeft - this.movesPerSec;
        }
        else {
            this.points = this.finalPoints;
            this.movesLeft = 0;
            this.movesLeftLabel.visible = false;
        }
        if(this.frameCounter.value % 4 == 0 && this.pointsContainer>0){
            this.labelPoints.setString(Math.ceil(this.points) + " Points");
            this.movesLeftLabel.setString(Math.ceil(this.movesLeft)+ " Left");
        }
        
    },
    onExit:function() {
        this.actionTo.release();
        this.actionToRank.release();
        this.actionIn.release();
        this._super();
    }
});
