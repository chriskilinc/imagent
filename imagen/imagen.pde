void setup(){
  size(640,360);
  background(51);
  fill(255);
}

void draw() {
  drawManyCircles();
  drawCircle(width/2, 280, 6);
  
  save("output.png");
  exit();
}

void drawManyCircles(){
  for (int i = 0; i < 1000; i++){
    float x = random(width);
    float y = random(height);
    float r = random(100,255);
    float b = random(100,255);
    float g = random(100,255);
    
    noFill();
    //fill(1);
    stroke(r,g,b);
    ellipse(x,y,50,50);
    
    
  }
}

void drawCircle(int x, int radius, int level) {
  float r = random(75,255);
  float b = random(75,255);
  float g = random(75,255);
  //float tt = 126 * level/4.0;
  
  stroke(r,b,g);
  noFill();
  ellipse(x, height/2, radius*2, radius*2);      
  if(level > 1) {
    level = level - 1;
    drawCircle(x - radius/2, radius/2, level);
    drawCircle(x + radius/2, radius/2, level);
  }
  noLoop();
}
