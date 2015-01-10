var Coin = cc.Class.extend({
    seed:null,
    sizeX:null,
    sizeY:null,

    ownRandom:function (seed) {
		this.seed = seed;
        Math.seed = function(s) {
            return function() {
                s = Math.sin(s) * 10000; return s - Math.floor(s);
            };
        };

        // Seed:
        var random1 = Math.seed(this.seed);
        var random2 = Math.seed(random1());
        Math.random = Math.seed(random2());
		return Math.random;
    },

    getShape:function () {
        return this.shape;
    }
});
