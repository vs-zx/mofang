// 角度初始化
var RotateY = 0;
var RotateX = 0;

// 起点位置
var old_x = 0;
var old_y = 0;

// 控制跟随旋转
var isRotate = false;

document.onmousedown = function (e) {
  isRotate = true;
  // 按下鼠标时，记录起点位置
  old_x = e.pageX;
  old_y = e.pageY;
};
document.onmousemove = function (e) {
  if (isRotate) {
    /**
     * 新位置减去老位置
     * 计算坐标差
     */
    var _x = e.pageX - old_x;
    var _y = e.pageY - old_y;

    // 除以70得到旋转角度，旋转角度随除数的增大而减小
    RotateY += _x / 70;
    RotateX += -(_y / 70);
    /**
     * 添加transform，盒子进行3D旋转
     */
    $("#box").css({
      transition: "linear",
      transform: "rotateX(" + RotateX + "deg) rotateY(" + RotateY + "deg)",
    });
  }
};
// 鼠标抬起时结束
document.onmouseup = function () {
  isRotate = false;
};

var clickNum = 1; //点击次数
$("#box")
  .children()
  .click(function () {
    // 如果点击次数是奇数就展开，偶数就收起
    if (clickNum % 2 == 0) {
      // 收起
      $(".out-front").css({
        transform: "translateZ(100px)",
      });
      $(".out-back").css({
        transform: "translateZ(-100px) rotateY(180deg)",
      });
      $(".out-left").css({
        transform: "translateX(-100px) rotateY(-90deg)",
      });
      $(".out-right").css({
        transform: "translateX(100px) rotateY(90deg)",
      });
      $(".out-top").css({
        transform: "translateY(-100px) rotateX(90deg)",
      });
      $(".out-bottom").css({
        transform: "translateY(100px) rotateX(-90deg)",
      });
    } else {
      // 展开
      $(".out-front").css({
        transform: "translateZ(200px)",
      });
      $(".out-back").css({
        transform: "translateZ(-200px) rotateY(180deg)",
      });
      $(".out-left").css({
        transform: "translateX(-200px) rotateY(-90deg)",
      });
      $(".out-right").css({
        transform: "translateX(200px) rotateY(90deg)",
      });
      $(".out-top").css({
        transform: "translateY(-200px) rotateX(90deg)",
      });
      $(".out-bottom").css({
        transform: "translateY(200px) rotateX(-90deg)",
      });
    }
    clickNum++;
  });

// 自动旋转
let timer = null;
function autoRotate() {
  timer = setInterval(function () {
    RotateY += 10;
    $(".box").css({
      transition: "linear 1s",
      transform: "rotateY(" + RotateY + "deg)",
    });
  }, 1000);
}
// 初始化旋转
autoRotate();

// 进入停止旋转
$(".box").mouseenter(function () {
  clearInterval(timer);
  timer = null;
});
// 离开重启旋转
$(".box").mouseleave(function () {
  autoRotate();
});
