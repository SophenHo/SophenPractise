
import { getAnimationClip, getSpriteFrame } from "./SheepAnimation";
import SheepGD from "./SheepGD";



const {ccclass, property} = cc._decorator;

@ccclass
export default class SheepG extends cc.Component {

    @property([SheepGD])
    data: SheepGD[] = [];

    
    
    readonly pools: cc.NodePool[] = [];
    private templates: cc.Node[] = [];
    

    onLoad () {
        console.log('onLoad111 : ' + this.pools.length);//0
        this.node.children.slice(0).forEach((node, i): void =>{ 
            this.templates[i] = node;
            this.pools.push (new cc.NodePool());
            
            node.removeFromParent();
        })

        this.data.forEach(this.gen, this);
        console.log('onLoad222 : ' + this.pools.length);//3
        
    }

    public gen(data: SheepGD): cc.Node{
        console.log('gen111 : ' + this.pools.length);//3
        let node = this.getNode(data.idx);
        let label = node.getComponent(cc.Label);
        if (label){
            label.string = data.string;
        }
        let sprite = node.getComponent(cc.Sprite);
        if (sprite){
            sprite.spriteFrame = getSpriteFrame(data.string);
        }
        let animation = node.getComponent(cc.Animation);
        if (animation){
            let clip = getAnimationClip(data.string);
            if (clip){
                animation.addClip(clip);
                animation.play(data.string);
            }
        }
        this.node.addChild(node);

        // this.pools[data.idx].clear();
        this.recycleNode(node, data.idx);
        console.log('gen222 : ' + this.pools.length);

        return node;
        
    }

    public getNode(idx: number): cc.Node {
        let pool = this.pools[idx];

        if (pool.size() == 0){
            return cc.instantiate(this.templates[idx]);
        } else {
            return pool.get();
            
        }
        
        
    }

    public recycleNode(node: cc.Node, idx: number): void {
        console.log("recycleNode111 : " + this.pools.length);
        let pool = this.pools[idx];
        pool.put(node);
        console.log("recycleNode222 : " + this.pools.length);
    }


    

    start () {

    }

    // update (dt) {}
}
