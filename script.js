/*
https://github.com/taidopurason
Javascript implementation of Alasdair Turner's BZ reaction simulation
Source:
http://citeseerx.ist.psu.edu/viewdoc/download;jsessionid=22C468D25BC9BFDD3944C85D91F4A013?doi=10.1.1.487.2223&rep=rep1&type=pdf
https://www.openprocessing.org/sketch/1263#
*/
var canvas = document.getElementById("bzcanvas");
var context = canvas.getContext('2d');
var width = canvas.offsetWidth;
var height = canvas.offsetHeight;
var pixelData = context.getImageData(0, 0, width, height);
var started = 0;
var a,b,c,k1,k2,k3,p,q;
p = 0; q = 1; k1 = 1.2; k2 = 1; k3 = 1;

$('#startbtn').click(function() {
	if (!started){initialise(); draw(); started = 1;}
	else{randomise();}
	});

function createArray(x,y,z){
var A=new Array(a);
if (y){for (i=0;i<x;i++)A[i]=new Array(y);}
if (z){for (i=0;i<x;i++)for (j=0;j<y;j++)A[i][j]=new Array(z);}
return A;
}

function constrain(a,b,c){
  if (a<b){return b;}
  else if (a>c){return c;}
  else {return a;}
}

function initialise(){
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    a = createArray(width,height,2);
    b = createArray(width,height,2);
    c = createArray(width,height,2);
	randomise();
}
function randomise(){
	for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
            a[x][y][p] = Math.random();
            b[x][y][p] = Math.random();
            c[x][y][p] = Math.random();

        }
    }
}

function draw(){
	var pixels = pixelData.data;
    for (x = 0; x < width; x++) {
		for (y = 0; y < height; y++) {
		    var c_a = 0.0;
		    var c_b = 0.0;
		    var c_c = 0.0;
		    for (i = x - 1; i <= x+1; i++) {
			    for (j = y - 1; j <= y+1; j++) {
			    c_a += a[(i+width)%width][(j+height)%height][p];
			    c_b += b[(i+width)%width][(j+height)%height][p];
			    c_c += c[(i+width)%width][(j+height)%height][p];
			}
		  }
		    c_a /= 9.0;
		    c_b /= 9.0;
		    c_c /= 9.0;
		    a[x][y][q] = constrain(c_a + c_a * (k1*c_b - k3*c_c), 0, 1);
		    b[x][y][q] = constrain(c_b + c_b * (k2*c_c - k1*c_a), 0, 1);
		    c[x][y][q] = constrain(c_c + c_c * (k3*c_a - k2*c_b), 0, 1);
		  
		    index = (y * width + x) * 4;
		    pixels[index] = 255 - Math.floor(a[x][y][q] * 100);
		    pixels[index + 1] = 255 - Math.floor(a[x][y][q] * 200);
		    pixels[index + 2] = 255 - Math.floor(a[x][y][q] * 200);
		    pixels[index + 3] = 255;
		  
		}
  }
  if (p === 0) {p = 1; q = 0;}else {p = 0; q = 1;}
  context.putImageData(pixelData, 0, 0);
  setTimeout(function(){window.requestAnimationFrame(draw);}, ftime);
}