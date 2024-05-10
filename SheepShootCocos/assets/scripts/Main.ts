

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    
    //BG
    @property(cc.Boolean)
    BgXY: boolean = false;

    @property(cc.Float)
    BgSpeed: number = 100;

    @property(cc.Node)
    private BGSize: cc.Node = null; 
    
    //plane
    @property(cc.Node)
    private planeNode: cc.Node = null;

    @property(cc.Float)
    private planeSpeed: number = 100;

    @property(cc.Node)
    private rightButton: cc.Node = null;

    @property(cc.Node)
    private leftButton: cc.Node = null;

    //按鈕boolean
    private RButtonPressed: boolean = false;
    private LButtonPressed: boolean = false;

    //bullet
    @property(cc.Float)
    private bulletSpeed: number = 500;
    private bulletTimer: number = 0;

    //sheep
    @property(cc.Float) //浮點數
    private sheepSpeed: number = 200;

    private sheepSpawnTimer: number = 0;

    //winsLabel
    @property(cc.Node)
    private winsLabel: cc.Node = null; 

    //節點池
    readonly pools: {[key: string]: cc.NodePool} = {};
    private templates: {[key: string]: cc.Node} = {};
    g: cc.Node = null;

    //down圖片
    @property(cc.SpriteFrame)
    sheepFrame: cc.SpriteFrame[] = [];
    currentFrameIndex = 0;
    isChanging = false;

    protected onLoad () {

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
       
        //初始化按鈕事件
        this.handleButtonEvent(this.rightButton, true, true);
        this.handleButtonEvent(this.rightButton, true, false);
        this.handleButtonEvent(this.leftButton, false, true);
        this.handleButtonEvent(this.leftButton, false, false);

    }

    start () {
        
    }

    protected  update (dt: number) {
        
        //BG移動
        let bgNode = this.node.getChildByName("BG");
        let bgarr: cc.Node[] = bgNode.children;
        let p: string = this.BgXY ? 'x' : 'y'
        let pp: string = this.BgXY ? 'width' : 'height' //三元運算子

        for (let i = 0; i < bgarr.length; i++) {          
            let node = bgarr[i]
            let size = node.getContentSize(); //獲取節點size
            node[p] -= this.BgSpeed * dt;
            //如果背景超出圖片本身
            if (node[p] < -size[pp]) {
                node[p] += size[pp] * 2;
            }
        }

        //飛機移動參數
        let potentialNewX;
        if (this.RButtonPressed) {
            potentialNewX = this.planeNode.x + this.planeSpeed * dt;
            if (potentialNewX < this.BGSize.width / 2 - (this.planeNode.width/2)) {
                this.planeNode.x = potentialNewX;
            }
        }
        if (this.LButtonPressed) {
            potentialNewX = this.planeNode.x - this.planeSpeed * dt;
            if (potentialNewX > -this.BGSize.width / 2 + (this.planeNode.width/2)) {
                this.planeNode.x = potentialNewX;
            }
        }

        //子彈
        // console.log("一開始bullet池數量 : " + this.pools.bullet.size());
        //每0.1秒產生子彈
        this.bulletTimer += dt;
        if (this.bulletTimer >= 0.1) {//產生子彈速度
            let newBullet = this.poolsNode("bullet");
            newBullet["hitSheeps"] = false;
            newBullet.setPosition(this.planeNode.x, this.planeNode.y + 70);
            this.node.addChild(newBullet);
            this.bulletTimer = 0; // 重置上次創建子彈的時間
        }
        // 子彈移動
        this.node.children.filter(node => node.name === "bullet").forEach((bullet) => {
            bullet.y += this.bulletSpeed * dt;
            // 如果子彈的 y 座標大於 350，則將其回收到對象池中
            if (bullet.y > 350) {
                this.recycleNode(bullet, "bullet");
                // console.log("回收後bullet池數量 : " + this.pools.bullet.size());
            }
        }); 

        //每1.5 ~ 4秒隨機位置產生羊
        this.sheepSpawnTimer += dt;
        if (this.sheepSpawnTimer >= 1.5 + Math.random() * 2.5) {
            let Sheep = this.poolsNode("sheep");
            let s = [0.7, 1.2, 1.6];//3種大小
            Sheep.scale = s[Math.floor(Math.random() * s.length)];
            switch(Math.abs(Sheep.scale)) { //返回 sheep.scale 的絕對值
                case 0.7:
                    Sheep["HP"] = 1;
                    break;
                case 1.2:
                    Sheep["HP"] = 7;
                    break;
                case 1.6:
                    Sheep["HP"] = 13;
                    break;
                default:
                    Sheep["HP"] = 3;
            }
            let y = 260;
            let x;
            let direction;//羊移動的方向
            if (Math.random() < 0.5) { // 一半的機會在左邊或右邊出現
                x = -200; 
                direction = 1;
            } else { 
                x = 200;
                direction = -1;
            }
            Sheep.setPosition(x, y);
            Sheep["direction"] = direction; // 將方向儲存到節點上

            if(Sheep.x < 0){
                Sheep.scaleX = Sheep.scaleX * -1;
            }
            this.node.addChild(Sheep);
            this.sheepSpawnTimer = 0;
        }
        // 羊移動
        this.node.children.filter(node => node.name === "sheep").forEach((sheep) => {
            let newSheepSpeed = this.sheepSpeed;

            switch(Math.abs(sheep.scale)) { //＊＊＊＊＊＊返回 sheep.scale 的絕對值
                case 0.7:
                    newSheepSpeed = 1.5 * this.sheepSpeed;                   
                    break;
                case 1.2:
                    newSheepSpeed = 0.8 * this.sheepSpeed;                   
                    break;
                case 1.6:
                    newSheepSpeed = 0.3 * this.sheepSpeed;
                    break;
                default:
                    newSheepSpeed = this.sheepSpeed;
            }

            sheep.x += newSheepSpeed * dt * sheep["direction"]; // 根據方向更新移動方向

            // 檢查羊是否已經超出了 BGSize 的範圍
            if (sheep["direction"] > 0 && sheep.x > this.BGSize.width / 2 + 70) {
                // 羊向右移動並超出右邊界
                this.recycleNode(sheep, "sheep");
            } else if (sheep["direction"] < 0 && sheep.x < -this.BGSize.width / 2 - 70) {
                // 羊向左移動並超出左邊界
                this.recycleNode(sheep, "sheep");
            }
        });
        // console.log("11111111 :" + this.sheepRes.length);
        // 碰撞檢測
        this.node.children.filter(node => node.name === "bullet").forEach(async(bullet) => {          
            this.node.children.filter(node => node.name === "sheep").forEach(async(sheep) => {
                //d = sqrt((x2-x1)^2 + (y2-y1)^2)。
                let dx = bullet.x - sheep.x;
                let dy = bullet.y - sheep.y;
                let distance = Math.sqrt(dx * dx + dy * dy);// 計算子彈和羊之間的距離

                let size = sheep.getContentSize(); // 獲取羊的尺寸
                let minDimension = Math.min(size.width, size.height) / 2;// 獲取最小的邊
                let sheepX = sheep.x;
                let sheepY = sheep.y;
                let circle = { x: sheepX, y: sheepY, radius: minDimension };          
                
                // 子彈已進入羊的範圍，進行相應的處理
                if (distance <= circle.radius && bullet["firstHit"] && sheep["HP"] >= 0) { 
                    
                    sheep["HP"]--;
                    bullet["firstHit"] = false;
                    this.recycleNode(bullet, "bullet");

                    let gold = this.poolsNode("Gold");
                    gold.setPosition(sheep.x, sheep.y);
                    this.node.addChild(gold);

                    let winsLabelPos = this.winsLabel.getPosition(); // 獲取 winsLabel 的位置
                    let winsLabelPos3 = new cc.Vec3(winsLabelPos.x, winsLabelPos.y + 80, 0); // 轉換為 Vec3
                    let randomX = (Math.random() - 0.5) * 300;
                    cc.tween(gold)
                        .by(0.5, { y: 100, x: randomX, rotation: 360 }, { easing: 'cubicOut' }) // 讓金幣向上移動50單位
                        .to(0.6, { position: winsLabelPos3 }, { easing: 'cubicIn' })
                        .call(() => { 
                            // 在動畫結束後回收 gold
                            this.recycleNode(gold, "Gold"); 
                    
                            // 根據羊的大小增加分數
                            let scoreIncrement;
                            switch(Math.abs(sheep.scale)) { //返回 sheep.scale 的絕對值
                                case 0.7:
                                    scoreIncrement = 3;
                                    break;
                                case 1.2:
                                    scoreIncrement = 2;
                                    break;
                                case 1.6:
                                    scoreIncrement = 1;
                                    break;
                                default:
                                    scoreIncrement = 0;
                            }
                    
                            // 增加分數
                            let currentScore = parseInt(this.winsLabel.getComponent(cc.Label).string);
                            this.winsLabel.getComponent(cc.Label).string = (currentScore + scoreIncrement).toString();
                        }) 
                        .start(); 
                   
                    console.log("ppppp :" + gold.position);

                    // 閃爍
                    cc.tween(sheep)
                        .to(0.05, { opacity: 50 }) 
                        .to(0.05, { opacity: 255 }) 
                        .start();  
                        
                    
                        
                }
                
                //當羊的HP歸零時
                if(sheep["HP"] <= 0){
                    let ani = sheep.getComponent(cc.Animation);
                    const sheepFrames:cc.SpriteFrame[] = this.sheepFrame; 
                    let sprite = sheep.getComponent(cc.Sprite);
                    ani.stop();
                    //更換down圖片
                    if (this.isChanging == false && this.currentFrameIndex < this.sheepFrame.length ) {
                            this.isChanging = true;
                            sprite.spriteFrame = this.sheepFrame[this.currentFrameIndex];
                            this.currentFrameIndex++;
                            await new Promise(resolve => setTimeout(resolve, 8000 * dt)); // 等待1秒
                            this.isChanging = false;
                    } else if (this.currentFrameIndex == this.sheepFrame.length) {
                        this.currentFrameIndex = 0;
                        this.recycleNode(sheep, "sheep"); // 圖片顯示完畢後回收節點
                    }                  
                }
            });
        });   
    }
    
    public poolsNode(name: string): cc.Node {//根據該名稱從pools物件中獲取對應的節點池
        let pool = this.pools[name];
        
        let node;
        if (pool.size() == 0){
            node = cc.instantiate(this.templates[name]);
        } else {
            node = pool.get();
        } 

        return node;
    }

    public recycleNode(node: cc.Node, name: string): void {
        let pool = this.pools[name];
        if (name === "bullet") {
            node["firstHit"] = true; 
        }
        if (name === "sheep") {
            let ani = node.getComponent(cc.Animation);
            ani.play("run");
        }
        pool.put(node);
    }

    //按鈕事件監聽
    protected handleButtonEvent(button: cc.Node, isRightButton: boolean, isTouchStart: boolean) {
        button.on(isTouchStart ? cc.Node.EventType.TOUCH_START : cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            if (isRightButton) {
                this.RButtonPressed = isTouchStart;
            } else {
                this.LButtonPressed = isTouchStart;
            }
        });
        //避免在螢幕之外放開按鈕...
        button.on(cc.Node.EventType.TOUCH_CANCEL, (event: cc.Event) => {
            if (isRightButton) {
                this.RButtonPressed = false;
            } else {
                this.LButtonPressed = false;
            }
        });
    }

}
