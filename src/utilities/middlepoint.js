


function convertToCoordinates(lat, long) {
  //Converts decimal formatted latitude and longitude into radians.
  lat = lat * (Math.PI / 180);
  long = long * (Math.PI / 180);

  //Convert latitude and longitude to cartesian (x,y,z) coordinates.
  let x = (Math.cos(lat)) * (Math.cos(long));
  let y = Math.cos(lat) * Math.sin(long);
  let z = Math.sin(lat);
  return { x: x, y: y, z: z };
}
//Convert cartesian coordinates to latitude and longitude for the midpoint.
function findMiddlepoint(x, y, z) {
  let long = Math.atan2(y, x);
  let hyp = Math.sqrt((x * x) + (y * y));
  let lat = Math.atan2(z, hyp);

  lat = lat * (180 / Math.PI);
  long = long * (180 / Math.PI);

  return [lat, long]
}

//Convert the midpoint latitude and longitude from radians to degrees.
export function middlepoint(array) {
  let arr = [];
  array.map(item => arr.push(convertToCoordinates(item.lat, item.long)));
  console.log(arr);
  let x = 0;
  let y = 0;
  let z = 0;
//Iterates through the x, y, z coordinates (regardless of how many) and will add them all up and divide the amount of items in the array.
  for (let i = 0; i < arr.length; i++) {
    x += arr[i].x;
    y += arr[i].y;
    z += arr[i].z;
  }
  x = x / arr.length;
  y = y / arr.length;
  z = z / arr.length;
  return findMiddlepoint(x, y, z);
  // console.log(x, y, z);
}

