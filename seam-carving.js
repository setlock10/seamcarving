var srcimg, dstimg;

function preload() {
  srcimg = loadImage('imperial_sobel_30.png');
}

function setup() {
    var seamCanvas = createCanvas(srcimg.width, srcimg.height);

    seamCanvas.style('scale','25%');
    //outputCanvas.style('left','-500px')
    seamCanvas.position(-200,-400);
    
    pixelDensity(1);
    dstimg = createImage(srcimg.width, srcimg.height);

  }

  function draw(){
    image(srcimg, 0, 0, srcimg.width, srcimg.height);
  }
