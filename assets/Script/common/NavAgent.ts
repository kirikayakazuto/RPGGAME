import NavMap from "./NavMap";

const State = {
    Idle: 0,
    Walk: 1,
}
const TargetName = {
    None: 0,
    Map : 1,
    Joystick: 2,
}
const {ccclass, property} = cc._decorator;

@ccclass
export default class NavAgent extends cc.Component {

    @property(Number)
    speed: number = 100;


    State: number   = -1;
    WalkTotal       = 0.0;
    WalkTile        = 0;
    WalkNext        = 1;
    WalkTime        = 0;

    RoadSet: any = null;

    NavMap: NavMap = null;

    Speed: cc.Vec2  = cc.v2(0, 0);

    MoveTarget = TargetName.None;
    MoveDir         = cc.v2(0, 0);



    // onLoad () {}

    start () {
        
    }

    initNavMap(NavMap: NavMap) {
        this.NavMap = NavMap;
    }

    navToMap(dstWpos: cc.Vec2) {
        let srcWpos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        this.RoadSet = this.NavMap.astartSearch(srcWpos, dstWpos);

        if(!this.RoadSet || this.RoadSet.length <= 1) {
            this.State = State.Idle;
            return;
        }
        this.MoveTarget = TargetName.Map;
        this.WalkNext = 1;
        this._walkToNext();
    }
    /**
     * 摇杆操作
     */
    moveByJoystick(dir: cc.Vec2) {
        
    }

    _walkToNext() {
        if(!this.RoadSet || this.WalkNext >= this.RoadSet.length) {
            this.State = State.Idle;
            return;
        }
        let src = this.node.getPosition();
        let dst = this.node.parent.convertToNodeSpaceAR(this.RoadSet[this.WalkNext]);

        let dir = cc.v2(dst.x-src.x, dst.y-src.y)
        let len = Math.sqrt(dir.x * dir.x + dir.y * dir.y)
        

        this.Speed.x = (dir.x / len) * this.speed;
        this.Speed.y = (dir.y / len) * this.speed;

        this.WalkTotal = len / this.speed;
        this.WalkTime = 0;
        this.State = State.Walk;
    }

    _walkUpdate(dt: number) {

        if(this.MoveTarget == TargetName.Map) {
            this.WalkTime += dt;
            if(this.WalkTile > this.WalkTotal) {
                dt -= (this.WalkTime - this.WalkTotal);
            }
    
            let sx = this.Speed.x * dt;
            let sy = this.Speed.y * dt;
    
            this.node.x += sx;
            this.node.y += sy;
    
            if(this.WalkTime > this.WalkTotal) {
                this.WalkNext ++;
                this._walkToNext();
            }
        }
    }

    update (dt) {
        if(this.State == State.Walk) {
            this._walkUpdate(dt);
        }
        
    }
}
