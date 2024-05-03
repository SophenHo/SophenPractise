import GD3 from "./GD3";
import xxx from "./xxx";

const {ccclass, property} = cc._decorator;

@ccclass
export default class G2 extends cc.Component {

    @property([GD3])
    data: GD3[] = [];

    @property(xxx)
    atlasXXX: xxx = null;
    
    private pools: cc.NodePool[] = [];
    private templates: cc.Node[] = [];
    onLoad () {
        this.node.children.slice(0).forEach((node, i): void =>{ 
            this.templates[i] = node;
            this.pools.push (new cc.NodePool());
            node.removeFromParent();
        })

        this.data.forEach(this.gen, this);
    }

    public gen(data: GD3): cc.Node{
        let node = this.getNode(data.idx);
        let label = node.getComponent(cc.Label);
        if (label){
            label.string = data.string;
        }
        let sprite = node.getComponent(cc.Sprite);
        if (sprite){
            let atlasAll = [this.atlasXXX.atlas, this.atlasXXX.atlas2, this.atlasXXX.atlas3];
            let atlasIndex = atlasAll.find(alts => alts.getSpriteFrame(data.string));
            if(atlasIndex){
                sprite.spriteFrame = atlasIndex.getSpriteFrame(data.string);
            }
        }
        this.node.addChild(node);
        return node;
    }

    private getNode(idx: number): cc.Node {
        let pool = this.pools[idx];

        if (pool.size() == 0){
            return cc.instantiate(this.templates[idx]);
        } else {
            return pool.get();
        }
    }


    

    start () {

    }

    // update (dt) {}
}
