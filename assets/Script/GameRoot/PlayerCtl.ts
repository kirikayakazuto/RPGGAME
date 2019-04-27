import GEventManager from "../G/GEventManager";
import { GEventType } from "../G/GEventType";
import NavAgent from "../common/NavAgent"
import NavMap from "../common/NavMap";
import GameRootCtl from "./GameRootCtl"
import TouchMoveCtl from "../common/TouchMoveCtl"

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerCtl extends cc.Component {

    @property(TouchMoveCtl)
    TouchMoveCtl: TouchMoveCtl = null;

    NavAgent: NavAgent = null;
    GameRootCtl: GameRootCtl = null;

    State: PlayerState = -1;

    // 玩家状态

    // onLoad () {}

    start () {
        GEventManager.on(GEventType.InitPlayerPosition, this.initPosition, this)
    }

    /**
     * ------------------------ 初始化 -----------------------
     */
    init(GameRootCtl: GameRootCtl) {
        this.GameRootCtl = GameRootCtl;
        this.NavAgent = this.getComponent(NavAgent);
    }
    initPosition(data: any) {
        this.node.setPosition(data.position);
    }

    /**
     * ----------------------- 设置属性 ------------------------
     */
    setState(State: number) {
        this.State = State;
    }


    /**
     * ------------------------ 调用 NavAgent 中的方法 ------------
     */
    initNavMap(NavMap: NavMap) {
        this.NavAgent.initNavMap(NavMap);
        this.setState(PlayerState.Ready);
    }

    moveByJoystick(dt: number) {
        if(this.TouchMoveCtl.dir.x == 0 && this.TouchMoveCtl.dir.y == 0) {
            return ;
        }
        // this.NavAgent.moveByJoystick(this.TouchMoveCtl.dir);

    }

    navToMap(pos: cc.Vec2) {
        if(this.State == -1) {
            cc.log("暂时不能移动");
            return ;
        }
        this.NavAgent.navToMap(pos);
    }
    update (dt) {
        this.moveByJoystick(dt);
    }
    
}

enum PlayerState {
    Ready = 1,
    Fight = 2,
}