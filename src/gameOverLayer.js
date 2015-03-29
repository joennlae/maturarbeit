var gameOverLayer = cc.LayerColor.extend({
    labelCoin: null,
    labelMeter: null,
    points: 0,
    quads: 0,
    moves: 0,
    movesLeft: 0,
	ls: null,
    frameCounter: null,
    pointsContainer: 0,
    animations: 0,
    updateCheck: 0,
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

        /*this.levelCompleteLabel = new cc.LabelTTF("Level Completed", "Quicksand-Light", winsize.height/10);
        this.levelCompleteLabel.setPosition(cc.p(winsize.width/2, winsize.height/6*5));
        this.levelCompleteLabel.setColor(cc.color(0,0,0));

        this.againLabel = new cc.LabelTTF("You did it again!", "Quicksand-Light", winsize.height/10);
        this.againLabel.setPosition(cc.p(winsize.width/2, winsize.height/6*5));
        this.againLabel.setColor(cc.color(0,150,0));

        this.closeLabel = new cc.LabelTTF(messages[Math.floor(Math.random()*7)], "Quicksand-Light", winsize.height/10);
        this.closeLabel.setPosition(cc.p(winsize.width/2, winsize.height/6*5));
        this.closeLabel.setColor(cc.color(0,0,0));*/

        this.successfulQuads = new cc.Sprite(res.vote_true);
        this.successfulQuads.setPosition(cc.p(winsize.width/4*3,winsize.height/6*4));
        this.successfulQuads.visible = false;
        this.addChild(this.successfulQuads);

        this.unsuccessfulQuads = new cc.Sprite(res.vote_false);
        this.unsuccessfulQuads.setPosition(cc.p(winsize.width/4*3,winsize.height/6*4));
        this.unsuccessfulQuads.visible = false;
        this.addChild(this.unsuccessfulQuads);

        this.successfulQuadsBlue = new cc.Sprite(res.vote_true);
        this.successfulQuadsBlue.setPosition(cc.p(winsize.width/4*3,winsize.height/6*5));
        this.successfulQuadsBlue.visible = false;
        this.addChild(this.successfulQuadsBlue);

        this.unsuccessfulQuadsBlue = new cc.Sprite(res.vote_false);
        this.unsuccessfulQuadsBlue.setPosition(cc.p(winsize.width/4*3,winsize.height/6*5));
        this.unsuccessfulQuadsBlue.visible = false;
        this.addChild(this.unsuccessfulQuadsBlue);

        this.successfulMoves = new cc.Sprite(res.vote_true);
        this.successfulMoves.setPosition(cc.p(winsize.width/4*3,winsize.height/6*3));
        this.successfulMoves.visible = false;
        this.addChild(this.successfulMoves);

        this.unsuccessfulMoves = new cc.Sprite(res.vote_false);
        this.unsuccessfulMoves.setPosition(cc.p(winsize.width/4*3,winsize.height/6*3));
        this.unsuccessfulMoves.visible = false;
        this.addChild(this.unsuccessfulMoves);

        if (saveArray[this.ls.getItem(99)-1][5] == 0 && this.points >= levelsArray[this.ls.getItem(99)-1][5] && this.quads >= levelsArray[this.ls.getItem(99)-1][3] && this.moves <= levelsArray[this.ls.getItem(99)-1][6]){
            //this.addChild(this.levelCompleteLabel);
            //this.save();
        }
        else if (saveArray[this.ls.getItem(99)-1][5] == 1 && this.points >= levelsArray[this.ls.getItem(99)-1][5] && this.quads >= levelsArray[this.ls.getItem(99)-1][3] && this.moves <= levelsArray[this.ls.getItem(99)-1][6]){
            //this.addChild(this.againLabel);
            //this.save();
        }
        else{
            //this.addChild(this.closeLabel);
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

        if (this.moves <= levelsArray[this.ls.getItem(99)-1][6]){
            this.movesLabel.setString(this.moves+" Moves"/* + " (" + (this.moves-levelsArray[this.ls.getItem(99)-1][6]) + ")"*/);
            this.successfulMoves.visible = true;
            this.movesLabel.setColor(cc.color(0,0,0));
        }
        else{
            this.movesLabel.setString(this.moves.value+" Moves"/* + " (" + "+" + (this.moves-levelsArray[this.ls.getItem(99)-1][6]) + ")"*/);
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
        if(this.animations==1){
        cc.director.resume();
        cc.director.runScene(new levelSelectorScene());
        }
        if(this.animations==0){
            this.updateCheck = 1;
            this.fastFinish();
        }
    },
    fastFinish:function(){
        for ( i = this.movesLeft; i>0; i--){
            this.pointsContainer = ((Math.floor(this.movesLeft/10)+1) * 1000) + this.pointsContainer;
            this.movesLeft = this.movesLeft - 1;
            cc.log(this.pointsContainer);
            }

            this.points = this.points + this.pointsContainer;
            this.labelPoints.setString(this.points + " Points");
            this.animations = 1; 
            this.movesLeftLabel.visible = false;
        
    },
    getPoints:function(){
        var ls = cc.sys.localStorage;
        this.quads = JSON.parse(ls.getItem(2));
        this.points = JSON.parse(ls.getItem(1));
        this.moves = JSON.parse(ls.getItem(3));
        if (ls.getItem(666)==2 || ls.getItem(666)==3) this.quadsBlue = JSON.parse(ls.getItem(4));
        this.movesLeft = JSON.parse(ls.getItem(5));
    },
	save : function(){ //TODO Moves Adding
		if (this.ls.getItem(99) == this.ls.getItem(100)){
			var levelNum = this.ls.getItem(99);
			
			saveArray = JSON.parse(this.ls.getItem(101));
			//cc.log(saveArray);
			saveArray[levelNum-1][0] = JSON.parse(this.points);//points
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
			if (saveArray[levelNum][0] < this.points) saveArray[levelNum][0] = JSON.parse(this.points);
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
	},
    update:function(dt) {
        this.frameCounter.value = this.frameCounter.value + 1;
        if(this.updateCheck==0){
        if(this.frameCounter.value % this.frameCounter.refreshTime == 0 && this.movesLeft>0){
            this.pointsContainer = ((Math.floor(this.movesLeft/10)+1) * 1000) + this.pointsContainer;
            this.movesLeft = this.movesLeft - 1;
            this.labelPoints.setString(this.points + " Points");
            this.movesLeftLabel.setString(this.movesLeft+ " Left");
            if(this.movesLeft>50) this.frameCounter.refreshTime = 2;
            else if(this.movesLeft<=50 && this.movesLeft>30) this.frameCounter.refreshTime = 4;
            else if(this.movesLeft<=30 && this.movesLeft>20) this.frameCounter.refreshTime = 8;
            else if(this.movesLeft<=20 && this.movesLeft>10) this.frameCounter.refreshTime = 12;
            else if(this.movesLeft<=10 && this.movesLeft>0) this.frameCounter.refreshTime = 20;
        }
        if(this.pointsContainer>0){
            if(this.pointsContainer>1000){
                this.points =  1000 + this.points; 
                this.pointsContainer = this.pointsContainer - 1000;
            }
            else if (this.pointsContainer>100){
                this.points = 100 + this.points;
                this.pointsContainer = this.pointsContainer - 100;
            }
            else {
                this.points = 10 + this.points;
                this.pointsContainer = this.pointsContainer - 10;
            }

        }
        if(this.frameCounter.value % 4 == 0 && this.pointsContainer>0){
            this.labelPoints.setString(this.points + " Points");
        }
        if(this.movesLeft == 0 && this.animations == 0) {
                this.animations = 1;
                this.movesLeftLabel.visible = false;
                this.ls = cc.sys.localStorage;
                saveArray = JSON.parse(this.ls.getItem(101));
                this.movesLeftLabel.visible = false;
                if (saveArray[this.ls.getItem(99)-1][5] == 0 && this.points >= levelsArray[this.ls.getItem(99)-1][5] && this.quads >= levelsArray[this.ls.getItem(99)-1][3] && this.moves <= levelsArray[this.ls.getItem(99)-1][6]) this.save();
                else if (saveArray[this.ls.getItem(99)-1][5] == 1 && this.points >= levelsArray[this.ls.getItem(99)-1][5] && this.quads >= levelsArray[this.ls.getItem(99)-1][3] && this.moves <= levelsArray[this.ls.getItem(99)-1][6]) this.save();
            }
        }
    }
});
