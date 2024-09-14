//let colorlist = ['gold', 'yellow', 'turquoise', 'red'];
var rec1 = new p5.SpeechRec(navigator.language || "en-US");
rec1.continuous = false;
rec1.interimResults = false;
rec1.onResult = showResult1;
var rec2 = new p5.SpeechRec(navigator.language || "en-US");
rec2.continuous = false;
rec2.interimResults = false;
rec2.onResult = showResult2;
var rec3 = new p5.SpeechRec(navigator.language || "en-US");
rec3.continuous = false;
rec3.interimResults = false;
rec3.onResult = showResult3;
var newRec = new p5.SpeechRec(navigator.language || "en-US");
newRec.continuous = false;
newRec.interimResults = false;
newRec.onResult = showResultNew;
var screen = 0;
var prevScreen;
var backgroundColor;
var speechRecInUse = true;
var homeButton, a1Button, a2Button, b2Button, restartButton;
var starImage, actorImage, crewImage, writerImage, writerImage2, directorImg;
var startSound, actorSound, crewSound, directorSound, writerSound, buttonHoverSound, gameMusic;
var speech;
var lastWord;

function preload() {
  soundFormats("mp3");
  startSound = loadSound("assets/buttonSound.mp3");
  buttonHoverSound = loadSound("assets/button_hover.mp3");
  crewSound = loadSound("assets/clapperboard.mp3");
  actorSound = loadSound("assets/Camera_flashes.mp3");
  directorSound = loadSound("assets/action-yell.mp3");
  writerSound = loadSound("assets/page-turn.mp3");
  gameMusic = loadSound("assets/game_music.mp3");
  starImage = loadImage("assets/star.png");
  actorImage = loadImage("assets/show-star.png");
  crewImage = loadImage("assets/film-crew.png");
  writerImage = loadImage("assets/script.png");
  writerImage2 = loadImage("assets/coffee-donuts.png");
  directorImg = loadImage("assets/director.png");
  speech = new p5.Speech("Samantha");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  homeButton = new Sprite(width/2, height/2 + 100, 100, 50, "s");
  homeButton.text = "Start";
  a1Button = new Sprite(-200, -200, 100, 50, "s");
  a2Button = new Sprite(-300, -300, 100, 50, "s");
  b1Button = new Sprite(-400, -400, 100, 50, "s");
  b2Button = new Sprite(-500, -500, 112.5, 50, "s");
  restartButton = new Sprite(-600, -600, 100, 50, "s");
  textFont("DM Serif Display");
  textSize(20);
  allSprites.textSize = 20;
  homeButton.textSize = 25.5;
  textAlign(CENTER);
  showScreen0();
  a1Button.text = "Behind the\nscenes";
  a2Button.text = "Actor";
  b1Button.text = "Director";
  b2Button.text = "Screenwriter";
  restartButton.text = "Restart";
  b2Button.textSize = 20;
  allSprites.color = "#009B77";
  rec1.start();
  speech.setLang(navigator.language || "en-US");
  starImage.resize(300, 300);
  actorImage.resize(400, 400);
  crewImage.resize(450, 450);
  writerImage.resize(400, 400);
  writerImage2.resize(400, 400);
  directorImg.resize(380, 380);
  //speech.listVoices();
}

function draw() {
  textFont("DM Serif Display");
  noStroke();
  if (screen == 0 && homeButton.mouse.hovers()) {
    buttonHoverSound.play();
  }
  if (screen == 0 && homeButton.mouse.presses()) {
    screen = 1;
    startSound.play();
    showScreen1();
  }
  if (screen == 1) {
    if (a1Button.mouse.hovers() || a2Button.mouse.hovers()) {
      buttonHoverSound.play();
    }
    if (a1Button.mouse.presses()) {
      screen = 2;
      crewSound.play();
      showScreen2();
    } else if (a2Button.mouse.presses()) {
      actorSound.play();
      screen = 5;
      showScreen5();
    }
  }
  if (screen == 2) {
    if (b1Button.mouse.hovers() || b2Button.mouse.hovers()) {
      buttonHoverSound.play();
    }
    if (b1Button.mouse.presses()) {
      screen = 3;
      directorSound.play();
      showScreen3();
    }
    else if (b2Button.mouse.presses()) {
      screen = 4;
      writerSound.play();
      showScreen4();
    }
  }
  if (screen == 3 || screen == 4 || screen == 5) {
    if (restartButton.mouse.hovers()) {
      buttonHoverSound.play();
    }
    if (restartButton.mouse.presses()) {
      screen = 1;
      startSound.play();
      showScreen1();
    }
  }//gameMusic.play();
}

function showResult1() {
  gotSpeech(rec1);
  if (speechRecInUse) {
    rec2.start();
  }
}

function showResult2() {
  gotSpeech(rec2);
  if (speechRecInUse) {
    rec3.start();
  }
}

function showResult3() {
  if (speechRecInUse) {
    gotSpeech(rec3);
  }
}

function showResultNew() {
  if (speechRecInUse) {
    gotSpeech(newRec);
  }
}

function gotSpeech(recognition) {
  console.log(recognition);
  console.log(recognition.resultString);
  /*
  if (screen == 0 && recognition.resultString.localeCompare(homeButton.text) == 0) {
    screen = 1;
    showScreen1();
  }
  */
  if (speechRecInUse) {
  if (screen > 1 && recognition.resultString.localeCompare("restart", "en", {sensitivity: "base"}) == 0) {
    screen = 1;
    showScreen1();
    buttonHoverSound.play();
    startSound.play();
    rec2.start();
  }
  else if (recognition.resultString.localeCompare("stop", "en", {sensitivity: "base"}) == 0) {
    //buttonHoverSound.play();
    speechRecInUse = false;
    speech.stop();
    console.log("Voice recognition stopped.");
    speech.speak("Voice recognition stopped.");
    //recognition.end();
    /*causes an error but it's the only
    way to stop the recognition; buttons,
    music, images and sound effects
    will still work*/
    //stop recognition without causing an error
    /*
    prevScreen = screen;
    showScreen6();
    screen = 6;
    */
    //newRec = null;
  }
  else {
   switch (screen) {
    case 0:
      if (recognition.resultString.localeCompare(homeButton.text, "en", {sensitivity: "base"}) == 0) {
        screen = 1;
        buttonHoverSound.play();
        startSound.play();
        showScreen1();
      }
       else {
         speech.stop();
         speech.speak("Invalid voice command. Try again.");
         console.log("Invalid voice command. Try again.");
         if (speechRecInUse) {
          newRec.start();
         }
       }
      break;
    case 1:
      if (a1Button.text.replace("\n", " ").localeCompare(recognition.resultString.replaceAll('-', ' '), "en", {sensitivity: "base"}) == 0) {
        screen = 2;
        buttonHoverSound.play();
        crewSound.play();
        showScreen2();
      }
      else if (a2Button.text.localeCompare(recognition.resultString, "en", {sensitivity: "base"}) == 0) {
        screen = 5;
        buttonHoverSound.play();
        actorSound.play();
        showScreen5();
      }
       else {
          speech.stop();
          speech.speak("Invalid voice command. Try again.");
          console.log("Invalid voice command. Try again.");
         if (speechRecInUse) {
          rec2.start();
         }
        }
      break;
     case 2:
      if (b1Button.text.localeCompare(recognition.resultString, "en", {sensitivity: "base"}) == 0) {
        screen = 3;
        buttonHoverSound.play();
        directorSound.play();
        showScreen3();
        if (speechRecInUse) {
          newRec.start();
         }
      }
      else if (b2Button.text.localeCompare(recognition.resultString.replace(" ", ""), "en", {sensitivity: "base"}) == 0) {
        screen = 4;
        buttonHoverSound.play();
        writerSound.play();
        showScreen4();
        if (speechRecInUse) {
          newRec.start();
         }
      }
       else {
          speech.stop();
          speech.speak("Invalid voice command. Try again.");
          console.log("Invalid voice command. Try again.");
         if (speechRecInUse) {
          newRec.start();
         }
        }
       break;
     default:
        speech.stop();
        speech.speak("Invalid voice command. Try again.");
        console.log("Invalid voice command. Try again.");
       if (speechRecInUse) {
        newRec.start();
       }
      }
    }
  }
  
}

function showScreen0() {
  gameMusic.stop();
  speech.stop();
  gameMusic.play();
  gameMusic.loop();
  background("gold");
  backgroundColor = "gold";
  text("Welcome to my Choose Your Own Adventure Game! Say \"Start\" or press the button below to begin!\nFor the best playing experience, please change your Mic Mode from \"Standard\" to \"Voice Isolation.\"\nSay \"Stop\" to stop the voice recognition.", width/2, height/2);
  speech.speak("Welcome to my Choose Your Own Adventure Game! Say \"Start\" or press the button below to begin!\nFor the best playing experience, please change your Mic Mode from \"Standard\" to \"Voice Isolation,\"\nSay \"Stop\" to stop the voice recognition.");
}

function showScreen1() {
  background("gold");
  backgroundColor = "gold";
  image(starImage, width/2 - 175, height/2 - 350);
  speech.stop();
  //buttonClickedSound.play();
  text("Breaking news! The film industry is in need of new talent and crew.\nTalent scounts have been looking across the globe for a fresh face, and they scouted you!\nFirst things first: are you an actor or do you work behind the scenes?", width/2, height/2 - 100);
  speech.speak("Breaking news! The film industry is in need of new talent and crew.\nTalent scounts have been looking across the globe for a fresh face, and they scouted you!\nFirst things first: are you an actor, or do you work behind the scenes");
  homeButton.pos = {x: -700, y: -700};
  a1Button.pos = {x: width/2 - 100, y: height/2 + 100};
  a2Button.pos = {x: width/2 + 100, y: height/2 + 100};
  restartButton.pos = {x: -600, y: -800};
}

function showScreen2() {
  speech.stop();
  //buttonClickedSound.play();
  background("gold");
  backgroundColor = "gold";
  image(crewImage, width/2 + 50, height/2);
  text("Welcome to life behind the scenes!\nAre you a director or a screenwriter?", width/2, height/2 - 100);
  speech.speak("Welcome to life behind the scenes!\nAre you a director, or a screenwriter");
  a1Button.pos = {x: -800, y: -800};
  a2Button.pos = {x: -900, y: -900};
  b1Button.pos = {x: width/2 - 100, y: height/2 + 100};
  b2Button.pos = {x: width/2 + 100, y: height/2 + 100};
}

function showScreen3() {
  speech.stop();
  b1Button.pos = {x: -1000, y: -1000};
  b2Button.pos = {x: -1500, y: -1500};
  background("beige");
  backgroundColor = "beige";
  image(directorImg, width/2, height/2);
  text("As a director, you get to be in charge of the set\nand the actors' character interpretation.\n Have fun boss! Action!", width/2, height/2 - 100);
  speech.speak("As a director, you get to be in charge of the set\nand the actors' character interpretation.\n Have fun boss! Action!");
  restartButton.pos = {x: width/2, y: height/2 + 100};
}

function showScreen4() {
  speech.stop();
  //buttonClickedSound.play();
  b1Button.pos = {x: -1000, y: -1000};
  b2Button.pos = {x: -1500, y: -1500};
  background("beige");
  backgroundColor = "beige";
  text("Push that pen and get to work because you're a screenwriter!\nYou create and transcribe plots so that\n they can be brought to life by the\nrest of the film crew and the actors. You're the foundation of every movie!", width/2, height/2 - 100);
  speech.speak("Push that pen and get to work because you're a screenwriter!\nYou create and transcribe plots so that\n they can be brought to life by the\nrest of the film crew and the actors. You're the foundation of every movie!");
  image(writerImage, width/2 + 250, height/2);
  image(writerImage2, width/2 - 700, height/2);
  restartButton.pos = {x: width/2, y: height/2 + 100};
}

function showScreen5() {
  background("gold");
  backgroundColor = "gold";
  image(actorImage, width/2 + 110, height/2 - 200);
  speech.stop();
  a1Button.pos = {x: -800, y: -800};
  a2Button.pos = {x: -900, y: -900};
  restartButton.pos = {x: width/2, y: height/2 + 100};
  text("Get ready to be a big time movie star!\nA life of drama, fashion, world premieres\nand fans awaits!", width/2, height/2 - 100);
  speech.speak("Get ready to be a big time movie star!\nA life of drama, fashion, world premieres and\nfans awaits!");
}
/*
function showScreen6() {
  background(backgroundColor);
  screen = prevScreen;
  switch(screen) {
    case 1:
      showScreen1();
      break;
    case 2:
      showScreen2();
      break;
    case 3:
      showScreen3();
      break;
    case 4:
      showScreen4();
      break;
    case 5:
      showScreen5();
      break;
    default:
      showScreen0();
  }
}
*/