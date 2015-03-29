var tutorialLayer = cc.LayerColor.extend({
	ls: null,
    counter: null,
    winSize:null,
    animations:null,
    sizeOfSprite: 0,
    switcher: 0,
    leswitcher: null,
    movesArray: null,
    animCount: 0,
    frames: 0,
    row: null,
    column: null,
    level: null,
    scaleFactor: 0,
    mode: 0,
    // constructor
    ctor:function () {
        this._super();
        this.ls = cc.sys.localStorage;
        this.sizeOfSprite = winsize.width/12;
        this.initAnimations();
        this.row = 2; 
        cc.spriteFrameCache.addSpriteFrames(res.rails_plist);
        cc.textureCache.addImage("res/rails.png");
        this.column = 5;
        if(this.ls.getItem(666)==1){
            this.init();
            this.switcher = 2;
            this.mode = 1;
        }
        else if (this.ls.getItem(666)==2 || this.ls.getItem(666)==3){
            this.init();
            this.switcher = 2;
        }
    },
    init:function () {
        if(this.ls.getItem(666)==2 || this.ls.getItem(666)==3){ //because native jsb only allow init()in ctor 1,5 hours :-)
            this.initTwo();
        }
        else{
        this._super(cc.color(255, 255, 255, 255));
        var winSize = cc.director.getWinSize();
        this.ls.setItem(201,1);
		this.scheduleUpdate();
        this.winSize = cc.director.getWinSize();
        var backItemLabel = new cc.MenuItemSprite(
            new cc.Sprite(res.forward),
            new cc.Sprite(res.forward), 
            this.onRestart, this);
        var backMenu = new cc.Menu(backItemLabel);  
        backMenu.setPosition(cc.p(winSize.width/8*7.5,winSize.height/8));
        this.addChild(backMenu,0,15);

        this.leswitcher = {gameModeThree: 0};

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
        this.helpNodeVert.visible = false;
        this.addChild(this.helpNodeVert);
        this.helpNodeVert.retain();

        this.helpNodeHor = new cc.LayerColor(cc.color(0,0,0,150),winSize.width,5);
        this.helpNodeHor.setPosition(cc.p(0,winSize.height/2-2.5));
        this.helpNodeHor.visible = false;
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

        this.tutLayer = new cc.Node;
        this.addChild(this.tutLayer);
        this.scaleFactor = winsize.width/12/240;
        this.sizeOfSprite = winsize.width/12;
        var littlelvl = [[0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,2,1,0,0,2,1,0],
                        [0,0,0,1,2,1,2,1,2,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0]];
        this.level = littlelvl;
        this.movesArray = [1,1,2,3,4,3,4,4,3,2,1,2]; //hole animation
        for (i = littlelvl.length-1; i > 0; i--) {
            for (j = 0; j < littlelvl[0].length; j++) { 
                if (littlelvl[i][j]!==0) {
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+littlelvl[i][j]+".png");
                var sprite = new cc.Sprite(spriteFrame);
                    sprite.attr({x: (j*this.sizeOfSprite+winSize.width/25), y:((littlelvl.length-i)*this.sizeOfSprite), scale: this.scaleFactor});
                this.tutLayer.addChild(sprite,0,1000*i+j); 
                }
            }
        }

        var spriteFrame = cc.spriteFrameCache.getSpriteFrame(this.ls.getItem(207)+".png");
        this.positionMarker = new cc.Sprite(spriteFrame);
        this.positionMarker.opacity = 200;
        this.positionMarker.scale = positionMarkerArray[this.ls.getItem(207)-1][2]*this.ls.getItem(208);
        this.positionMarker.setPosition(cc.p(winSize.width/2+positionMarkerArray[this.ls.getItem(207)-1][0],2*this.sizeOfSprite+positionMarkerArray[this.ls.getItem(207)-1][1]+winSize.height/12));
        this.tutLayer.addChild(this.positionMarker,1);
    }
    },
    initTwo:function () {
        this._super(cc.color(255, 255, 255, 255));
        var winSize = cc.director.getWinSize();
        this.ls.setItem(201,1);
        this.leswitcher = {gameModeThree: 0};
        this.winSize = cc.director.getWinSize();
        this.scheduleUpdate();
        var backItemLabel = new cc.MenuItemSprite(
            new cc.Sprite(res.forward),
            new cc.Sprite(res.forward), 
            this.onRestartTwo, this);
        var backMenu = new cc.Menu(backItemLabel);  
        backMenu.setPosition(cc.p(winSize.width/8*7.5,winSize.height/8));
        this.addChild(backMenu,0,13);
        this.tutLayer = new cc.Node;
        this.addChild(this.tutLayer);
        this.scaleFactor = winsize.width/12/240;
        this.sizeOfSprite = winsize.width/12;
        var littlelvl = [[0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,2,1,0,0,2,1,0],
                        [0,0,0,1,2,1,2,1,2,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0]];
        this.level = littlelvl; 
        this.movesArray = [1,1,2,3,4,3,4,4,3,2,1,2]; //hole animation
        for (i = littlelvl.length-1; i > 0; i--) {  
            for (j = 0; j < littlelvl[0].length; j++) { 
                if (littlelvl[i][j]!==0) {
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+littlelvl[i][j]+".png");
                var sprite = new cc.Sprite(spriteFrame);
                    sprite.attr({x: (j*this.sizeOfSprite+winSize.width/25), y:((littlelvl.length-i)*this.sizeOfSprite), scale: this.scaleFactor});
                this.tutLayer.addChild(sprite,0,1000*i+j); 
                }
            }
        }

        var spriteFrame = cc.spriteFrameCache.getSpriteFrame(this.ls.getItem(207)+".png");
        this.positionMarker = new cc.Sprite(spriteFrame);
        this.positionMarker.opacity = 200;
        this.positionMarker.scale = positionMarkerArray[this.ls.getItem(207)-1][2]*this.ls.getItem(208);
        this.positionMarker.setPosition(cc.p(winSize.width/2+positionMarkerArray[this.ls.getItem(207)-1][0],2*this.sizeOfSprite+positionMarkerArray[this.ls.getItem(207)-1][1]+winSize.height/12));
        this.tutLayer.addChild(this.positionMarker,1);


    },
    onRestart:function (sender) {
        this.counter = this.counter + 1;
        cc.log(this.counter);
        if (this.counter==1){
            this.switcher = 1;
            this.tutLayer.visible = false;
            this.helpNodeVert.visible = true;
            this.helpNodeHor.visible = true;
            this.helpRightDown.visible = true;
            this.helpLeftUp.visible = true;
            this.helpLeftDown.visible = true;
            this.helpRightUp.visible = true;
            this.opacity = 100;
        }
        if (this.counter==2){
            this.helpNodeVert.visible = false;
            this.helpNodeHor.visible = false;
            this.helpRightDown.visible = false;
            this.helpLeftUp.visible = false;
            this.helpLeftDown.visible = false;
            this.helpRightUp.visible = false;
        }
        if (this.counter==3 && this.animations==3){
            cc.log("ausgeführt");
            var ls = cc.sys.localStorage;
            ls.setItem(206,0);
            ls.setItem(201,0);
            cc.director.resume();
            this.getParent().addPauseLabel();
            this.removeFromParent();
        }
    },
    onRestartTwo:function(){
            var ls = cc.sys.localStorage;
            ls.setItem(206,0);
            ls.setItem(201,0);
            cc.director.resume();
            this.getParent().addPauseLabel();
            this.removeFromParent();
    },
    initAnimations: function(){
        this.rightUpTut = cc.moveBy(0.1, cc.p(+this.sizeOfSprite, +this.sizeOfSprite)); //fucking shiiit of retain :-P costed me about 8hours
        this.rightUpTut.retain();
        this.leftUpTut = cc.moveBy(0.1, cc.p(-this.sizeOfSprite, +this.sizeOfSprite));
        this.leftUpTut.retain();
        this.rightDownTut = cc.moveBy(0.1, cc.p(+this.sizeOfSprite, -this.sizeOfSprite));
        this.rightDownTut.retain();
        this.leftDownTut =  cc.moveBy(0.1, cc.p(-this.sizeOfSprite, -this.sizeOfSprite));
        this.leftDownTut.retain(); 
    },
    update:function(dt){
        if (this.mode==1){
        if (this.counter==1 && this.animations ==0){
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
        if (this.counter==2 && this.animations==0 /*&& this.getParent().labelPoints.getNumberOfRunningActions()==0*/){
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
        if (this.counter==3 && this.animations==1 && this.getParent().labelMoves.getNumberOfRunningActions()==0){
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
            //this.counter=2;
        }
        if(this.counter==3 && this.animations==1 && this.getParent().labelMoves.getNumberOfRunningActions()>0){
            this.counter = 2;
        }
        if(this.animations==2 && this.getParent().labelMoves.getNumberOfRunningActions()==0){
            this.animations=3;
            this.counter=2;
            this.onRestart();
        }
        }
        if(this.switcher==2){
            this.frames += 1;
            //cc.log(this.positionMarker.getNumberOfRunningActions());
            if(this.positionMarker.getNumberOfRunningActions()===0 && this.frames%50==0){
                if (this.movesArray[this.animCount]==1){
                    this.positionMarker.runAction(this.rightUpTut);
                    this.changeRails(this.row,this.column+1);
                    this.checkForQuad(this.row,this.column+1,1);
                    this.row -= 1;
                    this.column +=1;
                }
                else if (this.movesArray[this.animCount]==2){
                    this.positionMarker.runAction(this.rightDownTut);
                    this.changeRails(this.row+1,this.column+1);
                    this.checkForQuad(this.row+1,this.column+1,2);
                    this.row +=1;
                    this.column +=1;
                }
                else if (this.movesArray[this.animCount]==3){
                    this.positionMarker.runAction(this.leftDownTut);
                    this.changeRails(this.row+1,this.column);
                    this.checkForQuad(this.row+1,this.column,3);
                    this.row +=1;
                    this.column -=1;
                }
                else if (this.movesArray[this.animCount]==4){
                    this.positionMarker.runAction(this.leftUpTut);
                    this.changeRails(this.row,this.column);
                    this.checkForQuad(this.row,this.column,4);
                    this.row -=1;
                    this.column -=1;
                }
                this.animCount +=1;
                if(this.animCount==12) this.animCount=0;
                }
            }
        
    },
    changeRails: function(railPosY,railPosX){
        var winSize = cc.director.getWinSize();
        cc.log(this.level);
        cc.log(this.level[railPosY][railPosX]);
        var ls = cc.sys.localStorage;
            if (this.leswitcher.gameModeThree==0){//color Red
                switch (this.level[railPosY][railPosX]) {
                    case 1: case 35: 
                        var spriteDel = this.tutLayer.getChildByTag(1000*railPosY+railPosX); 
                        this.tutLayer.removeChild(spriteDel); 
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+3+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*this.sizeOfSprite+winSize.width/25), y:((this.level.length-railPosY)*this.sizeOfSprite), scale: this.scaleFactor});
                        this.tutLayer.addChild(sprite,0,1000*railPosY+railPosX);
                        this.level[railPosY][railPosX]=3;
                        break;
                    case 2: case 36:
                        var spriteDel = this.tutLayer.getChildByTag(1000*railPosY+railPosX); 
                        this.tutLayer.removeChild(spriteDel); 
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+4+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*this.sizeOfSprite+winSize.width/25), y:((this.level.length-railPosY)*this.sizeOfSprite), scale: this.scaleFactor});
                        this.tutLayer.addChild(sprite,0,1000*railPosY+railPosX);
                        this.level[railPosY][railPosX]=4;
                        break;
                    case 3:
                        var spriteDel = this.tutLayer.getChildByTag(1000*railPosY+railPosX); 
                        this.tutLayer.removeChild(spriteDel);
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+1+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*this.sizeOfSprite+winSize.width/25), y:((this.level.length-railPosY)*this.sizeOfSprite), scale: this.scaleFactor});
                        this.tutLayer.addChild(sprite,0,1000*railPosY+railPosX);
                        this.level[railPosY][railPosX]=1;
                        break;
                    case 4:
                        var spriteDel = this.tutLayer.getChildByTag(1000*railPosY+railPosX); 
                        this.tutLayer.removeChild(spriteDel);
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+2+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*this.sizeOfSprite+winSize.width/25), y:((this.level.length-railPosY)*this.sizeOfSprite), scale: this.scaleFactor});
                        this.tutLayer.addChild(sprite,0,1000*railPosY+railPosX);
                        this.level[railPosY][railPosX]=2;
                        break;
                    }
                }
            else if (this.leswitcher.gameModeThree==1){//color Blue
                switch (this.level[railPosY][railPosX]) {
                    case 1: case 3: 
                        var spriteDel = this.tutLayer.getChildByTag(1000*railPosY+railPosX); 
                        this.tutLayer.removeChild(spriteDel); 
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+5+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*this.sizeOfSprite+winSize.width/25), y:((this.level.length-railPosY)*this.sizeOfSprite), scale: this.scaleFactor});
                        this.tutLayer.addChild(sprite,0,1000*railPosY+railPosX);
                        this.level[railPosY][railPosX]=35;
                        break;
                    case 2: case 4:
                        var spriteDel = this.tutLayer.getChildByTag(1000*railPosY+railPosX); 
                        this.tutLayer.removeChild(spriteDel); 
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+6+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*this.sizeOfSprite+winSize.width/25), y:((this.level.length-railPosY)*this.sizeOfSprite), scale: this.scaleFactor});
                        this.tutLayer.addChild(sprite,0,1000*railPosY+railPosX);
                        this.level[railPosY][railPosX]=36;
                        break;
                    case 35:
                        var spriteDel = this.tutLayer.getChildByTag(1000*railPosY+railPosX); 
                        this.tutLayer.removeChild(spriteDel);
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+1+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*this.sizeOfSprite+winSize.width/25), y:((this.level.length-railPosY)*this.sizeOfSprite), scale: this.scaleFactor});
                        this.tutLayer.addChild(sprite,0,1000*railPosY+railPosX);
                        this.level[railPosY][railPosX]=1;
                        break;
                    case 36:
                        var spriteDel = this.tutLayer.getChildByTag(1000*railPosY+railPosX); 
                        this.tutLayer.removeChild(spriteDel);
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+2+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*this.sizeOfSprite+winSize.width/25), y:((this.level.length-railPosY)*this.sizeOfSprite), scale: this.scaleFactor});
                        this.tutLayer.addChild(sprite,0,1000*railPosY+railPosX);
                        this.level[railPosY][railPosX]=2;
                        break;
                    }
                }
    },
    checkForQuad:function(pY,pX,lm){
        var winSize = cc.director.getWinSize();
        var ls = cc.sys.localStorage;
            if(ls.getItem(666)==1){
            switch (lm) { //14 when circle, 12 when destroyed with last move
                    case 1 : case 3:
                        if (this.level[pY-1][pX]+this.level[pY-1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==14){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+"_edges.png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX-0.5)*this.sizeOfSprite+winSize.width/25), y:((this.level.length-pY+0.5)*this.sizeOfSprite), scale: this.scaleFactor});
                                sprite.setRotation(45);
                            this.tutLayer.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX-0.5);
                            break;
                        }
                        else if (this.level[pY][pX+1]+this.level[pY+1][pX+1]+this.level[pY+1][pX]+this.level[pY][pX]==14){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+"_edges.png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX+0.5)*this.sizeOfSprite+winSize.width/25), y:((this.level.length-pY-0.5)*this.sizeOfSprite), scale: this.scaleFactor});
                                sprite.setRotation(45);
                            this.tutLayer.addChild(sprite,0,1*10000+(pY+0.5)*1000+pX+0.5);;
                            break;
                        }
                        else if (this.level[pY][pX]==1 && this.level[pY-1][pX]+this.level[pY-1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==12 || this.level[pY][pX]==2 && this.level[pY-1][pX]+this.level[pY-1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==12){
                            this.tutLayer.removeChildByTag(1*10000+(pY-0.5)*1000+pX-0.5);
                            break;
                        }
                        else if (this.level[pY][pX]==1 && this.level[pY][pX+1]+this.level[pY+1][pX+1]+this.level[pY+1][pX]+this.level[pY][pX]==12 || this.level[pY][pX]==2 && this.level[pY][pX+1]+this.level[pY+1][pX+1]+this.level[pY+1][pX]+this.level[pY][pX]==12){
                            this.tutLayer.removeChildByTag(1*10000+(pY+0.5)*1000+pX+0.5);
                            break;
                        }
                     case 2 : case 4:
                        if (this.level[pY][pX+1]+this.level[pY-1][pX+1]+this.level[pY-1][pX]+this.level[pY][pX]==14){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+"_edges.png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX+0.5)*this.sizeOfSprite+winSize.width/25), y:(this.level.length-pY-(-0.5))*this.sizeOfSprite, scale: this.scaleFactor});
                                sprite.setRotation(45);
                            this.tutLayer.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX+0.5);
                            break;
                        }
                        else if (this.level[pY+1][pX]+this.level[pY+1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==14){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+"_edges.png");
                            var sprite = new cc.Sprite(spriteFrame);;
                                sprite.attr({x: ((pX-0.5)*this.sizeOfSprite+winSize.width/25), y:(this.level.length-pY-(+0.5))*this.sizeOfSprite, scale: this.scaleFactor});
                                sprite.setRotation(45);
                            this.tutLayer.addChild(sprite,0,1*10000+(pY+0.5)*1000+pX-0.5);
                            break;
                        }
                        else if (this.level[pY][pX]==1 && this.level[pY][pX+1]+this.level[pY-1][pX+1]+this.level[pY-1][pX]+this.level[pY][pX]==12 || this.level[pY][pX]==2 && this.level[pY][pX+1]+this.level[pY-1][pX+1]+this.level[pY-1][pX]+this.level[pY][pX]==12){
                            this.tutLayer.removeChildByTag(1*10000+(pY-0.5)*1000+pX+0.5);
                            break;
                        }
                        else if (this.level[pY][pX]==1 && this.level[pY+1][pX]+this.level[pY+1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==12 || this.level[pY][pX]==2 && this.level[pY+1][pX]+this.level[pY+1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==12){
                            this.tutLayer.removeChildByTag(1*10000+(pY+0.5)*1000+pX-0.5);
                            break;
                        }
                        default:
                            break;
                    }
                }
            else if(ls.getItem(666)==3){
                switch (lm) { 
                    case 1 : case 3:
                        if (this.level[pY-1][pX]+this.level[pY-1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==14){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+"_edges.png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX-0.5)*this.sizeOfSprite+winSize.width/25), y:((this.level.length-pY+0.5)*this.sizeOfSprite), scale: this.scaleFactor});
                                sprite.setRotation(45);
                            this.tutLayer.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX-0.5);
                            this.leswitcher.gameModeThree = 1; //color blue
                            break;
                        }
                        else if (this.level[pY][pX+1]+this.level[pY+1][pX+1]+this.level[pY+1][pX]+this.level[pY][pX]==14){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+"_edges.png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX+0.5)*this.sizeOfSprite+winSize.width/25), y:((this.level.length-pY-0.5)*this.sizeOfSprite), scale: this.scaleFactor});
                                sprite.setRotation(45);
                            this.tutLayer.addChild(sprite,0,1*10000+(pY+0.5)*1000+pX+0.5);
                            this.leswitcher.gameModeThree = 1; //color blue
                            break;
                        }
                        else if (this.level[pY][pX]==36 && this.level[pY-1][pX]+this.level[pY-1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==46 || this.level[pY][pX]==35 && this.level[pY-1][pX]+this.level[pY-1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==46){
                            if(this.tutLayer.getChildByTag(1*10000+(pY-0.5)*1000+pX-0.5)!=null){
                            this.tutLayer.removeChildByTag(1*10000+(pY-0.5)*1000+pX-0.5);
                            }
                            break;
                        }
                        else if (this.level[pY][pX]==36 && this.level[pY][pX+1]+this.level[pY+1][pX+1]+this.level[pY+1][pX]+this.level[pY][pX]==46 || this.level[pY][pX]==35 && this.level[pY][pX+1]+this.level[pY+1][pX+1]+this.level[pY+1][pX]+this.level[pY][pX]==46){
                            if(this.tutLayer.getChildByTag(1*10000+(pY+0.5)*1000+pX+0.5)!=null){
                            this.tutLayer.removeChildByTag(1*10000+(pY+0.5)*1000+pX+0.5);
                            }
                            break;
                        }
                        else if (this.level[pY][pX]==1 && this.level[pY-1][pX]+this.level[pY-1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==12 || this.level[pY][pX]==2 && this.level[pY-1][pX]+this.level[pY-1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==12){
                            if(this.tutLayer.getChildByTag(1*10000+(pY-0.5)*1000+pX-0.5)!=null){
                            this.tutLayer.removeChildByTag(1*10000+(pY-0.5)*1000+pX-0.5);
                            }
                            break;
                        }
                        else if (this.level[pY][pX]==1 && this.level[pY][pX+1]+this.level[pY+1][pX+1]+this.level[pY+1][pX]+this.level[pY][pX]==12 || this.level[pY][pX]==2 && this.level[pY][pX+1]+this.level[pY+1][pX+1]+this.level[pY+1][pX]+this.level[pY][pX]==12){
                            if(this.tutLayer.getChildByTag(1*10000+(pY+0.5)*1000+pX+0.5)!=null){
                            this.tutLayer.removeChildByTag(1*10000+(pY+0.5)*1000+pX+0.5);;
                            }
                            break;
                        }
                        // check for blue
                        else if (this.level[pY-1][pX]+this.level[pY-1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==142){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+2+"_edges.png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX-0.5)*this.sizeOfSprite+winSize.width/25), y:((this.level.length-pY+0.5)*this.sizeOfSprite), scale: this.scaleFactor});
                                sprite.setRotation(45);;
                            this.tutLayer.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX-0.5);
                            this.leswitcher.gameModeThree = 0;
                            break;
                        }
                        else if (this.level[pY][pX+1]+this.level[pY+1][pX+1]+this.level[pY+1][pX]+this.level[pY][pX]==142){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+2+"_edges.png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX+0.5)*this.sizeOfSprite+winSize.width/25), y:((this.level.length-pY-0.5)*this.sizeOfSprite), scale: this.scaleFactor});
                                sprite.setRotation(45);
                            this.tutLayer.addChild(sprite,0,1*10000+(pY+0.5)*1000+pX+0.5);
                            this.leswitcher.gameModeThree = 0;
                            break;
                        }
                        else if (this.level[pY][pX]==1 && this.level[pY-1][pX]+this.level[pY-1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==108 || this.level[pY][pX]==2 && this.level[pY-1][pX]+this.level[pY-1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==108){
                            if(this.tutLayer.getChildByTag(1*10000+(pY-0.5)*1000+pX-0.5)!=null){
                            this.tutLayer.removeChildByTag(1*10000+(pY-0.5)*1000+pX-0.5);
                            }
                            break;
                        }
                        else if (this.level[pY][pX]==1 && this.level[pY][pX+1]+this.level[pY+1][pX+1]+this.level[pY+1][pX]+this.level[pY][pX]==108 || this.level[pY][pX]==2 && this.level[pY][pX+1]+this.level[pY+1][pX+1]+this.level[pY+1][pX]+this.level[pY][pX]==108){
                            if(this.tutLayer.getChildByTag(1*10000+(pY+0.5)*1000+pX+0.5)!=null){
                            this.tutLayer.removeChildByTag(1*10000+(pY+0.5)*1000+pX+0.5);
                            }
                            break;
                        }
                        else if (this.level[pY][pX]==3 && this.level[pY-1][pX]+this.level[pY-1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==110 || this.level[pY][pX]==4 && this.level[pY-1][pX]+this.level[pY-1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==110){
                            if(this.tutLayer.getChildByTag(1*10000+(pY-0.5)*1000+pX-0.5)!=null){
                            this.tutLayer.removeChildByTag(1*10000+(pY-0.5)*1000+pX-0.5);
                            }
                            break;
                        }
                        else if (this.level[pY][pX]==3 && this.level[pY][pX+1]+this.level[pY+1][pX+1]+this.level[pY+1][pX]+this.level[pY][pX]==110 || this.level[pY][pX]==4 && this.level[pY][pX+1]+this.level[pY+1][pX+1]+this.level[pY+1][pX]+this.level[pY][pX]==110){
                            if(this.tutLayer.getChildByTag(1*10000+(pY+0.5)*1000+pX+0.5)!=null){
                            this.tutLayer.removeChildByTag(1*10000+(pY+0.5)*1000+pX+0.5);
                            }
                            break;
                        }
                        else break;
                     case 2 : case 4:
                        if (this.level[pY][pX+1]+this.level[pY-1][pX+1]+this.level[pY-1][pX]+this.level[pY][pX]==14){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+"_edges.png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX+0.5)*this.sizeOfSprite+winSize.width/25), y:(this.level.length-pY-(-0.5))*this.sizeOfSprite, scale: this.scaleFactor});
                                sprite.setRotation(45);
                            this.tutLayer.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX+0.5);
                            this.leswitcher.gameModeThree = 1;
                            break;
                        }
                        else if (this.level[pY+1][pX]+this.level[pY+1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==14){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+"_edges.png");
                            var sprite = new cc.Sprite(spriteFrame);;
                                sprite.attr({x: ((pX-0.5)*this.sizeOfSprite+winSize.width/25), y:(this.level.length-pY-(+0.5))*this.sizeOfSprite, scale: this.scaleFactor});
                                sprite.setRotation(45);
                            this.tutLayer.addChild(sprite,0,1*10000+(pY+0.5)*1000+pX-0.5);
                            this.leswitcher.gameModeThree = 1;
                            break;
                        }

                        else if (this.level[pY][pX]==36 && this.level[pY][pX+1]+this.level[pY-1][pX+1]+this.level[pY-1][pX]+this.level[pY][pX]==46 || this.level[pY][pX]==35 && this.level[pY][pX+1]+this.level[pY-1][pX+1]+this.level[pY-1][pX]+this.level[pY][pX]==46){
                            if(this.tutLayer.getChildByTag(1*10000+(pY-0.5)*1000+pX+0.5)!=null){
                            this.tutLayer.removeChildByTag(1*10000+(pY-0.5)*1000+pX+0.5);
                            }
                            break;
                        }
                        else if (this.level[pY][pX]==36 && this.level[pY+1][pX]+this.level[pY+1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==46 || this.level[pY][pX]==35 && this.level[pY+1][pX]+this.level[pY+1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==46){
                            if(this.tutLayer.getChildByTag(1*10000+(pY+0.5)*1000+pX-0.5)!=null){
                            this.tutLayer.removeChildByTag(1*10000+(pY+0.5)*1000+pX-0.5);
                            }
                            break;
                        }
                        else if (this.level[pY][pX]==1 && this.level[pY][pX+1]+this.level[pY-1][pX+1]+this.level[pY-1][pX]+this.level[pY][pX]==12 || this.level[pY][pX]==2 && this.level[pY][pX+1]+this.level[pY-1][pX+1]+this.level[pY-1][pX]+this.level[pY][pX]==12){
                            if(this.tutLayer.getChildByTag(1*10000+(pY-0.5)*1000+pX+0.5)!=null){
                            this.tutLayer.removeChildByTag(1*10000+(pY-0.5)*1000+pX+0.5);
                            }
                            break;
                        }
                        else if (this.level[pY][pX]==1 && this.level[pY+1][pX]+this.level[pY+1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==12 || this.level[pY][pX]==2 && this.level[pY+1][pX]+this.level[pY+1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==12){
                            if(this.tutLayer.getChildByTag(1*10000+(pY+0.5)*1000+pX-0.5)!=null){
                            this.tutLayer.removeChildByTag(1*10000+(pY+0.5)*1000+pX-0.5);
                            }
                            break;
                        }
                        //check blue
                        else if (this.level[pY][pX+1]+this.level[pY-1][pX+1]+this.level[pY-1][pX]+this.level[pY][pX]==142){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+2+"_edges.png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX+0.5)*this.sizeOfSprite+winSize.width/25), y:(this.level.length-pY-(-0.5))*this.sizeOfSprite, scale: this.scaleFactor});
                                sprite.setRotation(45);
                            this.tutLayer.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX+0.5);
                            this.leswitcher.gameModeThree = 0;
                            break;
                        }
                        else if (this.level[pY+1][pX]+this.level[pY+1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==142){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+2+"_edges.png");
                            var sprite = new cc.Sprite(spriteFrame);;
                                sprite.attr({x: ((pX-0.5)*this.sizeOfSprite+winSize.width/25), y:(this.level.length-pY-(+0.5))*this.sizeOfSprite, scale: this.scaleFactor});
                                sprite.setRotation(45);
                            this.tutLayer.addChild(sprite,0,1*10000+(pY+0.5)*1000+pX-0.5);
                            this.leswitcher.gameModeThree = 0;
                            break;
                        }
                        else if (this.level[pY][pX]==1 && this.level[pY][pX+1]+this.level[pY-1][pX+1]+this.level[pY-1][pX]+this.level[pY][pX]==108 || this.level[pY][pX]==2 && this.level[pY][pX+1]+this.level[pY-1][pX+1]+this.level[pY-1][pX]+this.level[pY][pX]==108){
                            if(this.tutLayer.getChildByTag(1*10000+(pY-0.5)*1000+pX+0.5)!=null){
                            this.tutLayer.removeChildByTag(1*10000+(pY-0.5)*1000+pX+0.5);
                            }
                            break;
                        }
                        else if (this.level[pY][pX]==1 && this.level[pY+1][pX]+this.level[pY+1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==108 || this.level[pY][pX]==2 && this.level[pY+1][pX]+this.level[pY+1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==108){
                            if(this.tutLayer.getChildByTag(1*10000+(pY+0.5)*1000+pX-0.5)!=null){
                            this.tutLayer.removeChildByTag(1*10000+(pY+0.5)*1000+pX-0.5);
                            }
                            break;
                        }
                        else if (this.level[pY][pX]==4 && this.level[pY][pX+1]+this.level[pY-1][pX+1]+this.level[pY-1][pX]+this.level[pY][pX]==110 || this.level[pY][pX]==3 && this.level[pY][pX+1]+this.level[pY-1][pX+1]+this.level[pY-1][pX]+this.level[pY][pX]==110){
                            if(this.tutLayer.getChildByTag(1*10000+(pY-0.5)*1000+pX+0.5)!=null){
                            this.tutLayer.removeChildByTag(1*10000+(pY-0.5)*1000+pX+0.5);
                            }
                            break;
                        }
                        else if (this.level[pY][pX]==4 && this.level[pY+1][pX]+this.level[pY+1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==110 || this.level[pY][pX]==3 && this.level[pY+1][pX]+this.level[pY+1][pX-1]+this.level[pY][pX-1]+this.level[pY][pX]==110){
                            if(this.tutLayer.getChildByTag(1*10000+(pY+0.5)*1000+pX-0.5)!=null){
                            this.tutLayer.removeChildByTag(1*10000+(pY+0.5)*1000+pX-0.5);
                            }
                            break;
                        }
                        else 
                            break;
                        default:
                            break;
                    }
                }
        },
    onExit : function(){
        if (this.ls.getItem(666)==1){
        this.helpNodeHor.release();
        this.helpNodeVert.release();
        }
            this.rightUpTut.release();
            this.leftUpTut.release();
            this.rightDownTut.release();
            this.leftDownTut.release();
            this._super();
    }

});
