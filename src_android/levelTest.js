var levelTestLayer = cc.Layer.extend({
    seedField: null,
	label: null,
    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },
    init:function(){
    	this._super();

        var winsize = cc.director.getWinSize();
	
        var centerpos = cc.p(winsize.width / 2, winsize.height / 4);
		var ls = cc.sys.localStorage;

		var background = new cc.LayerColor(cc.color(255,255,255,255), winsize.width, winsize.height);
        this.addChild(background);

		this.textFieldListener = function (sender, eventType){
            if (eventType == ccui.TextField.EVENT_ATTACH_WITH_IME){
            this.textField = sender;
            //textField.runAction(cc.MoveTo(0.225,cc.p(winsize.width / 2.0, winsize.height / 2.0 + textField.getContentSize().height / 2.0)));
            this.textField.setPlaceHolder("");
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

   		this.seedField = new ccui.TextField("seed","Arial",50);
   		this.seedField.setTextColor(cc.color(0,0,0));
		this.seedField.setTouchEnabled(true);
		this.seedField.x = winsize.width/2;
		this.seedField.y = winsize.height/6*5;
		this.seedField.addEventListener(this.textFieldListener);
		this.addChild(this.seedField);

		this.rowField = new ccui.TextField("row","Arial",50);
   		this.rowField.setTextColor(cc.color(0,0,0));
		this.rowField.setTouchEnabled(true);
		this.rowField.x = winsize.width/2;
		this.rowField.y = winsize.height/6*4;
		this.rowField.addEventListener(this.textFieldListener);
		this.addChild(this.rowField);

		this.columnField = new ccui.TextField("column","Arial",50);
   		this.columnField.setTextColor(cc.color(0,0,0));
		this.columnField.setTouchEnabled(true);
		this.columnField.x = winsize.width/2;
		this.columnField.y = winsize.height/6*3;
		this.columnField.addEventListener(this.textFieldListener);
		this.addChild(this.columnField);

		this.gameModeField = new ccui.TextField("mode 1/2","Arial",50);
   		this.gameModeField.setTextColor(cc.color(0,0,0));
		this.gameModeField.setTouchEnabled(true);
		this.gameModeField.x = winsize.width/2;
		this.gameModeField.y = winsize.height/6*2;
		this.gameModeField.addEventListener(this.textFieldListener);
		this.addChild(this.gameModeField);


		this.startLabel = new cc.LabelTTF("Play", "res/Quicksand-Light.ttf" , winsize.height/10);
        this.startLabel.setColor(cc.color(0,0,0));//black color
        //this.startLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
		this.startLabelP = new cc.LabelTTF("Play", "res/Quicksand-Light.ttf", winsize.height/10);
        this.startLabelP.setColor(cc.color(0,0,150));//black color

        this.backLabel = new cc.LabelTTF("Back", "res/Quicksand-Light.ttf" , winsize.height/16);
        this.backLabel.setColor(cc.color(0,0,0));//black color
        //this.startLabel.setPosition(cc.p(this.winsize.width/2, this.winsize.height/2));
		this.backLabelP = new cc.LabelTTF("Back", "res/Quicksand-Light.ttf", winsize.height/16);
        this.backLabelP.setColor(cc.color(0,0,150));

        var backItemLabel = new cc.MenuItemSprite(
            this.backLabel,
            this.backLabelP, 
            this.onBack, this);
        var backMenu = new cc.Menu(backItemLabel);  
        //backMenu.setAnchorPoint(1,0); 
        backMenu.setPosition(cc.p(100,winsize.height-(winsize.height/16+10)));
        this.addChild(backMenu);

        var menuItemLabel = new cc.MenuItemSprite(
            this.startLabel,
            this.startLabelP, 
            this.onPlay, this);
        var menu = new cc.Menu(menuItemLabel);  
        menu.setPosition(cc.p(winsize.width/2,winsize.height/6));
        this.addChild(menu);

	},
		onPlay : function(){
        var ls = cc.sys.localStorage;
        ls.setItem(999,2);
        ls.setItem(1000, parseFloat(this.rowField.getString()));
        ls.setItem(1001, parseFloat(this.columnField.getString()));
        ls.setItem(1002, parseFloat(this.seedField.getString()));
        ls.setItem(666, parseFloat(this.gameModeField.getString()));
        cc.director.runScene(new PlayScene());
    	
    },
    	onBack : function(){
    	cc.director.runScene(new menuScene());
    }
});


var levelTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new levelTestLayer();
        layer.init();
        this.addChild(layer);
    }
});
