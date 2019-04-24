
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.ProgressBar)
    progress: cc.ProgressBar = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    showLoading() {
        this.node.active = true;
    }

    hideLoading() {
        this.node.active = false;
    }

    changeProgress(number: number) {
        if(number < 0 || number > 1) return ;
        this.progress.progress = number;
        if(number >= 1) {
            this.hideLoading();
        }
    }

    // update (dt) {}
}
