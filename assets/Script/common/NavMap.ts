import astar from "./AStart";
import GObstacleMap from "../G/GObstacleMap";
import GameRootCtl from "../GameRoot/GameRootCtl"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NavMap extends cc.Component {

    @property(Boolean)
    IsDebug = true;

    GameRootCtl: GameRootCtl    = null;

    map: GObstacleMap = null;

    init(GameRootCtl: GameRootCtl) {
        this.GameRootCtl = GameRootCtl;
        this.map = require("game_map_"+ this.node.name);
    }

    start () {
        
    }

    astartSearch(srcW: cc.Vec2, dstW: cc.Vec2) {
        let src = this.node.convertToNodeSpaceAR(srcW);
        let dst = this.node.convertToNodeSpaceAR(dstW);

        let src_mx = Math.floor((Math.round(src.x)) / this.map.item_size);
        let src_my = Math.floor((Math.round(src.y)) / this.map.item_size);

        let dst_mx = Math.floor((Math.round(dst.x)) / this.map.item_size);
        let dst_my = Math.floor((Math.round(dst.y)) / this.map.item_size);
        
        let path = astar.astartSearch(this.map, src_mx, src_my, dst_mx, dst_my);
        
        let world_offset = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        let path_pos = [];
        // console.log(path_pos);

        for(let i = 0; i < path.length; i ++) {
            let x = path[i].x * this.map.item_size;
            let y = path[i].y * this.map.item_size;

            let pos = cc.v2(world_offset.x + x, world_offset.y + y);
            path_pos.push(pos);
        }

        return path_pos;
    }
    
    getMap() {
        return this.map;
    }

    // update (dt) {}
}
