import { getAnimationClip, getSpriteFrame } from "./SheepAnimation";
import SheepG from "./SheepG";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Sheep extends cc.Component {

   @property(SheepG)
   sheepG: SheepG = null;

   @property(cc.Integer)
   speed: number = 300;

   private targetPos: cc.Vec2 = cc.v2(0, 0);

    protected onLoad () {
        this.schedule(()=>{
            let sheepNode = this.sheepG.getNode(0);
            // console.log('sheep : ' + this.sheepG.pools.length);//3

            // let sheepAni = sheepNode.getComponent(cc.Animation);
            // if (sheepAni){
            //     let clip = getAnimationClip("sheepRun");
            //     if (clip){
            //         sheepAni.addClip(clip);
            //         sheepAni.play("sheepRun");
            //     }
            // }
            this.node.addChild(sheepNode);

            let x, y;
            if (Math.random() < 0.5) {
                // 隨機選擇左邊或右邊
                x = Math.random() < 0.5 ? -300 : 300;
                // 在該邊上隨機選擇一個點
                y = Math.random() * 400 - 200;
            } else {
                // 隨機選擇上邊或下邊
                y = Math.random() < 0.5 ? -200 : 200;
                // 在該邊上隨機選擇一個點
                x = Math.random() * 600 - 300;
            }
            this.targetPos = cc.v2(x, y);

            let distance = Math.sqrt(Math.pow(this.targetPos.x - sheepNode.position.x, 2) + Math.pow(this.targetPos.y - sheepNode.position.y, 2));

            if(this.targetPos.x > 0){
                sheepNode.scaleX = -1;
            }

            let move = cc.moveTo(distance / this.speed, this.targetPos);
            // sheepNode.runAction(move);
            let seq = cc.sequence(move, cc.callFunc(() => {
                sheepNode.position = cc.v3(0, 0); 
                sheepNode.scaleX = 1; 
                this.sheepG.recycleNode(sheepNode, 0);
                
            }));
            sheepNode.runAction(seq);
            console.log('sheep : ' + this.sheepG.pools.length);
        },0.5 + Math.random() *  4)
       
    }

    protected start () {
        
    }

    // update (dt) {}
}
