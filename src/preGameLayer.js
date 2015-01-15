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

        this.textFieldListener = function (sender, eventType){
            if (eventType == ccui.TextField.EVENT_ATTACH_WITH_IME){
            this.textField = sender;
            //textField.runAction(cc.MoveTo(0.225,cc.p(winsize.width / 2.0, winsize.height / 2.0 + textField.getContentSize().height / 2.0)));
            this.textField.setPlaceHolder("Type seed (only numbers)");
            }
            else if(eventType == ccui.TextField.EVENT_DETACH_WITH_IME){
            this.textField = sender;
            //textField:runAction(cc.MoveTo:create(0.175, cc.p(screenSize.width / 2.0, screenSize.height / 2.0)))
            //this.textField.setString("detach with IME");
            }
            else if (eventType == ccui.TextField.EVENT_INSERT_TEXT){
            /*self._displayValueLabel:setString("insert words")*/}
            else if (eventType == ccui.TextField.EVENT_DELETE_BACKWARD){
            /*self._displayValueLabel:setString("delete word")*/}
        }
   		this.textField = new ccui.TextField("Touch Me","Arial",150);
		this.textField.setTouchEnabled(true);
		this.textField.x = winsize.width/2;
		this.textField.y = winsize.height/2;
		this.textField.addEventListener(this.textFieldListener);

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
        var ls = cc.sys.localStorage;
        ls.setItem(3, parseInt(this.textField.getString()));
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
