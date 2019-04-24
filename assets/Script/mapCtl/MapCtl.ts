import MapListCtl from "./MapListCtl";
import GEventManager from "../G/GEventManager";
import { GEventBody, TurnType } from "../G/GEventType";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    mapListCtl: MapListCtl = null;

    tileMap: cc.TiledMap = null;

    // onLoad () {}

    start () {

    }

    init(mapListCtl: MapListCtl) {
        this.mapListCtl = mapListCtl;
        this.initMap();
    }

    initMap() {
        // 初始化玩家位置
        this.tileMap = this.getComponent(cc.TiledMap);
        let playerObj = this.tileMap.getObjectGroup("object").getObject("player");
        let pos = this.getTilePosByPos(playerObj.offset);
        let realPos = this.tileMap.getLayer("bg").getPositionAt(pos);
        GEventBody.InitPlayerPosition.setBody(TurnType.DOWN, realPos, 1);
        GEventManager.emit(
            GEventBody.InitPlayerPosition.name, 
            GEventBody.InitPlayerPosition.body,
        );
    }

    getTilePosByPos(pos: cc.Vec2) {
        let tileSize = this.tileMap.getTileSize();

        let x = Math.floor(pos.x / tileSize.width)
        let y = Math.floor(pos.y / tileSize.height);

        return cc.v2(x, y);
    }
    

    // update (dt) {}
}
