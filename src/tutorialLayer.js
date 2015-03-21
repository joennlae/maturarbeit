var tutorialLayer = cc.LayerColor.extend({
	ls: null,
    counter: null,
    winSize:null,
    animations:null,
    // constructor
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super(cc.color(255, 255, 255, 100));
        var winSize = cc.director.getWinSize();
		this.ls = cc.sys.localStorage;
        this.ls.setItem(201,1);
		this.scheduleUpdate();
        this.winSize = cc.director.getWinSize();
        var backItemLabel = new cc.MenuItemSprite(
            new cc.Sprite(res.forward),
            new cc.Sprite(res.forward), 
            this.onRestart, this);
        var backMenu = new cc.Menu(backItemLabel);  
        backMenu.setPosition(cc.p(winSize.width/8*7.5,winSize.height/8));
        this.addChild(backMenu,0,13);

        this.counter = 0;
        this.animations = 0;
        this.helpRightUp = new cc.Sprite(res.arrow_ru);
        this.helpRightUp.setAnchorPoint(0,0);
        this.helpRightUp.setPosition(cc.p(winSize.width/2,winSize.height/2));
        this.helpRightUp.visible = false;
        this.addChild(this.helpRightUp);

        this.helpLeftUp = new cc.Sprite(res.arrow_lu);
        this.helpLeftUp.setAnchorPoint(0,0);
        this.helpLeftUp.setPosition(cc.p(0,winSize.height/2));
        this.helpLeftUp.visible = false;
        this.addChild(this.helpLeftUp);

        this.helpLeftDown = new cc.Sprite(res.arrow_ld);
        this.helpLeftDown.setAnchorPoint(0,0);
        this.helpLeftDown.setPosition(cc.p(0,0));
        this.helpLeftDown.visible = false;
        this.addChild(this.helpLeftDown);

        this.helpRightDown = new cc.Sprite(res.arrow_rd);
        this.helpRightDown.setAnchorPoint(0,0);
        this.helpRightDown.setPosition(cc.p(winSize.width/2,0));
        this.helpRightDown.visible = false;
        this.addChild(this.helpRightDown);

        this.helpNodeVert = new cc.LayerColor(cc.color(0,0,0,150),5,winSize.height);
        this.helpNodeVert.setPosition(cc.p(winSize.width/2-2.5,0));
        this.helpNodeVert.visible = true;
        this.addChild(this.helpNodeVert);
        this.helpNodeVert.retain();

        this.helpNodeHor = new cc.LayerColor(cc.color(0,0,0,150),winSize.width,5);
        this.helpNodeHor.setPosition(cc.p(0,winSize.height/2-2.5));
        this.helpNodeHor.visible = true;
        this.addChild(this.helpNodeHor);
        this.helpNodeHor.retain();

        this.pointsLabel = new cc.LabelTTF("Points", "Quicksand-Light" , winsize.height/8);
        this.pointsLabel.setAnchorPoint(0,0);
        this.pointsLabel.setColor(cc.color(0,0,0));
        this.pointsLabel.setPosition(cc.p(winSize.width/4*3,winSize.height/6*4));
        this.pointsLabel.visible = false;
        this.addChild(this.pointsLabel);

        this.quadsLabel = new cc.LabelTTF("Quads", "Quicksand-Light" , winsize.height/8);
        this.quadsLabel.setAnchorPoint(0,0);
        this.quadsLabel.setColor(cc.color(0,0,0));
        this.quadsLabel.setPosition(cc.p(winSize.width/4*3,winSize.height/6*3));
        this.quadsLabel.visible = false;
        this.addChild(this.quadsLabel);

        this.movesLabel = new cc.LabelTTF("Moves", "Quicksand-Light" , winsize.height/8);
        this.movesLabel.setAnchorPoint(0,0);
        this.movesLabel.setColor(cc.color(0,0,0));
        this.movesLabel.setPosition(cc.p(winSize.width/4*3,winSize.height/6*2));
        this.movesLabel.visible = false;
        this.addChild(this.movesLabel);


    },
    onRestart:function (sender) {
        this.counter = this.counter + 1;
        if (this.counter==1){
            this.helpNodeVert.visible = false;
            this.helpNodeHor.visible = false;
            this.helpRightDown.visible = false;
            this.helpLeftUp.visible = false;
            this.helpLeftDown.visible = false;
            this.helpRightUp.visible = false;
        }
        if (this.counter==2 && this.animations==3){
            var ls = cc.sys.localStorage;
            ls.setItem(206,0);
            ls.setItem(201,0);
            cc.director.resume();
            this.getParent().addPauseLabel();
            this.removeFromParent();
        }
    },
    update:function(dt){
        if (this.counter==0){
        var possibleMovesArray = JSON.parse(this.ls.getItem(150));

        if(possibleMovesArray[0]==1 || possibleMovesArray[0]==3 || possibleMovesArray[0]==31) this.helpLeftUp.visible = true;
        else this.helpLeftUp.visible = false;

        if(possibleMovesArray[1]==2 || possibleMovesArray[1]==4 || possibleMovesArray[1]==32) this.helpRightUp.visible = true;
        else this.helpRightUp.visible = false;

        if(possibleMovesArray[2]==2 || possibleMovesArray[2]==4) this.helpLeftDown.visible = true;
        else this.helpLeftDown.visible = false;

        if(possibleMovesArray[3]==1 || possibleMovesArray[3]==3) this.helpRightDown.visible = true;
        else this.helpRightDown.visible = false;
        }
        if (this.counter==1 && this.animations==0 /*&& this.getParent().labelPoints.getNumberOfRunningActions()==0*/){
            this.getParent().labelPoints.runAction(new cc.MoveTo(2, cc.p(this.winSize.width/4*3, this.winSize.height/6*4)));
            this.getParent().labelPoints.setFontSize(this.winSize.height/8);

            this.getParent().labelQuads.runAction(new cc.MoveTo(2, cc.p(this.winSize.width/4*3, this.winSize.height/6*3)));
            this.getParent().labelQuads.setFontSize(this.winSize.height/8);

            this.getParent().labelMoves.runAction(new cc.MoveTo(2, cc.p(this.winSize.width/4*3, this.winSize.height/6*2)));
            this.getParent().labelMoves.setFontSize(this.winSize.height/8);
            this.animations=1;
            this.movesLabel.visible = true;
            this.pointsLabel.visible = true;
            this.quadsLabel.visible = true;
        }
        if (this.counter==2 && this.animations==1 && this.getParent().labelMoves.getNumberOfRunningActions()==0){
            this.movesLabel.visible = false;
            this.pointsLabel.visible = false;
            this.quadsLabel.visible = false;

            this.getParent().labelPoints.runAction(new cc.MoveTo(2, cc.p(this.winSize.width, this.winSize.height - this.winSize.height/10 - 10)));
            this.getParent().labelPoints.setFontSize(this.winSize.height/10);

            this.getParent().labelQuads.runAction(new cc.MoveTo(2, cc.p(this.winSize.width, this.winSize.height - (2*this.winSize.height/10+20))));
            this.getParent().labelQuads.setFontSize(this.winSize.height/10);

            this.getParent().labelMoves.runAction(new cc.MoveTo(2, cc.p(this.winSize.width, this.winSize.height - (this.winSize.height/10*3+20))));
            this.getParent().labelMoves.setFontSize(this.winSize.height/10);
            this.animations=2;
        }
        if(this.counter==2 && this.animations==1 && this.getParent().labelMoves.getNumberOfRunningActions()>0){
            this.counter = 1;
        }
        if(this.animations==2 && this.getParent().labelMoves.getNumberOfRunningActions()==0){
            this.animations=3;
            this.counter=1;
            this.onRestart();
        }
    },
    onExit : function(){
        this.helpNodeHor.release();
        this.helpNodeVert.release();
        this._super();
    }

});
