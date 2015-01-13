var preGameLayer = cc.Layer.extend({
    textField: null,
    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },
    init:function(){
 
        this._super();

        var winsize = cc.director.getWinSize();

        var centerpos = cc.p(winsize.width / 2, winsize.height / 4);

   		this.textField = new ccui.TextField.create("Yolo","Arial",150);
		this.textField.setTouchEnabled(true);
		this.textField.x = winsize.width/2;
		this.textField.y = winsize.height/2;
		this.textField.addEventListenerTextField(textFieldListener);
		function textFieldListener(sender, event){
			if (event==ccui.TextField.EVENT_ATTACH_WITH_IME){
					this.textField.setString(sender);			
				}
		};
		this.addChild(this.textField);

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
