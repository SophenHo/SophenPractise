

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletPool extends cc.Component {

    @property(cc.String)
    PoolName: string = ""; // 子彈池名

    @property()
    content: number = 10; // 子彈池容量

    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;  // 子彈预制体

    bulletPool: cc.NodePool = null;

    // onLoad () {}

    start () {

        this.bulletPool = new cc.NodePool(); //創建對象池

        for(let i = 0; i<this.content; i++){
            let bullet = cc.instantiate(this.bulletPrefab); //實例化子彈預製體
            this.bulletPool.put(bullet);  // 通過put接口放入對象池 

        }
        console.log(`對象池大小: ${this.bulletPool.size()}`);  // 打印對象池大小
    }

    get_bullet(){

        let bullet = null;
        if(this.bulletPool.size() > 0){   //如果對象池中有可用的空閒對象就用get獲取對象（記得永遠要用size來判斷是否有可用的對象）
            bullet = this.bulletPool.get();
        }else{
            bullet = cc.instantiate(this.bulletPrefab);
        }
        console.log(`取出子彈後，對象池大小: ${this.bulletPool.size()}`);  // 打印對象池大小
        return bullet;

    }

    ret_bullet(bullet){
        this.bulletPool.put(bullet); // 通過put接口返回對象池

        console.log(`返回子彈後，對象池大小: ${this.bulletPool.size()}`);  // 打印對象池大小
    }

    // update (dt) {}
}
