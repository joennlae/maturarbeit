cc.game.onStart = function() {
    cc.view.adjustViewPort(true);
    var isLandscape = true;
    if (cc.sys.isNative) {
        var searchPaths = jsb.fileUtils.getSearchPaths();
        if (cc.view.getFrameSize().width >= 1536 && cc.view.getFrameSize().height >= 1536) {
            if (true == isLandscape) {
                cc.view.setDesignResolutionSize(2048, 1536, cc.ResolutionPolicy.SHOW_ALL);
            } else {
                cc.view.setDesignResolutionSize(1536, 2048, cc.ResolutionPolicy.SHOW_ALL);
            }
            searchPaths.push("res");
            searchPaths.push("src");
        } else if (cc.view.getFrameSize().width == 1024 && cc.view.getFrameSize().height == 768) {
            if (true == isLandscape) {
                cc.view.setDesignResolutionSize(1024, 768, cc.ResolutionPolicy.SHOW_ALL);
            } else {
                cc.view.setDesignResolutionSize(768, 1024, cc.ResolutionPolicy.SHOW_ALL);
            }
            searchPaths.push("res");
            searchPaths.push("src");
        } else if (cc.view.getFrameSize().width >= 640 && cc.view.getFrameSize().height >= 640) //iphone hd or above and android high res screens
        {
            var size;
            if (cc.view.getFrameSize().width >= 1136 || cc.view.getFrameSize.height >= 1136) {
                size = 1136;
            } else {
                size = 960;
            }
            if (true == isLandscape) {
                cc.view.setDesignResolutionSize(size, 640, cc.ResolutionPolicy.SHOW_ALL);
            } else {
                cc.view.setDesignResolutionSize(640, size, cc.ResolutionPolicy.SHOW_ALL);
            }
            searchPaths.push("res");
            searchPaths.push("src");
        } else {
            if (true == isLandscape) {
                cc.view.setDesignResolutionSize(480, 320, cc.ResolutionPolicy.SHOW_ALL);
            } else {
                cc.view.setDesignResolutionSize(320, 480, cc.ResolutionPolicy.SHOW_ALL);
            }
            searchPaths.push("res");
            searchPaths.push("src");
        }
        jsb.fileUtils.setSearchPaths(searchPaths);
    } else {
        if (true == isLandscape) {
            cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.SHOW_ALL);
        } else {
            cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.SHOW_ALL);
        }
        cc.view.resizeWithBrowserSize(true);
    }
    cc.LoaderScene.preload(g_resources, function() {
        cc.director.runScene(new menuScene());
    }, this);
};
cc.game.run();