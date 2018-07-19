class Population
{
      constructor(mutationRate,maxPop)
      {
        this.population = [];
        this.generation=0;
        this.mutationRate=mutationRate;
        this.finished=false;
        this.toUpdate=false;
        this.velocity=4;
        this.pos=0;
        this.maxPop=maxPop;

        for(var i=0;i<maxPop;i++)
        {
          this.population[i] = new Player(map(random(0,1),0,1,-width/2,width/2),map(random(0,1),0,1,-height/2,height/2));
        }
      }

      generate()
      {
        var newPop = []
        for(var i = this.population.length-1;i>=0;i--)
        {
          if(this.population[i].life>0)
          {
            newPop.push(this.population[i]);
            if(random(1)<0.005 && this.population.length<this.maxPop)
            {
              var child = new Player(this.population[i].position.x,this.population[i].position.y,this.population[i]);
              child.mutate(this.mutationRate);
              newPop.push(child);
            }
          }
        }
        this.population=newPop;
      }


      draw()
      {
        for(var o of this.population)
        {
            o.draw();
        }
      }

      update()
      {
        for(var i=0;i<this.velocity;i++)
        {
          for(var o of this.population)
          {
              o.update();
            }
          }
      }


    //pick one element of the population basing on its fitness and so to its probability
    pickOne()
    {
      //normalizes the probability
      this.naturalSelection();

      var select = 0;
      var selector = Math.random();
      while(selector > 0)
      {
          selector-=this.population[select].prob;
          /*scores[] is the table containing the percentage of selection of each element,
          for example, if element 3 has a 12 percent chance of being selected, scores[3] = 0.12*/
          select++;
      }
      select--;
      //Here, add element at index select to the new population
      return this.population[select].dna;
    }
}
