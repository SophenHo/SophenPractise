
const {ccclass, property} = cc._decorator;

@ccclass
export default class SheepControl extends cc.Component {

    @property
    hp: number = 1;

    @property(cc.Node)
    Background: cc.Node = null;

    @property(cc.Node)
    starNode: cc.Node = null;

    @property(cc.Node)
    numLabel: cc.Node = null;
    
    clickCount: number = -1;

    //存放隨機數的數組
    resultArray: string[] = [];
    
    // onLoad () {}

    // start () {}

    // update (dt) {}

    pokeSheep(){
        
        if(this.hp > 0){ //只能點擊一次

            this.hp--;
            this.buttonInteractable();

            //Background的spriteFrame原始圖片
            let originalSpriteFrame: cc.SpriteFrame = this.Background.getComponent(cc.Sprite).spriteFrame;
            //得到jump動畫組件

            let ani = this.Background.getComponent(cc.Animation);
            ani.play("jump");

            //動畫結束後的回調
            ani.on('finished', ()=>{

                let scaleAction = cc.scaleTo(0.2, 0.8, 0.8); //縮放動作
                let fadeOut = cc.fadeOut(0.2); //淡出動作
                let spawn = cc.spawn(scaleAction, fadeOut); //並列動作
                this.starNode.active = true;
                this.numLabel.active = true; 
                this.starNode.runAction(spawn); //執行並列動作
                //更新label
                this.updateLabel();

                // 將 spriteFrame 設置為sheep_run_0
                this.Background.getComponent(cc.Sprite).spriteFrame = originalSpriteFrame;
                
                }, this);           
            }
    }
    
    //更新Label
    updateLabel() {
        // this.numLabel.active = true;
        console.log("xxxxxxxxxxxx : " + this.resultArray);
        console.log("oooooooooooo : " + this.clickCount);
        // 確保索引不會超出陣列的範圍
        let index = this.clickCount % this.resultArray.length;
        this.numLabel.getComponent(cc.Label).string = this.resultArray[index];
        this.numLabel.active = true;
        
        //如果label更新內容為"end"，則調用LayoutControl的reassignLabels方法
        if (this.resultArray[index] === "end") {
            
            let ani = this.Background.getComponent(cc.Animation);
            ani.off('finished');
            ani.play("down");                   
        }
    }

    buttonInteractable(){
       this.node.getComponent(cc.Button).interactable = false; 
    } 
}
