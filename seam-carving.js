var srcimg, dstimg;

function preload() {
  srcimg = loadImage('imperial_small_sobel_6.png');
  tmpimg = loadImage('imperial_small.png');
 // dstimg = loadImage('imperial_small.png');
}

function setup() {
    var seamCanvas = createCanvas(srcimg.width, srcimg.height);

    //seamCanvas.style('scale','25%');
    //outputCanvas.style('left','-500px')
    seamCanvas.position(750, 10);
    
    pixelDensity(1);
    dstimg = createImage(srcimg.width, srcimg.height);
    noLoop();
  }

  function draw(){
    srcimg.loadPixels();
    tmpimg.loadPixels();
    dstimg.loadPixels();

    const seams = {};  // one potential seam for each 1 to width
    const used = {};   // has the individual pixel been used yet?
    const finalUsed = {};
    const energy = {};
    const arr = srcimg.pixels;
    

    console.log(srcimg.height)
    const w = srcimg.width;
    const h = srcimg.height;


    console.log(w, h)
    let n =w * h;
    let outIndex=0




    for (let i = 0; i<n; i++){
      if (!finalUsed[i*4]){
        dstimg.pixels[outIndex*4] = tmpimg.pixels[i*4];
        dstimg.pixels[outIndex*4+1] = tmpimg.pixels[i*4+1];
        dstimg.pixels[outIndex*4+2] = tmpimg.pixels[i*4+2];
        outIndex++

      }
      //  dstimg.pixels[i*4]= 255;
      dstimg.pixels[i*4+3] = 255;
      
    }

    dstimg.updatePixels();
    //console.log(dstimg.pixels)
    image(srcimg, 0, 0, srcimg.width, srcimg.height);
    //image(dstimg, 0, 0, srcimg.width, srcimg.height);

  }
