import GSceneCtl from "./G/GSceneCtl"
import PlayerCtl from "./PlayerCtl";
import MapListCtl from "./mapCtl/MapListCtl"

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends cc.Component {

    @property(cc.Node)
    loading: cc.Node = null;

    @property(PlayerCtl)
    PlayerCtl: PlayerCtl = null;
    @property(MapListCtl)
    MapListCtl: MapListCtl = null;

    onLoad() {
        GSceneCtl.addPersistRootNode(this.loading);
        this.node.on(cc.Node.EventType.TOUCH_START, this.movePlayer, this);
    }

    start () {
        this.PlayerCtl.init(this);
        this.MapListCtl.init(this);
    }



    initPlayerNavMap(navMap: any) {
        this.PlayerCtl.initNavMap(navMap);
    }

    /**
     * 
     */
    movePlayer(e: cc.Event.EventTouch) {
        let pos = e.getLocation();
        this.PlayerCtl.navToMap(pos);
    }

    
}
