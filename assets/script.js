$(document).ready(function () {
  /* Variables Start  */
  var container = $("#mainContainer");
  var containerWidth = container.width();
  var containerHeight = container.height();
  var car = $("#playerCar");
  var carWidth = car.width();
  var carHeight = car.height();
  var car1 = $("#otherCar_01");
  var car2 = $("#otherCar_02");
  var car3 = $("#otherCar_03");
  var car4 = $("#otherCar_04");
  var middleLine1 =$("#middleLine_01");
  var middleLine2 =$("#middleLine_02");
  var middleLine3 =$("#middleLine_03");
  var scoreLabel = $("#scoreLabel");

  var rightMove = false;
  var leftMove = false;
  var upMove = false;
  var downMove = false;

  var isGameOver = false;
  var score = 1;

  var roadAnimation;
  /* Variables End  */


  /* car movement functions */
  $(document).keydown(function (event) {
    var key = event.keyCode;
    if (isGameOver === false) {
      if (key === 39 && rightMove===false) {
        rightMove = requestAnimationFrame(rightArrow);
      }
      if (key === 37 && leftMove === false) {
        leftMove = requestAnimationFrame(leftArrow);
      }
      if (key === 38 && upMove === false) {
        upMove = requestAnimationFrame(upArrow);
      }
      if (key === 40 && downMove === false) {
        downMove = requestAnimationFrame(downArrow);
      }
    }
  });
  $(document).keyup(function (event) {
    var key = event.keyCode;
    if (isGameOver === false) {
      if (key === 39) {
        cancelAnimationFrame(rightMove);
        rightMove = false;
      }
      if (key === 37) {
        cancelAnimationFrame(leftMove);
        leftMove = false;
      }
      if (key === 38) {
        cancelAnimationFrame(upMove);
        upMove = false;
      }
      if (key === 40) {
        cancelAnimationFrame(downMove);
        downMove = false;
      }
    }
  });

  function leftArrow() {
    if (isGameOver === false && parseInt(car.css("left")) > 0) {
      car.css("left", parseInt(car.css("left")) - 4);
      leftMove = requestAnimationFrame(leftArrow);
    }
  }
  function rightArrow() {
    if (isGameOver === false && parseInt(car.css("left")) < containerWidth - carWidth) {
      car.css("left", parseInt(car.css("left"))+4);
      rightMove = requestAnimationFrame(rightArrow);
    }
  }
  function upArrow() {
    if (isGameOver === false && parseInt(car.css("top")) > 0) {
      car.css("top", parseInt(car.css("top")) - 5);
      upMove = requestAnimationFrame(upArrow);
    }
  }
  function downArrow() {
    if (isGameOver === false && parseInt(car.css("top")) < containerHeight - carHeight) {
      car.css("top", parseInt(car.css("top")) + 5);
      downMove = requestAnimationFrame(downArrow);
    }
  }
  function moveLine(line) {
    let currentTop = parseInt(line.css('top'));
    let height = line.height();
    if (currentTop>containerHeight){
      currentTop=-(height*1.5);
    }
    line.css('top',currentTop+5);
  }

  roadAnimation=requestAnimationFrame(loop);

  function loop() {
    if (isOverLapped(car,car1)||isOverLapped(car,car2)||isOverLapped(car,car3)||isOverLapped(car,car4)){
      console.log("hit");
    }
    score++;


    if (score % 100 === 0) {
      scoreLabel.text(parseInt(scoreLabel.text()) + 1);
    }
    moveLine(middleLine1);
    moveLine(middleLine2);
    moveLine(middleLine3);
    roadAnimation=requestAnimationFrame(loop);
  }

  function isOverLapped(obj1, obj2) {

    let width1 = obj1.width();
    let height1 = obj1.height();
    let obj1_x1 = obj1.position().left;
    let obj1_y1 = obj1.position().top;
    let obj1_x2 = obj1_x1+width1;
    let obj1_y2 = obj1_y1+height1;

    let width2 = obj2.width();
    let height2 = obj2.height();
    let obj2_x1 = obj2.position().left;
    let obj2_y1 = obj2.position().top;
    let obj2_x2 = obj2_x1+width2;
    let obj2_y2 = obj2_y1+height2;

    if(obj1_y2 < obj2_y1 || obj1_y1 > obj2_y2 || obj1_x2 < obj2_x1 || obj1_x1 > obj2_x2){
      return false;
    }else {
      return true;
    }

  }
});
