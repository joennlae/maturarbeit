var gameLayerModeTwo = cc.Layer.extend({
    spriteSheet:null,
	seed: 0,
	level: null,
	railsPerRow: 12,
	columns: 0,
	rows: 0,
	winsize: 0,
	standart: 8,
    factor: 0,
	scaleFactor: 0,
	sizeOfSprite: 0,
	touchNode: null,
	row: null,
	column: null,
	rightUp: null,
	rightDown: null,
	leftDown: null,
	leftUp: null,
    scaling: null,
	scalingreverse: null,
    quads: null,
    quadsBlue: null,
    switcher: null,
    highest: 0,
    moves: null,
    ls: null,
    levelsArray: null,
    ctor:function () {
        this._super();
		//Variables
        this.levelsArray = levelsArray;
        this.ls = cc.sys.localStorage;
        //load level variables
        //Beta Test switch ls(999)
        if(this.ls.getItem(999)==1){
        this.rows = this.levelsArray[this.ls.getItem(99)-1][0];
        this.columns = this.levelsArray[this.ls.getItem(99)-1][1];
        this.seed = this.levelsArray[this.ls.getItem(99)-1][2];
        }
        else {
        this.rows = this.ls.getItem(1000);
        this.columns = this.ls.getItem(1001);
        this.seed = this.ls.getItem(1002);
        }
		this.winsize = cc.director.getWinSize();
		this.scaleFactor = this.winsize.width/this.railsPerRow/240;      //240 size of sprite ursprünglich :-P 1920/8
        this.sizeOfSprite = this.winsize.width/this.railsPerRow;
        this.switcher = {value: false};
        this.moves = {value: 0};
		this.generateLvl(); //returns this.init();
        
		//Variables
		
        /*cc.loader.loadJson(res.levels_json,function(err,data){
            if (err) {
                return false;
            } else {
                    // data is the json object
                var level_json=data["level_one"];
                //cc.log(level_json);
                cc.log(level_json);
                level = level_json;
                return (gameLayer.init());
            }
        });*/

        /*function setLevel(level_info){
            cc.log(level_info);
            level = level_info;
           
        };*/
        
        //this.init();
    },
    init:function() {
        this._super();
		cc.log(this.level);
		//Nodes
		cc.spriteFrameCache.addSpriteFrames(res.rails_plist);
        /*var texture =*/ cc.textureCache.addImage("res/rails.png");
        this.spriteSheet = /*new cc.SpriteBatchNode(texture, 50);*/new cc.Node; //runs faster on iOS heard of depriceated since JSB V3.0 not sure about this
        //var spriteSheet = this.spriteSheet; 
        this.spriteSheet.y = 0;
        //this.spriteSheet.retain();
        this.addChild(this.spriteSheet);
        //====================================================================
        //TouchNode and Stuff further implementation in setUp()
        this.touchNode = new cc.DrawNode();
        //this.touchNode.retain();
        //cc.spriteFrameCache.addSpriteFrames(res.rails_plist);
        this.addChild(this.touchNode);
		//Variables for controlling
        //var level = this.level;
        
		cc.log(this.spriteSheet.x);
        this.row = {y: 0};
        this.column = {x: 0};
        //this.initAnimations();
		this.setUp()
        this.scheduleUpdate();
		this.quads = {value: 0}; // make it an object not a variable so we can point on it and not copy the value 
        this.quadsBlue = {value: 0};

        //Load controlling
		//Variables
		winsize = this.winsize;
		spriteSheet = this.spriteSheet;
		level = this.level;
		row = this.row;
		column = this.column;
		rightUp = this.rightUp;
		rightDown = this.rightDown;
		leftDown = this.leftDown;
		leftUp = this.leftUp;
		spriteSheet = this.spriteSheet;
		touchNode = this.touchNode;
		railsPerRow = this.railsPerRow;
		sizeOfSprite = this.sizeOfSprite;
		scaleFactor = this.scaleFactor;
        setUp = this.setUp;
        initAnimations = this.initAnimations;
        getStartColumn = this.getStartColumn;
        quads = this.quads;
        quadsBlue = this.quadsBlue;
        //gameOver = this.gameOver;  
        finalSequence = this.finalSequence;
        switcher = this.switcher;
        scaling = this.scaling;
        gameLayer_copy = this;
        moves = this.moves;

		var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var corX = touch.getLocationX();
                var corY = touch.getLocationY();
                cc.log(spriteSheet.getNumberOfRunningActions());
                //cc.log("COrx:" +corX+ " CorY:" +corY);
                //cc.log("X:"+level.length+"Y:"+level[0].length);
                 //immer gerade 
                //cc.log("Aktuelles Feld:" + level[row][column]);
                if (spriteSheet.getNumberOfRunningActions()===0){
                if(corX >= winsize.width/2 && corY >= winsize.height/2){ //up-right
                    if(level[row.y][column.x+1]==2 || level[row.y][column.x+1]==4 || level[row.y][column.x+1]==34 || level[row.y][column.x+1]==16){
                        //spriteBatchNode.x -= sizeOfSprite;
                        //spriteBatchNode.y -= sizeOfSprite;
                        spriteSheet.runAction(rightUp);
                        moves.value += 1;
                        changeRails(row.y,column.x+1);
                        checkForQuad(row.y,column.x+1,1);
                        row.y -= 1;
                        column.x +=1;
                        infos();
                        return true;
                    }
                    else if (level[row.y][column.x+1]==32){
                        moves.value += 1;
                        spriteSheet.runAction(cc.moveBy(3,(column.x+0.5)*sizeOfSprite,(level.length-row.y-0.5)*sizeOfSprite));
                        finalSequence(1);
                        return true;
                    }
                    return false;
                }
                else if(corX < winsize.width/2 && corY >= winsize.height/2){ //up-left
                    if(level[row.y][column.x]==1 || level[row.y][column.x]==3 || level[row.y][column.x]==33 || level[row.y][column.x]==15){
                        spriteSheet.runAction(leftUp);
                        moves.value += 1;
                        changeRails(row.y,column.x);
                        checkForQuad(row.y,column.x,4);
                        row.y -=1;
                        column.x -=1;
                        infos();
                        return true;
                    }
                    else if (level[row.y][column.x]==31) {
                        moves.value += 1;
                        spriteSheet.runAction(cc.moveBy(3,(column.x-0.5)*sizeOfSprite,(level.length-row.y-1.5)*sizeOfSprite));//
                        finalSequence(2);
                        return true;
                    }
                    return false;
                }
                else if(corX < winsize.width/2 && corY < winsize.height/2){ //down-left
                    if(level[row.y+1][column.x]==2 || level[row.y+1][column.x]==4 || level[row.y+1][column.x]==16){
                        spriteSheet.runAction(leftDown);
                        moves.value += 1;
                        changeRails(row.y+1,column.x);
                        checkForQuad(row.y+1,column.x,3);
                        row.y +=1;
                        column.x -=1;
                        infos();
                        return true;
                    }
                    return false;
                }
                else if(corX >= winsize.width/2 && corY < winsize.height/2){ //down-right
                    if(level[row.y+1][column.x+1]==1 || level[row.y+1][column.x+1]==3 || level[row.y+1][column.x+1]==15){
                        spriteSheet.runAction(rightDown);
                        moves.value += 1;
                        changeRails(row.y+1,column.x+1);
                        checkForQuad(row.y+1,column.x+1,2);
                        row.y +=1;
                        column.x +=1;
                        infos();
                        return true;
                    }
                    return false;
                }
                   
                }
                
                else return false;
             }
        });
 
        function infos(){
            cc.log("Aktuelle Optionen:" + level[row.y][column.x] + "|" + level[row.y][column.x+1] + "||"  + level[row.y+1][column.x] + "|" + level[row.y+1][column.x+1]);
            //cc.log("y="+row.y+" x="+column.x);
            /*if (row.y==level[level.length-1][3]){
                return gameOver();*/
            //} 
                
        };

       
        //====================================================================
        //====================================================================
        listener_keyboard = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
            var label = event.getCurrentTarget();
            var key = keyCode.toString();
            //var standart = 8;
            //var factor = 0;
            //label.setString("Key " + (cc.sys.isNative ? that.getNativeKeyName(keyCode) : String.fromCharCode(keyCode) ) + "(" + keyCode.toString()  + ") was pressed!");
            /*if(key==107 || key==190){//+ also Zoom
                railsPerRow -= 2;
                spriteSheet.removeAllChildren();
                touchNode.clear();
                setUp();
                return true;
            }
            else if(key==109 || key==189){//-= dezoom
                railsPerRow += 2;
                spriteSheet.removeAllChildren();
                touchNode.clear();
                setUp();
                return true;
            }
            else if(key==38){
                spriteSheet.y -=50;
                return true;
            }
            else if(key==37){
                spriteSheet.x +=50;
                return true;
            }
            else if(key==40){
                spriteSheet.y +=50;
                return true;
            }
            else if(key==39){
                spriteSheet.x -=50;
                return true;
            }*/
            if (spriteSheet.getNumberOfRunningActions()===0){
                if(key==105 || key==74){ //up-right
                    if(level[row.y][column.x+1]==2 || level[row.y][column.x+1]==4 || level[row.y][column.x+1]==34 || level[row.y][column.x+1]==16) {
                        spriteSheet.runAction(rightUp);
                        moves.value += 1;
                        changeRails(row.y,column.x+1);
                        checkForQuad(row.y,column.x+1,1);
                        row.y -= 1;
                        column.x +=1;
                        infos();
                        return true;
                    }
                    else if (level[row.y][column.x+1]==32){
                        moves.value += 1;
                        spriteSheet.runAction(cc.moveBy(3,(column.x+0.5)*sizeOfSprite,(level.length-row.y-0.5)*sizeOfSprite));
                        finalSequence(1);
                        return true;
                    }
                    return false;
                }
                else if(key==103 || key==70){ //up-left
                    if(level[row.y][column.x]==1 || level[row.y][column.x]==3  || level[row.y][column.x]==33 || level[row.y][column.x]==15){
                        spriteSheet.runAction(leftUp);
                        moves.value += 1;
                        changeRails(row.y,column.x);
                        checkForQuad(row.y,column.x,4);
                        row.y -=1;
                        column.x -=1;
                        infos();
                        return true;
                    }
                    else if (level[row.y][column.x]==31) {
                        moves.value += 1;
                        spriteSheet.runAction(cc.moveBy(3,(column.x-0.5)*sizeOfSprite,(level.length-row.y-1.5)*sizeOfSprite));
                        finalSequence(2);
                        return true;
                    }
                    return false;
                }
                else if(key==97 || key==86){ //down-left
                    if(level[row.y+1][column.x]==2 || level[row.y+1][column.x]==4 || level[row.y+1][column.x]==16){
                        spriteSheet.runAction(leftDown);
                        moves.value += 1;
                        changeRails(row.y+1,column.x);
                        checkForQuad(row.y+1,column.x,3);
                        row.y +=1;
                        column.x -=1;
                        infos();
                        return true;
                    }
                    return false;
                }
                else if(key==99 || key==78){ //down-right
                    if(level[row.y+1][column.x+1]==1 || level[row.y+1][column.x+1]==3 || level[row.y+1][column.x+1]==15){
                        spriteSheet.runAction(rightDown);
                        moves.value += 1;
                        changeRails(row.y+1,column.x+1);
                        checkForQuad(row.y+1,column.x+1,2);
                        row.y +=1;
                        column.x +=1;
                        infos();
                        return true;
                    }
                    return false;
                }
            }
            else return false;
            }
            
        });
        
        cc.eventManager.addListener(listener_keyboard, this);
 		cc.eventManager.addListener(listener1, touchNode); //Inside Function because of Action Length
        
           
        function changeRails(railPosY,railPosX){

            switch (level[railPosY][railPosX]) {
                    case 1:
                        var spriteDel = spriteSheet.getChildByTag(1000*railPosY+railPosX); 
                        spriteSheet.removeChild(spriteDel); 
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+3+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*sizeOfSprite), y:((level.length-railPosY-1)*sizeOfSprite), scale: scaleFactor});
                        spriteSheet.addChild(sprite,0,1000*railPosY+railPosX);
                        level[railPosY][railPosX]=3;
                        break;
                    case 2:
                        var spriteDel = spriteSheet.getChildByTag(1000*railPosY+railPosX); 
                        spriteSheet.removeChild(spriteDel); 
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+4+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*sizeOfSprite), y:((level.length-railPosY-1)*sizeOfSprite), scale: scaleFactor});
                        spriteSheet.addChild(sprite,0,1000*railPosY+railPosX);
                        level[railPosY][railPosX]=4;
                        break;
                    case 3:
                        var spriteDel = spriteSheet.getChildByTag(1000*railPosY+railPosX); 
                        spriteSheet.removeChild(spriteDel);
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+5+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*sizeOfSprite), y:((level.length-railPosY-1)*sizeOfSprite), scale: scaleFactor});
                        spriteSheet.addChild(sprite,0,1000*railPosY+railPosX);
                        level[railPosY][railPosX]=15;//plus 10 wägä 14 für red bih quads calculations
                        break;
                    case 4:
                        var spriteDel = spriteSheet.getChildByTag(1000*railPosY+railPosX); 
                        spriteSheet.removeChild(spriteDel);
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+6+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*sizeOfSprite), y:((level.length-railPosY-1)*sizeOfSprite), scale: scaleFactor});
                        spriteSheet.addChild(sprite,0,1000*railPosY+railPosX);
                        level[railPosY][railPosX]=16;
                        break;
                    case 15:
                        var spriteDel = spriteSheet.getChildByTag(1000*railPosY+railPosX); 
                        spriteSheet.removeChild(spriteDel);
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+1+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*sizeOfSprite), y:((level.length-railPosY-1)*sizeOfSprite), scale: scaleFactor});
                        spriteSheet.addChild(sprite,0,1000*railPosY+railPosX);
                        level[railPosY][railPosX]=1;
                        break;
                    case 16:
                        var spriteDel = spriteSheet.getChildByTag(1000*railPosY+railPosX); 
                        spriteSheet.removeChild(spriteDel);
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+2+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*sizeOfSprite), y:((level.length-railPosY-1)*sizeOfSprite), scale: scaleFactor});
                        spriteSheet.addChild(sprite,0,1000*railPosY+railPosX);
                        level[railPosY][railPosX]=2;
                        break;
                    case 31: 
                        spriteSheet.runAction(cc.moveBy(5,(railPosX-1.5)*sizeOfSprite,(level.length-railPosY-1.5)*sizeOfSprite));
                        finalSequence(1);
                    case 32: 
                        spriteSheet.runAction(cc.moveBy(5,(railPosX+0.5)*sizeOfSprite,(level.length-railPosY-0.5)*sizeOfSprite));
                        finalSequence(2);
                    default: 
                        break;
                        
            }
            
        };
		function checkForQuad(pY,pX,lm){ // get Position and lastmove. 1:Up-Right, 2: Down-Right, 3:Down-Left, 4:Up-Left$
            switch (lm) { //14 when circle, 26 when destroyed with last move 12 higher than yolo, 62 bih blue quads und zerstört isches immer minus 14 also 48
                    case 1 : case 3:
                        if (level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==14 && level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==14){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+".png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX-0.5)*sizeOfSprite), y:((level.length-pY-0.5)*sizeOfSprite), scale: scaleFactor});//-0,5,-0,5
                                sprite.setRotation(45);
                                quads.value += 1;
                            spriteSheet.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX-0.5);
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+".png");
                            var sprite_n = new cc.Sprite(spriteFrame);
                                sprite_n.attr({x: ((pX+0.5)*sizeOfSprite), y:((level.length-pY-1.5)*sizeOfSprite), scale: scaleFactor});//+0.5,+0.5
                                sprite_n.setRotation(45);
                                quads.value += 1;
                            spriteSheet.addChild(sprite_n,0,1*10000+(pY+0.5)*1000+pX+0.5);
                            break;
                        }
                        else if (level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==14){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+".png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX-0.5)*sizeOfSprite), y:((level.length-pY-0.5)*sizeOfSprite), scale: scaleFactor});
                                sprite.setRotation(45);
                                quads.value += 1;
                            spriteSheet.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX-0.5);
                            break;
                        }
                        else if (level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==14){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+".png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX+0.5)*sizeOfSprite), y:((level.length-pY-1.5)*sizeOfSprite), scale: scaleFactor});
                                sprite.setRotation(45);
                                quads.value += 1;
                            spriteSheet.addChild(sprite,0,1*10000+(pY+0.5)*1000+pX+0.5);
                            break;
                        }
                        else if (level[pY][pX]==15 && level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==26 && level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==26 || level[pY][pX]==16 && level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==26 && level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==26 ){
                            spriteSheet.removeChildByTag(1*10000+(pY-0.5)*1000+pX-0.5);
                            spriteSheet.removeChildByTag(1*10000+(pY+0.5)*1000+pX+0.5);
                            quads.value -= 2;
                            break;
                        }
                        else if (level[pY][pX]==15 && level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==26 || level[pY][pX]==16 && level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==26){
                            spriteSheet.removeChildByTag(1*10000+(pY-0.5)*1000+pX-0.5);
                            quads.value -= 1;
                            break;
                        }
                        else if (level[pY][pX]==15 && level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==26 || level[pY][pX]==16 && level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==26){
                            spriteSheet.removeChildByTag(1*10000+(pY+0.5)*1000+pX+0.5);
                            quads.value -= 1;
                            break;
                        }

                        // check for blue
                        else if (level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==62 && level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==62){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+".png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX-0.5)*sizeOfSprite), y:((level.length-pY-0.5)*sizeOfSprite), scale: scaleFactor});//-0,5,-0,5
                                sprite.setRotation(45);
                                quadsBlue.value += 1;
                            spriteSheet.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX-0.5);
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+".png");
                            var sprite_n = new cc.Sprite(spriteFrame);
                                sprite_n.attr({x: ((pX+0.5)*sizeOfSprite), y:((level.length-pY-1.5)*sizeOfSprite), scale: scaleFactor});//+0.5,+0.5
                                sprite_n.setRotation(45);
                                quadsBlue.value += 1;
                            spriteSheet.addChild(sprite_n,0,1*10000+(pY+0.5)*1000+pX+0.5);
                            break;
                        }
                        else if (level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==62){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+".png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX-0.5)*sizeOfSprite), y:((level.length-pY-0.5)*sizeOfSprite), scale: scaleFactor});
                                sprite.setRotation(45);
                                quadsBlue.value += 1;
                            spriteSheet.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX-0.5);
                            break;
                        }
                        else if (level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==62){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+".png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX+0.5)*sizeOfSprite), y:((level.length-pY-1.5)*sizeOfSprite), scale: scaleFactor});
                                sprite.setRotation(45);
                                quadsBlue.value += 1;
                            spriteSheet.addChild(sprite,0,1*10000+(pY+0.5)*1000+pX+0.5);
                            break;
                        }
                        else if (level[pY][pX]==1 && level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==48 && level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==48 || level[pY][pX]==2 && level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==48 && level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==48 ){
                            spriteSheet.removeChildByTag(1*10000+(pY-0.5)*1000+pX-0.5);
                            spriteSheet.removeChildByTag(1*10000+(pY+0.5)*1000+pX+0.5);
                            quadsBlue.value -= 2;
                            break;
                        }
                        else if (level[pY][pX]==1 && level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==48 || level[pY][pX]==2 && level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==48){
                            spriteSheet.removeChildByTag(1*10000+(pY-0.5)*1000+pX-0.5);
                            quadsBlue.value -= 1;
                            break;
                        }
                        else if (level[pY][pX]==1 && level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==48 || level[pY][pX]==2 && level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==48){
                            spriteSheet.removeChildByTag(1*10000+(pY+0.5)*1000+pX+0.5);
                            quadsBlue.value -= 1;
                            break;
                        }
                        else break;
                        
                     case 2 : case 4:
                        if (level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==14 && level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==14){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+".png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX+0.5)*sizeOfSprite), y:((level.length-pY-(1-0.5))*sizeOfSprite), scale: scaleFactor});//+0.5,-0,5
                                sprite.setRotation(45);
                                quads.value += 1;
                            spriteSheet.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX+0.5);//- und + vertauscht
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+".png");
                            var sprite_n = new cc.Sprite(spriteFrame);
                                sprite_n.attr({x: ((pX-0.5)*sizeOfSprite), y:(level.length-pY-(1+0.5))*sizeOfSprite, scale: scaleFactor});//-0.5,+0.5
                                sprite_n.setRotation(45);
                                quads.value += 1;
                            spriteSheet.addChild(sprite_n,0,1*10000+(pY+0.5)*1000+pX-0.5);
                            break;
                        }
                        else if (level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==14){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+".png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX+0.5)*sizeOfSprite), y:(level.length-pY-(1-0.5))*sizeOfSprite, scale: scaleFactor});
                                sprite.setRotation(45);
                                quads.value += 1;
                            spriteSheet.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX+0.5);
                            break;
                        }
                        else if (level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==14){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+".png");
                            var sprite = new cc.Sprite(spriteFrame);;
                                sprite.attr({x: ((pX-0.5)*sizeOfSprite), y:(level.length-pY-(1+0.5))*sizeOfSprite, scale: scaleFactor});
                                sprite.setRotation(45);
                                quads.value += 1;
                            spriteSheet.addChild(sprite,0,1*10000+(pY+0.5)*1000+pX-0.5);
                            break;
                        }
                        else if (level[pY][pX]==15 && level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==26 && level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==26 || level[pY][pX]==16 && level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==26 && level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==26){
                            spriteSheet.removeChildByTag(1*10000+(pY-0.5)*1000+pX+0.5);
                            spriteSheet.removeChildByTag(1*10000+(pY+0.5)*1000+pX-0.5);
                            quads.value -= 2;
                            break;
                        }
                        else if (level[pY][pX]==15 && level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==26 || level[pY][pX]==16 && level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==26){
                            spriteSheet.removeChildByTag(1*10000+(pY-0.5)*1000+pX+0.5);
                            quads.value -= 1;
                            break;
                        }
                        else if (level[pY][pX]==15 && level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==26 || level[pY][pX]==16 && level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==26){
                            spriteSheet.removeChildByTag(1*10000+(pY+0.5)*1000+pX-0.5);
                            quads.value -= 1;
                            break;
                        }

                        //check blue
                        else if (level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==62 && level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==62){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+".png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX+0.5)*sizeOfSprite), y:((level.length-pY-(1-0.5))*sizeOfSprite), scale: scaleFactor});//+0.5,-0,5
                                sprite.setRotation(45);
                                quadsBlue.value += 1;
                            spriteSheet.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX+0.5);//- und + vertauscht
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+".png");
                            var sprite_n = new cc.Sprite(spriteFrame);
                                sprite_n.attr({x: ((pX-0.5)*sizeOfSprite), y:(level.length-pY-(1+0.5))*sizeOfSprite, scale: scaleFactor});//-0.5,+0.5
                                sprite_n.setRotation(45);
                                quadsBlue.value += 1;
                            spriteSheet.addChild(sprite_n,0,1*10000+(pY+0.5)*1000+pX-0.5);
                            break;
                        }
                        else if (level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==62){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+".png");
                            var sprite = new cc.Sprite(spriteFrame);
                                sprite.attr({x: ((pX+0.5)*sizeOfSprite), y:(level.length-pY-(1-0.5))*sizeOfSprite, scale: scaleFactor});
                                sprite.setRotation(45);
                                quadsBlue.value += 1;
                            spriteSheet.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX+0.5);
                            break;
                        }
                        else if (level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==62){
                            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("quad_"+1+".png");
                            var sprite = new cc.Sprite(spriteFrame);;
                                sprite.attr({x: ((pX-0.5)*sizeOfSprite), y:(level.length-pY-(1+0.5))*sizeOfSprite, scale: scaleFactor});
                                sprite.setRotation(45);
                                quadsBlue.value += 1;
                            spriteSheet.addChild(sprite,0,1*10000+(pY+0.5)*1000+pX-0.5);
                            break;
                        }
                        else if (level[pY][pX]==1 && level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==48 && level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==48 || level[pY][pX]==2 && level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==48 && level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==48){
                            spriteSheet.removeChildByTag(1*10000+(pY-0.5)*1000+pX+0.5);
                            spriteSheet.removeChildByTag(1*10000+(pY+0.5)*1000+pX-0.5);
                            quadsBlue.value -= 2;
                            break;
                        }
                        else if (level[pY][pX]==1 && level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==48 || level[pY][pX]==2 && level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==48){
                            spriteSheet.removeChildByTag(1*10000+(pY-0.5)*1000+pX+0.5);
                            quadsBlue.value -= 1;
                            break;
                        }
                        else if (level[pY][pX]==1 && level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==48 || level[pY][pX]==2 && level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==48){
                            spriteSheet.removeChildByTag(1*10000+(pY+0.5)*1000+pX-0.5);
                            quadsBlue.value -= 1;
                            break;
                        }
                        else break;
                        default:
                            break;
         
            }
		};

    },
	getStartColumn: function (){
			var level = this.level;
            if (level[level[level.length-1][1]][level[level.length-1][0]]==1 || level[level[level.length-1][1]][level[level.length-1][0]]==33) return level[level.length-1][0]
            else {
            //this.spriteSheet.x += this.sizeOfSprite;
            return level[level.length-1][0]-1
            }
    },
	initAnimations: function(){
		this.rightUp =  cc.moveBy(0.1, cc.p(-this.sizeOfSprite, -this.sizeOfSprite)); //fucking shiiit of retain :-P costed me about 8hours
        this.rightUp.retain();
        this.leftUp = cc.moveBy(0.1, cc.p(+this.sizeOfSprite, -this.sizeOfSprite));
        this.leftUp.retain();
        this.rightDown = cc.moveBy(0.1, cc.p(-this.sizeOfSprite, +this.sizeOfSprite));
        this.rightDown.retain();
        this.leftDown =  cc.moveBy(0.1, cc.p(+this.sizeOfSprite, +this.sizeOfSprite));
        this.leftDown.retain();	
        this.scaling = cc.scaleTo(3, 0.01);
        this.scaling.retain();
        this.scalingreverse = cc.scaleTo(3, 1);
        this.scalingreverse.retain();
        //cc.log(this.sizeOfSprite+"=sizeOfSprite");
        //cc.log("initAnimations");
	},
	setUp: function (){
        cc.log(this.railsPerRow);
        this.row.y = this.level[this.level.length-1][1]; //muss Global sein , old level.length-2
        this.column.x = this.getStartColumn();//old level[0].length/2-1
        this.scaleFactor = this.winsize.width/this.railsPerRow/240;      //240 size of sprite ursprünglich :-P 1920/8
        this.sizeOfSprite = this.winsize.width/this.railsPerRow;
        this.initAnimations();
        this.touchNode.drawRect(cc.p(this.winsize.width/2-5,2*this.sizeOfSprite-5),cc.p(this.winsize.width/2+5,2*this.sizeOfSprite+5),cc.color(255,0,0,255),null,null);
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
        this.spriteSheet.scale = 0.01;
        this.spriteSheet.runAction(this.scalingreverse);
        this.spriteSheet.runAction(cc.moveBy(3,-(((this.column.x)+0.5)*this.sizeOfSprite),-2*this.sizeOfSprite));
        //this.spriteSheet.x = -(((this.column.x)-(this.railsPerRow/2-0.5))*this.sizeOfSprite);//-2 wägä arrayOutOfBound am rand ä rahmä vo 1 und denn -0.5 wäg mitti, old version wenn genau mitti level[0].length-2)/2
		this.spriteSheet.y = 2.5*this.sizeOfSprite; //AnchorPoint (0,5,0,5) 
    },  
	generateLvl:function(){
        //load seed
        //var ls = cc.sys.localStorage;
        //this.seed = ls.getItem(3);  

        cc.log("seed = "+this.seed);
		var x = this.columns;
		var y = this.rows;
		//this.level=level;
        //====================================================================
        //Random Numbers with Seed
        Math.seed = function(s) {
            return function() {
                s = Math.sin(s) * 10;
                s = s - Math.floor(s);
                s = Math.floor(s*100000000); 
                return s/100000000;                     //auf 8 Nachkommastellen genau, weil unterschiedlich genau Sinuswerte  (Math.floor((s - Math.floor(s))*100000000))/100000000
            };
        };

        // Seed:
        var random1 = Math.seed(this.seed);
        var random2 = Math.seed(random1());
        randomWithSeed = Math.seed(random2()); //Math.seed(Math.seed(Math.seed(this.seed)));
        //cc.log("Numbers"+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed()+","+randomWithSeed());
        //====================================================================
        //====================================================================

        //var levelFinal = generateLevelArray(y,x);
        //cc.log(level);
        //cc.log("Startrail= "+level[startingPosY][startingPosY]);
        //function generateLevelArray(rows, columns){
            var startingPosX = Math.floor((randomWithSeed()*(this.columns-2)+1));
            //var startingPosX = 13;
            cc.log("Startpunkt x: "+startingPosX);
            var startingPosY = Math.floor((randomWithSeed())*(this.rows/5)+1);
            //var startingPosY = 89;
            cc.log("Startpunkt y: "+startingPosY);
            
            var levelArray = generateEmptyArray(this.rows,this.columns);
            
            function generateEmptyArray(rows,columns){
                var emptyArray = new Array ();
                for(i=0; i<rows; i++){ 
                    emptyArray.push( [] );
                    for(j=0; j<columns; j++){
                            emptyArray[i].push(0);
                    }
                } 
                    return emptyArray;
            }
            levelArray[startingPosY][startingPosX] = Math.floor((randomWithSeed())*2+1);
            //4Directions 1=Up_right=UR/2=Down_right=DR/3=Down_left=DL/4=Up_Left=UL
            var posX = startingPosX; //Aktuelle Positionen
            var posY = startingPosY;
            var impossibleMove = 0;
            var lastmove = 0;//Invertierter Lastmove
            secondRail(); 
            function secondRail(){
                //var posX = startingPosX;
                //var posY = startingPosY;
                //secondrail
                
                if (levelArray[posY][posX]==1){
                    //decide if Up or Down
                    /*var d = Math.floor((randomWithSeed())*2+1);
                    if (d==1){ //Up
                        upLeft();
                    }*/
                    //else {
                        downRight();
                    //}
                }
                else {
                    downLeft();
                    /*var d = Math.floor((randomWithSeed())*2+1);
                    if(d==1){//UP
                        upRight();
                    }
                    else {
                        downLeft();
                    }*/
                }
                return levelSolutionLane();
            };
            function levelSolutionLane(){
                //var d = Math.floor((randomWithSeed())*4+1); 
                //if (d=impossibleMove){
                //    d += 1;
                //}
                //cc.log(d);
                //for (i=0; i<count; i++){
                var i=0;
                while (true){
                    i++;
                    if(posY==y-2){ //wägä neu level infos -2
                        break;
                    }
                    else{
                        //cc.log(posX);
                        if (lastmove==1){
                            upRight();
                            //cc.log("Letzter Zug war 1")
                        }
                        else if (lastmove==2){
                            downRight(Math.floor((posX/x)*10));
                            //cc.log("Letzter Zug war 2")
                        }
                        else if (lastmove==3){
                            downLeft(Math.floor((posX/x)*10));//equals possibilityNumber
                            //cc.log("Letzter Zug war 3")
                        }
                        else {
                            upLeft(); 
                            //cc.log("Letzter Zug war 4")
                        }
                    }
                    
                }
                cc.log("generation finished with= "+i+" moves");
                
            };
            //4 Direction Functions
            //4:3 für up
            function upLeft(){
                var d = Math.floor((randomWithSeed())*7+1);
                if (d==1 || d==4 || d==5){ //3=DL
                    if (posX-1==0 || posY-1==0){
                        outOfBoundUpLeft();
                    }
                    else{
                    posX -=1;
                    levelArray[posY][posX]=2;
                    //impossibleMove = 3;
                    lastmove = 3;
                    }
                }
                else if (d==2 || d==6){//4=UL
                    if (posX-1==0 || posY-1==0){
                        outOfBoundUpLeft();
                    }
                    else{
                    posX -=1;
                    posY -=1;
                    levelArray[posY][posX]=1;
                    //impossibleMove = 2;
                    lastmove = 4;
                    }
                }
                else {//1=UR
                    if (posX-1==0 || posY-1==0){
                        outOfBoundUpLeft();
                    }
                    else{
                    posY -=1;
                    levelArray[posY][posX]=2; 
                    //impossibleMove = 3;
                    lastmove = 1;
                    }
                }
            };
            //4:3 für Down
            function downRight(possiblityNumber){
                if (possiblityNumber<3){ //am linken Rand = 5:1 für rechts, 2:1 für down
					var d = Math.floor((randomWithSeed())*(6-possiblityNumber)+1); //von 1-6
				}
				else if (possiblityNumber>7) {//am rechten Rand = 5:2 für links, 6:1 für down, random von 7-13
					var d = Math.floor((randomWithSeed())*(possiblityNumber-2)+7);
				}
				else{
					var d = Math.floor((randomWithSeed())*3+1);
				}
                //var d = Math.floor((randomWithSeed())*3+1);
                if (d==1 || d==5 || d==7){ //1=UR
                    if (posX+1==x || posY+1==y){
                        outOfBoundDownRight();
                    }
                    else{
                    posX +=1;
                    levelArray[posY][posX]=2;
                    //impossibleMove = 3;
                    lastmove = 1;
                    }
                }
                else if (d==2 || d==4 || d==6 || d==8){//2=DR 
                    if (posX+1==x || posY+1==y){
                        outOfBoundDownRight();
                    }
                    else{
                    posX +=1;        
                    posY +=1;
                    levelArray[posY][posX]=1;
                    //impossibleMove = 4;
                    lastmove = 2;
                    }
                }
                else {//3=DL / 3,9,10,11,12,13
                    if (posX+1==x || posY+1==y){
                        outOfBoundDownRight();
                    }
                    else{
                    posY +=1;
                    levelArray[posY][posX]=2; 
                    //impossibleMove = 1;
                    lastmove = 3;
                    }
                }
            };
            //4:3für up
            function upRight(){
                var d = Math.floor((randomWithSeed())*7+1);
                if (d==1 || d==6){ //4= UL
                    if (posX+1==x || posY-1==0){
                        outOfBoundUpRight();
                    }
                    else{
                    posY -=1;
                    levelArray[posY][posX]=1;
                    //impossibleMove = 2;
                    lastmove = 4;
                    }
                }
                else if (d==2 || d==7){//1=UR
                    if (posX+1==x || posY-1==0){
                        outOfBoundUpRight();
                    }
                    else{
                    posX +=1;
                    posY -=1;
                    levelArray[posY][posX]=2;
                    //impossibleMove = 3;
                    lastmove = 1;
                    }
                }
                else {//2=DR
                    if (posX+1==x || posY-1==0){
                        outOfBoundUpRight();
                    }
                    else{
                    posX +=1;
                    levelArray[posY][posX]=1;
                    //impossibleMove = 4;
                    lastmove = 2;
                    }
                }
            };
            //2:1 für down
            function downLeft(possiblityNumber){
                
				if (possiblityNumber<3){ //am linken Rand = 5:2 für rechts, 6:1 für down
					var d = Math.floor((randomWithSeed())*(7-possiblityNumber)+1); // 1-7
				}
				else if (possiblityNumber>7) {//am rechten Rand = 5:1 für links und 2:1 für down //possibiltyNumber geht nur bis 9 da nur bis posX-1 max row und random function nie 1? dadurch nur d==13 unmöglich
					var d = Math.floor((randomWithSeed())*(possiblityNumber-3)+7);
				}
				else{
					var d = Math.floor((randomWithSeed())*3+1);
				}
				
				if (d==1 || d==4 || d==5 || d==6 || d==7){ //2= DR
                    if (posY+1==y || posX-1==0){//ArrayOutOfBound
                        	outOfBoundDownLeft();
                        
                    	}
                else{
                    posY +=1;
                    levelArray[posY][posX]=1;
                       	lastmove = 2;
                  	}
               	}
                else if (d==2 || d==8 || d==10 || d==12){//3=DL
                   	if (posY+1==y ||posX-1==0){//arrayOUtOfBound
                       	outOfBoundDownLeft();
                   	}
                   	else{
                       	posX -=1;
                       	posY +=1;
                       	levelArray[posY][posX]=2;
                       	lastmove = 3;
                   	}
                   
               	}
               	else {//4=UL
                   	if(posX-1==0 || posY+1==y){//Ecke Problem! OR OR AND ?
                       	outOfBoundDownLeft();
                   	}
                   	else{                        	
						posX -=1;
                       	levelArray[posY][posX]=1;
                       	//impossibleMove = 2;
                       	lastmove = 4;
                    }
                }
                //cc.log(posX);
            };
            
            function outOfBoundUpRight(){
                if (posX+1==x && posY-1==0){
                    posX -=1;
                    posY +=1;
                    levelArray[posY][posX]=2;
                    lastmove=3;
                }
                else if (posX+1==x) {
                    posY -=1;
                    levelArray[posY][posX]=1;
                    lastmove=4;
                }
                else {
                    posX +=1;
                    levelArray[posY][posX]=1;
                    lastmove=2;
                }
            };
            function outOfBoundDownRight(){
                if (posX+1==x && posY+1==y){
                    posX -=1;
                    posY -=1;
                    levelArray[posY][posX]=1;
                    lastmove=4;
                }
                else if (posX+1==x) {
                    posY +=1;
                    levelArray[posY][posX]=2;
                    lastmove=3;
                }
                else {
                    posX +=1;
                    levelArray[posY][posX]=2;
                    lastmove=1;
                }
            };
            function outOfBoundDownLeft(){
                if (posX-1==0 && posY+1==y){
                    posX +=1;
                    posY -=1;
                    levelArray[posY][posX]=2;
                    lastmove=1;
                }
                else if (posX-1==0){
                    posY +=1;
                    levelArray[posY][posX]=1;
                    lastmove = 2;
                }
                else {
                    posX -=1;
                    levelArray[posY][posX]=1;
                    lastmove=4;
                }
            };
            function outOfBoundUpLeft(){
                if (posX-1==0 && posY-1==0){
                    posX +=1;
                    posY +=1;
                    levelArray[posY][posX]=1;
                    lastmove=2;
                }
                else if (posX-1==0){
                    posY -=1;
                    levelArray[posY][posX]=2;
                    lastmove = 1;
                }
                else {
                    posX -=1;
                    levelArray[posY][posX]=2;
                    lastmove=3;
                }
            };
            if (levelArray[posY][posX]==1){
                levelArray[posY][posX]=33;
            }
            else if (levelArray[posY][posX]==2){
                levelArray[posY][posX]=34;
            }
            if (levelArray[startingPosY][startingPosX]==1){
                levelArray[startingPosY][startingPosX]=31;
            }
            else if (levelArray[startingPosY][startingPosX]==2){
                levelArray[startingPosY][startingPosX]=32;
            }

            //set starting rails
            cc.log("X-Position= "+posX+" und Y-Position= "+posY);
            levelArray.push( [] );
            levelArray[y][0]=posX;
            levelArray[y][1]=posY;
            levelArray[y][2]=startingPosX;
            levelArray[y][3]=startingPosY;
			this.level = levelArray;
			cc.log("Level Generated");
			return this.init();

            
        //};
            
	},
    finalSequence: function(dir) {
        this.gameLayer_copy.removeChild(touchNode);
        this.spriteSheet.runAction(this.scaling);
        this.switcher.value = true;
    },
    update:function (dt) {
        if (-this.spriteSheet.y>this.highest) this.highest = -this.spriteSheet.y;
        var statusLayer = this.getParent().getChildByTag(3);
        statusLayer.updateMoves(this.moves.value);
        statusLayer.updatePoints(this.highest + this.moves.value*this.sizeOfSprite);
        statusLayer.updateQuads(this.quads.value);
        statusLayer.updateBlueQuads(this.quadsBlue.value);
        if (this.switcher.value === true && this.spriteSheet.getNumberOfRunningActions()==0){
            statusLayer.removeEverything();
            return this.gameOver();
        } 

    },
    onExit:function() {
        this.rightUp.release();
        this.leftUp.release();
        this.rightDown.release();
        this.leftDown.release();
        this.scaling.release();
        this.scalingreverse.release();
        this._super();
    },
    gameOver:function (){
        cc.log("LevelEnd");
        var ls = cc.sys.localStorage;
        ls.setItem(1, Math.floor(this.highest + this.moves.value*this.sizeOfSprite));
        ls.setItem(2, this.quads.value);
        ls.setItem(3, this.moves.value);
        ls.getItem(4, this.quadsBlue.value);
        this.spriteSheet.runAction(this.rightUp); //hack but fixes probelm
        cc.director.pause();
        if(ls.getItem(999)==1){ //Beta switch
        this.addChild(new gameOverLayer());
        }
        else this.addChild(new gameBetaOverLayer());

    }
});
