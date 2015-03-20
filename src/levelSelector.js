
var levelSelector = cc.Layer.extend({
	winsize: 0,
	winsize: 0,
	ls: null,
	row: null,
	column: null,
	recognizer: null,
	levelNum: null,
	levelLabel: null,

    ctor : function(){
		this._super();
		this.winsize = cc.director.getWinSize();
		this.level = levelsArray;
		this.ls = cc.sys.localStorage;
		this.row = {y: 0};
        this.column = {x: 0};
		this.levelNum = {value: 1};

    },
    init:function(){
		this._super();
		
        var background = new cc.LayerColor(cc.color(255,255,255,255), this.winsize.width, this.winsize.height);
        this.addChild(background);
		//after background ;-) homofish
		//cc.log(this.ls.getItem(100));
        //cc.log("test");
        //first time loading iOS
		if (this.ls.getItem(100) < 1){
			this.ls.setItem(100, 1);
            //if (this.ls.getItem(101) != 5){
            var saveArray = new Array();
            for(i=0; i<levelsArray.length; i++){
            saveArray.push( [] );
            for(j=0; j<6; j++){
                saveArray[i].push(0); 
            }
            }
                this.ls.setItem(101, JSON.stringify(saveArray));//points| redquads | bluequads | rank | moves | done-check
            //}
		}
		

		saveArray = JSON.parse(this.ls.getItem(101));
		cc.log(saveArray);

		this.levelNum.value = this.ls.getItem(100);
		this.levelLabel = new cc.LabelTTF(this.levelNum.value, "Quicksand-Light", this.winsize.height/8*5);
        this.levelLabel.setColor(cc.color(0,0,0));//black color
        this.levelLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
        this.addChild(this.levelLabel);
		
		this.recognizer = new SimpleRecognizer();
		
		this.startLabel = new cc.LabelTTF("Play", "Quicksand-Light" , this.winsize.height/10);
        this.startLabel.setColor(cc.color(0,0,0));//black color
        //this.startLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
		this.startLabelP = new cc.LabelTTF("Play", "Quicksand-Light", this.winsize.height/10);
        this.startLabelP.setColor(cc.color(0,0,150));//black color
        //this.startLabelP.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
		
		this.controlRight = new cc.LabelTTF(">", "Quicksand-Light", this.winsize.height/4);
        this.controlRight.setColor(cc.color(120,120,120));
		//this.controlRight.setPosition(cc.p(this.winsize.width/4*3, this.winsize.height/2));
		this.controlRightP = new cc.LabelTTF(">", "Quicksand-Light", this.winsize.height/4);
        this.controlRightP.setColor(cc.color(0,0,0));
		this.controlRight.retain();
        this.controlRightP.retain();
		
        this.controlLeft = new cc.LabelTTF("<", "Quicksand-Light", this.winsize.height/4);
        this.controlLeft.setColor(cc.color(120,120,120));
		//this.controlLeft.setPosition(cc.p(this.winsize.width/4, this.winsize.height/2));
		this.controlLeftP = new cc.LabelTTF("<", "Quicksand-Light", this.winsize.height/4);
        this.controlLeftP.setColor(cc.color(0,0,0));
		this.controlLeft.retain();
        this.controlLeftP.retain();
                                    
		var controlRightLabel = new cc.MenuItemSprite(
            this.controlRight,
            this.controlRightP, 
            this.controllingRight, this);
        this.cR = new cc.Menu(controlRightLabel);  
        this.cR.setPosition(cc.p(this.winsize.width/8*7,this.winsize.height/2));
        this.addChild(this.cR,0,1);
        this.cR.retain();
		var controlLeftLabel = new cc.MenuItemSprite(
            this.controlLeft,
            this.controlLeftP, 
            this.controllingLeft, this);
        this.cL = new cc.Menu(controlLeftLabel);  
        this.cL.setPosition(cc.p(this.winsize.width/8,this.winsize.height/2));
        //this.addChild(cL);
		if (this.ls.getItem(100) > 1){
			this.addChild(this.cL,0,2);
        }
        this.cL.retain();
        var menuItemLabel = new cc.MenuItemSprite(
            this.startLabel,
            this.startLabelP, 
            this.onPlay, this);
        var menu = new cc.Menu(menuItemLabel);  
        menu.setPosition(cc.p(this.winsize.width/8*5,this.winsize.height/6));
        this.addChild(menu);
        //cc.log(this.levelNum.value);

        //stats preloading objects
        this.pointsLabel = new cc.LabelTTF(saveArray[this.levelNum.value-1][0]+"/"+levelsArray[this.levelNum.value-1][5], "Quicksand-Light", this.winsize.height/12);
        this.pointsLabel.setColor(cc.color(0,0,0));//black color
        this.pointsLabel.setPosition(cc.p(this.winsize.width/4, this.winsize.height/10*9));
        this.addChild(this.pointsLabel);

        this.quadsLabel = new cc.LabelTTF(saveArray[this.levelNum.value-1][1]+"/"+levelsArray[this.levelNum.value-1][3], "Quicksand-Light", this.winsize.height/12);
        this.quadsLabel.setColor(cc.color(0,0,0));//black color
        this.quadsLabel.setPosition(cc.p(this.winsize.width/4, this.winsize.height/10*8));
        this.addChild(this.quadsLabel);

        this.movesLabel = new cc.LabelTTF(saveArray[this.levelNum.value-1][4]+"/"+levelsArray[this.levelNum.value-1][6], "Quicksand-Light", this.winsize.height/12);
        this.movesLabel.setColor(cc.color(0,0,0));//black color
        this.movesLabel.setPosition(cc.p(this.winsize.width/4*3, this.winsize.height/10*9));
        this.addChild(this.movesLabel);

       	this.rankLabel = new cc.LabelTTF(""/*saveArray[this.levelNum.value-1][0]*/, "Quicksand-Light", this.winsize.height/12);
        this.rankLabel.setColor(cc.color(0,0,0));//black color
        this.rankLabel.setPosition(cc.p(this.winsize.width/4*3, this.winsize.height/10*8));
        this.addChild(this.rankLabel);
        this.updateStats();

        this.backLabel = new cc.LabelTTF("Back", "Quicksand-Light" , this.winsize.height/10);
        this.backLabel.setColor(cc.color(0,0,0));//black color
        //this.startLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
		this.backLabelP = new cc.LabelTTF("Back", "Quicksand-Light", this.winsize.height/10);
        this.backLabelP.setColor(cc.color(0,0,150));

        var backItemLabel = new cc.MenuItemSprite(
            this.backLabel,
            this.backLabelP, 
            this.onBack, this);
        var backMenu = new cc.Menu(backItemLabel);  
        //backMenu.setAnchorPoint(1,0); 
        backMenu.setPosition(cc.p(this.winsize.width/8*3,this.winsize.height/6));
        this.addChild(backMenu);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
			levelNum: this.levelNum,
			ls: this.ls,
			levelSel: this,
			cL: this.cL,
			winsize: this.winsize,
			onPlay: this.onPlay,
			levelLabel: this.levelLabel,
			spriteSheet: this.spriteSheet,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded,
            updateStats: this.updateStats,
            pointsLabel: this.pointsLabel,
            quadsLabel: this.quadsLabel,
            movesLabel: this.movesLabel,
            rankLabel: this.rankLabel
        }, this);
    },

    updateStats : function(){
    	saveArray = JSON.parse(this.ls.getItem(101));
    	if(this.levelNum.value>(saveArray.length)){
    		this.pointsLabel.setString("level");
    		this.quadsLabel.setString("does");
    		this.movesLabel.setString("not");
    		this.rankLabel.setString("exist");
    		this.pointsLabel.setColor(cc.color(0,0,0));
			this.quadsLabel.setColor(cc.color(0,0,0));
			this.movesLabel.setColor(cc.color(0,0,0));
			this.rankLabel.setColor(cc.color(0,0,0));    	
		}
    	else{

    	if (saveArray[this.levelNum.value-1][0] >= levelsArray[this.levelNum.value-1][5]){
    		this.pointsLabel.setColor(cc.color(0,150,0));
    		this.pointsLabel.setString(saveArray[this.levelNum.value-1][0]/*+"/"+levelsArray[this.levelNum.value-1][5]*/);
    	}
    	else {
    		this.pointsLabel.setColor(cc.color(0,0,0));
    		this.pointsLabel.setString(saveArray[this.levelNum.value-1][0]/*+"/"+levelsArray[this.levelNum.value-1][5]*/);
    	}

    	if (saveArray[this.levelNum.value-1][1] >= levelsArray[this.levelNum.value-1][3]){
    		this.quadsLabel.setColor(cc.color(150,0,0));
    		this.quadsLabel.setString(saveArray[this.levelNum.value-1][1]+"/"+levelsArray[this.levelNum.value-1][3]);
    	}
    	else {
    		this.quadsLabel.setColor(cc.color(0,0,0));
    		this.quadsLabel.setString(saveArray[this.levelNum.value-1][1]+"/"+levelsArray[this.levelNum.value-1][3]);
    	}

    	if (saveArray[this.levelNum.value-1][4] <= levelsArray[this.levelNum.value-1][6] && saveArray[this.levelNum.value-1][4]!=0){
    		this.movesLabel.setColor(cc.color(255,150,0));
    		this.movesLabel.setString(saveArray[this.levelNum.value-1][4]+"/"+levelsArray[this.levelNum.value-1][6]);
    	}
    	else {
    		this.movesLabel.setColor(cc.color(0,0,0));
    		this.movesLabel.setString(saveArray[this.levelNum.value-1][4]+"/"+levelsArray[this.levelNum.value-1][6]);
    	}
    	this.rankLabel.setString(ranks[saveArray[this.levelNum.value-1][3]]);
    	}

    },
	
	controllingRight : function(){
		cc.log(this.getChildrenCount());
		//this.addChild(this.cL);
		if (this.levelNum.value == 1) {
			this.addChild(this.cL,0,2);
			this.levelNum.value ++;
			this.updateStats();
			this.levelLabel.setString(this.levelNum.value);
			if (this.ls.getItem(100) == 2){
				this.levelLabel.setColor(cc.color(0,0,0));
			}
			else if (this.ls.getItem(100) > 2){
				this.levelLabel.setColor(cc.color(0,150,0));
			}
			else this.levelLabel.setColor(cc.color(160,160,160));
		}
		else if (this.levelNum.value <= 1000){
			this.levelNum.value ++;
			this.levelLabel.setString(this.levelNum.value);
			this.updateStats();
			if (this.levelNum.value > this.ls.getItem(100)){
				this.levelLabel.setColor(cc.color(160,160,160));
			}
			else if (this.levelNum.value < this.ls.getItem(100)){
				this.levelLabel.setColor(cc.color(0,150,0));
				// and load results ls.getItem
			}
			else if (this.levelNum.value == this.ls.getItem(100)){
				this.levelLabel.setColor(cc.color(0,0,0));
				// load results	
			}	
		}
	

	},

	controllingLeft : function(){
		if (this.levelNum.value == 2){
			this.levelNum.value --;
			this.updateStats();
			this.removeChildByTag(2);
			this.levelLabel.setString(this.levelNum.value);
			if (this.ls.getItem(100) == 1){
				this.levelLabel.setColor(cc.color(0,0,0));
			}
			else if (this.levelNum.value < this.ls.getItem(100)){
				this.levelLabel.setColor(cc.color(0,150,0));
				// and load results ls.getItem
			}
			else if (this.levelNum.value == this.ls.getItem(100)){
				this.levelLabel.setColor(cc.color(0,0,0));
					// load results
			}
			
		}

		else if (this.levelNum.value > 2){
			this.levelNum.value --;
			this.updateStats();
			this.levelLabel.setString(this.levelNum.value);
			if (this.levelNum.value > this.ls.getItem(100)){
				this.levelLabel.setColor(cc.color(160,160,160));
			}
			else if (this.levelNum.value < this.ls.getItem(100)){
				this.levelLabel.setColor(cc.color(0,150,0));
				// and load results ls.getItem
			}
			else if (this.levelNum.value == this.ls.getItem(100)){
				this.levelLabel.setColor(cc.color(0,0,0));
					// load results
			}
		}
	},

    onPlay : function(){
    	if (this.levelNum.value <= this.ls.getItem(100)){
		this.ls.setItem(99, this.levelNum.value); //current Level
        this.ls.setItem(999,1); // Beta switch
        this.ls.setItem(666,levelsArray[this.levelNum.value-1][9]); // mode One
        cc.director.runScene(new PlayScene());
    	}
    },
        onBack : function(){
    	cc.director.runScene(new menuScene());
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
		//cc.log(rtn);
        switch (rtn) {
			case "left":
			if (this.levelNum.value == 1){
				this.levelNum.value ++;
				this.levelSel.addChild(this.cL,0,2);
				this.levelLabel.setString(this.levelNum.value);
				if (this.levelNum.value > this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(160,160,160));
				}
				else if (this.levelNum.value < this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(0,150,0));
					// and load results ls.getItem
				}
				else if (this.levelNum.value == this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(0,0,0));
					// load results
				}
				this.updateStats();
			}
			else if (this.levelNum.value <= 1000){
				this.levelNum.value ++;
				this.levelLabel.setString(this.levelNum.value);
				if (this.levelNum.value > this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(160,160,160));
				}
				else if (this.levelNum.value < this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(0,150,0));
					// and load results ls.getItem
				}
				else if (this.levelNum.value == this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(0,0,0));
					// load results
				}
				this.updateStats();
			}
				break;
			case "right":
			if (this.levelNum.value == 2){
				this.levelNum.value --;
				this.levelSel.removeChildByTag(2);
				this.levelLabel.setString(this.levelNum.value);
				if (this.levelNum.value > this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(160,160,160));
				}
				else if (this.levelNum.value < this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(0,150,0));
					// and load results ls.getItem
				}
				else if (this.levelNum.value == this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(0,0,0));
					// load results
				}
				this.updateStats();
			}
			else if (this.levelNum.value > 2){
				this.levelNum.value --;
				this.levelLabel.setString(this.levelNum.value);
				if (this.levelNum.value > this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(160,160,160));
				}
				else if (this.levelNum.value < this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(0,150,0));
					// and load results ls.getItem
				}
				else if (this.levelNum.value == this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(0,0,0));
					// load results
				}
				this.updateStats();
			}
				break;			
            default:
            	var corX = touch.getLocationX();
                var corY = touch.getLocationY();
                if (corX > this.winsize.width/4 && corX < this.winsize.width/4*3 && corY > this.winsize.height/4 && corY < this.winsize.height/4*3) this.onPlay();
                break;
        }
    },	

 onExit:function() {
		this.controlRight.release();
        this.controlRightP.release();
		this.controlLeft.release();
        this.controlLeftP.release();
        this.cR.release();
        this.cL.release();
        this._super();
},
});

var levelSelectorScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new levelSelector();
        layer.init();
        this.addChild(layer);
    }
});
