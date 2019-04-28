import GameRootCtl from "./GameRootCtl";
import GEventManager from "../G/GEventManager";
import { GEventBody, TurnType } from "../G/GEventType";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    GameRootCtl: GameRootCtl    = null;
    tileMap: cc.TiledMap        = null;

    // onLoad () {}

    start () {

    }

    init(GameRootCtl: GameRootCtl) {
        this.GameRootCtl = GameRootCtl;
        this.initMap();
    }

    initMap() {
        // 初始化玩家位置
        this.tileMap    = this.getComponent(cc.TiledMap);

        let playerObj   = this.tileMap.getObjectGroup("object").getObject("player");
        let pos         = this._getTilePosByPos(playerObj.offset);
        let realPos     = this.tileMap.getLayer("bg").getPositionAt(pos);

        let cha         = this.tileMap.getMapSize().height - 1;             // tileMap 地图编号是从右上角开始, 而cocos中 从左下角开始 所以要水平翻转
        let realTile     = cc.v2(pos.x, cha - pos.y);

        GEventBody.InitPlayerPosition.setBody(TurnType.DOWN, realPos, 1, realTile);
        GEventManager.emit(
            GEventBody.InitPlayerPosition.name, 
            GEventBody.InitPlayerPosition.body,
        );
    }


    /**
     * 碰撞检测
     */
    collisionDetection(playerPos: cc.Vec2) {
        this.tileMap.getLayer("tools").getTileGIDAt(playerPos);
    }


    _getTilePosByPos(pos: cc.Vec2) {
        let tileSize = this.tileMap.getTileSize();

        let x = Math.floor(pos.x / tileSize.width)
        let y = Math.floor(pos.y / tileSize.height);

        return cc.v2(x, y);
    }
    

    // update (dt) {}
}
