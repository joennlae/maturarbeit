
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
        //first time loading iOS
		if (this.ls.getItem(100) < 1){
			this.ls.setItem(100, 1);
            var saveArray = new Array();
            for(i=0; i<levelsArray.length; i++){
            saveArray.push( [] );
            for(j=0; j<6; j++){
                saveArray[i].push(0); 
            }
            }
                this.ls.setItem(101, JSON.stringify(saveArray));//points| redquads | bluequads | rank | moves | done-check
                this.ls.setItem(99,1);
		}
		

		saveArray = JSON.parse(this.ls.getItem(101));
		cc.log(saveArray);

		this.levelNum.value = this.ls.getItem(99);
		this.levelLabel = new cc.LabelTTF(this.levelNum.value, "Quicksand-Light", this.winsize.height/8*5);
        if(this.levelNum.value < this.ls.getItem(100)){
            this.levelLabel.setColor(cc.color(0,150,0));
        } else {
        this.levelLabel.setColor(cc.color(0,0,0));
        }
        this.levelLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
        this.addChild(this.levelLabel);
		
		this.recognizer = new SimpleRecognizer();
		
		this.startLabel = new cc.LabelTTF("Play", "Quicksand-Light" , this.winsize.height/10);
        this.startLabel.setColor(cc.color(0,0,0));
		this.startLabelP = new cc.LabelTTF("Play", "Quicksand-Light", this.winsize.height/10);
        this.startLabelP.setColor(cc.color(0,0,150));
		
		this.controlRight = new cc.LabelTTF(">", "Quicksand-Light", this.winsize.height/4);
        this.controlRight.setColor(cc.color(120,120,120));
		this.controlRightP = new cc.LabelTTF(">", "Quicksand-Light", this.winsize.height/4);
        this.controlRightP.setColor(cc.color(0,0,0));
		this.controlRight.retain();
        this.controlRightP.retain();
		
        this.controlLeft = new cc.LabelTTF("<", "Quicksand-Light", this.winsize.height/4);
        this.controlLeft.setColor(cc.color(120,120,120));
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

        //check for finished state

        if(this.levelNum.value <= levelsArray.length){
            this.levelLabel.visible  = true
        }
        else {
            this.levelLabel.visible = false;
            this.removeChildByTag(1);
        }

		var controlLeftLabel = new cc.MenuItemSprite(
            this.controlLeft,
            this.controlLeftP, 
            this.controllingLeft, this);
        this.cL = new cc.Menu(controlLeftLabel);  
        this.cL.setPosition(cc.p(this.winsize.width/8,this.winsize.height/2));
        //this.addChild(cL);

		if (this.levelNum.value > 1){
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

        //stats preloading objects
        this.maxLabel = new cc.LabelTTF("Coming soon!", "Quicksand-Light", this.winsize.height/8);
        this.maxLabel.setColor(cc.color(0,0,0));
        this.maxLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
        this.maxLabel.visible = false;
        this.addChild(this.maxLabel);

        this.pointsLabel = new cc.LabelTTF("", "Quicksand-Light", this.winsize.height/12);
        this.pointsLabel.setColor(cc.color(0,0,0));
        this.pointsLabel.setPosition(cc.p(this.winsize.width/4, this.winsize.height/10*9));
        this.pointsLabel.visible = false;
        this.addChild(this.pointsLabel);

        this.quadsLabel = new cc.LabelTTF("", "Quicksand-Light", this.winsize.height/12);
        this.quadsLabel.setColor(cc.color(0,0,0));
        this.quadsLabel.setPosition(cc.p(this.winsize.width/4, this.winsize.height/10*8));
        this.quadsLabel.visible = false;
        this.addChild(this.quadsLabel);

        this.quadsBlueLabel = new cc.LabelTTF("", "Quicksand-Light", this.winsize.height/12);
        this.quadsBlueLabel.setColor(cc.color(0,0,0));
        this.quadsBlueLabel.setPosition(cc.p(this.winsize.width/4*1.2, this.winsize.height/10*8));
        this.quadsBlueLabel.visible = false;
        this.addChild(this.quadsBlueLabel);

        this.movesLabel = new cc.LabelTTF("", "Quicksand-Light", this.winsize.height/12);
        this.movesLabel.setColor(cc.color(0,0,0));
        this.movesLabel.setPosition(cc.p(this.winsize.width/4*3, this.winsize.height/10*9));
        this.movesLabel.visible = false;
        this.addChild(this.movesLabel);

       	this.rankLabel = new cc.LabelTTF("", "Quicksand-Light", this.winsize.height/12);
        this.rankLabel.setColor(cc.color(0,0,0));
        this.rankLabel.setPosition(cc.p(this.winsize.width/4*3, this.winsize.height/10*8));
        this.rankLabel.visible = false;
        this.addChild(this.rankLabel);

        this.questionLabel = new cc.LabelTTF("?", "Quicksand-Light", this.winsize.height/8);
        this.questionLabel.setColor(cc.color(0,0,0));
        this.questionLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/10*8.5));
        this.questionLabel.visible = false;
        this.addChild(this.questionLabel);

        if(this.levelNum.value<levelsArray.length+1){
        	this.pointsLabel.visible = true;
        	this.quadsLabel.visible = true;
        	this.movesLabel.visible = true;
        	this.rankLabel.visible = true;
        	if(levelsArray[this.levelNum.value-1][9]==2 || levelsArray[this.levelNum.value-1][9]==3){
        		this.quadsBlueLabel.visible = true;
        	}
        	this.updateStats();
    	}
    	else{
    		this.quadsBlueLabel.visible = false;
    		this.pointsLabel.visible = false;
    		this.quadsLabel.visible = false;
    		this.movesLabel.visible = false;
    		this.rankLabel.visible = false;
    		this.maxLabel.visible = true;
    	}

        this.backLabel = new cc.LabelTTF("Back", "Quicksand-Light" , this.winsize.height/10);
        this.backLabel.setColor(cc.color(0,0,0));//black color
		this.backLabelP = new cc.LabelTTF("Back", "Quicksand-Light", this.winsize.height/10);
        this.backLabelP.setColor(cc.color(0,0,150));

        var backItemLabel = new cc.MenuItemSprite(
            this.backLabel,
            this.backLabelP, 
            this.onBack, this);
        var backMenu = new cc.Menu(backItemLabel);  
        backMenu.setPosition(cc.p(this.winsize.width/8*3,this.winsize.height/6));
        this.addChild(backMenu);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
			levelNum: this.levelNum,
			ls: this.ls,
			levelSel: this,
			cL: this.cL,
			cR: this.cR,
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
            rankLabel: this.rankLabel,
            maxLabel: this.maxLabel,
            quadsBlueLabel: this.quadsBlueLabel,
            questionLabel: this.questionLabel
        }, this);
    },

    updateStats : function(){
    	cc.log(this.levelNum.value);
    	cc.log(levelsArray.length);
    	saveArray = JSON.parse(this.ls.getItem(101));
    	if(this.levelNum.value>levelsArray.length){
    		this.pointsLabel.visible = false;
    		this.quadsLabel.visible = false;
    		this.movesLabel.visible = false;
    		this.rankLabel.visible = false;
    		this.quadsBlueLabel.visible = false;
    		this.maxLabel.visible = true;
    		this.questionLabel.visible = false; 	
		}
		else if (this.levelNum.value > this.ls.getItem(100)){
			this.maxLabel.visible = false;
		    this.pointsLabel.visible = false;
		    this.quadsLabel.visible = false;
		    this.movesLabel.visible = false;
		    this.rankLabel.visible = false;
            this.quadsBlueLabel.visible = false;
            this.questionLabel.visible = true;

		}
    	else{
	    	this.maxLabel.visible = false;
	    	this.questionLabel.visible = false;
		    this.pointsLabel.visible = true;
		    this.quadsLabel.visible = true;
		    this.movesLabel.visible = true;
		    this.rankLabel.visible = true;
		    if(levelsArray[this.levelNum.value-1][9]==2 || levelsArray[this.levelNum.value-1][9]==3){
        		this.quadsBlueLabel.visible = true;
        	}
        	else this.quadsBlueLabel.visible = false;


    	if (saveArray[this.levelNum.value-1][0] >= levelsArray[this.levelNum.value-1][5]){
    		this.pointsLabel.setColor(cc.color(0,150,0));
    		this.pointsLabel.setString(saveArray[this.levelNum.value-1][0]/*+"/"+levelsArray[this.levelNum.value-1][5]*/);
    	}
    	else {
    		this.pointsLabel.setColor(cc.color(0,0,0));
    		this.pointsLabel.setString(saveArray[this.levelNum.value-1][0]/*+"/"+levelsArray[this.levelNum.value-1][5]*/);
    	}

    	if (saveArray[this.levelNum.value-1][1] >= levelsArray[this.levelNum.value-1][3] || levelsArray[this.levelNum.value-1][9]==2 || levelsArray[this.levelNum.value-1][9]==3){
    		this.quadsLabel.setColor(cc.color(150,0,0));
    		this.quadsLabel.setString(saveArray[this.levelNum.value-1][1]+"/"+levelsArray[this.levelNum.value-1][3]);
    		this.quadsLabel.setPosition(cc.p(this.winsize.width/4, this.winsize.height/10*8));
    		if(levelsArray[this.levelNum.value-1][9]==2 || levelsArray[this.levelNum.value-1][9]==3){
    			this.quadsLabel.setPosition(cc.p(this.winsize.width/4*0.7, this.winsize.height/10*8));
    		}
    	}
    	else {
    		this.quadsLabel.setPosition(cc.p(this.winsize.width/4, this.winsize.height/10*8));
    		this.quadsLabel.setColor(cc.color(0,0,0));
    		this.quadsLabel.setString(saveArray[this.levelNum.value-1][1]+"/"+levelsArray[this.levelNum.value-1][3]);
    	}

    	if (levelsArray[this.levelNum.value-1][9]==2 || levelsArray[this.levelNum.value-1][9]==3) {
    		this.quadsBlueLabel.setColor(cc.color(0,0,150));
    		this.quadsBlueLabel.setString(saveArray[this.levelNum.value-1][2]+"/"+levelsArray[this.levelNum.value-1][4]);
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
		else if (this.levelNum.value < levelsArray.length ){
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
		else if(this.levelNum.value == levelsArray.length){
				this.levelNum.value ++;
				this.updateStats();
				this.levelLabel.visible = false;
				this.removeChildByTag(1);
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
			}
			else if (this.levelNum.value == this.ls.getItem(100)){
				this.levelLabel.setColor(cc.color(0,0,0));
			}
			
		}

		else if (this.levelNum.value > 2 && this.levelNum.value <= levelsArray.length){
			this.levelNum.value --;
			this.updateStats();
			this.levelLabel.setString(this.levelNum.value);
			if (this.levelNum.value > this.ls.getItem(100)){
				this.levelLabel.setColor(cc.color(160,160,160));
			}
			else if (this.levelNum.value < this.ls.getItem(100)){
				this.levelLabel.setColor(cc.color(0,150,0));
			}
			else if (this.levelNum.value == this.ls.getItem(100)){
				this.levelLabel.setColor(cc.color(0,0,0));
			}
		}
		else if (this.levelNum.value == levelsArray.length+1){
				this.levelNum.value --;
				this.updateStats();
                this.levelLabel.setString(this.levelNum.value);
				this.levelLabel.visible = true;
				this.addChild(this.cR,0,1);
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
			if (this.levelNum.value == 1) {
			this.levelSel.addChild(this.cL,0,2);
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
			else if (this.levelNum.value < levelsArray.length ){
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
			else if(this.levelNum.value == levelsArray.length){
				this.levelNum.value ++;
				this.updateStats();
				this.levelLabel.visible = false;
				this.levelSel.removeChildByTag(1);
			}
				break;
			case "right":
				if (this.levelNum.value == 2){
					this.levelNum.value --;
					this.updateStats();
					this.levelSel.removeChildByTag(2);
					this.levelLabel.setString(this.levelNum.value);
				if (this.ls.getItem(100) == 1){
					this.levelLabel.setColor(cc.color(0,0,0));
				}
				else if (this.levelNum.value < this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(0,150,0));
				}
				else if (this.levelNum.value == this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(0,0,0));
				}
			
				}

				else if (this.levelNum.value > 2 && this.levelNum.value <= levelsArray.length){
					this.levelNum.value --;
					this.updateStats();
					this.levelLabel.setString(this.levelNum.value);
				if (this.levelNum.value > this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(160,160,160));
					}
				else if (this.levelNum.value < this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(0,150,0));
					}
				else if (this.levelNum.value == this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(0,0,0));
					}
				}
				else if (this.levelNum.value == levelsArray.length+1){
					this.levelNum.value --;
					this.updateStats();
                    this.levelLabel.setString(this.levelNum.value);
					this.levelLabel.visible = true;
					this.levelSel.addChild(this.cR,0,1);
				}
				break;			
            default:
            	var corX = touch.getLocationX();
                var corY = touch.getLocationY();
                if (this.levelNum.value <= levelsArray.length);
                    if (corX > this.winsize.width/4 && corX < this.winsize.width/4*3 && corY > this.winsize.height/4 && corY < this.winsize.height/4*3) if (this.levelNum.value <= levelsArray.length) this.onPlay();
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
