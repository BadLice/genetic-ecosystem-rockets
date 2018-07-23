class Food
{
  constructor(maxLife, num)
  {
    var buff = 1
    this.pool = [];
    for (var i = 0; i < num; i++)
    {
      this.pool.push(Food.nextFood());
    }
  }

  draw()
  {
    if (this.pool.length != 0)
      for (var o of this.pool)
        o.draw();
  }

  update()
  {
    if (random(1) < 0.05)
      this.pool.push(Food.nextFood());
  }

  static nextFood()
  {
    var next = new Circle(random(-width / 2 + 20, width / 2 - 20), random(-height / 2 + 20, height / 2 - 20), 0.05 * randomOne(), color(0, 0, 0), color(0, 0, 0));
    if (next.value >= 0)
      next.fillc = color(0, 255, 0);
    else
      next.fillc = color(255, 0, 0);

    return next;
  }
}

function randomOne()
{
  var n = random(-1, 2)
  if (n >= 0)
    return 10;
  else
    return -5;
}