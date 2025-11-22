

var available_dice = 6;
var scanners = 0;
var hp = 8;
var shields = 4;
var deck = [];
var active_threats = []


async function loadCards() {
  var response = await fetch('cards.json');
  deck = await response.json();
  console.log(deck);
  return(deck);
}

function prepareDeck(gameDifficulty, gameLength){
    switch(gameDifficulty){
        case("EASY"):
            deck.splice(-6, 1)
            break;
        case("MEDIUM"):
            deck.splice(-6, 3)
            break;
        case("HARD"):
            deck.splice(-6, 6)
            break;
    }

    console.log(deck);
    
    for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    [deck[i], deck[j]] = [deck[j], deck[i]]; 
    }
    console.log(deck);
    switch(gameLength){
        case("SHORTENED"):
            deck.splice(-5,5);
            break;
        case("SHORT"):
            deck.splice(-8,8);
            break;
    }
    console.log(deck);
    return(deck)
}

function rtd(dice){
    let arr = [];
    for(let i = 0; i<dice;i++){
        arr.push(Math.floor((Math.random() * 6)+1));
    }
    console.log(arr);
    return arr;
}


function lockIn(){

}

function assignCrew(){

}

function resolveThreats(){
    active_threats.forEach(threat => {
        if(threat.type = "standard"){
            console.log("special")
        }else if(threat.type = "special"){
            console.log("Standard") 
        }
    });
}


function gatherCrew(){
    
}


async function startGame() {
  await loadCards();  
  prepareDeck("HARD", "SHORTENED");  
  while(deck.length>0){
    //kroki po kolei wdg instrukcji dsd6
    rtd();
    lockIn();
    assignCrew();
    drawThreat();
    resolveThreats();
    gatherCrew();
  }
}

startGame();