import MapCtl from "./MapCtl";
import GSceneCtl from "../G/GSceneCtl";
import MainScene from "../MainScene"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    instance: cc.Node = null;

    MainScene: MainScene = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.loadMapPrefab("demo1");
    }

    init(MainScene: MainScene) {
        this.MainScene = MainScene;
    }

    /**
     * 加载地图
     */
    loadMapPrefab(prefabName: string) {
        GSceneCtl.loadSceneWithProgress(prefabName, (err, prefab: cc.Prefab) => {
            if(err) {
                return ;
            }
            this.instance = cc.instantiate(prefab);
            this.instance.parent = this.node;
            this.instance.getComponent(MapCtl).init(this);
            this.MainScene.initPlayerNavMap(this.instance.getComponent("NavMap"));
            
        })
    }

    // update (dt) {}
}
