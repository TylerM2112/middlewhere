
function middlepoint(lat, long) {
    //Converts lat and long into radians
    lat = lat * (Math.PI / 180);
    long = long * (Math.PI / 180);

    //Convert lat/long to cartesian (x,y,z) coordinates
    let x = (Math.cos(lat)) * (Math.cos(long));
    let y = Math.cos(lat) * Math.sin(long);
    let z = Math.sin(lat);
    return {x: x, y: y, z: z};
}

function middlepoint2(x, y, z) { 
    long = Math.atan2(y, x);
    let hyp = Math.sqrt((x * x) + (y * y));
    lat = Math.atan2(z, hyp);
    
    lat = lat * (180/Math.PI);
    long = long * (180/Math.PI);

    return [lat, long]
}


function addedcoords(array){
  let arr =[];
  array.map(e => e.map(item => arr.push(middlepoint(item.lat, item.long))));
  console.log(arr);
let x = 0;
let y = 0;
let z = 0;

for(let i = 0; i < arr.length; i++){
  x+=arr[i].x;
  y+=arr[i].y;
  z+=arr[i].z;
}
x = x/arr.length;
y = y/arr.length;
z = z/arr.length;
  return middlepoint2(x, y, z);
  // console.log(x, y, z);
}

// console.log(array);
console.log(addedcoords(array));