import SheepControl from "./SheepControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LayoutControl extends cc.Component {
    @property(cc.Node)//sheep按鈕
    sheepButton: cc.Node = null;
    
    @property(cc.Node)//layout節點
    layoutNode: cc.Node = null;

    @property()//layout可變數量
    layoutNum: number = 15;

    @property(cc.Label)
    Mnumber: cc.Label = null;

    @property(cc.Label)
    Rnumber: cc.Label = null;

    @property(cc.Node)
    Mstar: cc.Node = null;

    @property(cc.Node)
    Rstar: cc.Node = null;

    @property(SheepControl)
    sheepControl: SheepControl = null;

    //存放隨機數的數組
    resultArray: string[] = [];
    //存放隨機數的數組讓分割"end"後面元素使用
    afterResult: string[] = [];

    sheepClickCount: number = -1;

    onLoad () {}

    start () {

        //使用randomArray方法產生隨機數的數組
        let result = this.randomArray();

        //佈局15個sheepButton
        for(let i = 0; i < this.layoutNum; i++) {

            // 實例化sheepButton
            let newNode = cc.instantiate(this.sheepButton);
            let sheepControl =  newNode.getComponent(SheepControl);
            sheepControl.resultArray = result;
            // 將實例化sheepButton添加到layout節點中(共15個)
            this.layoutNode.addChild(newNode);
            newNode.active = true;
        }     
    }

    //產生隨機數的數組
    randomArray(){

        //創建一個包含 "x2", "x1", "+1", "+2" 的數組
        let elements = ["x2", "x1", "+1", "+2"];
        let result = [];

        for(let i = 0; i < 14; i++) {
        let randomIndex = Math.floor(Math.random() * elements.length);
        result.push(elements[randomIndex]);
        }

        let randomPosition = Math.floor(Math.random() * 14);
        //在結果數組的隨機位置插入 "end"
        result.splice(randomPosition, 0, "end"); //刪除0個元素

        console.log("Layout randomArray : " + result);

        this.resultArray = result;
        this.afterResult = result;

        return result;     
    }

    //紀錄滑鼠點擊次數
    SheepClickCount() {
        this.sheepClickCount++;
        console.log("layoutClickCount : " + this.sheepClickCount);
        //將 sheepClickCount 的值傳給所有的羊
        for(let i = 0; i < this.layoutNode.children.length; i++) {
            let sheepControl = this.layoutNode.children[i].getComponent(SheepControl);
            sheepControl.clickCount = this.sheepClickCount;
        }
        
        this.updateLabel();
        // this.showStar();
        
        let endIndex = this.resultArray.indexOf('end');
        
        if (endIndex === this.sheepClickCount) {
            console.log("找到end");
            this.reassignLabels();

        }
    }

    //在end對所有活著的羊設定label＆動畫＆變暗
    reassignLabels() {
        
        // 獲取所有存活的羊
        let remainingSheep = [];
        for(let i = 0; i < this.layoutNode.children.length; i++) {
            let sheepControl = this.layoutNode.children[i].getComponent(SheepControl);
            if(sheepControl.hp > 0 ) {
                remainingSheep.push(this.layoutNode.children[i]);
            }
        }
        // 找出"end" 字詞的位置，並將其索引值儲存到 endLabelIndex 
        let endLabelIndex = this.afterResult.indexOf("end");
        //則將 "end" 字詞之後的所有元素切割出來並儲存到 elementsAfterEnd 陣列中
        let elementsAfterEnd = this.afterResult.slice(endLabelIndex + 1);

        //將 elementsAfterEnd 陣列中的元素分配給存活的羊上的label並顯示出來   
        for (let i = 0; i < remainingSheep.length; i++) {
            let sheepControl = remainingSheep[i].getComponent(SheepControl);
            let index = i % elementsAfterEnd.length;
            sheepControl.numLabel.getComponent(cc.Label).string = elementsAfterEnd[index];
            //關閉按鈕
            sheepControl.buttonInteractable();
            sheepControl.numLabel.active = true;

            //播放 "jump" 動畫，並將其透明度設置為 100
            let animation = sheepControl.Background.getComponent(cc.Animation);
            // 儲存原始圖片
            let originalSpriteFrame: cc.SpriteFrame = sheepControl.Background.getComponent(cc.Sprite).spriteFrame;
            
            animation.play("jump");
            animation.on('finished', ()=>{ // "jump" 動畫結束後的回調
                animation.play("down");
                animation.off('finished');//避免多次調用產生的重複播放，需移除所有已經註冊的 'finished' 事件監聽器
                    animation.on('finished', ()=>{ // "down" 動畫結束後的回調
                // 將 spriteFrame 設置回原來的圖片
                sheepControl.Background.getComponent(cc.Sprite).spriteFrame = originalSpriteFrame;
            }, this);
        }, this);

            sheepControl.node.runAction(cc.fadeTo(1, 100));

            for (let i = 0; i < remainingSheep.length; i++) {
                let sheepControl = remainingSheep[i].getComponent(SheepControl);
                sheepControl.hp = 0;
            }

        }
    }

    //依照點擊次數更新Mnumber和Rnumber的label內容 & 顯示星星
    updateLabel() {
        // 確保索引不會超出陣列的範圍
        let index = this.sheepClickCount % this.resultArray.length;
        let input = this.resultArray[index];

        //label出現"x2", "x1"讓Mnumber當前的數值 加上2, 加上1
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

        //label出現"＋2", "＋1"讓Rnumber當前的數值 加上2, 加上1
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
        // 將 Rnumber 的標籤內容轉換為數字，然後加上 numToAdd
        this.Rnumber.string = (Number(this.Rnumber.string) + numToAdd2).toString();  

        //顯示星星
        let scaleAction2 = cc.scaleTo(0.2, 0.8, 0.8); //縮放動作
        let fadeOut2 = cc.fadeOut(0.2); //淡出動作
        let spawn = cc.spawn(scaleAction2, fadeOut2); //並列動作

        // let index = this.sheepClickCount % this.resultArray.length;
        let currentInput = this.resultArray[index];
        
        // 根據 currentInput 來決定是顯示 Mstar 還是 Rstar ****並且可重複顯示
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
}
