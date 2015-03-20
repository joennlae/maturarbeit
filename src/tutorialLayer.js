var tutorialLayer = cc.LayerColor.extend({
	ls: null,
    // constructor
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super(cc.color(0, 0, 0, 50));
        var winSize = cc.director.getWinSize();
		this.ls = cc.sys.localStorage;
		
        this.backLabel = new cc.LabelTTF("Got it!", "Quicksand-Light" , winsize.height/8);
        this.backLabel.setColor(cc.color(0,0,0));//black color
        //this.startLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
        this.backLabelP = new cc.LabelTTF("Got it!", "Quicksand-Light", winsize.height/8);
        this.backLabelP.setColor(cc.color(0,0,150));

        var backItemLabel = new cc.MenuItemSprite(
            this.backLabel,
            this.backLabelP, 
            this.onRestart, this);
        var backMenu = new cc.Menu(backItemLabel);  
        //backMenu.setAnchorPoint(1,0); 
        backMenu.setPosition(cc.p(winSize.width/4*3,winsize.height/6));
        this.addChild(backMenu);

        
        this.helpNodeVert = new cc.LayerColor(cc.color(100,0,0,100),10,winsize.height);
        this.helpNodeVert.setPosition(cc.p(winsize.width/2-5,0));
        this.helpNodeVert.visible = true;
        this.addChild(this.helpNodeVert);
        this.helpNodeVert.retain();

        this.helpNodeHor = new cc.LayerColor(cc.color(100,0,0,100),winSize.width,10);
        this.helpNodeHor.setPosition(cc.p(0,winSize.height/2-5));
        this.helpNodeHor.visible = true;
        this.addChild(this.helpNodeHor);
        this.helpNodeHor.retain();
		
    },
    onRestart:function (sender) {
        cc.director.resume();
        this.getParent().addPauseLabel();
        this.removeFromParent();
    }

});
