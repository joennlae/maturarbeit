var menuLayer = cc.Layer.extend({
	winsize: null,
    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },
    init:function(){
 
        this._super();
        //global variables
        var ls = cc.sys.localStorage;
        if(ls.getItem(200)!=0) ls.setItem(200,1);//Helplines
        if(ls.getItem(201)!=0) ls.setItem(201,1);//Blinkhelp
        if(ls.getItem(202)!=0 && ls.getItem(202)<1) ls.setItem(202,0);//Gesamt Moves
        if(ls.getItem(203)!=0 && ls.getItem(203)<1) ls.setItem(203,0);//Gesamt Points
        if(ls.getItem(204)!=0 && ls.getItem(204)<1) ls.setItem(204,0);//Gesamt Level
        if(ls.getItem(205)!=0 && ls.getItem(205)<1) ls.setItem(205,0);//Gesamt Quads
        if(ls.getItem(206)!=0) ls.setItem(206,1);//Tutorial activated default
        this.winsize = cc.director.getWinSize();
        cc.log(ls.getItem(206));
        var centerpos = cc.p(this.winsize.width / 2, this.winsize.height / 2);

        var background = new cc.LayerColor(cc.color(255,255,255,255), this.winsize.width, this.winsize.height);
        this.addChild(background);
		
		this.startLabel = new cc.LabelTTF("Play", "Quicksand-Light", this.winsize.height/4);
        this.startLabel.setColor(cc.color(0,0,0));//black color
        //this.startLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
		
		this.startLabelP = new cc.LabelTTF("Play", "Quicksand-Light", this.winsize.height/4);
        this.startLabelP.setColor(cc.color(0,0,150));//blue color
        //this.startLabelP.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));

        this.betaLabel = new cc.LabelTTF("Beta", "Quicksand-Light", this.winsize.height/10);
        this.betaLabel.setColor(cc.color(0,0,0));//black color
        //this.startLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
        
        this.betaLabelP = new cc.LabelTTF("Beta", "Quicksand-Light", this.winsize.height/10);
        this.betaLabelP.setColor(cc.color(0,0,150));//blue color
        //this.startLabelP.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
		
        this.settingsLabel = new cc.LabelTTF("Settings", "Quicksand-Light", this.winsize.height/10);
        this.settingsLabel.setColor(cc.color(0,0,0));//black color
        //this.startLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
        
        this.settingsLabelP = new cc.LabelTTF("Settings", "Quicksand-Light", this.winsize.height/10);
        this.settingsLabelP.setColor(cc.color(0,0,150));//blue color
        //this.startLabelP.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
        
        this.messageLabel = new cc.LabelTTF(startUpMessages[Math.floor(Math.random()*10)], "Quicksand-Light", this.winsize.height/12);
        this.messageLabel.setColor(cc.color(150,0,0));
        this.messageLabel.setPosition(cc.p(this.winsize.width/4*(posNumbers[Math.floor(Math.random()*2)]),this.winsize.height/4*(Math.random()*2+1)));
        this.messageLabel.setAnchorPoint(0,0);
        this.addChild(this.messageLabel);

        var menuItemLabel = new cc.MenuItemSprite(
            this.startLabel,
            this.startLabelP, 
            this.onPlay, this);
        var menu = new cc.Menu(menuItemLabel);  
        menu.setPosition(centerpos);
        this.addChild(menu);

        var betaItemLabel = new cc.MenuItemSprite(
            this.betaLabel,
            this.betaLabelP, 
            this.onBeta, this);
        var betaMenu = new cc.Menu(betaItemLabel); 
        betaMenu.setPosition(cc.p(this.winsize.width/4,this.winsize.height/6));
        this.addChild(betaMenu);

        var settingsItemLabel = new cc.MenuItemSprite(
            this.settingsLabel,
            this.settingsLabelP, 
            this.onSettings, this);
        var settingsMenu = new cc.Menu(settingsItemLabel); 
        settingsMenu.setPosition(cc.p(this.winsize.width/2,this.winsize.height/6));
        this.addChild(settingsMenu);
    },

    onPlay : function(){
        cc.director.runScene(new levelSelectorScene());
    },

    onBeta : function(){
        cc.director.runScene(new levelTestScene());
    },
    onSettings : function(){
        cc.director.runScene(new settingsScene());
    }
});

var menuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new menuLayer();
        layer.init();
        this.addChild(layer);
    }
});