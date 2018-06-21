/**
 * Created by lenovo on 2017/11/10.
 */

window.onload=function () {
  var windowHeight=$(window).height();
  var box=$("#audio-box")[0];
  var width , height;
  var canvas=$("#canvas")[0];
  var audio=$("#audio")[0];
  var ctx=canvas.getContext("2d");
  var ac=new (window.AudioContext||window.webkitAudioContext)();
  var gainNode=ac[ac.createGain?"createGain":"createGainNode"]();
  var analyser=ac.createAnalyser();
  var fftS=256;
  var audioBufferSource = ac.createMediaElementSource(audio);

  analyser.fftSize=fftS*2;
  audioBufferSource.connect(analyser);
  analyser.connect(gainNode);
  gainNode.connect(ac.destination);

  height=box.clientHeight;
  width=box.clientWidth;
  canvas.width=width;
  canvas.height=height;

  function reSize() {
    height=box.clientHeight;
    width=box.clientWidth;
    canvas.width=width;
    canvas.height=height;
  }
  reSize();
  window.onresize=reSize;

  function draw(arr) {
    ctx.clearRect(0, 0, width, height);
    // model2
    ctx.strokeStyle = "#bbdde8";
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 30, 0, Math.PI * 2, true);
    ctx.lineWidth = 2;
    ctx.stroke();
    for (let i = 0; i < arr.length; i++) {
      R = arr[i] / 800 * 50;
      if (R != 0) {
        ctx.beginPath();
        ctx.arc(width / 2 + i * 2, height / 2, 40, Math.PI * (R / 50), Math.PI * 2 - Math.PI * (R / 50), true);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(width / 2 - i * 2, height / 2, 40, Math.PI + Math.PI * (R / 50), Math.PI - Math.PI * (R / 50), true);
        ctx.stroke();
      }
    }
  }

  function visualizer() {
    var arr=new Uint8Array(analyser.frequencyBinCount);

    requestAnimationFrame=window.requestAnimationFrame||
      window.webkitRequestAnimationFrame||
      window.mozRequestAnimationFrame;
    function v() {
      analyser.getByteFrequencyData(arr);
      draw(arr);
      requestAnimationFrame(v);
    }
    requestAnimationFrame(v);
  }
  visualizer();
};
