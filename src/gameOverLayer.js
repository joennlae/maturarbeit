var gameOverLayer = cc.LayerColor.extend({
    labelCoin: null,
    labelMeter: null,
    points: 0,
    quads: 0,
    // constructor
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super(cc.color(0, 0, 0, 220));
        var winSize = cc.director.getWinSize();
        this.getPoints();

        this.labelCoin = new cc.LabelTTF("Quads: "+this.quads, "Helvetica", 80);
        this.labelCoin.setColor(cc.color(100,0,0));//black color
        this.labelCoin.setPosition(cc.p(winsize.width/2, winsize.height/2));
        this.addChild(this.labelCoin);

        this.labelMeter = new cc.LabelTTF(this.points+" Points", "Quicksand-Light", 80);
        this.labelMeter.setPosition(cc.p(winsize.width/2, winsize.height/2-100));
        this.labelMeter.setColor(cc.color(100,0,0));
        this.addChild(this.labelMeter);


        var centerPos = cc.p(winSize.width / 2, winSize.height / 4);
        cc.MenuItemFont.setFontSize(30);
        var menuItemRestart = new cc.MenuItemSprite(
            new cc.Sprite(res.restart_n),
            new cc.Sprite(res.restart_s),
            this.onRestart, this);
        var menu = new cc.Menu(menuItemRestart);
        menu.setPosition(centerPos);
        this.addChild(menu);
    },
    onRestart:function (sender) {
        cc.director.resume();
        cc.director.runScene(new menuScene());
    },
    getPoints:function(){
        var ls = cc.sys.localStorage;
        this.quads = ls.getItem(2);
        this.points = ls.getItem(1);

        //this.quads = 2;
    }
});
