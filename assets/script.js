
var scanners = 0;
var hp = 8;
var shields = 4;

var deck = [];
var active_threats = [];
var disabled_threats = [];

var available_crew_dice = 6;
var returnable_dice = 0;
var rolled_crew_dice = [];
var crew_assignment = [0, 0, 0, 0, 0];
var crew_blocks = [false, false, false, false, false]



async function loadCards() {
  var response = await fetch('cards.json');
  deck = await response.json();
  console.log("loaded deck:")
  console.log(deck);
}

async function prepareDeck(gameDifficulty, gameLength){
   
    console.log(deck);
    
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

function drawThreat(){
    active_threats.push(Math.floor(Math.random() * deck.length))
}

function rollCrewAndLockIn(){
    crew_dice = [];
    for(let i = 0; i<available_crew_dice;i++){
        x = (Math.floor((Math.random() * 6)+1))
        if(x == 6 && scanners < 3){
            scanners++;
            available_crew_dice--;
        }else if(x == 6 && scanners == 3){
            returnable_dice = 3;
            scanners = 1;
            drawThreat();
            available_crew_dice --;
        }else{
            rolled_crew_dice.push(x);
        }
    }
    console.log(rolled_crew_dice); 
}


function assignCrew(dice){
    crew_assignment[dice-1] += 1;
    console.log(crew_assignment);
}

function resolveThreats(){

    let threat_die = Math.floor((Math.random() * 6)+1);
    console.log("threat die throw:" + threat_die)

    active_threats.forEach(threat => {
        if(threat.activation_values.includes(threat_die)){
            if(threat.type = "standard"){
                if(threat.effect["ignore_shields"]){
                    hp -= threat.effect["damage"];
                }else{
                    for(let i = 0; i<threat.effect["damage"];i++){
                        if(shields>0){
                            shields -= 1;
                        }else{
                            hp -= 1;
                        }
                    }
                }
            }else if(threat.type = "special"){
                console.log("special");
                //eval(threat.effect["functionName"] + "()")
            }
        }
    });
}




async function startGame() {
  await loadCards();  
  prepareDeck("EASY", "SHORT");  
  active_threats.push(deck[4]);
  console.log()
  console.log(deck[4].effect.damage);
  rollCrewAndLockIn(); 
  assignCrew();

  /*while(deck.length>0){
    //kroki po kolei wdg instrukcji dsd6
    rollCrew();
    lockIn();
    assignCrew();
    drawThreat();
    resolveThreats();
    available_dice += returnable_dice;
    
  }*/
}

startGame();