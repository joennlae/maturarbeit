var preGameLayer = cc.Layer.extend({
    editBox: null,
    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },
    init:function(){
 
        this._super();

        var winsize = cc.director.getWinSize();

        var centerpos = cc.p(winsize.width / 2, winsize.height / 4);

        var batchNode = new cc.SpriteBatchNode("res/quad_1.png");
        var blocks = new cc.Scale9Sprite();
        blocks.updateWithBatchNode(batchNode, cc.rect(0, 0, 96, 96), false, cc.rect(0, 0, 96, 96));
        this.editBox = cc.EditBox.create(cc.p(250,100),blocks,blocks,blocks);
        this.addChild(this.editBox);

        cc.MenuItemFont.setFontSize(60);
        var menuItemPlay = new cc.MenuItemSprite(
            new cc.Sprite(res.start_n_png),
            new cc.Sprite(res.start_s_png), 
            this.onPlay, this);
        var menu = new cc.Menu(menuItemPlay);  
        menu.setPosition(centerpos);
        this.addChild(menu);
    },

    onPlay : function(){
        cc.log("==onplay clicked");
        cc.director.runScene(new PlayScene());
    }
});

var preGameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new preGameLayer();
        layer.init();
        this.addChild(layer);
    }
});