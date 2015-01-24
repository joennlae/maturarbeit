var statusLayer = cc.Layer.extend({
    labelQuads:null,
    labelPoints:null,
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
		this.labelQuads.setAnchorPoint(0,0);//black color
        this.labelQuads.setPosition(cc.p(0, this.winsize.height - (2*this.winsize.height/10+20)));
        this.addChild(this.labelQuads);

        this.labelPoints = new cc.LabelTTF("", "Quicksand-Light", this.winsize.height/10);
		this.labelPoints.setAnchorPoint(0,0);
        this.labelPoints.setPosition(cc.p(0, winsize.height - this.winsize.height/10 - 10));
        this.labelPoints.setColor(cc.color(0,255,0));
        this.addChild(this.labelPoints);
    },
        updateQuads:function (quads) {
        this.labelQuads.setString(quads);
    },
        updatePoints:function (points) {
        this.labelPoints.setString(Math.floor(points));
    }
});