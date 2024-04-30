import GD from "./GD";

const {ccclass, property} = cc._decorator;

@ccclass
export default class G extends cc.Component {

    @property([GD])
    data: GD[] = [];
    private pools: cc.NodePool[] = [];
    private templates: cc.Node[] = [];
    onLoad () {
        this.node.children.slice(0).forEach((node, i): void =>{ 
            this.templates[i] = node;
            this.pools.push (new cc.NodePool());//初始化節點池
            node.removeFromParent();//將所有子節點從父節點中移除
        })

        this.data.forEach(this.gen, this);
        console.log("cccccc :" + this.getTotalPoolSize());//對象池中的對象數量
    }

    public gen(data: GD): cc.Node{//根據GD的idx屬性 從pools陣列中獲取對應的節點
        let node = this.getNode(data.idx);
        let label = node.getComponent(cc.Label);
        if (label){
            label.string = data.string;
        }
        let sprite = node.getComponent(cc.Sprite);
        if (sprite){
            sprite.spriteFrame = data.frame;
        }
        this.node.addChild(node);
        return node;
    }

    private getNode(idx: number): cc.Node {//根據該數字從pools陣列中獲取對應的節點池
        let pool = this.pools[idx];

        if (pool.size() == 0){
            return cc.instantiate(this.templates[idx]);//從templates陣列中實例化一個新的節點並返回
        } else {
            return pool.get();//否則從節點池中獲取一個節點並返回。
        }
    }

    public getTotalPoolSize(): number {//遍歷 pools陣列中的節點持size
        let totalSize = 0;
        this.pools.forEach(pool => {
            totalSize += pool.size();
        });
        return totalSize;
    }

    start () {

    }

    // update (dt) {}
}
