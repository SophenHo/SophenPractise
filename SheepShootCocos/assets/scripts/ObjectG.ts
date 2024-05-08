
import { getAnimationClip, getSpriteFrame2 } from "./ResourceG";
import GD from "./GD";



const {ccclass, property} = cc._decorator;

@ccclass
export default class ObjectG extends cc.Component {

    @property([GD])
    data: GD[] = [];

    
    
    readonly pools: cc.NodePool[] = [];
    private templates: cc.Node[] = [];
    

    onLoad () {
        // console.log('onLoad111 : ' + this.pools.length);//0
        this.node.children.slice(0).forEach((node, i): void =>{ 
            this.templates[i] = node;
            this.pools.push (new cc.NodePool()); //初始化節點池          
            node.removeFromParent(); //將所有子節點從父節點中移除
        })

        this.data.forEach(this.gen, this);
        // console.log('onLoad222 : ' + this.pools.length);//3
        // this.pools.forEach((pool, index) => {
        //     console.log(`onLoad333 Pool index: ${index}`);
        // });
        
    }

    public gen(data: GD): cc.Node{//根據GD的idx屬性 從pools陣列中獲取對應的節點
        // console.log('gen111 : ' + this.pools.length);//3
        let node = this.poolsNode(data.idx);

        let label = node.getComponent(cc.Label);
        if (label){
            label.string = data.labelString;
        }

        // let atlasFrame = node.getComponent(cc.Sprite);
        // if (atlasFrame){
        //     atlasFrame.spriteFrame = getAtlasFrame(data.atlasFrameString);
        // }

        let spriteFrame = node.getComponent(cc.Sprite);
        if (spriteFrame){
            spriteFrame.spriteFrame = getSpriteFrame2(data.spriteFrameString);
        }

        let animation = node.getComponent(cc.Animation);
        if (animation){
            let clip = getAnimationClip(data.animationString);
            if (clip){
                animation.addClip(clip);
                animation.play(data.animationString);
            }
        }
        this.node.addChild(node);

        // 將飛機存入對象池
        if(data.idx === 0){
            this.recycleNode(node, data.idx);
        }

        // 將羊存入對象池
        if (data.idx === 1) {
            this.pools[data.idx].clear(); // 先清空對象池
            for (let i = 0; i <= 1; i++) { // 生成多個羊
                let newNode = cc.instantiate(node);
                this.recycleNode(newNode, data.idx);
            }
            this.recycleNode(node, data.idx); // 將原本的 node 存放到對象池
        }

        // 將子彈存入對象池
        if (data.idx === 2) {
            this.pools[data.idx].clear(); // 先清空對象池
            // let poo = this.pools[data.idx];
            // console.log("gen111 : " + poo.size());//0
            for (let i = 0; i <= 1; i++) { // 生成多個子彈
                let newNode = cc.instantiate(node);
                this.recycleNode(newNode, data.idx);
            }
            this.recycleNode(node, data.idx); // 將原本的 node 存放到對象池
        }

        //將金幣存入對象池
        if (data.idx === 4) {
            this.pools[data.idx].clear(); // 先清空對象池
            for (let i = 0; i <= 1; i++) { // 生成多個子彈
                let newNode = cc.instantiate(node);
                this.recycleNode(newNode, data.idx);
            }
            this.recycleNode(node, data.idx); // 將原本的 node 存放到對象池
        }

        //
        if (data.idx === 3) {
            this.pools[data.idx].clear(); // 先清空對象池
            this.recycleNode(node, data.idx); // 將原本的 node 存放到對象池
        }

        return node;
        
    }

    public poolsNode(idx: number): cc.Node {//根據該數字從pools陣列中獲取對應的節點池
        let pool = this.pools[idx];

        if (pool.size() == 0){
            return cc.instantiate(this.templates[idx]);//從templates陣列中實例化一個新的節點並返回
        } else {
            return pool.get();//否則從節點池中獲取一個節點並返回。
            
        }
        
        
    }

    public recycleNode(node: cc.Node, idx: number): void {
        let poo = this.pools[idx];
        // console.log("recycleNode111 : " + poo.size());
        let pool = this.pools[idx];
        pool.put(node);
        // console.log("recycleNode222 : " + poo.size());
    }


    

    start () {

    }

    // update (dt) {}
}
