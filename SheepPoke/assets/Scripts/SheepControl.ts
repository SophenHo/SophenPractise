import LayoutControl from "./LayoutControl";

const {ccclass, property} = cc._decorator;

// 全局點擊計數
let globalClickCount: number = -1;

@ccclass
export default class SheepControl extends cc.Component {

    @property
    hp: number = 1;

    @property(cc.Node)
    starNode: cc.Node = null;

    @property(cc.Node)
    numLabel: cc.Node = null;

    @property(LayoutControl)
    layoutControl: LayoutControl = null;

    //存放隨機數的數組
    resultArray: string[] = [];

    //追蹤滑鼠點擊的次數
    private clickCount: number = 0;
    
    // onLoad () {}

    start () {

        this.pokeSheep();
        console.log("Sheep resultArray : " + this.resultArray);

    }

    pokeSheep(){

        //滑鼠點擊事件
        this.node.on(cc.Node.EventType.MOUSE_DOWN, (event)=>{
            
            if(this.hp > 0){ //只能點擊一次
                this.hp--;

                //得到jump動畫組件
                let animation = this.getComponent(cc.Animation);
                animation.play("jump");

                //此節點的spriteFrame原始圖片
                let originalSpriteFrame: cc.SpriteFrame = this.node.getComponent(cc.Sprite).spriteFrame;

                // console.log("SheepControl : " + this.resultArray);

                //動畫結束後的回調
                animation.on('finished', ()=>{
                    
                    let scaleAction = cc.scaleTo(0.2, 0.8, 0.8); //縮放動作
                    let fadeOut = cc.fadeOut(0.2); //淡出動作
                    let spawn = cc.spawn(scaleAction, fadeOut); //並列動作
                    this.starNode.active = true;
                    this.starNode.runAction(spawn); //執行並列動作

                    this.onMouseDown();

                    //Label Control
                    // this.numLabelControl();

                    // 將 spriteFrame 設置回原來的圖片
                    this.node.getComponent(cc.Sprite).spriteFrame = originalSpriteFrame;

                    }, this);           
            }
            
        });
        
    }

    //設置存放隨機數的數組
    ResultArray(result){
        this.resultArray = result;
    }

    //紀錄滑鼠點擊次數
    onMouseDown() {
        // this.clickCount++;
        globalClickCount++;
        this.layoutControl.Score();
        console.log("clickCount : " + globalClickCount);
        this.updateLabel();

    }

    //更新Label
    updateLabel() {
        // 確保索引不會超出陣列的範圍
        let index = globalClickCount % this.resultArray.length;
        this.numLabel.getComponent(cc.Label).string = this.resultArray[index];
        this.numLabel.active = true; 

        //如果label更新內容為"end"，則調用LayoutControl的reassignLabels方法
        if (this.resultArray[index] === "end") {
            this.layoutControl.reassignLabels();
            let animation = this.getComponent(cc.Animation);
            animation.off('finished');
            animation.play("down");
            
        }
    }

    // update (dt) {}
}
