import ObjectG from "./ObjectG";



const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(ObjectG)
    objectG: ObjectG = null;

    @property
    planeSpeed: number = 2;

    @property(cc.Node)
    BG: cc.Node = null;

    @property(cc.Float) //浮點數
    sheepSpeed: number = 2;

    @property(cc.Float) //浮點數
    bulletSpeed: number = 0.5;

    // private bulletTarPos: cc.Vec2 = cc.v2(0,300);

    private planeNode: cc.Node = null;
    private winsLabelNode: cc.Node = null;
    private goldPos: cc.Node = null;
    
    //儲存所有的子彈和羊
    private bullets: cc.Node[] = [];
    private sheeps: cc.Node[] = [];
    

    protected onLoad () {
      
    }

    protected start () {
        // console.log('wwwwww : ' + this.BG.width);
        // console.log('hhhhhh : ' + this.BG.height);
        
        this.planeNode = this.objectG.poolsNode(0);
        this.node.addChild(this.planeNode);
        this.winsLabelNode = this.objectG.poolsNode(3);
        this.node.addChild(this.winsLabelNode);

        //羊的schedule
        this.schedule(()=>{
            let sheep = this.objectG.poolsNode(1);
            this.sheeps.push(sheep);//將羊存入陣列

            
            let startP = cc.v3(
                (Math.random() < 0.5 
                    ? Math.random() * (-this.BG.width / 2 - (-this.BG.width / 2)) + (-this.BG.width / 2)
                    : Math.random() * (this.BG.width / 2  - this.BG.width / 2) + this.BG.width / 2), // x position
                0 // y position
            );

            let endP = cc.v3(
                (startP.x > 0 
                    ? Math.random() * (-this.BG.width / 2 - (-this.BG.width / 2)) + (-this.BG.width / 2)
                    : Math.random() * (this.BG.width / 2 - this.BG.width / 2) + this.BG.width / 2), // x position
                this.BG.height / 2 // y position
            );

            sheep.position = startP;
            if(endP.x > 0){
                sheep.scaleX = sheep.scaleX * -1;
            }
            this.node.addChild(sheep);
            
            // let distance = cc.Vec3.distance(startP, endP);
            
            let move = cc.moveTo(2, endP.x, endP.y);
            // sheepNode.runAction(move);
            let seq = cc.sequence(move, cc.callFunc(() => {
                sheep.position = cc.v3(0, 0);
                sheep.scaleX = Math.abs(sheep.scaleX);

                let index = this.sheeps.indexOf(sheep);//因為回收羊後不會立即從場景中移除該節點，所以要先從 sheeps 陣列中移除該節點再回收
                if (index !== -1) {
                this.sheeps.splice(index, 1);
                }

                this.objectG.recycleNode(sheep, 1);
                
            }));
            sheep.runAction(seq);
               
        },3)

        
        //子彈的schedule
        this.schedule(()=>{
            let bullet = this.objectG.poolsNode(2);
            this.bullets.push(bullet);
            this.node.addChild(bullet);
            let move = cc.moveTo(0.5, this.planeNode.x, this.planeNode.y + 550);
            // sheepNode.runAction(move);
            let seq = cc.sequence(move, cc.callFunc(() => {
                bullet.position = cc.v3(0, 0); 
                this.objectG.recycleNode(bullet, 2);
                
            }));
            bullet.runAction(seq);

            bullet.x = this.planeNode.x;
            bullet.y = this.planeNode.y + 80;
               
        },0.5)   

    }

    planeMove(vent: cc.Event, direction: string){
        const speed = direction === 'right' ? this.planeSpeed : -this.planeSpeed;
        this.planeNode.x += speed;
    }

    
    //檢查子彈和羊的位置,如果發生碰撞......
    update (dt) {
        for (let i = this.bullets.length - 1; i >= 0; i--) { //倒序遍歷的 for 迴圈，避免導致索引錯亂
            for (let j = this.sheeps.length - 1; j >= 0; j--) {
                if (this.checkOverlap(this.bullets[i], this.sheeps[j])) { //如果互碰則true

                    this.wins(this.sheeps[j]);//傳座標到wins
                    //停止該羊的所有動作
                    this.sheeps[j].stopAllActions();
                    // 移除已經碰撞的子彈和羊
                    // this.objectG.recycleNode(this.bullets[i], 2);
                    this.sheeps[j].scaleX = Math.abs(this.sheeps[j].scaleX);
                    this.objectG.recycleNode(this.sheeps[j], 1);
                    //從陣列中移除
                    // this.bullets.splice(i, 1);
                    this.sheeps.splice(j, 1);
                    
                    // this.handleSheepCollision(this.sheeps[j]).then(() => {
                        
                    // });
                    

                    // 碰撞後立即跳出迴圈，避免操作已移除的元素
                    break;
                }
            }
        }
    }

    handleSheepCollision(sheep) {
        return new Promise<void>((resolve) => {
            // 播放down動畫
            sheep.play("doen").then(() => {
                // 停止該羊的所有動作
                // sheep.stopAllActions();
                // 移除羊
                this.sheeps.splice(this.sheeps.indexOf(sheep), 1);
                // 回收羊
                this.objectG.recycleNode(sheep, 1);
                // 解決Promise
                resolve();
            });
        });
    }

    // 檢查兩個節點是否重疊
    checkOverlap(node1: cc.Node, node2: cc.Node) {
        let box1 = node1.getBoundingBox();//獲取一個對象的邊界框
        let box2 = node2.getBoundingBox();
        return box1.intersects(box2);//檢查是否相交或重疊
    }

    wins(hitSheep: cc.Node){
        console.log('得分');
        let gold = this.objectG.poolsNode(4);
        this.goldPos = gold;
        gold.position = hitSheep.position;//設定金幣的位置
        this.node.addChild(gold);
        let move = cc.moveTo(0.5, this.winsLabelNode.x, this.winsLabelNode.y);
        new Promise<void>(resolve => {
            let seq = cc.sequence(move, cc.callFunc(() => {
                gold.position = this.goldPos.position; 
                this.objectG.recycleNode(gold, 4);
                resolve();
            }));
            gold.runAction(seq);
        }).then(() => {
            let currentScore = parseInt(this.winsLabelNode.getComponent(cc.Label).string);//先讓字串轉成數字
            this.winsLabelNode.getComponent(cc.Label).string = (currentScore + 2).toString();//再讓數字轉成字串
        });     
    }

}
