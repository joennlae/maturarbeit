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

        this.backLabel = new cc.LabelTTF("Back", "Quicksand-Light" , winsize.height/8);
        this.backLabel.setColor(cc.color(0,0,0));//black color
        //this.startLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
		this.backLabelP = new cc.LabelTTF("Back", "Quicksand-Light", winsize.height/8);
        this.backLabelP.setColor(cc.color(0,0,150));

        this.helpLineLabel = new cc.LabelTTF("", "Quicksand-Light" , winsize.height/10); //ls.getnumber(200) for helplines
        if(ls.getItem(200)==1) this.helpLineLabel.setString("Lines : ON")
        else if(ls.getItem(200)==0) this.helpLineLabel.setString("Lines : OFF"); 
        this.helpLineLabel.setColor(cc.color(0,0,0));

        this.helpLineLabelP = new cc.LabelTTF("", "Quicksand-Light" , winsize.height/10);
        //this.helpLineLabelP.visible = false;

        this.blinkHelpLabel = new cc.LabelTTF("", "Quicksand-Light" , winsize.height/10); //ls.getnumber(201) for blinkHelps
        if(ls.getItem(201)==1) this.blinkHelpLabel.setString("Blink : ON")
        else if(ls.getItem(201)==0) this.blinkHelpLabel.setString("Blink : OFF"); 
        this.blinkHelpLabel.setColor(cc.color(0,0,0));

        this.blinkHelpLabelP = new cc.LabelTTF("", "Quicksand-Light" , winsize.height/10);

        this.tutorialHelpLabel = new cc.LabelTTF("", "Quicksand-Light" , winsize.height/10); //ls.getnumber(206) 
        if(ls.getItem(206)==1) this.tutorialHelpLabel.setString("Tutorial : ON")
        else if(ls.getItem(206)==0) this.tutorialHelpLabel.setString("Tutorial : OFF"); 
        this.tutorialHelpLabel.setColor(cc.color(0,0,0));

        this.tutorialHelpLabelP = new cc.LabelTTF("", "Quicksand-Light" , winsize.height/10);

        var backItemLabel = new cc.MenuItemSprite(
            this.backLabel,
            this.backLabelP, 
            this.onBack, this);
        var backMenu = new cc.Menu(backItemLabel);  
        //backMenu.setAnchorPoint(1,0); 
        backMenu.setPosition(cc.p(winsize.width/2,winsize.height/6));
        this.addChild(backMenu);

        var helpLineLabelItemLabel = new cc.MenuItemSprite(
            this.helpLineLabel,
            this.helpLineLabelP,
            this.onhelpLineLabel, this);
        var helpLineLabelMenu = new cc.Menu(helpLineLabelItemLabel);  
        //backMenu.setAnchorPoint(1,0); 
        helpLineLabelMenu.setPosition(cc.p(winsize.width/2,winsize.height/6*4));
        this.addChild(helpLineLabelMenu);

        var blinkHelpLabelItemLabel = new cc.MenuItemSprite(
            this.blinkHelpLabel,
            this.blinkHelpLabelP,
            this.onblinkHelpLabel, this);
        var blinkHelpLabelMenu = new cc.Menu(blinkHelpLabelItemLabel);  
        //backMenu.setAnchorPoint(1,0); 
        blinkHelpLabelMenu.setPosition(cc.p(winsize.width/2,winsize.height/6*3));
        this.addChild(blinkHelpLabelMenu);

        var tutorialHelpLabelItemLabel = new cc.MenuItemSprite(
            this.tutorialHelpLabel,
            this.tutorialHelpLabelP,
            this.ontutorialHelpLabel, this);
        var tutorialHelpLabelMenu = new cc.Menu(tutorialHelpLabelItemLabel);  
        //backMenu.setAnchorPoint(1,0); 
        tutorialHelpLabelMenu.setPosition(cc.p(winsize.width/2,winsize.height/6*2));
        this.addChild(tutorialHelpLabelMenu);


	},
    	onBack : function(){
    	cc.director.runScene(new menuScene());
    },
        onhelpLineLabel : function(){
        var ls = cc.sys.localStorage;
        if (ls.getItem(200)==1){
            this.helpLineLabel.setString("Lines : OFF");
            ls.setItem(200,0);
        }
        else if (ls.getItem(200)==0){
            this.helpLineLabel.setString("Lines : ON");
            ls.setItem(200,1);
        }
    },
        onblinkHelpLabel : function(){
        var ls = cc.sys.localStorage;
        if (ls.getItem(201)==1){
            this.blinkHelpLabel.setString("Blink : OFF");
            ls.setItem(201,0);
        }
        else if (ls.getItem(201)==0){
            this.blinkHelpLabel.setString("Blink : ON");
            ls.setItem(201,1);
        }
    },
        ontutorialHelpLabel : function(){
        var ls = cc.sys.localStorage;
        if (ls.getItem(206)==1){
            this.tutorialHelpLabel.setString("Tutorial : OFF");
            ls.setItem(206,0);
        }
        else if (ls.getItem(206)==0){
            this.tutorialHelpLabel.setString("Tutorial : ON");
            ls.setItem(206,1);
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
