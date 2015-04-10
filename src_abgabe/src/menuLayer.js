var menuLayer = cc.Layer.extend({
    winsize: null,
    ctor: function() {
        this._super();
    },
    init: function() {
        this._super();
        var ls = cc.sys.localStorage;
        if (ls.getItem(203) < 1) ls.setItem(203, 1);
        if (ls.getItem(203) == 1) {
            ls.setItem(200, 1); //Helplines
            ls.setItem(201, 1); //Blinkhelp
            ls.setItem(206, 1); //Tutorial activated default
            ls.setItem(203, 2);
        }
        if (ls.getItem(207) < 1) ls.setItem(207, 6); //positionMarker 6=default
        if (ls.getItem(208) < 1) ls.setItem(208, 2); //Halfsize or Fullsize=default
        if (ls.getItem(209) < 1) ls.setItem(209, 1); //Gamemode 2 tutorial
        if (ls.getItem(211) < 1) ls.setItem(211, 1); //Background Sound true=default
        this.winsize = cc.director.getWinSize();
        if (this.winsize.width / this.winsize.height > 1.6) {
            ls.setItem(212, 1); //16:9
        } else if (this.winsize.width / this.winsize.height > 1.4) {
            ls.setItem(212, 2); //iphone 4
        } else ls.setItem(212, 3);
        var centerpos = cc.p(this.winsize.width / 2, this.winsize.height / 2);
        var background = new cc.LayerColor(cc.color(255, 255, 255, 255), this.winsize.width, this.winsize.height);
        this.addChild(background);
        this.startLabel = new cc.LabelTTF("Play", "Quicksand-Light", this.winsize.height / 4);
        this.startLabel.setColor(cc.color(0, 0, 0));
        this.startLabelP = new cc.LabelTTF("Play", "Quicksand-Light", this.winsize.height / 4);
        this.startLabelP.setColor(cc.color(0, 0, 150));
        this.settingsLabel = new cc.LabelTTF("Settings", "Quicksand-Light", this.winsize.height / 10);
        this.settingsLabel.setColor(cc.color(0, 0, 0)); //black color
        this.settingsLabelP = new cc.LabelTTF("Settings", "Quicksand-Light", this.winsize.height / 10);
        this.settingsLabelP.setColor(cc.color(0, 0, 150)); //blue color
        this.messageLabel = new cc.LabelTTF(startUpMessages[Math.floor(Math.random() * (startUpMessages.length))], "Quicksand-Light", this.winsize.height / 12);
        this.messageLabel.setColor(cc.color(150, 0, 0));
        if (ls.getItem(212) == 2) this.messageLabel.fontSize = this.winsize.height / 14;
        if (ls.getItem(212) == 3) this.messageLabel.fontSize = this.winsize.height / 16;
        this.messageLabel.setPosition(cc.p(this.winsize.width / 2, this.winsize.height / 6 * 5));
        this.messageLabel.setRotation(posNumbers[Math.floor(Math.random() * 2 + 2)] * Math.floor(Math.random() * 45));
        this.messageLabel.setAnchorPoint(0, 0);
        this.addChild(this.messageLabel, 5);
        var corX = this.winsize.width / 4 * (posNumbers[Math.floor(Math.random() * 2)]);
        var corY = this.winsize.height / 4 * (Math.random() * 2 + 1);
        this.actionMessage = new cc.JumpTo(2, cc.p(corX, corY), 150, 4);
        this.actionMessage.retain();
        this.messageLabel.runAction(this.actionMessage);
        var menuItemLabel = new cc.MenuItemSprite(this.startLabel, this.startLabelP, this.onPlay, this);
        var menu = new cc.Menu(menuItemLabel);
        menu.setPosition(centerpos);
        this.addChild(menu);
        var settingsItemLabel = new cc.MenuItemSprite(this.settingsLabel, this.settingsLabelP, this.onSettings, this);
        var settingsMenu = new cc.Menu(settingsItemLabel);
        settingsMenu.setPosition(cc.p(this.winsize.width / 2, this.winsize.height / 6));
        this.addChild(settingsMenu);
        if (cc.audioEngine.isMusicPlaying() == false) {
            cc.audioEngine.playMusic(res.sound, true);
            if (ls.getItem(211) == 2) cc.audioEngine.stopMusic();
        }
    },
    onPlay: function() {
        cc.director.runScene(new levelSelectorScene());
    },
    onSettings: function() {
        cc.director.runScene(new settingsScene());
    },
    onExit: function() {
        this.actionMessage.release();
        this._super();
    }
});
var menuScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new menuLayer();
        layer.init();
        this.addChild(layer);
    }
});