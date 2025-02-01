class Sensor{
  constructor(car){
    this.car=car
    this.rayCount=5;
    this.rayLength=100; //can only see 100px ahead
    this.raySpread=Math.PI/2 //90 degree angle, great if 1 ray, place in center

    this.rays=[]
    this.readings=[]
  }

  #castRays(){

    this.rays=[]
    for (let i=0; i<this.rayCount;i++){
      const rayAngle = lerp(
        this.raySpread/2,
        -this.raySpread/2,
        this.rayCount===1? 0.5 : i/(this.rayCount-1)//max of i is rayCount -1 based on for loop. if ray is one then do half
      ) + this.car.angle //ray angle to point in same direction as car head

      const start={x:this.car.x, y:this.car.y};
      const end={
        x:this.car.x - Math.sin(rayAngle)*this.rayLength,
        y: this.car.y - Math.cos(rayAngle)*this.rayLength
      }

      //consistently create an array of segments (lines)
      //just like for borders
      this.rays.push([start,end])
    }
  }

  #getReadings(ray, roadBorders){
    let touches = []

    for(let i = 0; i< roadBorders.length; i++) {
      const touch = getIntersection(
        ray[0],
        ray[1],
        roadBorders[i][0],
        roadBorders[i][1]
      )

      if (touch){
        touches.push(touch)
      } //else nothing happens could return null
    }

    if (touches.length==0){
      return null
    } else {
      const offsets = touches.map(e=>e.offset)
      const minOffset = Math.min(...offsets)
      return touches.find(e=>e.offset == minOffset) 
    }
  }

  update(roadBorders){
    this.#castRays()
    this.readings=[]

    for(let i =0; i<this.rayCount; i++){
      this.readings.push(this.#getReadings(this.rays[i], roadBorders))
    }

  }

  draw(ctx){
    for (let i=0; i<this.rayCount;i++){
      let end = this.rays[i][1]
      if (this.readings[i]){
        end = this.readings[i]
      }
      ctx.beginPath()
      ctx.lineWidth=2
      ctx.strokeStyle="yellow"
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y) //rays start location
      ctx.lineTo(end.x, end.y) //rays end location
      ctx.stroke()


      ctx.beginPath()
      ctx.lineWidth=2
      ctx.strokeStyle="black"
      ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y) //rays start location is the end
      ctx.lineTo(end.x, end.y) //if no reading this line is so small we cannot see it
      ctx.stroke()
    }
  }
}