/**********PRELOADER**********/
window.addEventListener("load", function () {
  let preloader = document.getElementById("preloader");
  let video = document.getElementById("preloader-video");

  video.addEventListener("ended", function () {
    preloader.style.display = "none";
  });
});
/**********PRELOADER**********/
