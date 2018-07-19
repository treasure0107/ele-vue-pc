/**
 * Created by 520 on 2018/7/12.
 */
/*
 * //图片切换
 * */
export  default  {
  hoverTimer: null, //定时器
  moveLengh: 120, //移动的距离
  direction: "left", //移动方向
  interval: 3000, //滑动时间
  speed: 1500,
  outTimer: null,
  animatePhotos(boxId) {
    if (!boxId.find("ul").is(":animated")) {
      if (this.direction == "left") {
        boxId.find("ul").stop(false, false).animate({left: -this.moveLengh}, this.speed, () => {
          boxId.find("li:first").insertAfter(boxId.find("li:last"));
          boxId.find("ul").css({"left": 0});
        });
      }
      if (this.direction == "right") {
        boxId.find("li:last").insertBefore(boxId.find("li:first"));
        boxId.find("ul").css({"left": -this.moveLengh});
        boxId.find("ul").stop(false, false).animate({left: 0}, this.speed);
      }
    }
  },
  switchPhotos (boxID) {
    if (!boxID) return;
    let number = 10;
    let _ID = $("#" + boxID + "");
    let length = _ID.find("li").length;
    this.moveLengh = parseInt(_ID.find("li").width(), 10);
    if (this.direction == "left" || this.direction == "right") {
      _ID.find("ul").width(length * this.moveLengh);
    }
    if (length > number) {
      this.hoverTimer = window.setInterval(() => {
        this.animatePhotos(_ID);
      }, this.interval);
    } else {
      window.clearInterval(this.hoverTimer);
    }
    _ID.find("li").on("mouseenter", () => {
      if (this.hoverTimer) {
        window.clearTimeout(this.hoverTimer);
      }
    });
    _ID.find("li").on("mouseleave", () => {
      if (length > number) {
        this.hoverTimer = window.setInterval(() => {
          this.animatePhotos(_ID);
        }, this.interval);
      } else {
        window.clearInterval(this.hoverTimer);
      }
    });
  }
}
