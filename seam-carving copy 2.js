var srcimg, srcimg2, tmpimg, dstimg;

function preload() {
  srcimg = loadImage('imperial_small_sobel_6.png');
  srcimg2 = loadImage('imperial_small_sobel_6.png');
  tmpimg = loadImage('imperial_small.png');
 // dstimg = loadImage('imperial_small.png');
}

function setup() {
    var seamCanvas = createCanvas(srcimg.width, srcimg.height);

    //seamCanvas.style('scale','25%');
    //outputCanvas.style('left','-500px')
    seamCanvas.position(750, 10);
    
    pixelDensity(1);
    dstimg = createImage(srcimg.width , srcimg.height );
    noLoop();
  }

  function draw(){
    srcimg.loadPixels();
    srcimg2.loadPixels();
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

  // set first row seam nodes  
  for (let i = 0; i < w; i++){
    seams[i] = new Node(arr[i*4],i);
  }

//set first and last column to used = true
  used[0] = true;
  used[w*h-1] = true;
  for (let i = w; i <w * h; i+=w){
    used[i]=true;
    used[i-1]=true;        
  }
 //console.log(used);

 for(let i = 1; i <h; i++){
    for(let j = 1; j <w -1 ; j++){
      let minPos = null;
      let currPos = (i * w) + j

      let x1 = ((i - 1) * w) + j - 1;
      let x2 = ((i - 1) * w) + j ;
       let x3 = ((i - 1) * w) + j + 1;
   // find min of unused values
       let temp = [];
   
      if (!used[x1]) temp.push(arr[x1*4]);
      if (!used[x2]) temp.push(arr[x2*4]);
      if (!used[x3]) temp.push(arr[x3*4]);
   //console.log(temp)
   
   if (!used[x2] && arr[x2*4]===Math.min(...temp)) {
     minPos = x2;
   }
  else if (!used[x1] && arr[x1*4]===Math.min(...temp)) {
     minPos = x1;
   }
else if (!used[x3] && arr[x3*4]===Math.min(...temp)) {
     minPos = x3;
   }
   
  //  console.log(x1,x2,x3)
  //  console.log(arr[x1],arr[x2],arr[x3])
  //  console.log('minPos:', minPos, 'currPos', currPos, 'minVal:', arr[minPos] )

   // get node for min from seams
   let minNode = seams[minPos]
   // set min node pos in used to true
   used[minPos] = true;

   // create new node with current values
   // set current node next to min node
   let currNode = new Node(arr[currPos*4], currPos, minNode )

   // add current node to seams
   seams[currPos] = currNode;

   // add min value to current value in srcimage
  // arr[currPos*4] += arr[minPos*4]
      
 }
}



console.log(seams[214334])

//grab the seams from the bottom rom
const fullSeams = {};

for (let i = (w * (h -1)) + 1; i < (w * h) - 1; i++){

  let node = seams[i];
  fullSeams[i] = [];
  energy[i] = 0;
  while (node.next){
    fullSeams[i].push(node.pos);
    energy[i] += node.val;
    node = node.next;
  }

}

//console.log(energy)

// let badSeamCount = 0;
// for (let a in fullSeams){
//   if (energy[a] <3000 && (a >= 150 && a <= 300)){
//     badSeamCount++;
//     console.log(fullSeams[a].length)
  fullSeams[214499].forEach((x) => 
  {
    finalUsed[x*4]= true;
    srcimg2.pixels[x*4] = 255;
    srcimg2.pixels[x*4 +1] = 0;
    srcimg2.pixels[x*4 +2] = 0;
  })
//}
//}
srcimg2.updatePixels();



// final dstimage
    // for (let i = 0; i<n; i++){
    //   if (!finalUsed[i*4]){
    //     dstimg.pixels[outIndex*4] = tmpimg.pixels[i*4];
    //     dstimg.pixels[outIndex*4+1] = tmpimg.pixels[i*4+1];
    //     dstimg.pixels[outIndex*4+2] = tmpimg.pixels[i*4+2];
    //     outIndex++

    //   }
    //   //  dstimg.pixels[i*4]= 255;
    //   dstimg.pixels[i*4+3] = 255;
      
    // }

    //test the array updates
    for (let i = 0; i<n; i++){
      if (!finalUsed[i*4]){
        dstimg.pixels[outIndex*4] = arr[i*4];
        dstimg.pixels[outIndex*4+1] = arr[i*4];
        dstimg.pixels[outIndex*4+2] = arr[i*4];
        outIndex++

      }
      //  dstimg.pixels[i*4]= 255;
      dstimg.pixels[i*4+3] = 255;
      
    }



    dstimg.updatePixels();
    //console.log(dstimg.pixels)
    image(srcimg2, 0, 0, srcimg.width, srcimg.height);
   // image(dstimg, 0, 0, srcimg.width, srcimg.height);

  }

  class Node {
    constructor(val = null, pos = null, next = null){
        this.val = val;
        this.pos = pos;
        this.next = next;
    }
}
