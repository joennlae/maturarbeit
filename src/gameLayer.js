var gameLayer = cc.Layer.extend({
    spriteSheet:null,
	seed: 50,
	level: null,
	railsPerRow: 8,
	columns: 200,
	rows: 250,
	winsize: 0,
	standart: 8,
    factor: 0,
	scaleFactor: 0,
	sizeOfSprite: 0,
	touchNode: null,
	row: 0,
	column: 0,
	rightUp: null,
	rightDown: null,
	leftDown: null,
	leftUp: null,
    ctor:function () {
        this._super();
		//Variables
		this.winsize = cc.director.getWinSize();
		this.scaleFactor = this.winsize.width/this.railsPerRow/500;      //500 size of sprite ursprünglich :-P
        this.sizeOfSprite = this.winsize.width/this.railsPerRow;

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
        this.spriteSheet.retain();
        this.addChild(this.spriteSheet);
        //====================================================================
        //TouchNode and Stuff further implementation in setUp()
        this.touchNode = new cc.DrawNode();
        this.touchNode.retain();
        //cc.spriteFrameCache.addSpriteFrames(res.rails_plist);
        this.addChild(this.touchNode);
		//Variables for controlling
		this.row = this.level[this.level.length-1][1]; //muss Global sein , old level.length-2
        this.column = this.getStartColumn();//old level[0].length/2-1
        //var level = this.level;
        
		cc.log(this.spriteSheet.x);
		this.setUp();
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
                    if(level[row][column+1]==2 || level[row][column+1]==4){
                        //spriteBatchNode.x -= sizeOfSprite;
                        //spriteBatchNode.y -= sizeOfSprite;
                        spriteSheet.runAction(rightUp);
                        changeRails(row,column+1);
                        checkForQuad(row,column+1,1);
                        row -= 1;
                        column +=1;
                        infos();
                        return true;
                    }
                    return false;
                }
                else if(corX < winsize.width/2 && corY >= winsize.height/2){ //up-left
                    if(level[row][column]==1 || level[row][column]==3 ){
                        spriteSheet.runAction(leftUp);
                        changeRails(row,column);
                        checkForQuad(row,column,4);
                        row -=1;
                        column -=1;
                        infos();
                        return true;
                    }
                    return false;
                }
                else if(corX < winsize.width/2 && corY < winsize.height/2){ //down-left
                    if(level[row+1][column]==2 || level[row+1][column]==4 ){
                        spriteSheet.runAction(leftDown);
                        changeRails(row+1,column);
                        checkForQuad(row+1,column,3);
                        row +=1;
                        column -=1;
                        infos();
                        return true;
                    }
                    return false;
                }
                else if(corX >= winsize.width/2 && corY < winsize.height/2){ //down-right
                    if(level[row+1][column+1]==1 || level[row+1][column+1]==3){
                        spriteSheet.runAction(rightDown);
                        changeRails(row+1,column+1);
                        checkForQuad(row+1,column+1,2);
                        row +=1;
                        column +=1;
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
            cc.log("Aktuelle Optionen:" + level[row][column] + "|" + level[row][column+1] + "||"  + level[row+1][column] + "|" + level[row+1][column+1]);
            //cc.log("y="+row+" x="+column);
        };

       
        
        var standart = 8;
        var factor = 0;
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
            if(key==107 || key==190){//+ also Zoom
                factor -= 2;
                spriteSheet.removeAllChildren();
                touchNode.clear();
                setUp(standart + factor);
                return true;
            }
            else if(key==109 || key==189){//-= dezoom
                factor += 2;
                cc.log(factor);
                spriteSheet.removeAllChildren();
                touchNode.clear();
                setUp(standart + factor);
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
            }
            else if (spriteSheet.getNumberOfRunningActions()===0){
                if(key==105 || key==74){ //up-right
                    if(level[row][column+1]==2 || level[row][column+1]==4){
                        spriteSheet.runAction(rightUp);
                        changeRails(row,column+1);
                        checkForQuad(row,column+1,1);
                        row -= 1;
                        column +=1;
                        infos();
                        return true;
                    }
                    return false;
                }
                else if(key==103 || key==70){ //up-left
                    if(level[row][column]==1 || level[row][column]==3){
                        spriteSheet.runAction(leftUp);
                        changeRails(row,column);
                        checkForQuad(row,column,4);
                        row -=1;
                        column -=1;
                        infos();
                        return true;
                    }
                    return false;
                }
                else if(key==97 || key==86){ //down-left
                    if(level[row+1][column]==2 || level[row+1][column]==4){
                        spriteSheet.runAction(leftDown);
                        changeRails(row+1,column);
                        checkForQuad(row+1,column,3);
                        row +=1;
                        column -=1;
                        infos();
                        return true;
                    }
                    return false;
                }
                else if(key==99 || key==78){ //down-right
                    if(level[row+1][column+1]==1 || level[row+1][column+1]==3){
                        spriteSheet.runAction(rightDown);
                        changeRails(row+1,column+1);
                        checkForQuad(row+1,column+1,2);
                        row +=1;
                        column +=1;
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
            var spriteDel = spriteSheet.getChildByTag(1000*railPosY+railPosX); 
            spriteSheet.removeChild(spriteDel); 
            switch (level[railPosY][railPosX]) {
                    case 1:
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+3+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*sizeOfSprite), y:((level.length-railPosY-1)*sizeOfSprite), scale: scaleFactor});
                        spriteSheet.addChild(sprite,0,1000*railPosY+railPosX);
                        level[railPosY][railPosX]=3;
                        break;
                    case 2:
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+4+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*sizeOfSprite), y:((level.length-railPosY-1)*sizeOfSprite), scale: scaleFactor});
                        spriteSheet.addChild(sprite,0,1000*railPosY+railPosX);
                        level[railPosY][railPosX]=4;
                        break;
                    case 3:
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+1+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*sizeOfSprite), y:((level.length-railPosY-1)*sizeOfSprite), scale: scaleFactor});
                        spriteSheet.addChild(sprite,0,1000*railPosY+railPosX);
                        level[railPosY][railPosX]=1;
                        break;
                    case 4:
                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+2+".png");
                        var sprite = new cc.Sprite(spriteFrame);
                            sprite.attr({x: (railPosX*sizeOfSprite), y:((level.length-railPosY-1)*sizeOfSprite), scale: scaleFactor});
                        spriteSheet.addChild(sprite,0,1000*railPosY+railPosX);
                        level[railPosY][railPosX]=2;
                        break;
                        
            }
            
        };
		function checkForQuad(pY,pX,lm){ // get Position and lastmove. 1:Up-Right, 2: Down-Right, 3:Down-Left, 4:Up-Left
            switch (lm) { //14 when circle, 12 when destroyed with last move
                    case 1 : case 3:
                        if (level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==14 && level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==14){
                            var sprite = new cc.Sprite(res.quad_1);
                                sprite.attr({x: ((pX-0.5)*sizeOfSprite), y:((level.length-pY-0.5)*sizeOfSprite), scale: scaleFactor});//-0,5,-0,5
                                sprite.setRotation(45);
                            spriteSheet.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX-0.5);
                            var sprite_n = new cc.Sprite(res.quad_1);
                                sprite_n.attr({x: ((pX+0.5)*sizeOfSprite), y:((level.length-pY-1.5)*sizeOfSprite), scale: scaleFactor});//+0.5,+0.5
                                sprite_n.setRotation(45);
                            spriteSheet.addChild(sprite_n,0,1*10000+(pY+0.5)*1000+pX+0.5);
                            break;
                        }
                        else if (level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==14){
                            var sprite = new cc.Sprite(res.quad_1);
                                sprite.attr({x: ((pX-0.5)*sizeOfSprite), y:((level.length-pY-0.5)*sizeOfSprite), scale: scaleFactor});
                                sprite.setRotation(45);
                            spriteSheet.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX-0.5);
                            break;
                        }
                        else if (level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==14){
                            var sprite = new cc.Sprite(res.quad_1);
                                sprite.attr({x: ((pX+0.5)*sizeOfSprite), y:((level.length-pY-1.5)*sizeOfSprite), scale: scaleFactor});
                                sprite.setRotation(45);
                            spriteSheet.addChild(sprite,0,1*10000+(pY+0.5)*1000+pX+0.5);
                            break;
                        }
                        else if (level[pY][pX]==1 && level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==12 && level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==12 || level[pY][pX]==2 && level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==12 && level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==12 ){
                            spriteSheet.removeChildByTag(1*10000+(pY-0.5)*1000+pX-0.5);
                            spriteSheet.removeChildByTag(1*10000+(pY+0.5)*1000+pX+0.5);
                            break;
                        }
                        else if (level[pY][pX]==1 && level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==12 || level[pY][pX]==2 && level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==12){
                            spriteSheet.removeChildByTag(1*10000+(pY-0.5)*1000+pX-0.5);
                            break;
                        }
                        else if (level[pY][pX]==1 && level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==12 || level[pY][pX]==2 && level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==12){
                            spriteSheet.removeChildByTag(1*10000+(pY+0.5)*1000+pX+0.5);
                            break;
                        }
                        else break;
                        
                     case 2 : case 4:
                        if (level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==14 && level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==14){
                            var sprite = new cc.Sprite(res.quad_1);
                                sprite.attr({x: ((pX+0.5)*sizeOfSprite), y:((level.length-pY-(1-0.5))*sizeOfSprite), scale: scaleFactor});//+0.5,-0,5
                                sprite.setRotation(45);
                            spriteSheet.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX+0.5);//- und + vertauscht
                            var sprite_n = new cc.Sprite(res.quad_1);
                                sprite_n.attr({x: ((pX-0.5)*sizeOfSprite), y:(level.length-pY-(1+0.5))*sizeOfSprite, scale: scaleFactor});//-0.5,+0.5
                                sprite_n.setRotation(45);
                            spriteSheet.addChild(sprite_n,0,1*10000+(pY+0.5)*1000+pX-0.5);
                            break;
                        }
                        else if (level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==14){
                            var sprite = new cc.Sprite(res.quad_1);
                                sprite.attr({x: ((pX+0.5)*sizeOfSprite), y:(level.length-pY-(1-0.5))*sizeOfSprite, scale: scaleFactor});
                                sprite.setRotation(45);
                            spriteSheet.addChild(sprite,0,1*10000+(pY-0.5)*1000+pX+0.5);
                            break;
                        }
                        else if (level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==14){
                            var sprite = new cc.Sprite(res.quad_1);
                                sprite.attr({x: ((pX-0.5)*sizeOfSprite), y:(level.length-pY-(1+0.5))*sizeOfSprite, scale: scaleFactor});
                                sprite.setRotation(45);
                            spriteSheet.addChild(sprite,0,1*10000+(pY+0.5)*1000+pX-0.5);
                            break;
                        }
                        else if (level[pY][pX]==1 && level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==12 && level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==12 || level[pY][pX]==2 && level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==12 && level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==12){
                            spriteSheet.removeChildByTag(1*10000+(pY-0.5)*1000+pX+0.5);
                            spriteSheet.removeChildByTag(1*10000+(pY+0.5)*1000+pX-0.5);
                            break;
                        }
                        else if (level[pY][pX]==1 && level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==12 || level[pY][pX]==2 && level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==12){
                            spriteSheet.removeChildByTag(1*10000+(pY-0.5)*1000+pX+0.5);
                            break;
                        }
                        else if (level[pY][pX]==1 && level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==12 || level[pY][pX]==2 && level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==12){
                            spriteSheet.removeChildByTag(1*10000+(pY+0.5)*1000+pX-0.5);
                            break;
                        }
                        else break;
         
            }
		};
		 //LoadLevel
        
        //====================================================================
        
        //Local Storage not a good idea because 2dArray's also must be JSON.parse which is better with local files because i'd need a plugin in javascript or i would have to write one which i think is not compatible with JSB
        //var localStorage = cc.sys.localStorage;
        /*localStorage.prototype.setObject = function(key, value) {
            this.setItem(key, JSON.stringify(value));
            };

        localStorage.prototype.getObject = function(key) {
            return JSON.parse(this.getItem(key));
            };
        localStorage.setObject('test',level_big);*/
		
        //====================================================================
        //====================================================================
        
        /*setUp(this.railsPerRow);
        function setUp(n){
        scaleFactor = winsize.width/n/500;      //500 size of sprite ursprünglich :-P
        sizeOfSprite = winsize.width/n;
        touchNode.drawRect(cc.p(winsize.width/2-5,2*sizeOfSprite-5),cc.p(winsize.width/2+5,2*sizeOfSprite+5),cc.color(255,0,0,255),null,null);
        for (i = level.length-2; i > 0; i--) {        //level.length = level[y][] i=row , -2 weill neu auch startpositionen an letzer y stelle gespeichert
            for (j = 0; j < level[0].length; j++) { //level[0].length = level[][x] j=column
                if (level[i][j]!==0) {
                //var sprite = new cc.Sprite('#rail_'+((level[i][j]%2+1)%2+1)+'.png');/*first try :eval("res.rail_"+level[i][j]) rails-png nur zwei aber bis 6 nummeriert also modulo --> verkehrt den hatl modulo modulo --> epic ((level[i][j]%2+1)%2+1)= alli richtig*/
                /*var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+level[i][j]+".png");
                var sprite = new cc.Sprite(spriteFrame);
                    sprite.attr({x: (j*sizeOfSprite), y:((level.length-i-1)*sizeOfSprite), scale: scaleFactor});
                spriteSheet.addChild(sprite,0,1000*i+j); // only Javascript with name with string, now we have tags with Integer also supports iOS !!Attention to only 1000 height!!
                
                }
            }
        }
        this.spriteSheet.x = -((level[level.length-1][0])-(n/2-0.5))*sizeOfSprite;//-2 wägä arrayOutOfBound am rand ä rahmä vo 1 und denn -0.5 wäg mitti, old version wenn genau mitti level[0].length-2)/2
        //return controlling(sizeOfSprite);
		spriteSheet.y += sizeOfSprite/2; //AnchorPoint (0,5,0,5) 
        }*/
        //====================================================================
        //====================================================================
        //Controlling
        //function controlling(sizeOfSprite){
        
        
            
        

       
        
        
        //cc.eventManager.addListener(listener_keyboard, this);
 		//cc.eventManager.addListener(listener1, touchNode); //Inside Function because of Action Length
        
           
        
		


                      
    
    },
	getStartColumn: function (){
			var level = this.level;
            if (level[level[level.length-1][1]][level[level.length-1][0]]==1) return level[level.length-1][0]
            else {
            this.spriteSheet.x += this.sizeOfSprite;
            return level[level.length-1][0]-1
            }
    },
	initAnimations: function(){
		this.rightUp = cc.moveBy(0.1, cc.p(-this.sizeOfSprite, -this.sizeOfSprite)); //fucking shiiit of retain :-P costed me about 8hours
        this.rightUp.retain();
        this.leftUp = cc.moveBy(0.1, cc.p(+this.sizeOfSprite, -this.sizeOfSprite));
        this.leftUp.retain();
        this.rightDown = cc.moveBy(0.1, cc.p(-this.sizeOfSprite, +this.sizeOfSprite));
        this.rightDown.retain();
        this.leftDown = cc.moveBy(0.1, cc.p(+this.sizeOfSprite, +this.sizeOfSprite));
        this.leftDown.retain();	
		return this.init();
	},
	setUp: function (){
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
        this.spriteSheet.x -= (((this.level[this.level.length-1][0])-(this.railsPerRow/2-0.5))*this.sizeOfSprite);//-2 wägä arrayOutOfBound am rand ä rahmä vo 1 und denn -0.5 wäg mitti, old version wenn genau mitti level[0].length-2)/2
        //return controlling(sizeOfSprite);
		this.spriteSheet.y += this.sizeOfSprite/2; //AnchorPoint (0,5,0,5) 
    },
	onTouchBegan: function (touch, event) {
                var corX = touch.getLocationX();
                var corY = touch.getLocationY();
                cc.log("row="+this.row+"column"+this.column);
                //cc.log("COrx:" +corX+ " CorY:" +corY);
                //cc.log("X:"+level.length+"Y:"+level[0].length);
                 //immer gerade 
                //cc.log("Aktuelles Feld:" + level[row][column]);
                if (this.spriteSheet.getNumberOfRunningActions()===0){
                if(corX >= this.winsize.width/2 && corY >= this.winsize.height/2){ //up-right
                    if(this.level[this.row][this.column+1]==2 || this.level[this.row][this.column+1]==4){
                        //spriteBatchNode.x -= sizeOfSprite;
                        //spriteBatchNode.y -= sizeOfSprite;
                        this.spriteSheet.runAction(this.rightUp);
                        this.changeRails(this.row,this.column+1);
                        this.checkForQuad(this.row,this.column+1,1);
                        this.row -= 1;
                        this.column +=1;
                        this.infos();
						cc.log("succes");
                        return true;
                    }
                    return false;
                }
                else if(corX < this.winsize.width/2 && corY >= this.winsize.height/2){ //up-left
                    if(this.level[this.row][this.column]==1 || this.level[this.row][this.column]==3 ){
                        this.spriteSheet.runAction(this.leftUp);
                        this.changeRails(this.row,this.column);
                        this.checkForQuad(this.row,this.column,4);
                        this.row -=1;
                        this.column -=1;
                        this.infos();
                        return true;
                    }
                    return false;
                }
                else if(corX < this.winsize.width/2 && corY < this.winsize.height/2){ //down-left
                    if(this.level[this.row+1][this.column]==2 || this.level[this.row+1][this.column]==4 ){
                        this.spriteSheet.runAction(this.leftDown);
                        this.changeRails(this.row+1,this.column);
                        this.checkForQuad(this.row+1,this.column,3);
                        this.row +=1;
                        this.column -=1;
                        this.infos();
                        return true;
                    }
                    return false;
                }
                else if(corX >= this.winsize.width/2 && corY < this.winsize.height/2){ //down-right
                    if(this.level[this.row+1][this.column+1]==1 || this.level[this.row+1][this.column+1]==3){
                        this.spriteSheet.runAction(this.rightDown);
                        this.changeRails(this.row+1,this.column+1);
                        this.checkForQuad(this.row+1,this.column+1,2);
                        this.row +=1;
                        this.column +=1;
                        this.infos();
                        return true;
                    }
                    return false;
                }
                   
                }
                
                else return false;
				
             },
	onKeyPressed:  function(keyCode, event){
            var label = event.getCurrentTarget();
            var key = keyCode.toString();
			cc.log("row="+this.row+"column"+this.column);
            //var standart = 8;
            //var factor = 0;
            //label.setString("Key " + (cc.sys.isNative ? that.getNativeKeyName(keyCode) : String.fromCharCode(keyCode) ) + "(" + keyCode.toString()  + ") was pressed!");
            if(key==107 || key==190){//+ also Zoom
                this.railsPerRow -= 2;
                this.spriteSheet.removeAllChildren();
                this.touchNode.clear();
                this.setUp();
                return true;
            }
            else if(key==109 || key==189){//-= dezoom
                this.railsPerRow += 2;
                cc.log(factor);
                this.spriteSheet.removeAllChildren();
                this.touchNode.clear();
                this.setUp();
                return true;
            }
            else if(key==38){
                this.spriteSheet.y -=50;
                return true;
            }
            else if(key==37){
                this.spriteSheet.x +=50;
                return true;
            }
            else if(key==40){
                this.spriteSheet.y +=50;
                return true;
            }
            else if(key==39){
                this.spriteSheet.x -=50;
                return true;
            }
            else if (this.spriteSheet.getNumberOfRunningActions()===0){
                if(key==105 || key==74){ //up-right
                    if(this.level[this.row][this.column+1]==2 || this.level[this.row][this.column+1]==4){
                        this.spriteSheet.runAction(this.rightUp);
                        this.changeRails(this.row,this.column+1);
                        this.checkForQuad(this.row,this.column+1,1);
                        this.row -= 1;
                        this.column +=1;
                        infos();
                        return true;
                    }
                    return false;
                }
                else if(key==103 || key==70){ //up-left
                    if(this.level[this.row][this.column]==1 || this.level[this.row][this.column]==3){
                        this.spriteSheet.runAction(this.leftUp);
                        this.changeRails(this.row,this.column);
                        this.checkForQuad(this.row,this.column,4);
                        this.row -=1;
                        this.column -=1;
                        this.infos();
                        return true;
                    }
                    return false;
                }
                else if(key==97 || key==86){ //down-left
                    if(this.level[this.row+1][this.column]==2 || this.level[this.row+1][this.column]==4){
                        this.spriteSheet.runAction(this.leftDown);
                        this.changeRails(this.row+1,this.column);
                        this.checkForQuad(this.row+1,this.column,3);
                        this.row +=1;
                        this.column -=1;
                        this.infos();
                        return true;
                    }
                    return false;
                }
                else if(key==99 || key==78){ //down-right
                    if(this.level[this.row+1][this.column+1]==1 || this.level[this.row+1][this.column+1]==3){
                        this.spriteSheet.runAction(this.rightDown);
                        this.changeRails(this.row+1,this.column+1);
                        this.checkForQuad(this.row+1,this.column+1,2);
                        this.row +=1;
                        this.column +=1;
                        this.infos();
                        return true;
                    }
                    return false;
                }
            }
            else return false;
        },      
	generateLvl:function(){
        cc.log("seed = "+this.seed);
		var x = this.columns;
		var y = this.rows;
		//this.level=level;
        //====================================================================
        //Random Numbers with Seed
        Math.seed = function(s) {
            return function() {
                s = Math.sin(s) * 10000; return s - Math.floor(s);
            };
        };

        // Seed:
        var random1 = Math.seed(this.seed);
        var random2 = Math.seed(random1());
        Math.random = Math.seed(random2());
        //====================================================================
        //====================================================================

        //var levelFinal = generateLevelArray(y,x);
        //cc.log(level);
        //cc.log("Startrail= "+level[startingPosY][startingPosY]);
        //function generateLevelArray(rows, columns){
            var startingPosX = Math.floor((Math.random()*(this.columns-2)+1));
            //var startingPosX = 13;
            cc.log("Startpunkt x: "+startingPosX);
            var startingPosY = Math.floor((Math.random())*((this.rows/5)));
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
            levelArray[startingPosY][startingPosX] = Math.floor((Math.random())*2+1);
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
                    var d = Math.floor((Math.random())*2+1);
                    if (d==1){ //Up
                        upLeft();
                    }
                    else {
                        downRight();
                    }
                }
                else {
                    var d = Math.floor((Math.random())*2+1);
                    if(d==1){//UP
                        upRight();
                    }
                    else {
                        downLeft();
                    }
                }
                return levelSolutionLane();
            };
            function levelSolutionLane(){
                //var d = Math.floor((Math.random())*4+1); 
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
            //2:2 für down
            function upLeft(){
                var d = Math.floor((Math.random())*4+1);
                if (d==1 || d==4){ //3=DL
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
                else if (d==2){//4=UL
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
            //2:1 für Down
            function downRight(possiblityNumber){
                
                if (possiblityNumber<3){ //am linken Rand = 5:1 für rechts, 2:1 für down
					var d = Math.floor((Math.random())*(6-possiblityNumber)+1); //von 1-6
				}
				else if (possiblityNumber>7) {//am rechten Rand = 5:2 für links, 6:1 für down, random von 7-13
					var d = Math.floor((Math.random())*(possiblityNumber-2)+7);
				}
				else{
					var d = Math.floor((Math.random())*3+1);
				}
                //var d = Math.floor((Math.random())*3+1);
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
            //2:1 für down
            function upRight(){
                var d = Math.floor((Math.random())*4+1);
                if (d==1){ //4= UL
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
                else if (d==2){//1=UR
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
					var d = Math.floor((Math.random())*(7-possiblityNumber)+1); // 1-7
				}
				else if (possiblityNumber>7) {//am rechten Rand = 5:1 für links und 2:1 für down //possibiltyNumber geht nur bis 9 da nur bis posX-1 max row und random function nie 1? dadurch nur d==13 unmöglich
					var d = Math.floor((Math.random())*(possiblityNumber-3)+7);
				}
				else{
					var d = Math.floor((Math.random())*3+1);
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
            cc.log("X-Position= "+posX+" und Y-Position= "+posY);
            levelArray.push( [] );
            levelArray[y][0]=posX;
            levelArray[y][1]=posY;
			this.level = levelArray;
			cc.log("Level Generated");
			return this.initAnimations();

            
        //};
            
	}
	
});
