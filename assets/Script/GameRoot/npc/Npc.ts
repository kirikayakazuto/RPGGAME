import GameRootCtl from "../GameRootCtl"
const {ccclass, property} = cc._decorator;

@ccclass
export default class Npc extends cc.Component {

    NpcName: string             = "";
    MoveState: NpcState         = -1;
    

    /**
     * --------------- 初始化 -------------
     */
    init() {

    }

    setPosition(pos: cc.Vec2) {
        this.node.setPosition(pos);
    }

    

    start () {

    }

    // update (dt) {}
}

enum NpcState {
    Stop = 1,
    Move = 2,
}