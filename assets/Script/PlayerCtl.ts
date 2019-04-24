import GEventManager from "./G/GEventManager";
import { GEventType } from "./G/GEventType";
import NavAgent from "./common/NavAgent"
import NavMap from "./common/NavMap";
import MainScene from "./MainScene"

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerCtl extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    NavAgent: NavAgent = null;
    MainScene: MainScene = null;

    // onLoad () {}

    start () {
        GEventManager.on(GEventType.InitPlayerPosition, this.initPosition, this)
    }

    init(MainScene: MainScene) {
        this.MainScene = MainScene;
        this.NavAgent = this.getComponent(NavAgent);
    }

    initPosition(data: any) {
        this.node.setPosition(data.position);
    }


    /**
     * ------------------------ 调用 NavAgent 中的方法 ------------
     */
    initNavMap(NavMap: NavMap) {
        this.NavAgent.initNavMap(NavMap);
    }

    navToMap(pos: cc.Vec2) {
        if(!this.NavAgent) {
            return ;
        }
        this.NavAgent.navToMap(pos);
    }

    

    // update (dt) {}
}
