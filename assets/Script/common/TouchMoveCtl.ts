
const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchMoveCtl extends cc.Component {

    @property(cc.Node)
    handler: cc.Node    = null;
    @property(cc.Node)
    joystick: cc.Node   = null;
    

    MaxR                = 60;
    dir: cc.Vec2        = cc.v2(0, 0);


    onLoad() {
        this.handler.active = false;
        this.addListenceEvent();
    }
    start () {

    }
    

    touchStart(e: cc.Event.EventTouch) {
        let pos = e.getLocation();
        this.handler.setPosition(pos);
        this.joystick.setPosition(0, 0);
        this.handler.active = true;

    }
    touchMove(e: cc.Event.EventTouch) {
        let ePos = e.getLocation();
        
        let pos = this.handler.convertToNodeSpaceAR(ePos);
        let len = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
        if(len > this.MaxR) {
            pos.x = this.MaxR * pos.x / len;
            pos.y = this.MaxR * pos.y / len;
        }
        let flag = Math.abs(pos.x) > Math.abs(pos.y) ? -1 : 1         // -1表示左右走, 1表示上下走
        let turn = cc.v2();
        if(flag == -1) {
            turn = pos.x > 0 ? cc.v2(1, 0) : cc.v2(-1, 0);        // 右
        }else {
            turn = pos.y > 0 ? cc.v2(0, 1) : cc.v2(0, -1);        // 右
        }
        this.dir = turn;
        this.joystick.setPosition(pos);
    }
    touchCancel() {
        this.dir = cc.v2(0, 0);
        this.handler.active = false;
    }
    touchEnd() {
        this.dir = cc.v2(0, 0);
        this.handler.active = false;
    }

    addListenceEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START,     this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,      this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,    this.touchCancel, this);
        this.node.on(cc.Node.EventType.TOUCH_END,       this.touchEnd, this);
    }

    removeListenceEvent() {
        this.node.off(cc.Node.EventType.TOUCH_START,     this.touchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE,      this.touchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL,    this.touchCancel, this);
        this.node.off(cc.Node.EventType.TOUCH_END,       this.touchEnd, this);
    }

    // onLoad () {}

    

    // update (dt) {}
}
