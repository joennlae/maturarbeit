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
		cc.log(this.ls.getItem(100));
		if (this.ls.getItem(100) == null){
			this.ls.setItem(100, 1);
		}
		this.levelNum.value = this.ls.getItem(100);
		this.levelLabel = new cc.LabelTTF(this.levelNum.value, "Quicksand-Light", this.winsize.height/2);
        this.levelLabel.setColor(cc.color(0,0,0));//black color
        this.levelLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
        this.addChild(this.levelLabel);
		
		this.recognizer = new SimpleRecognizer();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
			levelNum: this.levelNum,
			ls: this.ls,
			levelLabel: this.levelLabel,
			spriteSheet: this.spriteSheet,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
		
		this.startLabel = new cc.LabelTTF("Start", "Quicksand-Light", this.winsize.height/10);
        this.startLabel.setColor(cc.color(0,0,0));//black color
        //this.startLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
		
		this.startLabelP = new cc.LabelTTF("Start", "Quicksand-Light", this.winsize.height/10);
        this.startLabelP.setColor(cc.color(0,0,150));//black color
        //this.startLabelP.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
		
		this.controlRight = new cc.LabelTTF(">", "Quicksand-Light", this.winsize.height/4);
        this.controlRight.setColor(cc.color(120,120,120));
		//this.controlRight.setPosition(cc.p(this.winsize.width/4*3, this.winsize.height/2));
		this.controlRightP = new cc.LabelTTF(">", "Quicksand-Light", this.winsize.height/4);
        this.controlRightP.setColor(cc.color(0,0,0));
		
		this.controlLeft = new cc.LabelTTF("<", "Quicksand-Light", this.winsize.height/4);
        this.controlLeft.setColor(cc.color(120,120,120));
		//this.controlLeft.setPosition(cc.p(this.winsize.width/4, this.winsize.height/2));
		this.controlLeftP = new cc.LabelTTF("<", "Quicksand-Light", this.winsize.height/4);
        this.controlLeftP.setColor(cc.color(0,0,0));
		
		var controlRightLabel = new cc.MenuItemSprite(
            this.controlRight,
            this.controlRightP, 
            this.controllingRight, this);
        var cR = new cc.Menu(controlRightLabel);  
        cR.setPosition(cc.p(this.winsize.width/4*3,this.winsize.height/2));
        this.addChild(cR);
		
		var controlLeftLabel = new cc.MenuItemSprite(
            this.controlLeft,
            this.controlLeftP, 
            this.controllingLeft, this);
        this.cL = new cc.Menu(controlLeftLabel);  
        this.cL.setPosition(cc.p(this.winsize.width/4,this.winsize.height/2));
        //this.addChild(cL);
		
        var menuItemLabel = new cc.MenuItemSprite(
            this.startLabel,
            this.startLabelP, 
            this.onPlay, this);
        var menu = new cc.Menu(menuItemLabel);  
        menu.setPosition(cc.p(this.winsize.width/2,this.winsize.height/4));
        this.addChild(menu);
    },
	
	controllingRight : function(){
		cc.log(this.getChildrenCount());
		//this.addChild(this.cL);
		if (this.levelNum.value == 1) {
			this.addChild(this.cL);
			this.levelNum.value ++;
			this.levelLabel.setString(this.levelNum.value);
			if (this.ls.getItem(100) == 2){
				this.levelLabel.setColor(cc.color(0,0,0));
			}
			else if (this.ls.getItem(100) > 2){
				this.levelLabel.setColor(cc.color(255,0,0));
			}
			else this.levelLabel.setColor(cc.color(160,160,160));
		}
		else if (this.levelNum.value <= 1000){
			this.levelNum.value ++;
			this.levelLabel.setString(this.levelNum.value);
			if (this.levelNum.value > this.ls.getItem(100)){
				this.levelLabel.setColor(cc.color(160,160,160));
			}
			else if (this.levelNum.value < this.ls.getItem(100)){
				this.levelLabel.setColor(cc.color(255,0,0));
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
			this.removeChild(this.cL);
			this.levelLabel.setString(this.levelNum.value);
			if (this.ls.getItem(100) == 1){
				this.levelLabel.setColor(cc.color(0,0,0));
			}
			else this.levelLabel.setColor(cc.color(160,160,160));
			
		}

		else if (this.levelNum.value >2){
			this.levelNum.value --;
			this.levelLabel.setString(this.levelNum.value);
			if (this.levelNum.value > this.ls.getItem(100)){
				this.levelLabel.setColor(cc.color(160,160,160));
			}
			else if (this.levelNum.value < this.ls.getItem(100)){
				this.levelLabel.setColor(cc.color(255,0,0));
				// and load results ls.getItem
			}
			else if (this.levelNum.value == this.ls.getItem(100)){
				this.levelLabel.setColor(cc.color(0,0,0));
					// load results
			}
		}
	},

    onPlay : function(){
        this.ls.setItem(3, Math.random()*34);    //current level number
        cc.log("==onplay clicked");
        cc.director.runScene(new PlayScene());
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
            case "up":
                break;
			case "down":
				break;
			case "left":
			if (this.levelNum.value <= 1000){
				this.levelNum.value ++;
				this.levelLabel.setString(this.levelNum.value);
				if (this.levelNum.value > this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(160,160,160));
				}
				else if (this.levelNum.value < this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(255,0,0));
					// and load results ls.getItem
				}
				else if (this.levelNum.value == this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(0,0,0));
					// load results
				}
			}
				break;
			case "right":
			if (this.levelNum.value >1){
				this.levelNum.value --;
				this.levelLabel.setString(this.levelNum.value);
				if (this.levelNum.value > this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(160,160,160));
				}
				else if (this.levelNum.value < this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(255,0,0));
					// and load results ls.getItem
				}
				else if (this.levelNum.value == this.ls.getItem(100)){
					this.levelLabel.setColor(cc.color(0,0,0));
					// load results
				}
			}
				break;			
            default:
                break;
        }
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
