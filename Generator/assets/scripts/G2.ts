import GD2 from "./GD2";

const {ccclass, property} = cc._decorator;

@ccclass
export default class G2 extends cc.Component {

    @property([GD2])
    data: GD2[] = [];

    @property(cc.SpriteAtlas)
    atlas: cc.SpriteAtlas = null;
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

    public gen(data: GD2): cc.Node{
        let node = this.getNode(data.idx);
        let label = node.getComponent(cc.Label);
        if (label){
            label.string = data.string;
        }
        let sprite = node.getComponent(cc.Sprite);
        if (sprite){
            sprite.spriteFrame = this.atlas.getSpriteFrame(data.frameName);
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
