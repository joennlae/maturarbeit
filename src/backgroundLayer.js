var backgroundLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();
        var winsize = cc.director.getWinSize();
        var background = new cc.LayerColor(cc.color(255,255,255,255), winsize.width, winsize.height);
        this.addChild(background);
        //create the background image and position it at the center of screen
        /*var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
        var spriteBG = new cc.Sprite(res.PlayBG_png);
        spriteBG.setPosition(centerPos);
        this.addChild(spriteBG);*/
        var background_forFPS = new cc.LayerColor(cc.color(0,0,0), winsize.height/3, winsize.width/6);
        this.addChild(background_forFPS,1);
    }
});