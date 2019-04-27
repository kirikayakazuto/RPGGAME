import MapCtl from "./MapCtl";
import GSceneCtl from "../G/GSceneCtl";
import MainScene from "../MainScene"
import PlayerCtl from "./PlayerCtl"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(PlayerCtl)
    PlayerCtl: PlayerCtl = null;

    MapNode: cc.Node = null;
    MainScene: MainScene = null;

    start () {
        this.loadMapPrefab("demo1");
    }

    init(MainScene: MainScene) {
        this.MainScene = MainScene;
        this.PlayerCtl.init(this);
        this.addListenseEvent();
    }


    

    /**
     *  ------------- 控制玩家的方法 -----------------------
     */
    movePlayer(e: cc.Event.EventTouch) {
        let pos = e.getLocation();
        this.PlayerCtl.navToMap(pos);
    }



    /**
     * ---------------- 控制map的方法 --------------------
     */
    loadMapPrefab(prefabName: string) {
        GSceneCtl.loadSceneWithProgress(prefabName, (err, prefab: cc.Prefab) => {
            if(err) {
                return ;
            }
            this.MapNode = cc.instantiate(prefab);
            this.node.addChild(this.MapNode, -1);
            this.MapNode.getComponent(MapCtl).init(this);
            this.PlayerCtl.initNavMap(this.MapNode.getComponent("NavMap")); 
        });
    }



    /**
     * ----------- 事件监听 -----------------
     */
    addListenseEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.movePlayer, this);
    }
    removeListenseEvent() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.movePlayer, this);
    }


    // update (dt) {}
}
