(function(){
    var Game=window.Game=Class.extend({
        // 构造函数移除 resourseUrl 参数
        init:function(id){
            // 移除资源路径相关代码
            // 获得画布ctx对象
            this.canvas=document.getElementById(id);
            this.ctx=this.canvas.getContext("2d");
            // 图片路径对象
            this.RobjectTxt=null;
            // 图片对象json
            this.Robject={};
            // 帧编号
            this.f=0;
            this.actors=[];
            // 游戏帧编号
            this.gt = 0;
            // 鱼数组
            this.fishArr=[];
            this.senceNumber=0;
            // 子弹数组
            this.arrBullet=[];
            // 炮弹余量
            this.bulletCount=10;
            // 炮弹信号量
            this.a = 0;
            // 总分数
            this.score=0;
            // 背景音乐
            this.bg_music=new Audio();
            // 加载资源
            this.loadResource();
        },
        loadResource:function(){
            var self=this;
            // 加载图片累加器
            var count=0;
            // 设置页面初始图片加载文字
            self.ctx.font="28px 微软雅黑";
            self.ctx.textAlign="center";
            self.ctx.fillText("图片正在加载中.....",300,self.canvas.height*(1-0.618));

            // 直接嵌入 R.txt 中的资源路径（替代AJAX请求）
            self.RobjectTxt = {
                "fish1" : "images/fish1.png",
                "fish2" : "images/fish2.png",
                "fish3" : "images/fish3.png",
                "fish4" : "images/fish4.png",
                "fish5" : "images/fish5.png",
                "bottom" : "images/bottom.png",
                "cannon1" : "images/cannon1.png",
                "cannon2" : "images/cannon2.png",
                "cannon3" : "images/cannon3.png",
                "cannon4" : "images/cannon4.png",
                "cannon5" : "images/cannon5.png",
                "cannon6" : "images/cannon6.png",
                "cannon7" : "images/cannon7.png",
                "bullet" : "images/bullet.png",
                "coinAni1" : "images/coinAni1.png",
                "coinAni2" : "images/coinAni2.png",
                "web" : "images/web.png",
                "game_bg" : "images/game_bg_2_hd.jpg",
                "number_black":"images/number_black.png",
                "scence1_bg":"images/scence1_bg.png",
                "totalScore":"images/totalScore.png",
                "try_Again":"images/try_Again.png",
                "back_To":"images/back_To.png",
                "coinText":"images/coinText.png",
                "energy_bar":"images/energy-bar.png",
                "target_score":"images/target_score.png",
                "cannon_plus":"images/cannon_plus.png",
                "cannon_minus":"images/cannon_minus.png"
            };

            // 图片总数
            var imageAmount=_.size(self.RobjectTxt);
            // 遍历图片资源路径，加载图片
            for(var k in self.RobjectTxt){
                self.Robject[k]=new Image();
                self.Robject[k].src=self.RobjectTxt[k];
                // 监听图片加载事件
                self.Robject[k].onload=function(){
                    count++;
                    // 在画布上显示图片加载进度
                    self.ctx.clearRect(0, 0, 800, 600);
                    self.ctx.font="24px 微软雅黑";
                    self.ctx.textAlign="center";
                    self.ctx.fillStyle="white";
                    self.ctx.fillText("图片已经加载到"+count+"/"+imageAmount,300,self.canvas.height*(1-0.618));
                    // 判断是否加载完毕
                    if(count==imageAmount){
                        // 开始游戏
                        self.start();
                    }
                }
                // 处理图片加载失败
                self.Robject[k].onerror = function() {
                    console.error("图片加载失败: " + this.src);
                }
            }
        },
        start:function(){
            var self=this;
            // new出场景实例 场景管理所有实例
            this.sence=new Sence();
            this.sence.changeSense(self.senceNumber);
            this.timer=setInterval(function(){
                self.f++;
                self.ctx.clearRect(0, 0, 800, 600);
                // 场景管理所有实例update和render方法
                self.sence.show();
                self.ctx.font="26px 微软雅黑";
                self.ctx.textAlign="left";
                self.ctx.fillText("帧编号: "+self.f, 20, 20);
                if(g.senceNumber==1){
                    g.gt += 0.04;
                }
                var h = parseInt(g.gt / 360);
                var m = parseInt((g.gt - parseInt(g.gt / 360) *360) / 60);
                var mm = parseInt(g.gt - h * 360 - m * 60);
                h = h < 10 ? "0" + h : h ;
                m = m < 10 ? "0" + m : m ;
                mm = mm < 10 ? "0" + mm : mm ;
                g.ctx.fillText("游戏时间: "+ h + " : " + m + " : " + mm, 250, 70);
            }, 40);
            var self = this;
        }
    })
})()

// 计算随机数
function rnd(m,n){
    return parseInt(Math.random()*(n-m)+m);
}
