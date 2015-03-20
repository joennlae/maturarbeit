var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var ls = cc.sys.localStorage;
        if (ls.getItem(666)==1){
        this.addChild(new backgroundLayer());
        this.addChild(new gameLayer(),0,2);
        this.addChild(new statusLayer(),0,3);
        }
        else if (ls.getItem(666)==2){
        this.addChild(new backgroundLayer());
        this.addChild(new gameLayerModeTwo(),0,2);
        this.addChild(new statusLayer(),0,3);
        }

        
    }

});
