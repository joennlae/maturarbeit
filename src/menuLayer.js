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
        if(ls.getItem(206)!=0) ls.setItem(206,1);//Tutorial activated default
        if(ls.getItem(207)<1) ls.setItem(207,6); //positionMarker 6=default
        if(ls.getItem(208)<1) ls.setItem(208,2); //Halfsize or Fullsize=default
        if(ls.getItem(209)<1) ls.setItem(209,1); //Gamemode 2 tutorial
        if(ls.getItem(211)<1) ls.setItem(211,1); //Background Sound true=default
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
        
        this.messageLabel = new cc.LabelTTF(startUpMessages[Math.floor(Math.random()*(startUpMessages.length))], "Quicksand-Light", this.winsize.height/12);
        this.messageLabel.setColor(cc.color(150,0,0));
        //this.messageLabel.setPosition(cc.p(this.winsize.width/4*(posNumbers[Math.floor(Math.random()*2)]),this.winsize.height/4*(Math.random()*2+1)));
        this.messageLabel.setPosition(cc.p(this.winsize.width/2,this.winsize.height/6*5));
        this.messageLabel.setRotation(posNumbers[Math.floor(Math.random()*2+2)]*Math.floor(Math.random()*45));
        this.messageLabel.setAnchorPoint(0,0);
        this.addChild(this.messageLabel,5);

        var corX = this.winsize.width/4*(posNumbers[Math.floor(Math.random()*2)]);
        var corY = this.winsize.height/4*(Math.random()*2+1);

        this.actionMessage = new cc.JumpTo(2, cc.p(corX, corY), 150, 4);
        this.actionMessage.retain();

        this.messageLabel.runAction(this.actionMessage);

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
        //audio Eninge
        if(cc.audioEngine.isMusicPlaying()){}
        else{
        cc.audioEngine.playMusic(res.sound, true);
        if (ls.getItem(211)==2) cc.audioEngine.pauseMusic();
        }

    },

    onPlay : function(){
        cc.director.runScene(new levelSelectorScene());
    },

    onBeta : function(){
        cc.director.runScene(new levelTestScene());
    },
    onSettings : function(){
        cc.director.runScene(new settingsScene());
    },
    onExit:function() {
        this.actionMessage.release();
        this._super();
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