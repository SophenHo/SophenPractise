const {ccclass, property} = cc._decorator;

@ccclass
export default class Pools extends cc.Component {

    readonly pools: {[key: string]: cc.NodePool} = {};
    private templates: {[key: string]: cc.Node} = {};

    onLoad () {

        // this.node.children.slice(1, 4).forEach((node): void =>{ 
        //     this.templates[node.name] = node;
        //     this.pools[node.name] = new cc.NodePool(); //初始化節點池          
        //     node.removeFromParent(); //將所有子節點從父節點中移除
        // });
        
        this.node.children.filter(node => node.name === "bullet" || node.name === "sheep" || node.name === "Gold").forEach((node): void =>{ 
            this.templates[node.name] = node;
            this.pools[node.name] = new cc.NodePool(); //初始化節點池          
            node.removeFromParent(); //將所有子節點從父節點中移除
        }); 

        Object.values(this.pools).forEach((pool) => {
            while (pool.size() > 0) {
                let node = pool.get();
                this.recycleNode(node, node.name);
            }
        });
    }
  
    public poolsNode(name: string): cc.Node {//根據該名稱從pools物件中獲取對應的節點池
        let pool = this.pools[name];
        if (pool.size() == 0){
            return cc.instantiate(this.templates[name]);//從templates物件中實例化一個新的節點並返回
        } else {
            return pool.get();//否則從節點池中獲取一個節點並返回。
        } 
    }

    public recycleNode(node: cc.Node, name: string): void {
        let pool = this.pools[name];
        pool.put(node);
    }
}