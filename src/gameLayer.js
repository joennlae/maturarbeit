var gameLayer = cc.Layer.extend({
    spriteSheet:null,
    ctor:function () {
        this._super();

    
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
        
        this.init();
    },
    init:function() {
        this._super();

        var winsize = cc.director.getWinSize();
        //====================================================================
        //var mng = new cc.ActionManager();

        /*cc.loader.loadJson(res.levels_json,function(err,data){
        //cc.log(data);// data is the json object
            if (err) {
                return cc.log("load failed");
            } else {
                    // data is the json object
                var level_json=data["level_one"];
                //cc.log(level_json);
                return setLevel(level_json);
            }
        });
        
        
        function setLevel(level_info){
            cc.log(level_info);
            level = level_info;
            //return setUp();
        }*/
        
        //Local Storage not a good idea because 2dArray's also must be JSON.parse which is better with local files because i'd need a plugin in javascript or i would have to write one which i think is not compatible with JSB
        //var localStorage = cc.sys.localStorage;
        /*localStorage.prototype.setObject = function(key, value) {
            this.setItem(key, JSON.stringify(value));
            };

        localStorage.prototype.getObject = function(key) {
            return JSON.parse(this.getItem(key));
            };
        localStorage.setObject('test',level_big);*/
        //level = level_big;
        var seed = 100;
        cc.log("seed = "+seed);
        //====================================================================
        //Random Numbers with Seed
        Math.seed = function(s) {
            return function() {
                s = Math.sin(s) * 10000; return s - Math.floor(s);
            };
        };

        // Seed:
        var random1 = Math.seed(seed);
        var random2 = Math.seed(random1());
        Math.random = Math.seed(random2());
        //====================================================================
        //====================================================================
        var x = 200;
        var y = 250;
        var level = generateLevelArray(y,x);
        cc.log(level);
        //cc.log("Startrail= "+level[startingPosY][startingPosY]);
        function generateLevelArray(rows, columns){
            var startingPosX = Math.floor((Math.random()*(x-2)+1));
            //var startingPosX = 13;
            cc.log("Startpunkt x: "+startingPosX);
            var startingPosY = Math.floor((Math.random())*((y/5)));
            //var startingPosY = 89;
            cc.log("Startpunkt y: "+startingPosY);
            
            var levelArray = generateEmptyArray(rows,columns);
            
            function generateEmptyArray(rows,columns){
                var emptyArray = new Array ();
                for(i=0; i<rows; i++){ 
                    emptyArray.push( [] );
                    for(j=0; j<columns; j++){
                        //if (j==0 || j==columns-1 || i==0 || i==rows-1){ //rand 0 wegen ArrayOutOfBounds exception
                            emptyArray[i].push(0);
                        //}
                        //else{
                            //levelGenerated[i].push(Math.floor((Math.random() * 3)));
                            //levelGenerated[i].push(0);
                        //}
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
            return levelArray;
            
        };
        //var level = levelArray;
        

       
        //var n = 12; //railsPerRow
        //var scaleFactor = winsize.width/n/180;      //180 size of sprite ursprünglich :-P
        //var sizeOfSprite = winsize.width/n;
        //====================================================================
        //SpriteSheet and Stuff
        cc.spriteFrameCache.addSpriteFrames(res.rails_plist);
        var texture = cc.textureCache.addImage("res/rails.png");
        this.spriteSheet = /*new cc.SpriteBatchNode(texture, 50);*/new cc.Node; //runs faster on iOS heard of depriceated since JSB V3.0 not sure about this
        spriteSheet = this.spriteSheet; 
        this.spriteSheet.y = 0;
        this.spriteSheet.retain();
        this.addChild(this.spriteSheet,0);
        //====================================================================
        //TouchNode and Stuff further implementation in setUp()
        touchNode = new cc.DrawNode();
        touchNode.retain();
        //cc.spriteFrameCache.addSpriteFrames(res.rails_plist);
        //touchNode.drawRect(cc.p(0,0),cc.p(winsize.width,winsize.height),null,null,null);
        //touchNode.drawRect(cc.p(winsize.width/2-5,25+2*sizeOfSprite),cc.p(winsize.width/2+5,35+2*sizeOfSprite),cc.color(150,150,150,150),null,null);
        //touchNode.d
        sprite = new cc.Sprite(res.quad_1);
        spriteSheet.addChild(sprite);
        this.addChild(touchNode, 10);
        //====================================================================
        //====================================================================
        //Zoom Buttons
        /*var zoomInLabel = new cc.LabelTTF("Zoom In", "Arial", 50);
        zoomInLabel.setPosition(cc.p(winsize.width/4*3,20));
        zoomInLabel.setColor(cc.color(0,0,0));
		touchNode.addChild(zoomInLabel, 5);
        
        var zoomOutLabel = new cc.LabelTTF("Zoom Out", "Arial", 50);
        zoomOutLabel.setPosition(cc.p(winsize.width/4,20));
        zoomOutLabel.setColor(cc.color(0,0,0));
		touchNode.addChild(zoomOutLabel, 5);*/
        //====================================================================
        railsPerRow = 8;
        
        setUp(railsPerRow);
        function setUp(railsPerRow){
        var n = railsPerRow; //railsPerRow
        scaleFactor = winsize.width/n/500;      //500 size of sprite ursprünglich :-P
        sizeOfSprite = winsize.width/n;
        touchNode.drawRect(cc.p(winsize.width/2-5,2*sizeOfSprite-5),cc.p(winsize.width/2+5,2*sizeOfSprite+5),cc.color(255,0,0,255),null,null);
        for (i = level.length-2; i > 0; i--) {        //level.length = level[y][] i=row , -2 weill neu auch startpositionen an letzer y stelle gespeichert
            for (j = 0; j < level[0].length; j++) { //level[0].length = level[][x] j=column
                if (level[i][j]!==0) {
                //var sprite = new cc.Sprite('#rail_'+((level[i][j]%2+1)%2+1)+'.png');/*first try :eval("res.rail_"+level[i][j]) rails-png nur zwei aber bis 6 nummeriert also modulo --> verkehrt den hatl modulo modulo --> epic ((level[i][j]%2+1)%2+1)= alli richtig*/
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame("rail_"+level[i][j]+".png");
                var sprite = new cc.Sprite(spriteFrame);
                    sprite.attr({x: (j*sizeOfSprite), y:((level.length-i-1)*sizeOfSprite), scale: scaleFactor});
                spriteSheet.addChild(sprite,0,1000*i+j); // only Javascript with name with string, now we have tags with Integer also supports iOS !!Attention to only 1000 height!!
                
                }
            }
        }
        this.spriteSheet.x = -((level[y][0])-(n/2-0.5))*sizeOfSprite;//-2 wägä arrayOutOfBound am rand ä rahmä vo 1 und denn -0.5 wäg mitti, old version wenn genau mitti level[0].length-2)/2
        //return controlling(sizeOfSprite);
		spriteSheet.y += sizeOfSprite/2; //AnchorPoint (0,5,0,5) 
        }
        //====================================================================
        //this.addChild(spriteBatchNode);

        /*var testsLabel = new cc.LabelTTF(eval("res.rail_"+level[1][1]), "Arial", 50);
		testsLabel.x = winsize.width / 2;
		testsLabel.y = 100;
        testsLabel.setColor(cc.color(0,0,0));
		this.addChild(testsLabel, 5);*/
        
        /*                        
        if( 'touches' in cc.sys.capabilities )
            cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesEnded:function (touches, event) {
        if (touches.length <= 0)
            return;
            event.getCurrentTarget().control(touches[0].getLocation());
            }
            }), this);
        else if ('mouse' in cc.sys.capabilities )
            cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseUp: function (event) {
            event.getCurrentTarget().control(event.getLocation());
            }
        }, this);*/
        //====================================================================
        //Controlling
        //function controlling(sizeOfSprite){
        var row = level[y][1]; //muss Global sein , old level.length-2
        var column = getStartColumn();//old level[0].length/2-1
        
        function getStartColumn(){
            if (level[level[y][1]][level[y][0]]==1) return level[y][0]
            else {
            spriteSheet.x += sizeOfSprite;
            return level[y][0]-1
            }
        };
        
        var rightUp = cc.moveBy(0.1, cc.p(-sizeOfSprite, -sizeOfSprite)); //fucking shiiit of retain :-P costed me about 8hours
        rightUp.retain();
        var leftUp = cc.moveBy(0.1, cc.p(+sizeOfSprite, -sizeOfSprite));
        leftUp.retain();
        var rightDown = cc.moveBy(0.1, cc.p(-sizeOfSprite, +sizeOfSprite));
        rightDown.retain();
        var leftDown = cc.moveBy(0.1, cc.p(+sizeOfSprite, +sizeOfSprite));
        leftDown.retain();
        
        //cc.log(spriteSheet);
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
            cc.log("y="+row+" x="+column);
        };
            /*onTouchEnded: function (touch, event) {
            var corX = touch.getLocationX();
                //cc.log("sprite onTouchesEnded.. ");
                cc.log("COrx:" +corX);
                }
            });*/
        cc.eventManager.addListener(listener1, touchNode); //Inside Function because of Action Length
        
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
                //spriteSheet.scale = factor;
                return true;
            }
            else if(key==109 || key==189){//-= dezoom
                factor += 2;
                cc.log(factor);
                spriteSheet.removeAllChildren();
                touchNode.clear();
                setUp(standart + factor);
                //spriteSheet.scale = factor;
                //spriteSheet.x += x/2*factor;
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
                else if(key==103 || key==70){ //up-left
                    if(level[row][column]==1 || level[row][column]==3){
                        spriteSheet.runAction(leftUp);
                        //cc.log(spriteSheet.getChildByName(""+row+column+""));
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
        
           
        function changeRails(railPosY,railPosX){
            var spriteDel = spriteSheet.getChildByTag(1000*railPosY+railPosX); //var spriteDel = spriteSheet.getChildByName(""+railPosY+railPosX+""); tag numbers for iOS
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
			//sizeOfSprite = winsize.width/railsPerRow;
            //check for Quad, only two possibilities
            //cc.log(sizeOfSprite);
            cc.log("checking");
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
                        else if (level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==12 && level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==12){
                            spriteSheet.removeChildByTag(1*10000+(pY-0.5)*1000+pX-0.5);
                            spriteSheet.removeChildByTag(1*10000+(pY+0.5)*1000+pX+0.5);
                            break;
                        }
                        else if (level[pY-1][pX]+level[pY-1][pX-1]+level[pY][pX-1]+level[pY][pX]==12){
                            spriteSheet.removeChildByTag(1*10000+(pY-0.5)*1000+pX-0.5);
                            break;
                        }
                        else if (level[pY][pX+1]+level[pY+1][pX+1]+level[pY+1][pX]+level[pY][pX]==12){
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
                        else if (level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==12 && level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==12){
                            spriteSheet.removeChildByTag(1*10000+(pY-0.5)*1000+pX+0.5);
                            spriteSheet.removeChildByTag(1*10000+(pY+0.5)*1000+pX-0.5);
                            break;
                        }
                        else if (level[pY][pX+1]+level[pY-1][pX+1]+level[pY-1][pX]+level[pY][pX]==12){
                            spriteSheet.removeChildByTag(1*10000+(pY-0.5)*1000+pX+0.5);
                            break;
                        }
                        else if (level[pY+1][pX]+level[pY+1][pX-1]+level[pY][pX-1]+level[pY][pX]==12){
                            spriteSheet.removeChildByTag(1*10000+(pY+0.5)*1000+pX-0.5);
                            break;
                        }
                        else break;

                    
                        
                        
            }
		};


                       
                                
                                
        /*var spriteRunner = new cc.Sprite(res.rail_2);
        spriteRunner.attr({x: 80, y: 85});
        this.addChild(spriteRunner);
        //create the hero sprite
        /*var spriteRunner = new cc.Sprite(res.runner_png);
        spriteRunner.attr({x: 80, y: 85});

        //create the move action
        var actionTo = new cc.MoveTo(2, cc.p(300, 85));
        spriteRunner.runAction(new cc.Sequence(actionTo));
        this.addChild(spriteRunner);*/
        
    
    }
   /* control:function(pos){
		
                                
    }*/
});
