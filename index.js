var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
var level = 0;


function newSequence() {

    level++;
    $("h1").text("Level "+level);
    var randonNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randonNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);

}

$(".btn").on("click", function(){

var userChosenColor = this.id;
userClickedPattern.push(userChosenColor);
animatePress(userChosenColor);
playSound(userChosenColor);
checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));

});


function playSound(name){

    var audioWhenClicked = new Audio('sounds/'+name+'.mp3');
    audioWhenClicked.play();

}

function animatePress(currentColor){

    $("div." + currentColor).addClass("pressed");

    setTimeout( function(){

        $("div." + currentColor).removeClass("pressed");

    }, 100);

}

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        if(currentLevel === gamePattern.length - 1){

            setTimeout(function(){
                userClickedPattern.length = 0;
                newSequence();
            }, 200);

        }


    }

    else {

        playSound("wrong");
        $("h1").addClass("game-over");
        setTimeout(function(){
            $("h1").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart!");
        resetGame();

    }


}

function resetGame(){

    gamePattern.length = 0;
    userClickedPattern.length = 0;
    level = 0;

}

$(document).on("keydown", function(){

    if(level === 0){
        newSequence();
    }

})

