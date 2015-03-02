var statusLayer = cc.Layer.extend({
    labelQuads:null,
    labelPoints:null,
    labelMoves:null,
	winsize: null,
	ls : null,
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

        this.labelPoints = new cc.LabelTTF("", "Quicksand-Light", this.winsize.height/10);
		this.labelPoints.setAnchorPoint(1,0);
        this.labelPoints.setPosition(cc.p(this.winsize.width, this.winsize.height - this.winsize.height/10 - 10));
        this.labelPoints.setColor(cc.color(0,255,0));
        this.addChild(this.labelPoints);

        this.labelMoves = new cc.LabelTTF("", "Quicksand-Light", this.winsize.height/10);
        this.labelMoves.setAnchorPoint(1,0);
        this.labelMoves.setPosition(cc.p(this.winsize.width, this.winsize.height - (this.winsize.height/10*3+20)));
        this.labelMoves.setColor(cc.color(255,150,0));
        this.addChild(this.labelMoves);
    },
        updateQuads:function (quads) {
        this.labelQuads.setString(quads/*-levelsArray[this.ls.getItem(99)-1][3]*/);
    },
        updatePoints:function (points) {
        this.labelPoints.setString(Math.floor(points)/*-levelsArray[this.ls.getItem(99)-1][5]*/);
    },
        updateMoves:function (moves) {
        this.labelMoves.setString(/*levelsArray[this.ls.getItem(99)-1][6]-*/moves);
    },
        removeEverything : function(){
        this.removeAllChildren();
    }

});