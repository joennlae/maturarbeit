var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        //add three layer in the right order
        //loadLevel();
        //cc.log(cc.Loader.getInstance().getPercentage() + "%");
        //function loadLevel(){
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
            cc.log(cc.Loader.getInstance().getPercentage() + "%");
            level = level_info;
           
        };
        };*/

        this.addChild(new backgroundLayer());
        this.addChild(new gameLayer());
        this.addChild(new statusLayer());
        
    }

});
