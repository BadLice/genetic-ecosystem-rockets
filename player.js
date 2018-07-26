class Player
{
  constructor(x, y, child)
  {
    this.dna = [];

    if (child !== undefined)
    {
      for (var i = 0; i < child.dna.length; i++)
      {
        this.dna[i] = child.dna[i];
      }
    }
    else
    {
      this.dna = [random(-1, 1), random(-1, 1), random(-1, 1), random(-1, 1)];
      //0=> multGood, 1=> multBad, 2=> distGood, 3=> distBad
    }
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 1);
    this.maxSpeed = 1;
    this.maxForce = 0.03;

    this.r = 5;
    this.life = 1;

    this.velocity.limit(this.maxSpeed);
  }

  draw()
  {
    var theta = this.velocity.heading() + PI / 2;
    fill(lerpColor(color(0, 0, 10), color(0, 0, 255), this.life));
    noStroke();
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);

    if (getDebugState())
      this.drawDebug();

    pop();

  }

  update()
  {
    this.move();
    this.eat();

    var s1 = this.seek(this.nearestBad(), this.dna[1]);
    var s2 = this.seek(this.nearestGood(), this.dna[0]);
    if (s1 !== undefined && s2 !== undefined)
    {
      var dir = p5.Vector.add(s1, s2);
      dir.limit(this.maxSpeed);
      this.acceleration.add(dir);
    }

    this.life -= 0.0005;
  }

  move()
  {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);

    this.position.add(this.velocity);
    this.acceleration.mult(0)
  }

  seek(target, mult)
  {
    //steer=desired-velocity
    if (this.reachedBoundaries())
    {
      target = createVector(0, 0);
      mult = 1;
    }
    if (target !== undefined)
    {
      var desired = p5.Vector.sub(createVector(target.x, target.y), this.position);
      desired.setMag(this.maxSpeed);

      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);
      steer.mult(mult);
    }
    else
      steer = undefined;

    return steer;
  }

  reachedBoundaries()
  {
    return (this.position.x > width / 2 - 20 || this.position.x < -width / 2 + 20 || this.position.y > height / 2 - 20 || this.position.y < -height / 2 + 20);
  }

  eat()
  {
    var food = getFood();
    var newFood = [];

    for (var o of food)
    {
      if (!o.collision(this.position))
      {
        newFood.push(o);
      }
      else
      {
        if(o.value<0)
          this.life -= this.life/100*30;
        else
          this.life += o.value;
        this.limitLife();
      }
    }

    setFood(newFood);
  }

  nearestGood()
  {
    var food = getFood();

    var min = Infinity;
    var nearest;

    for (var o of food)
    {
      var d = dist(this.position.x, this.position.y, o.x, o.y);
      if (d <= map(this.dna[2], -1, 1, 0, width / 2) && d < min && o.value >= 0)
      {
        min = d;
        nearest = o;
      }

    }

    return nearest;
  }

  nearestBad()
  {
    var food = getFood();

    var min = Infinity;
    var nearest;

    for (var o of food)
    {
      var d = dist(this.position.x, this.position.y, o.x, o.y);
      if (d <= map(this.dna[3], -1, 1, 0, width / 2) && d < min && o.value < 0)
      {
        min = d;
        nearest = o;
      }

    }

    return nearest;
  }

  limitLife()
  {
    if (this.life > 100)
      this.life = 100;
  }

  isDead()
  {
    if (this.life <= 0)
      return true;
    return false;
  }

  mutate(mr)
  {
    for (var i = 0; i < this.dna.length; i++)
    {
      if (random(1) <= mr)
      {
        this.dna[i] = random(-1, 1);
      }
    }
  }

  drawDebug()
  {
    noFill();

    //circle for fov of good
    stroke(0, 255, 0);
    ellipse(0, 0, map(this.dna[2], -1, 1, 0, width / 2) * 2);
    strokeWeight(2);
    line(0, 0, 0, -map(this.dna[0], -1, 1, -100, 100));

    strokeWeight(1);

    //circle for fov of bad
    stroke(255, 0, 0);
    ellipse(0, 0, map(this.dna[3], -1, 1, 0, width / 2) * 2);
    line(0, 0, 0, -map(this.dna[1], -1, 1, -100, 100));


  }
}
