var settingsLayer = cc.Layer.extend({
    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },
    init:function(){
    	this._super();

        var winsize = cc.director.getWinSize();
		var ls = cc.sys.localStorage;

		var background = new cc.LayerColor(cc.color(255,255,255,255), winsize.width, winsize.height);
        this.addChild(background);

        this.voteTrueButton = new cc.MenuItemSprite( new cc.Sprite(res.vote_true),new cc.Sprite(res.vote_true),this.helpLine,this);
        this.voteFalseButton = new cc.MenuItemSprite( new cc.Sprite(res.vote_false),new cc.Sprite(res.vote_false),this.helpLine,this);
        this.voteTrueMenu = new cc.Menu(this.voteTrueButton);
        this.voteFalseMenu = new cc.Menu(this.voteFalseButton);
        this.voteTrueMenu.setPosition(cc.p(winsize.width/4*3,winsize.height/6*4));
        this.voteFalseMenu.setPosition(cc.p(winsize.width/4*3,winsize.height/6*4));
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
        this.helpLineLabel.setPosition(cc.p(winsize.width/2,winsize.height/6*4))
        this.helpLineLabel.setColor(cc.color(0,0,0));
        this.addChild(this.helpLineLabel);

        this.voteTrueButtonBlink = new cc.MenuItemSprite( new cc.Sprite(res.vote_true),new cc.Sprite(res.vote_true),this.blink,this);
        this.voteFalseButtonBlink = new cc.MenuItemSprite( new cc.Sprite(res.vote_false),new cc.Sprite(res.vote_false),this.blink,this);
        this.voteTrueMenuBlink = new cc.Menu(this.voteTrueButtonBlink);
        this.voteFalseMenuBlink = new cc.Menu(this.voteFalseButtonBlink);
        this.voteTrueMenuBlink.setPosition(cc.p(winsize.width/4*3,winsize.height/6*3));
        this.voteFalseMenuBlink.setPosition(cc.p(winsize.width/4*3,winsize.height/6*3));
        this.voteTrueMenuBlink.visible = false;
        this.voteFalseMenuBlink.visible = false;
        this.addChild(this.voteTrueMenuBlink);
        this.addChild(this.voteFalseMenuBlink);
        if(ls.getItem(201)==1) this.voteTrueMenuBlink.visible = true;
        else this.voteFalseMenuBlink.visible = true;

        this.blinkHelpLabel = new cc.LabelTTF("Blink", "Quicksand-Light" , winsize.height/10); //ls.getnumber(201)
        this.blinkHelpLabel.setPosition(cc.p(winsize.width/2,winsize.height/6*3));
        this.blinkHelpLabel.setColor(cc.color(0,0,0));
        this.addChild(this.blinkHelpLabel);


        this.voteTrueButtonTutorial = new cc.MenuItemSprite( new cc.Sprite(res.vote_true),new cc.Sprite(res.vote_true),this.tutorial,this);
        this.voteFalseButtonTutorial = new cc.MenuItemSprite( new cc.Sprite(res.vote_false),new cc.Sprite(res.vote_false),this.tutorial,this);
        this.voteTrueMenuTutorial = new cc.Menu(this.voteTrueButtonTutorial);
        this.voteFalseMenuTutorial = new cc.Menu(this.voteFalseButtonTutorial);
        this.voteTrueMenuTutorial.setPosition(cc.p(winsize.width/4*3,winsize.height/6*2));
        this.voteFalseMenuTutorial.setPosition(cc.p(winsize.width/4*3,winsize.height/6*2));
        this.voteTrueMenuTutorial.visible = false;
        this.voteFalseMenuTutorial.visible = false;
        this.addChild(this.voteTrueMenuTutorial);
        this.addChild(this.voteFalseMenuTutorial);

        if(ls.getItem(206)==1) this.voteTrueMenuTutorial.visible = true;
        else this.voteFalseMenuTutorial.visible = true;

        this.tutorialHelpLabel = new cc.LabelTTF("Tutorial", "Quicksand-Light" , winsize.height/10); //ls.getnumber(206) 
        this.tutorialHelpLabel.setColor(cc.color(0,0,0));
        this.tutorialHelpLabel.setPosition(cc.p(winsize.width/2,winsize.height/6*2));
        this.addChild(this.tutorialHelpLabel);

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
