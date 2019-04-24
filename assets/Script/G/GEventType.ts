export enum GEventType {
    InitPlayerPosition = "InitPlayerPosition",

}

export enum TurnType {
    STOP = 0,
    UP = 1,
    DOWN = 2,
    LEFT = 3,
    RIGHT = 4,
}

export class GEventBody {
    static InitPlayerPosition = {
        name: "InitPlayerPosition",
        body: {
            turn: TurnType.STOP,
            position: cc.v2(0, 0),
            time: 3,
            // parentNode: null,
        },
        setBody: function(turn: number, pos: cc.Vec2, time: number) {
            this.body.turn = turn;
            this.body.position = pos;
            this.body.time = time;
            // this.body.parentNode = parentNode;
        },
    }
}
