var statusLayer = cc.Layer.extend({
    labelCoin:null,
    labelMeter:null,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        var winsize = cc.director.getWinSize();

        this.labelCoin = new cc.LabelTTF("Quads:0", "Helvetica", 100);
        this.labelCoin.setColor(cc.color(0,0,0));//black color
        this.labelCoin.setPosition(cc.p(200, winsize.height - 100));
        this.addChild(this.labelCoin);

        this.labelMeter = new cc.LabelTTF("0M", "Helvetica", 100);
        this.labelMeter.setPosition(cc.p(winsize.width - 120, winsize.height - 100));
        this.labelMeter.setColor(cc.color(0,0,0));
        this.addChild(this.labelMeter);
    },
        updateQuads:function (quads) {
        this.labelCoin.setString("Quads: " + quads);
    },
        updatePoints:function (px) {
        this.labelMeter.setString(Math.floor(px));
    }
});