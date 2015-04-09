var backgroundLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.init();
    },
    init: function() {
        this._super();
        var winsize = cc.director.getWinSize();
        var background = new cc.LayerColor(cc.color(255, 255, 255, 255), winsize.width, winsize.height);
        this.addChild(background);
    }
});