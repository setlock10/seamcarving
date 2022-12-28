var srcimg, dstimg;

function preload() {
  srcimg = loadImage('imperial_small.png');
}

function setup() {
    var outputCanvas = createCanvas(srcimg.width, srcimg.height);

   // outputCanvas.style('scale','25%');
    //outputCanvas.style('left','-500px')
    outputCanvas.position(750,10);
    
    pixelDensity(1);
    dstimg = createImage(srcimg.width, srcimg.height);
	noLoop();
  }
  
  function draw() {
	// X-Direction Kernel
	var k1 = [
        [-4, 0, 4],
		[-6, 0, 6],
		[-4, 0, 4]
    ];
	
	srcimg.loadPixels();
	dstimg.loadPixels();
	
	var w = srcimg.width;
	var h = srcimg.height;
	for (var x = 0; x < w; x++) {
    	for (var y = 0; y < h; y++) {
		
			// INDEX POSITION IN PIXEL LIST
			var ul = ((x-1+w)%w + w*((y-1+h)%h))*4; // location of the UPPER LEFT
			var uc = ((x-0+w)%w + w*((y-1+h)%h))*4; // location of the UPPER MID
			var ur = ((x+1+w)%w + w*((y-1+h)%h))*4; // location of the UPPER RIGHT
			var ml = ((x-1+w)%w + w*((y+0+h)%h))*4; // location of the LEFT
			var mc = ((x-0+w)%w + w*((y+0+h)%h))*4; // location of the CENTER PIXEL
			var mr = ((x+1+w)%w + w*((y+0+h)%h))*4; // location of the RIGHT
			var ll = ((x-1+w)%w + w*((y+1+h)%h))*4; // location of the LOWER LEFT
			var lc = ((x-0+w)%w + w*((y+1+h)%h))*4; // location of the LOWER MID
			var lr = ((x+1+w)%w + w*((y+1+h)%h))*4; // location of the LOWER RIGHT

			// green channel only
			var p0 = srcimg.pixels[ul+1]*k1[0][0]; // upper left
			var p1 = srcimg.pixels[uc+1]*k1[0][1]; // upper mid
			var p2 = srcimg.pixels[ur+1]*k1[0][2]; // upper right
			var p3 = srcimg.pixels[ml+1]*k1[1][0]; // left
			var p4 = srcimg.pixels[mc+1]*k1[1][1]; // center pixel
			var p5 = srcimg.pixels[mr+1]*k1[1][2]; // right
			var p6 = srcimg.pixels[ll+1]*k1[2][0]; // lower left
			var p7 = srcimg.pixels[lc+1]*k1[2][1]; // lower mid
			var p8 = srcimg.pixels[lr+1]*k1[2][2]; // lower right
			var r1 = p0+p1+p2+p3+p4+p5+p6+p7+p8;

			// -1000 is the minimum value the sum could result in and 1000 is the maximum
			//var result = map(r1, -1000, 1000, 0, 255);
			var result = r1;
			
			// write pixels into destination image:
			dstimg.pixels[mc] = result; 
			dstimg.pixels[mc+1] = result; 
			dstimg.pixels[mc+2] = result; 
			dstimg.pixels[mc+3] = 255; 	
    	}
  	}	
	// update and display the pixel buffer
	// dstimg[900]=255;
	// dstimg[901]=255;
	// dstimg[902]=255;
	// dstimg[900+1]=0;
	// dstimg[900+2]=0;
	// dstimg[901+1]=0;
	// dstimg[901+2]=0;
	//dstimg[900+1]=0;
	dstimg.updatePixels();
	//console.log(dstimg.pixels[500]);
	//console.log(dstimg.get(100,100))
	image(dstimg, 0, 0, dstimg.width, dstimg.height);
	
  //  save(dstimg, 'output.png')c
}
