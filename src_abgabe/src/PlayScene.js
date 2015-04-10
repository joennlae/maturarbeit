var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var ls = cc.sys.localStorage;
        this.addChild(new backgroundLayer());
        this.addChild(new gameLayer(),0,2);
        this.addChild(new statusLayer(),0,3);
    }
});