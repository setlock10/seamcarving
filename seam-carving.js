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
    dstimg = createImage(srcimg.width -44, srcimg.height);
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

    for(let i = 1; i <w-1; i++){
    //for(let i = 11; i <25; i+=3){
        seams[i]=[i];
      energy[i] = arr[i*4];
      let newI = i;
     for(let j = 0; j <h -1; j++){
       let n = (j * w) + newI;
       let minVal = 0; // index of min value
       //console.log(n);

       let x1 = (((j + 1) * w) + newI -1) * 4;
       let x2 = (((j + 1) * w) + newI ) * 4;
       let x3 = (((j + 1) * w) + newI +1) * 4;
     //console.log(n, x1, x2, x3);
    // console.log(arr[x1], arr[x2], arr[x3]);
      // console.log('min', Math.min(arr[x1],arr[x2],arr[x3]))
      // if ((arr[x1] === arr[x2]) && (arr[x1] === arr[x3]) ){
      //   newI = newI;
      //   minVal = x2
      // }
      // else if (arr[x2] === Math.min(arr[x1],arr[x2],arr[x3])){
      //   newI = newI;
      //   minVal = x2
      //  }
      //  else if (arr[x1] === Math.min(arr[x1],arr[x2],arr[x3])){
      //   if (newI > 1){
      //     newI = newI -1;
      // } 
      //   else{
      //     newI = newI
      // }
      //   minVal = x1
      //  }
      //  else if (arr[x3] === Math.min(arr[x1],arr[x2],arr[x3])){
      //   if (newI < w- 1){
      //     newI = newI +1;
      // } 
      //   else{
      //     newI = newI
      // }
      //   minVal = x1
      //  }





      //console.log(seams[55])

      

      





       if (!used[x1] && (arr[x1] === Math.min(arr[x1],arr[x2],arr[x3]))){
         used[x1] = true;
         seams[i].push(x1/4);
         if(newI > 1)
         {newI= newI - 1;}
         else
           {newI=newI}
         energy[i]+=arr[x2];
       }
         
       else if (!used[x2] && arr[x2] === Math.min(arr[x1],arr[x2],arr[x3])){
         used[x2] = true;
         seams[i].push(x2/4);
         if(newI < h - 1)
           {newI= newI+1;}
         else
           {newI=newI}
          
        energy[i]+=arr[x3];
        }
      else if ( arr[x3] === Math.min(arr[x1],arr[x2],arr[x3])){
         used[x3] = true;
         seams[i].push(x3/4);
         if(newI > 1)
         {newI= newI;}
         else
           {newI=newI+1}
         energy[i]+=arr[x1];
        }
        else{
          seams[i] = [];
          j=h;
        }
            
     }
 }
 
 //console.log(seams);
 //console.log(used);
 //console.log(energy);

 // Culling the seams
 let badSeamCount = 0;
  for (let a in seams){
    //if (energy[a] <200 && (a >= 150 && a <= 300)){
      badSeamCount++;
      console.log(seams[a].length)
    seams[a].forEach((x) => 
    {
      finalUsed[x*4]= true;
      srcimg.pixels[x*4] = 255;
      srcimg.pixels[x*4 +1] = 0;
      srcimg.pixels[x*4 +2] = 0;
    });}
  //}
  srcimg.updatePixels();

  console.log(badSeamCount)

//   for(let i = 0; i <h; i++){

//     for(let j = 0; j <w ; j++){
//       let n = ((i * w)+ j) * 4;
//       //if (srcimg.pixels[n+1] != 0){
//         // dstimg[n] = srcimg[n];
//         // dstimg[n+1] = srcimg[n+1];
//         // dstimg[n+2] = srcimg[n+2];
//         // dstimg[n+3] = srcimg[n+3];
//         dstimg[n] = 200;
//         dstimg[n+1] = 200;
//         dstimg[n+2] = 200;
//         dstimg[n+3] = 255;
//        // dstimg.updatePixels();
// //console.log (n)
//      //}



//     }
//   }


  // let a =300;

  // seams[a].forEach((x) => 
  // {
  //   srcimg.pixels[x*4] = 255;
  //   srcimg.pixels[x*4 +1] = 0;
  //   srcimg.pixels[x*4 +2] = 0;
  // });




    // for (let i = 0; i < srcimg.height; i++){
    //   let n = ((i * srcimg.width) +300)*4;
    //   let n2 =((i * srcimg.width) +301)*4;
    //   let n3 = ((i * srcimg.width) +302)*4;
    //   let n4 =((i * srcimg.width) +303)*4;
    //   srcimg.pixels[n] = 255;
    //   srcimg.pixels[n+1] = 0;
    //   srcimg.pixels[n+2] = 0;
      // srcimg.pixels[n2] = 255;
      // srcimg.pixels[n2+1] = 0;
      // srcimg.pixels[n2+2] = 0;
      // srcimg.pixels[n3] = 255;
      // srcimg.pixels[n3+1] = 0;
      // srcimg.pixels[n3+2] = 0;
      // srcimg.pixels[n4] = 255;
      // srcimg.pixels[n4+1] = 0;
      // srcimg.pixels[n4+2] = 0;
      
    // }

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
