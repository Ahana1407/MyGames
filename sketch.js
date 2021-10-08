var girl, girlImg, girl2, girlImg2;
var virus, virusimg,sanitizer,sanitizerimg;
var edges,virusgroup;
var count=0;
var gameState= "start"
var level2,level2img;
var back2,back2img
var girlimg;
var vaccinecollected=0


function preload() {
 virusimg=loadImage("virusnew.gif")   
 vaccineimg= loadImage("images/vaccine1.png")
 vaccinatedimg= loadImage("images/vaccinated.png")
sanitizerimg=loadImage("sanitizerNew.gif")
deadvirusimg=loadImage("deadvirus.png")
level2img= loadImage("images/bgimg.png")
back2img=loadImage("images/garden.png")
girlimg=loadImage("wgirl/g1.png")
gImg=loadImage("wgirl/g0.png")
//,"wgirl/g2.png","wgirl/g3.png","wgirl/g4.png","wgirl/g5.png","wgirl/g6.png","wgirl/g7.png")
back3= loadImage("images/whjrlevel2.png")
}

function setup(){
createCanvas(windowWidth, windowHeight)

back2=createSprite(0,0,windowWidth,windowHeight)
back2.addImage(back2img)
back2.visible=false

virus = createSprite(100,100,50,50)
virus.addImage(virusimg)
virus.scale=0.5
virus.debug=true
virus.setCollider("rectangle",0,0,200,200)

sanitizer = createSprite(500,100,50,50)
sanitizer.addImage(sanitizerimg)
sanitizer.scale=0.25
sanitizer.debug=true
sanitizer.setCollider("rectangle",0,0,300,400)

deadvirus = createSprite(300,100,50,50)
deadvirus.addImage(deadvirusimg)
deadvirus.scale=0.25
deadvirus.debug=true
deadvirus.setCollider("rectangle",0,0,300,400)
deadvirus.visible=false
edges=createEdgeSprites()
virus.velocityX= Math.round(random(-5,7))
virus.velocityY= Math.round(random(-5,7))

level2= createSprite(100,100)
level2.addImage(level2img)
level2.visible=false

girl=createSprite(100,height-150,50,50)
girl.addImage(girlimg)
girl.scale=0.5
girl.visible=false

vaccinegroup=new Group()
virusgroup=new Group()

}

function draw(){
background(back2img)

sanitizer.x= mouseX
sanitizer.y=mouseY
spawnvirus()

if (sanitizer.isTouching(virusgroup)){
    count=count+1
    deadvirus.x=virus.x
    deadvirus.y=virus.y
    deadvirus.visible=true
    virus.visible=false
    virusgroup.destroyEach()
   
    console.log(count)
}
else{
    deadvirus.visible=false
    virus.visible=true
    
}

if(count>=2 ){

    //back2.visible=true
    //level2.visible=true
    var gameState= "level2"
    deadvirus.visible=false
    sanitizer.visible=false
    girl.visible=true
    virusgroup.destroyEach()
virus.visible=false
    //virus.visible=false
   // score.visible=false
 

}

if (gameState==="level2"){
    //background(0)
    background(level2img)
    


    if(keyDown("RIGHT_ARROW")){
        girl.x +=5
    }
   
    if(keyDown("left_arrow")){
        girl.x -= 5
    }

  if(keyDown("space")){
        girl.x = girl.x+5
    }
   
spawnvaccine()
spawnvirus()
    
if (girl.isTouching(vaccinegroup)){
    vaccinecollected += 1
    
    vaccine.visible=false
    vaccinegroup.destroyEach()
   girl.debug=true
    
}

}
drawSprites();
fill("black")
textSize(30)
text(" Viruses Killed : "+count,windowWidth/2,100)

if(gameState=== "level2"){
    text("vaccinecollected : "+vaccinecollected,windowWidth/4,100)
}

if(vaccinecollected >=1){
    background(vaccinatedimg)
    virus.visible=false
    vaccine.visible=false
}

}

function spawnvirus(){

if(frameCount %50 ===0){
    virus = createSprite(100,100,50,50)
    virus.x=Math.round(random(100,windowWidth-100))
    virus.y=Math.round(random(100,windowHeight-100))
    virus.velocityX= Math.round(random(-5,7))
    virus.velocityY= Math.round(random(-5,7))
    virus.addImage(virusimg)
    virus.scale=0.5

    virus.bounceOff(edges[0])
    virus.bounceOff(edges[1])
    virus.bounceOff(edges[2])
    virus.bounceOff(edges[3])
    
    virusgroup.add(virus)
    }
}

function spawnvaccine(){

    if(frameCount %50 ===0){
        vaccine = createSprite(100,100,50,50)
        vaccine.x=Math.round(random(100,windowWidth-100))
        vaccine.y=Math.round(random(100,windowHeight-100))
        vaccine.velocityX= Math.round(random(-5,7))
        vaccine.velocityY= Math.round(random(-5,7))
        vaccine.addImage(vaccineimg)
        vaccine.scale=0.5
    
        vaccine.bounceOff(edges[0])
        vaccine.bounceOff(edges[1])
        vaccine.bounceOff(edges[2])
        vaccine.bounceOff(edges[3])
        
        vaccinegroup.add(vaccine)
        }
    }



