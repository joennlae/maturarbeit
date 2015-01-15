var statusLayer = cc.Layer.extend({
    labelQuads:null,
    labelPoints:null,
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();
        var winsize = cc.director.getWinSize();

        this.labelQuads = new cc.LabelTTF("Quads: ", "Helvetica", 100);
        this.labelQuads.setColor(cc.color(0,0,0));//black color
        this.labelQuads.setPosition(cc.p(200, winsize.height - 100));
        this.addChild(this.labelQuads);

        this.labelPoints = new cc.LabelTTF("0M", "Helvetica", 100);
        this.labelPoints.setPosition(cc.p(winsize.width - 120, winsize.height - 100));
        this.labelPoints.setColor(cc.color(0,0,0));
        this.addChild(this.labelPoints);
    },
        updateQuads:function (quads) {
        this.labelQuads.setString("Quads: " + quads);
    },
        updatePoints:function (points) {
        this.labelPoints.setString(Math.floor(points));
    }
});