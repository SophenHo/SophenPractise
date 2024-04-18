
import BulletPool from './BulletPool';


const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {
    
    bulletPool: BulletPool;

    touchPosition: cc.Vec2;  // 觸摸位置

    start () {

        this.bulletPool = this.getComponent(BulletPool);

        //TOUCH_MOVE事件
        this.node.on(cc.Node.EventType.TOUCH_MOVE,(event)=>{
            // this.node.setPosition(event.getLocation()); 
            // this.touchPosition = event.getLocation();  // 觸摸位置  
            let location = event.getLocation();
            this.touchPosition = this.node.parent.convertToNodeSpaceAR(location);  // 將全局座標轉換為局部座標
            this.node.setPosition(this.touchPosition); 
            
        });
        

        this.schedule(()=>{
            
                // let bullet = cc.instantiate(this.bullet_prefab);
                let bullet = this.bulletPool.get_bullet();  // 從對象池獲取子彈
                
                if (bullet) {
                    
                    // bullet.setPosition(this.touchPosition);  //子彈的位置設置為觸摸的位置
                    bullet.setPosition(this.node.getPosition());  // 將子彈的位置設置為當前節點的位置
                    this.node.addChild(bullet);  // 將子彈添加到場景中
                    //this.node.parent.addChild(bullet);  // 能夠讓子彈在正確位置產生，會出錯？？？
                }

                          
        }, 2);

        
    }

   
}
