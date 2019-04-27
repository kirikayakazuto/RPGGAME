import GSceneCtl from "./G/GSceneCtl"
import GameRootCtl from "./GameRoot/GameRootCtl"

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends cc.Component {

    @property(cc.Node)
    loading: cc.Node = null;
    @property(GameRootCtl)
    GameRootCtl: GameRootCtl = null;

    onLoad() {
        GSceneCtl.addPersistRootNode(this.loading);
    }

    start () {
        this.GameRootCtl.init(this);
    }

    

    
}
