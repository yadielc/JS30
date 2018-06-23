const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    pixels = redEffect(pixels);
    debugger;
    // mess with them
    // pixels = redEffect(pixels);

    pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.8;

    // pixels = greenScreen(pixels);
    // put them back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
snap.currentTime = 0;
snap.play();

// take data out of the canvas
const data = canvas.toDataURL('images/jpeg');
const link = document.createElement('a');
link.href = data;
link.setAttribute('download', 'handsome');
link.innerHTML = `<img src ="${data}" alt ="Handsome Man"/>`
strip.insertBefore(link, strip.firstChild);

}

function redEffect(pixels){
  for(let i = 0; i < pixels.length; i+=4){
    pixels[i] // red
    pixels[i + 1] // green
    pixels[i + 2] // blue 
  }

}

getVideo();

video.addEventListener('canplay', paintToCanvas);
