
const {ccclass, property} = cc._decorator;

// 全局點擊計數
let globalClickCount: number = -1;

@ccclass
export default class ScoreControl extends cc.Component {

    @property(cc.Label)
    Mnumber: cc.Label = null;

    @property(cc.Label)
    Rnumber: cc.Label = null;

    @property(cc.Node)
    Mstar: cc.Node = null;

    @property(cc.Node)
    Rstar: cc.Node = null;

    //存放隨機數的數組
    resultArray: string[] = [];

    

    

    // onLoad () {}

    start () {
        this.Mnumber.string = "0";
        console.log("ScoreControl : " + this.resultArray);
    }

    

    //設置存放隨機數的數組
    ResultArray(result){
        this.resultArray = result;
    }

    //紀錄滑鼠點擊次數
    onMouseDown() {
        // this.clickCount++;
        globalClickCount++;
        console.log("ScoreClickCount : " + globalClickCount);
        this.updateLabel();
        this.showStar();

    }

    updateLabel() {
        //元素："x2", "x1", "+1", "+2"

        // 確保索引不會超出陣列的範圍
        // let index = globalClickCount % this.resultArray.length;
        // let input = this.resultArray[index];

        // let numToAdd;
        // switch(input) {
        //     case "x2":
        //         numToAdd = 2;
        //         break;
        //     case "x1":
        //         numToAdd = 1;
        //         break;
        //     default:
        //         numToAdd = 0; // 如果 input 不是 "x2" 或 "x1"，則 numToAdd 為 0
        // }
        // // 將 Mnumber 的標籤內容轉換為數字，然後加上 numToAdd
        // this.Mnumber.string = (Number(this.Mnumber.string) + numToAdd).toString();

        // let numToAdd2;
        // switch(input) {
        //     case "+2":
        //         numToAdd2 = 2;
        //         break;
        //     case "+1":
        //         numToAdd2 = 1;
        //         break;
        //     default:
        //         numToAdd2 = 0; // 如果 input 不是 "+2" 或 "+1"，則 numToAdd 為 0
        // }
        // // 將 Rnumber 的標籤內容轉換為數字，然後加上 numToAdd
        // this.Rnumber.string = (Number(this.Rnumber.string) + numToAdd2).toString();

        // 確保索引不會超出陣列的範圍
        let index = globalClickCount % this.resultArray.length;
        let input = this.resultArray[index];

        let numToAdd;
        switch(input) {
            case "x2":
                numToAdd = 2;
                break;
            case "x1":
                numToAdd = 1;
                break;
            default:
                numToAdd = 0; // 如果 input 不是 "x2" 或 "x1"，則 numToAdd 為 0
        }
        // 將 Mnumber 的標籤內容轉換為數字，然後加上 numToAdd
        this.Mnumber.string = (Number(this.Mnumber.string) + numToAdd).toString();

        let numToAdd2;
        switch(input) {
            case "+2":
                numToAdd2 = 2;
                break;
            case "+1":
                numToAdd2 = 1;
                break;
            default:
                numToAdd2 = 0; // 如果 input 不是 "+2" 或 "+1"，則 numToAdd 為 0
        }

        // 如果 Mnumber 已經更新，則在加上 numToAdd2 之前，先將 Rnumber 的當前值乘以 Mnumber 的值
        if (numToAdd > 0) {
            this.Rnumber.string = (Number(this.Rnumber.string) * Number(this.Mnumber.string) + numToAdd2).toString();
        } else {
            // 將 Rnumber 的標籤內容轉換為數字，然後加上 numToAdd2
            this.Rnumber.string = (Number(this.Rnumber.string) + numToAdd2).toString();
        }  

    }

    showStar() {

        // let scaleAction2 = cc.scaleTo(0.2, 0.8, 0.8); //縮放動作
        // let fadeOut2 = cc.fadeOut(0.2); //淡出動作
        // let spawn = cc.spawn(scaleAction2, fadeOut2); //並列動作

        // let index = globalClickCount % this.resultArray.length;
        // let currentInput = this.resultArray[index];
        
        // // 根據 currentInput 來決定是顯示 Mstar 還是 Rstar
        // if (currentInput === "x2" || currentInput === "x1") {
        //     this.Mstar.active = true;
        //     this.Mstar.runAction(spawn); //執行並列動作
        // } else if (currentInput === "+1" || currentInput === "+2") {
        //     this.Rstar.active = true;
        //     this.Rstar.runAction(spawn); //執行並列動作
        // }

        let scaleAction2 = cc.scaleTo(0.2, 0.8, 0.8); //縮放動作
        let fadeOut2 = cc.fadeOut(0.2); //淡出動作
        let spawn = cc.spawn(scaleAction2, fadeOut2); //並列動作

        let index = globalClickCount % this.resultArray.length;
        let currentInput = this.resultArray[index];
        
        // 根據 currentInput 來決定是顯示 Mstar 還是 Rstar
        if (currentInput === "x2" || currentInput === "x1") {
            this.Mstar.active = true;
            let resetAction = cc.callFunc(() => {
                this.Mstar.active = false;
                this.Mstar.opacity = 255;
                this.Mstar.scale = 1;
            });
            let sequence = cc.sequence(spawn, resetAction);
            this.Mstar.runAction(sequence); //執行序列動作
        } else if (currentInput === "+1" || currentInput === "+2") {
            this.Rstar.active = true;
            let resetAction = cc.callFunc(() => {
                this.Rstar.active = false;
                this.Rstar.opacity = 255;
                this.Rstar.scale = 1;
            });
            let sequence = cc.sequence(spawn, resetAction);
            this.Rstar.runAction(sequence); //執行序列動作
        }

    }

    // update (dt) {}
}
