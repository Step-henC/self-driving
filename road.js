class Road{

    constructor(x, width, laneCount){
        this.x=x;
        this.width=width;
        this.laneCount = laneCount;

        this.left=x-width/2;
        this.right=x+width/2;

        const infinity = 10000000;
        this.top = -infinity;
        this.bottom = infinity;

        //need road borders to tell car where they are
        const topLeft = {x:this.left,y:this.top};
        const topRight={x:this.right, y:this.top};
        const bottomLeft= {x:this.left, y:this.bottom};
        const bottomRight = {x:this.right, y:this.bottom};

        this.borders=[ //we only have two borders now, l,r but what if we have more? So arr
            [topLeft,bottomLeft],
            [topRight, bottomRight]

        ]
        
    }

    getLaneCenter(laneIndex){
        const laneWidth = this.width/this.laneCount;
        return this.left+laneWidth/2+Math.min(laneIndex, this.laneCount-1)*laneWidth
    }

    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="white";

        for (let i=1; i<this.laneCount;i++){
            const x = lerp(this.left, this.right, i/this.laneCount)

            ctx.setLineDash([20, 20]) //20 px and then break of 20px
            ctx.beginPath();
            ctx.moveTo(x,this.top)
            ctx.lineTo(x, this.bottom)
            ctx.stroke();


        }

        ctx.setLineDash([])
        this.borders.forEach(border=>{
            ctx.beginPath()
            ctx.moveTo(border[0].x, border[0].y)
            ctx.lineTo(border[1].x, border[1].y)
            ctx.stroke()
        })
     
    }

 
}

