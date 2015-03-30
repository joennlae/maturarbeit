var settingsLayer = cc.Layer.extend({
    listener: null,
    ls: null,
    switcher: null,
    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },
    init:function(){
    	this._super();

        var winsize = cc.director.getWinSize();
		var ls = cc.sys.localStorage;
        this.ls = cc.sys.localStorage;
        this.switcher = {value: 0};
		var background = new cc.LayerColor(cc.color(255,255,255,255), winsize.width, winsize.height);
        this.addChild(background);

        this.voteTrueButton = new cc.MenuItemSprite( new cc.Sprite(res.vote_true),new cc.Sprite(res.vote_true),this.helpLine,this);
        this.voteFalseButton = new cc.MenuItemSprite( new cc.Sprite(res.vote_false),new cc.Sprite(res.vote_false),this.helpLine,this);
        this.voteTrueMenu = new cc.Menu(this.voteTrueButton);
        this.voteFalseMenu = new cc.Menu(this.voteFalseButton);
        this.voteTrueMenu.setPosition(cc.p(winsize.width/4*1.6,winsize.height/6*4));
        this.voteFalseMenu.setPosition(cc.p(winsize.width/4*1.6,winsize.height/6*4));
        this.voteTrueMenu.visible = false;
        this.voteFalseMenu.visible = false;
        this.addChild(this.voteTrueMenu);
        this.addChild(this.voteFalseMenu);

        if(ls.getItem(200)==1) this.voteTrueMenu.visible = true;
        else this.voteFalseMenu.visible = true;

        this.backLabel = new cc.LabelTTF("Back", "Quicksand-Light" , winsize.height/8);
        this.backLabel.setColor(cc.color(0,0,0));//black color
        //this.startLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
		this.backLabelP = new cc.LabelTTF("Back", "Quicksand-Light", winsize.height/8);
        this.backLabelP.setColor(cc.color(0,0,150));

        this.helpLineLabel = new cc.LabelTTF("Lines", "Quicksand-Light" , winsize.height/10); 
        this.helpLineLabel.setPosition(cc.p(winsize.width/4,winsize.height/6*4))
        this.helpLineLabel.setColor(cc.color(0,0,0));
        this.addChild(this.helpLineLabel);

        this.voteTrueButtonBlink = new cc.MenuItemSprite( new cc.Sprite(res.vote_true),new cc.Sprite(res.vote_true),this.blink,this);
        this.voteFalseButtonBlink = new cc.MenuItemSprite( new cc.Sprite(res.vote_false),new cc.Sprite(res.vote_false),this.blink,this);
        this.voteTrueMenuBlink = new cc.Menu(this.voteTrueButtonBlink);
        this.voteFalseMenuBlink = new cc.Menu(this.voteFalseButtonBlink);
        this.voteTrueMenuBlink.setPosition(cc.p(winsize.width/4*3.1,winsize.height/6*4));
        this.voteFalseMenuBlink.setPosition(cc.p(winsize.width/4*3.1,winsize.height/6*4));
        this.voteTrueMenuBlink.visible = false;
        this.voteFalseMenuBlink.visible = false;
        this.addChild(this.voteTrueMenuBlink);
        this.addChild(this.voteFalseMenuBlink);
        if(ls.getItem(201)==1) this.voteTrueMenuBlink.visible = true;
        else this.voteFalseMenuBlink.visible = true;

        this.blinkHelpLabel = new cc.LabelTTF("Blink", "Quicksand-Light" , winsize.height/10); //ls.getnumber(201)
        this.blinkHelpLabel.setPosition(cc.p(winsize.width/4*2.5,winsize.height/6*4));
        this.blinkHelpLabel.setColor(cc.color(0,0,0));
        this.addChild(this.blinkHelpLabel);


        this.voteTrueButtonTutorial = new cc.MenuItemSprite( new cc.Sprite(res.vote_true),new cc.Sprite(res.vote_true),this.tutorial,this);
        this.voteFalseButtonTutorial = new cc.MenuItemSprite( new cc.Sprite(res.vote_false),new cc.Sprite(res.vote_false),this.tutorial,this);
        this.voteTrueMenuTutorial = new cc.Menu(this.voteTrueButtonTutorial);
        this.voteFalseMenuTutorial = new cc.Menu(this.voteFalseButtonTutorial);
        this.voteTrueMenuTutorial.setPosition(cc.p(winsize.width/4*3.1,winsize.height/6*3));
        this.voteFalseMenuTutorial.setPosition(cc.p(winsize.width/4*3.1,winsize.height/6*3));
        this.voteTrueMenuTutorial.visible = false;
        this.voteFalseMenuTutorial.visible = false;
        this.addChild(this.voteTrueMenuTutorial);
        this.addChild(this.voteFalseMenuTutorial);

        if(ls.getItem(206)==1) this.voteTrueMenuTutorial.visible = true;
        else this.voteFalseMenuTutorial.visible = true;

        this.tutorialHelpLabel = new cc.LabelTTF("Tutorial", "Quicksand-Light" , winsize.height/10); //ls.getnumber(206) 
        this.tutorialHelpLabel.setColor(cc.color(0,0,0));
        this.tutorialHelpLabel.setPosition(cc.p(winsize.width/2,winsize.height/6*3));
        this.addChild(this.tutorialHelpLabel);

        this.voteTrueButtonSound = new cc.MenuItemSprite( new cc.Sprite(res.vote_true),new cc.Sprite(res.vote_true),this.sound,this);
        this.voteFalseButtonSound = new cc.MenuItemSprite( new cc.Sprite(res.vote_false),new cc.Sprite(res.vote_false),this.sound,this);
        this.voteTrueMenuSound = new cc.Menu(this.voteTrueButtonSound);
        this.voteFalseMenuSound = new cc.Menu(this.voteFalseButtonSound);
        this.voteTrueMenuSound.setPosition(cc.p(winsize.width/4*3.1,winsize.height/6*2));
        this.voteFalseMenuSound.setPosition(cc.p(winsize.width/4*3.1,winsize.height/6*2));
        this.voteTrueMenuSound.visible = false;
        this.voteFalseMenuSound.visible = false;
        this.addChild(this.voteTrueMenuSound);
        this.addChild(this.voteFalseMenuSound);

        if(ls.getItem(211)==1) this.voteTrueMenuSound.visible = true;
        else this.voteFalseMenuSound.visible = true;

        this.soundHelpLabel = new cc.LabelTTF("Music", "Quicksand-Light" , winsize.height/10); 
        this.soundHelpLabel.setColor(cc.color(0,0,0));
        this.soundHelpLabel.setPosition(cc.p(winsize.width/2,winsize.height/6*2));
        this.addChild(this.soundHelpLabel);

        this.positionMarkerNode = new cc.LayerColor(cc.color(255,255,255,200));
        this.positionMarkerNode.visible = false;
        this.addChild(this.positionMarkerNode,10,345);
        this.positionMarkerNode.retain();

        cc.spriteFrameCache.addSpriteFrames(res.rails_plist);
        cc.textureCache.addImage("res/rails.png");

        for (i = 0; i < 3; i++) {  
            for (j = 0; j < 8; j++) { 
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame((i*8+j+1)+".png");
                var sprite = new cc.Sprite(spriteFrame);
                    sprite.attr({x: (204+164+j*164), y:(winsize.height/6*(4-i))});
                this.positionMarkerNode.addChild(sprite,15,i*8+j+1);
                var sprite = new cc.Sprite(res.vote_false);
                    sprite.attr({x: (204+164+j*164), y:(winsize.height/6*(4-i))});
                this.positionMarkerNode.addChild(sprite,11);
                }
            }

        this.backgroundMarker = new cc.Sprite(res.vote_false);
        this.backgroundMarker.setPosition(cc.p(winsize.width/4*3.1,winsize.height/6*5));
        this.addChild(this.backgroundMarker);

        this.halfLabel = new cc.LabelTTF("Half Size", "Quicksand-Light" , winsize.height/12);
        this.halfLabel.setColor(cc.color(0,0,0));
        this.halfLabel.setPosition(cc.p(winsize.width/4,winsize.height/6));
        this.positionMarkerNode.addChild(this.halfLabel);

        this.voteTruehS = new cc.MenuItemSprite( new cc.Sprite(res.vote_true),new cc.Sprite(res.vote_true),this.hS,this);
        this.voteFalsehS = new cc.MenuItemSprite( new cc.Sprite(res.vote_false),new cc.Sprite(res.vote_false),this.hS,this);
        this.voteTrueMenuHS = new cc.Menu(this.voteTruehS);
        this.voteFalseMenuHS = new cc.Menu(this.voteFalsehS);
        this.voteTrueMenuHS.setPosition(cc.p(winsize.width/4*1.6,winsize.height/6));
        this.voteFalseMenuHS.setPosition(cc.p(winsize.width/4*1.6,winsize.height/6));
        this.voteTrueMenuHS.visible = false;
        this.voteFalseMenuHS.visible = false;
        this.positionMarkerNode.addChild(this.voteTrueMenuHS);
        this.positionMarkerNode.addChild(this.voteFalseMenuHS);

        if(ls.getItem(208)==1) this.voteTrueMenuHS.visible = true;
        else this.voteFalseMenuHS.visible = true;

        this.fullLabel = new cc.LabelTTF("Full Size", "Quicksand-Light" , winsize.height/12);
        this.fullLabel.setColor(cc.color(0,0,0));
        this.fullLabel.setPosition(cc.p(winsize.width/4*2.5,winsize.height/6));
        this.positionMarkerNode.addChild(this.fullLabel);

        this.voteTruefS = new cc.MenuItemSprite( new cc.Sprite(res.vote_true),new cc.Sprite(res.vote_true),this.fS,this);
        this.voteFalsefS = new cc.MenuItemSprite( new cc.Sprite(res.vote_false),new cc.Sprite(res.vote_false),this.fS,this);
        this.voteTrueMenuFS = new cc.Menu(this.voteTruefS);
        this.voteFalseMenuFS = new cc.Menu(this.voteFalsefS);
        this.voteTrueMenuFS.setPosition(cc.p(winsize.width/4*3.1,winsize.height/6));
        this.voteFalseMenuFS.setPosition(cc.p(winsize.width/4*3.1,winsize.height/6));
        this.voteTrueMenuFS.visible = false;
        this.voteFalseMenuFS.visible = false;
        this.positionMarkerNode.addChild(this.voteTrueMenuFS);
        this.positionMarkerNode.addChild(this.voteFalseMenuFS);

        if(ls.getItem(208)==2) this.voteTrueMenuFS.visible = true;
        else this.voteFalseMenuFS.visible = true;

        var spriteFrame = cc.spriteFrameCache.getSpriteFrame(ls.getItem(207)+".png");
        this.butPosMark = new cc.MenuItemSprite (new cc.Sprite(spriteFrame),new cc.Sprite(spriteFrame),this.positionMarker,this);
        this.posMarkMenu = new cc.Menu(this.butPosMark);

        this.posMarkMenu.setPosition(cc.p(winsize.width/4*3.1,winsize.height/6*5));
        this.addChild(this.posMarkMenu,1,72);

        this.positionMarkerHelpLabel = new cc.LabelTTF("Position Marker", "Quicksand-Light" , winsize.height/10); //ls.getnumber(201)
        this.positionMarkerHelpLabel.setPosition(cc.p(winsize.width/2,winsize.height/6*5));
        this.positionMarkerHelpLabel.setColor(cc.color(0,0,0));
        this.addChild(this.positionMarkerHelpLabel);

        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            ls: cc.sys.localStorage,
            positionMarkerEnd: this.positionMarkerEnd,
            positionMarkerNode: this.positionMarkerNode,
            butPosMark: this.butPosMark,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var corX = touch.getLocationX();
                var corY = touch.getLocationY();
                cc.log(corX+"     "+(corX-336));
                if (corY<752 && corY>698){ //top row
                    var num = 1+Math.floor((corX-336)/164);
                    if(num>0 && num<9){
                    ls.setItem(207,num);
                    this.positionMarkerEnd();
                    }
                }
                else if (corY<572 && corY>508){//second row
                    var num = 9+Math.floor((corX-336)/164);
                    if(num>8 && num<17){
                    ls.setItem(207,num);
                    this.positionMarkerEnd();
                    }
                }
                else if (corY<392 && corY>328){//third row
                    var num = 17+Math.floor((corX-336)/164);
                    if(num>16 && num<25){
                    ls.setItem(207,num);
                    this.positionMarkerEnd();
                    }
                }
                cc.log(num);
                
                return true;
            }
        });
        this.listener.retain();

        //cc.eventManager.pauseTarget(this.positionMarkerNode, true);
        //this.positionMarkerEnd();

        

        var backItemLabel = new cc.MenuItemSprite(
            this.backLabel,
            this.backLabelP, 
            this.onBack, this);
        var backMenu = new cc.Menu(backItemLabel);  
        //backMenu.setAnchorPoint(1,0); 
        backMenu.setPosition(cc.p(winsize.width/2,winsize.height/6));
        this.addChild(backMenu);

	},
    	onBack : function(){
    	cc.director.runScene(new menuScene());
    },
        helpLine:function(){
        var ls = cc.sys.localStorage;
        if (ls.getItem(200)==1){
            ls.setItem(200,0);
            this.voteTrueMenu.visible = false;
            this.voteFalseMenu.visible = true;
        }
        else if (ls.getItem(200)==0){
            ls.setItem(200,1);
            this.voteTrueMenu.visible = true;
            this.voteFalseMenu.visible = false;
        }
    },
        blink:function(){
        var ls = cc.sys.localStorage;
        if (ls.getItem(201)==1){
            ls.setItem(201,0);
            this.voteTrueMenuBlink.visible = false;
            this.voteFalseMenuBlink.visible = true;
        }
        else if (ls.getItem(201)==0){
            ls.setItem(201,1);
            this.voteTrueMenuBlink.visible = true;
            this.voteFalseMenuBlink.visible = false;
        }
    },
        tutorial:function(){
        var ls = cc.sys.localStorage;
        if (ls.getItem(206)==1){
            ls.setItem(206,0);
            this.voteTrueMenuTutorial.visible = false;
            this.voteFalseMenuTutorial.visible = true;
        }
        else if (ls.getItem(206)==0){
            ls.setItem(206,1);
            this.voteTrueMenuTutorial.visible = true;
            this.voteFalseMenuTutorial.visible = false;
        }
    },
        sound:function(){
        var ls = cc.sys.localStorage;
        cc.log("ausgeführt");
        cc.log(ls.getItem(211));
        if (ls.getItem(211)==1){
            ls.setItem(211,2);
            this.voteTrueMenuSound.visible = false;
            this.voteFalseMenuSound.visible = true;
            cc.audioEngine.pauseMusic();
        }
        else if (ls.getItem(211)==2){
            ls.setItem(211,1);
            this.voteTrueMenuSound.visible = true;
            this.voteFalseMenuSound.visible = false;
            cc.audioEngine.resumeMusic();
        }
    },
        positionMarker:function(){
            cc.log("ausgeführt");
            if(this.switcher.value == 0){ //Problems vo Cocos2d-js listener not paused for first touch 
                cc.eventManager.addListener(this.listener, this.positionMarkerNode);
                this.switcher.value = 1;
            }
            this.positionMarkerNode.visible = true;
            cc.eventManager.resumeTarget(this.positionMarkerNode, true);
        },
        positionMarkerEnd:function(){
            var winsize = cc.director.getWinSize();
            this.positionMarkerNode.visible = false;
            cc.eventManager.pauseTarget(this.positionMarkerNode, true);
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(this.ls.getItem(207)+".png");
            this.butPosMark.setNormalImage(new cc.Sprite(spriteFrame));
            this.butPosMark.setSelectedImage(new cc.Sprite(spriteFrame));
        },
        hS:function(){
            var ls = cc.sys.localStorage;
            if (ls.getItem(208)==1){
                ls.setItem(208,2);
                this.voteTrueMenuFS.visible = true;
                this.voteFalseMenuFS.visible = false;
                this.voteTrueMenuHS.visible = false;
                this.voteFalseMenuHS.visible = true;
            }
            else if (ls.getItem(208)==2){
                ls.setItem(208,1);
                this.voteTrueMenuFS.visible = false;
                this.voteFalseMenuFS.visible = true;
                this.voteTrueMenuHS.visible = true;
                this.voteFalseMenuHS.visible = false;
            }
        },
        fS:function(){
            var ls = cc.sys.localStorage;
            if (ls.getItem(208)==1){
                ls.setItem(208,2);
                this.voteTrueMenuFS.visible = true;
                this.voteFalseMenuFS.visible = false;
                this.voteTrueMenuHS.visible = false;
                this.voteFalseMenuHS.visible = true;
            }
            else if (ls.getItem(208)==2){
                ls.setItem(208,1);
                this.voteTrueMenuFS.visible = false;
                this.voteFalseMenuFS.visible = true;
                this.voteTrueMenuHS.visible = true;
                this.voteFalseMenuHS.visible = false;
            }
        },
    onExit:function() {
        this.positionMarkerNode.release();
        this.listener.release();
        this._super();
    }
});


var settingsScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new settingsLayer();
        layer.init();
        this.addChild(layer);
    }
});
