
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

    }

    updateLabel() {
        //"x2", "x1", "+1", "+2"

        // 確保索引不會超出陣列的範圍
        let index = globalClickCount % this.resultArray.length;
        let input = this.resultArray[index];

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

        let numToAdd;
        switch(input) {
            case "x2":
                numToAdd = 2;
                break;
            case "x1":
                numToAdd = 1;
                break;
            case "+1":
                this.Rnumber.string = (Number(this.Mnumber.string) + 1).toString();
                return; // 如果已經更新了 Rnumber，就不需要再更新 Mnumber，所以直接返回
            case "+2":
                this.Rnumber.string = (Number(this.Mnumber.string) + 2).toString();
                return; // 如果已經更新了 Rnumber，就不需要再更新 Mnumber，所以直接返回
            default:
                numToAdd = 0; // 如果 input 不是 "x2"、"x1"、"+1" 或 "+2"，則 numToAdd 為 0
        }

        // 將 Mnumber 的標籤內容轉換為數字，然後加上 numToAdd
        this.Mnumber.string = (Number(this.Mnumber.string) + numToAdd).toString();

        this.Rnumber.string = (Number(this.Rnumber.string) + numToAdd).toString();

    }

    // update (dt) {}
}
