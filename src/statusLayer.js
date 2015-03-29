var statusLayer = cc.Layer.extend({
    labelQuads:null,
    labelPoints:null,
    labelMoves:null,
	winsize: null,
    pauseMenu: null,
    labelQuadsBlue: null,
	ls : null,
    tutorialSwitcher: null,
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        this.winsize = cc.director.getWinSize();
		this.ls = cc.sys.localStorage;
        this.labelQuads = new cc.LabelTTF("", "Quicksand-Light", this.winsize.height/10);
        this.labelQuads.setColor(cc.color(150,0,0));
		this.labelQuads.setAnchorPoint(1,0);
        this.labelQuads.setPosition(cc.p(this.winsize.width, this.winsize.height - (2*this.winsize.height/10+20)));
        this.addChild(this.labelQuads);

        this.labelQuadsBlue = new cc.LabelTTF("", "Quicksand-Light", this.winsize.height/10);
        this.labelQuadsBlue.setColor(cc.color(0,0,150));
        this.labelQuadsBlue.setAnchorPoint(1,0);
        this.labelQuadsBlue.setPosition(cc.p(this.winsize.width, this.winsize.height - (this.winsize.height/10*3+20)));
        if (this.ls.getItem(666)==2 || this.ls.getItem(666)==3) this.addChild(this.labelQuadsBlue);

        this.labelPoints = new cc.LabelTTF("", "Quicksand-Light", this.winsize.height/10);
		this.labelPoints.setAnchorPoint(1,0);
        this.labelPoints.setPosition(cc.p(this.winsize.width, this.winsize.height - this.winsize.height/10 - 10));
        this.labelPoints.setColor(cc.color(0,255,0));
        this.addChild(this.labelPoints);

        this.labelMoves = new cc.LabelTTF("", "Quicksand-Light", this.winsize.height/10);
        this.labelMoves.setAnchorPoint(1,0);
        this.labelMoves.setPosition(cc.p(this.winsize.width, this.winsize.height - (this.winsize.height/10*3+20)));
        if (this.ls.getItem(666)==2 || this.ls.getItem(666)==3) this.labelMoves.setPosition(cc.p(this.winsize.width, this.winsize.height - (this.winsize.height/10*4+20)));
        this.labelMoves.setColor(cc.color(255,150,0));
        this.addChild(this.labelMoves);

        this.pauseLabel = new cc.LabelTTF("Pause", "Quicksand-Light" , this.winsize.height/10);
        this.pauseLabel.setColor(cc.color(0,0,0));
        this.pauseLabelP = new cc.LabelTTF("Pause", "Quicksand-Light", this.winsize.height/10);
        this.pauseLabelP.setColor(cc.color(0,0,150));

        var pauseItemLabel = new cc.MenuItemSprite(
            this.pauseLabel,
            this.pauseLabelP, 
            this.onPause, this);
        this.pauseMenu = new cc.Menu(pauseItemLabel);  
        this.pauseMenu.setPosition(cc.p(160,this.winsize.height-(this.winsize.height/16+10)));
        this.addChild(this.pauseMenu,0,12);
        this.pauseMenu.retain();


        this.helpNodeTop = new cc.LayerColor(cc.color(0,0,0,40),10,this.winsize.height/4);
        this.helpNodeTop.setPosition(cc.p(this.winsize.width/2-5,this.winsize.height-this.winsize.height/4));
        this.helpNodeTop.visible = false;
        this.addChild(this.helpNodeTop);
        this.helpNodeTop.retain();

        this.helpNodeBottum = new cc.LayerColor(cc.color(0,0,0,40),10,this.winsize.height/4);
        this.helpNodeBottum.setPosition(cc.p(this.winsize.width/2-5,0));
        this.helpNodeBottum.visible = false;
        this.addChild(this.helpNodeBottum);
        this.helpNodeBottum.retain();

        this.helpNodeLeft = new cc.LayerColor(cc.color(0,0,0,40),this.winsize.width/4,10);
        this.helpNodeLeft.setPosition(cc.p(0,this.winsize.height/2-5));
        this.helpNodeLeft.visible = false;
        this.addChild(this.helpNodeLeft);
        this.helpNodeLeft.retain();

        this.helpNodeRight = new cc.LayerColor(cc.color(0,0,0,40),this.winsize.width/4,10);
        this.helpNodeRight.setPosition(cc.p(this.winsize.width-this.winsize.width/4,this.winsize.height/2-5));
        this.helpNodeRight.visible = false;
        this.addChild(this.helpNodeRight);
        this.helpNodeRight.retain();

        //if(this.ls.getItem(206)==1) this.tutorial();

    },
        updateQuads:function (quads) {
        this.labelQuads.setString(quads+"/"+levelsArray[this.ls.getItem(99)-1][3]);
    },
        updatePoints:function (points) {
        this.labelPoints.setString(Math.floor(points)/*-levelsArray[this.ls.getItem(99)-1][5]*/);
    },
        updateMoves:function (moves) {
        this.labelMoves.setString(levelsArray[this.ls.getItem(99)-1][6]-moves);
    },
        updateBlueQuads:function(quadsBlue){
        this.labelQuadsBlue.setString(quadsBlue+"/"+levelsArray[this.ls.getItem(99)-1][4]);
    },
        removeEverything : function(){
        this.removeAllChildren();
    },
    onPause:function (){
        this.helpNodeTop.visible = false;
        this.helpNodeRight.visible = false;
        this.helpNodeLeft.visible = false;
        this.helpNodeBottum.visible = false;
        var ls = cc.sys.localStorage;
        ls.setItem(1, parseFloat(this.labelPoints.getString()));
        ls.setItem(2, parseFloat(this.labelQuads.getString()));
        ls.setItem(3, parseFloat(this.labelMoves.getString()));
        if (ls.getItem(666)==2) ls.setItem(4, parseFloat(this.labelQuadsBlue.getString()));
        this.removeChildByTag(12);
        cc.director.pause();
        this.addChild(new pauseLayer());
    },
    addPauseLabel : function(){
        this.addChild(this.pauseMenu,0,12);
        this.helpNodes();
    },
    onExit : function(){
        this.pauseMenu.release();
        this.helpNodeLeft.release();
        this.helpNodeTop.release();
        this.helpNodeRight.release();
        this.helpNodeBottum.release();
        this._super();
    },
    tutorial:function(){
        this.removeChildByTag(12);
        this.helpNodeTop.visible = false;
        this.helpNodeRight.visible = false;
        this.helpNodeLeft.visible = false;
        this.helpNodeBottum.visible = false;
        cc.director.pause();
        this.addChild(new tutorialLayer());
        cc.director.resume();
    },
    helpNodes:function(){
        if(this.ls.getItem(200)==1){
            this.helpNodeTop.visible = true;
            this.helpNodeRight.visible = true;
            this.helpNodeLeft.visible = true;
            this.helpNodeBottum.visible = true;
        }
        else{
            this.helpNodeTop.visible = false;
            this.helpNodeRight.visible = false;
            this.helpNodeLeft.visible = false;
            this.helpNodeBottum.visible = false;
        }
    }
    

});