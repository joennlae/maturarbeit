var menuLayer = cc.Layer.extend({
	winsize: null,
    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },
    init:function(){
 
        this._super();

        this.winsize = cc.director.getWinSize();

        var centerpos = cc.p(this.winsize.width / 2, this.winsize.height / 2);

        var background = new cc.LayerColor(cc.color(255,255,255,255), this.winsize.width, this.winsize.height);
        this.addChild(background);
		
		this.startLabel = new cc.LabelTTF("Start", "Quicksand-Light", this.winsize.height/4);
        this.startLabel.setColor(cc.color(0,0,0));//black color
        //this.startLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
		
		this.startLabelP = new cc.LabelTTF("Start", "Quicksand-Light", this.winsize.height/4);
        this.startLabelP.setColor(cc.color(0,0,150));//blue color
        //this.startLabelP.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
		
        var menuItemLabel = new cc.MenuItemSprite(
            this.startLabel,
            this.startLabelP, 
            this.onPlay, this);
        var menu = new cc.Menu(menuItemLabel);  
        menu.setPosition(centerpos);
        this.addChild(menu);
    },

    onPlay : function(){
        cc.log("==onplay clicked");
        cc.director.runScene(new levelSelectorScene());
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