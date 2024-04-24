import ScoreControl from "./ScoreControl";
import SheepControl from "./SheepControl";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LayoutControl extends cc.Component {

    // sheep預製體
    @property(cc.Prefab)
    SheepPrefab: cc.Prefab = null;

    //layout節點
    @property(cc.Node)
    layoutNode: cc.Node = null;

    @property(ScoreControl)
    scoreControl: ScoreControl = null;

    //"end"後面元素
    afterResult: string[] = [];


    onLoad () {

        // this.randomArray();
       
    }

    start () {
        //使用randomArray方法產生隨機數的數組
        let result = this.randomArray();

        //佈局15個預製體
        for(let i = 0; i < 15; i++) {
            // 實例化預製體
            let newNode = cc.instantiate(this.SheepPrefab);
            // 獲取 SheepControl 組件
            let sheepControl = newNode.getComponent(SheepControl);
            // 設置 resultArray
            sheepControl.ResultArray(result);
            this.scoreControl.ResultArray(result); //ScoreControl

            // 將實例化預製體添加到layout節點中(共15個)
            this.layoutNode.addChild(newNode);

            sheepControl.layoutControl = this;
            
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
        result.splice(randomPosition, 0, "end");

        console.log("Layout randomArray : " + result);

        this.afterResult = result;

        return result;
        
    }

    //當其中一隻羊的label出現"end"時，將數組中剩餘的元素重新分配給存活的羊上的label
    reassignLabels() {
        // 獲取所有存活的羊 
        let remainingSheep = this.layoutNode.children.filter(node => node.getComponent(SheepControl).hp > 0);
        // 找出"end" 字詞的位置，並將其索引值儲存到 endLabelIndex 
        let endLabelIndex = this.afterResult.indexOf("end");
        //如果 "end" 字詞存在於 this.afterResult 字串中（即 endLabelIndex 不等於 -1）
        //則將 "end" 字詞之後的所有元素切割出來並儲存到 elementsAfterEnd 陣列中
        let elementsAfterEnd = endLabelIndex !== -1 ? this.afterResult.slice(endLabelIndex + 1) : [];
        //將 elementsAfterEnd 陣列中的元素分配給存活的羊上的label並顯示出來
        for (let i = 0; i < remainingSheep.length; i++) {
            let sheepControl = remainingSheep[i].getComponent(SheepControl);
            let index = i % elementsAfterEnd.length;
            sheepControl.numLabel.getComponent(cc.Label).string = elementsAfterEnd[index];
            sheepControl.numLabel.active = true;

            // 將存活的羊的 hp 設置為 0，播放 "jump" 動畫，並將其透明度設置為 100
            sheepControl.hp = 0;
            let animation = sheepControl.getComponent(cc.Animation);
            // 儲存原始圖片
            let originalSpriteFrame: cc.SpriteFrame = sheepControl.node.getComponent(cc.Sprite).spriteFrame;
            
            animation.play("jump");
            animation.on('finished', ()=>{ // "jump" 動畫結束後的回調
                animation.play("down");
                animation.off('finished');//避免多次調用產生的重複播放，需移除所有已經註冊的 'finished' 事件監聽器
                    animation.on('finished', ()=>{ // "down" 動畫結束後的回調
                // 將 spriteFrame 設置回原來的圖片
                sheepControl.node.getComponent(cc.Sprite).spriteFrame = originalSpriteFrame;
            }, this);
        }, this);
            sheepControl.node.runAction(cc.fadeTo(1, 100));

        }
    }

    Score(){
        this.scoreControl.onMouseDown();
    }

    // update (dt) {}
}
