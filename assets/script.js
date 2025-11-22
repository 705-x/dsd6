
var scanners = 0;
var hp = 8;
var shields = 4;
var deck = [];
var active_threats = [];
var available_crew_dice = 6;
var crew_dice = [];



async function loadCards() {
  var response = await fetch('cards.json');
  deck = await response.json();
  console.log(deck);
}

async function prepareDeck(gameDifficulty, gameLength){
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
}

function rollCrew(){
    crew_dice = [];
    for(let i = 0; i<available_crew_dice;i++){
        crew_dice.push(Math.floor((Math.random() * 6)+1));
    }
    console.log(crew_dice);
}


function lockIn(){
    
}

function assignCrew(){

}

function resolveThreats(){
    active_threats.forEach(threat => {
        if(threat.type = "standard"){
            console.log("standard")
        }else if(threat.type = "special"){
            console.log("special") 
        }
    });
}


function gatherCrew(){

}


async function startGame() {
  await loadCards();  
  await prepareDeck("EASY", "SHORT");  
  active_threats.push(deck[4]);
  console.log(active_threats);
  resolveThreats();
  /*while(deck.length>0){
    //kroki po kolei wdg instrukcji dsd6
    rollCrew();
    lockIn();
    assignCrew();
    drawThreat();
    resolveThreats();
    gatherCrew();
    
  }*/
}

startGame();