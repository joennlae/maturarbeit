function loadLevel(){
        cc.loader.loadJson(res.levels_json,function(err,data){
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
            return loadGame();
        };
}