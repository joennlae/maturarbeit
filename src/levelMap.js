var levelMap = cc.Layer.extend({
	spriteSheet:null,
	level: null,
	railsPerRow: 20,
	winsize: 0,
	scaleFactor: 0,
	sizeOfSprite: 0,
	winsize: 0,
	ls: null,
	row: null,
	column: null,
	recognizer: null,
    ctor : function(){
		this._super();
		this.winsize = cc.director.getWinSize();
		this.level = levelMapArray;
		this.ls = cc.sys.localStorage;
		this.row = {y: 0};
        this.column = {x: 0};
    },
    init:function(){
		this._super();
		
        var background = new cc.LayerColor(cc.color(255,255,255,255), this.winsize.width, this.winsize.height);
        this.addChild(background);
		//after background ;-) homofish
		cc.spriteFrameCache.addSpriteFrames(res.rails_plist);
		cc.textureCache.addImage("res/rails.png");
        this.spriteSheet = new cc.Node; 
        this.addChild(this.spriteSheet);
		this.setUp();
		
		this.recognizer = new SimpleRecognizer();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
			spriteSheet: this.spriteSheet,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
		
        cc.MenuItemFont.setFontSize(60);
        var menuItemPlay = new cc.MenuItemSprite(
            new cc.Sprite(res.start_n_png),
            new cc.Sprite(res.start_s_png), 
            this.onPlay, this);
        var menu = new cc.Menu(menuItemPlay);  
        menu.setPosition(cc.p(this.winsize.width/2, this.winsize.height/4));
        this.addChild(menu);
    },

    onPlay : function(){
        this.ls.setItem(3, Math.random()*34);
        cc.log("==onplay clicked");
        cc.director.runScene(new PlayScene());
    },
	setUp: function (){
        this.row.y = this.level[this.level.length-1][1]; //muss Global sein , old level.length-2
        this.column.x = this.getStartColumn();//old level[0].length/2-1
        this.scaleFactor = this.winsize.width/this.railsPerRow/240;      //240 size of sprite ursprünglich :-P 1920/8
        this.sizeOfSprite = this.winsize.width/this.railsPerRow;
        for (i = this.level.length-2; i > 0; i--) {        //level.length = level[y][] i=row , -2 weill neu auch startpositionen an letzer y stelle gespeichert
            for (j = 0; j < this.level[0].length; j++) { //level[0].length = level[][x] j=column
                if (this.level[i][j]!==0) {
                //var sprite = new cc.Sprite('#rail_'+((level[i][j]%2+1)%2+1)+'.png');/*first try :eval("res.rail_"+level[i][j]) rails-png nur zwei aber bis 6 nummeriert also modulo --> verkehrt den hatl modulo modulo --> epic ((level[i][j]%2+1)%2+1)= alli richtig*/
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+this.level[i][j]+".png");
                var sprite = new cc.Sprite(spriteFrame);
                    sprite.attr({x: (j*this.sizeOfSprite), y:((this.level.length-i-1)*this.sizeOfSprite), scale: this.scaleFactor});
                this.spriteSheet.addChild(sprite,0,1000*i+j); // only Javascript with name with string, now we have tags with Integer also supports iOS !!Attention to only 1000 height!!
                
                }
            }
        }
        //variables for controlling and setUp
		this.spriteSheet.x = this.winsize.width/2;
        this.spriteSheet.x -= (((this.column.x)+0.5)*this.sizeOfSprite);
		this.spriteSheet.y = 2.5*this.sizeOfSprite; //AnchorPoint (0,5,0,5) 
    },
	getStartColumn: function (){
		var level = this.level;
        if (level[level[level.length-1][1]][level[level.length-1][0]]==1 || level[level[level.length-1][1]][level[level.length-1][0]]==33) return level[level.length-1][0]
        else {
        //this.spriteSheet.x += this.sizeOfSprite;
        return level[level.length-1][0]-1
        }
    },
	onTouchBegan:function(touch, event) {
        var pos = touch.getLocation();
        event.getCurrentTarget().recognizer.beginPoint(pos.x, pos.y);
        return true;
    },

    onTouchMoved:function(touch, event) {
        var pos = touch.getLocation();
		var moveArray = event.getCurrentTarget().recognizer.movePoint(pos.x, pos.y);
		this.spriteSheet.x += moveArray[0][0];
		this.spriteSheet.y += moveArray[0][1];
    },

    onTouchEnded:function(touch, event) {
        var moveArray = event.getCurrentTarget().recognizer.endPoint();
		this.spriteSheet.x += moveArray[0][0];
		this.spriteSheet.y += moveArray[0][1];
    },	
});

var levelMapScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new levelMap();
        layer.init();
        this.addChild(layer);
    }
});
