import BulletPool from "./BulletPool";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    @property
    Speed:number = 800;

    bulletPool: BulletPool = null;

    start () {
        // 檢查 bulletPool 是否已經被初始化
        if (!this.bulletPool) {
            // 從父節點或場景中獲取 BulletPool 組件
            this.bulletPool = this.node.parent.getComponent(BulletPool);
        }
        // this.bulletPool = this.node.parent.getComponent(BulletPool);
    }

    update (dt) {
        this.node.y += this.Speed * dt;

        if(this.node.y >= cc.winSize.height * 0.5){
            this.bulletPool.ret_bullet(this.node);
            
        }
    }
}
