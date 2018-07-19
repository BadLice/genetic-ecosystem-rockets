class Circle
{
    constructor(x,y,r,fillc,strokec)
    {
      this.x=x;
      this.y=y;
      this.r=6;
      this.value=r;
      this.fillc=fillc;
      this.strokec=strokec;
    }

    draw()
    {
      stroke(this.strokec);
      fill(this.fillc);
      // var x = map(this.x,-width/10/2,width/10/2,-width/2,width/2);
      // var y = map(this.y,-height/10/2,height/10/2,-height/2,height/2);
      ellipse(this.x,this.y,this.r)
    }

    collision(o)
    {
      if(dist(o.x,o.y,this.x,this.y)<=abs(this.r))
        return true;
      else
        return false;

    }
}
