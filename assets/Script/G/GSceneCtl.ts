import Loading from "../common/Loading"
class GSceneCtl {
    public static readonly instance: GSceneCtl = new GSceneCtl();
    private rootNode: cc.Node = null;

    public addPersistRootNode(node: cc.Node) {
        if(cc.game.isPersistRootNode(node)) {
            return ;
        }
        cc.game.addPersistRootNode(node);
        this.rootNode = node;
    }
    public removePersistRootNode(node: cc.Node) {
        if(cc.game.isPersistRootNode(node)) {
            cc.game.removePersistRootNode(node);
        }
    }

    public loadSceneNormal(preName: string, cb?: (err, pre) => any) {
        cc.loader.loadRes("prefab/" + preName, cc.Prefab, cb);
    }
    public loadSceneWithProgress(preName: string, cb: (err, pre) => any) {
        this.doLoadSceneWithProgress(preName, cb);
    }


    private setLoadingDisplay() {
        this.rootNode.getComponent(Loading).showLoading();
        cc.loader["onProgress"] = (completedCount, totalCount, item) => {
            let percent = completedCount / totalCount;
            this.rootNode.getComponent(Loading).changeProgress(percent);
        };
    }

    private doLoadSceneWithProgress(preName: string, cb?: (err, pre) => any) {
        
        this.setLoadingDisplay();
        cc.loader.loadRes("prefab/" + preName, cc.Prefab, cb);
    }

    public setResolutionPolicy() {
        let f = function () {
            cc.log('手机场景适配');
            cc.view.setDesignResolutionSize(640, 1280, cc.ResolutionPolicy.FIXED_WIDTH);
            cc.Canvas.instance['alignWithScreen']();
            /* if (cc.sys.isMobile) {
                cc.log('手机场景适配');
                cc.view.setDesignResolutionSize(640, 1280, cc.ResolutionPolicy.FIXED_WIDTH);
                cc.Canvas.instance['alignWithScreen']();
            } else {
                cc.log('电脑场景适配');
                cc.view.setDesignResolutionSize(640, 1280, cc.ResolutionPolicy.SHOW_ALL);
                cc.Canvas.instance['alignWithScreen']();
            } */
        }
        f();
        cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LOADING, f);
    }
}

export default GSceneCtl.instance;