
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

function newThreat(){
    active_threats.push(deck[Math.floor(Math.random() * deck.length)]);
}

function drawThreats(){
    active_threats.forEach(threat => {
        var div = document.createElement("div");
        div.style.width = "350px";
        div.style.height = "100%";
        div.style.backgroundImage = `url("/assets/images/cards/${threat.image}")`;
        div.style.backgroundSize = "cover";
        div.style.border = "1px solid red"; // pomocnicze
        console.log(threat.image);
        if(threat.hp != null){
            
            document.getElementById(`${threat.hp}hp`).appendChild(div);    
        }else{
            document.getElementById("4hp").appendChild(div);  
        }  
        
    });
}

function drawDice(){
        rolled_crew_dice.forEach(dice => {
            var div = document.createElement("div");
            div.style.width = "70px";
            div.style.height = "70px";
            switch(dice){
                case 1:
                    div.style.backgroundImage = 'url("/assets/images/crew/command.png")';
                    break;
                case 2:
                    div.style.backgroundImage = 'url("/assets/images/crew/tactical.png")';
                    break;
                case 3:
                    div.style.backgroundImage = 'url("/assets/images/crew/medical.png")';
                    break;
                case 4:
                    div.style.backgroundImage = 'url("/assets/images/crew/science.png")';
                    break;
                case 5:
                    div.style.backgroundImage = 'url("/assets/images/crew/engineering.png")';
                    break;
            }
            div.onclick = () => {assignCrew(dice, div)};
            div.style.backgroundSize = "cover";
            document.getElementById("rolled-dice").appendChild(div);
        });
           
}

function kys(){

}

function rollCrewAndLockIn(){
    for(let i = 0; i<available_crew_dice;i++){
        x = (Math.floor((Math.random() * 6)+1))
        if(x == 6 && scanners < 3){
            scanners++;
            available_crew_dice--;
        }else if(x == 6 && scanners == 3){
            returnable_dice = 3;
            scanners = 1;
            newThreat();
            available_crew_dice --;
        }else{
            rolled_crew_dice.push(x);
        }
    }
    console.log(rolled_crew_dice); 
}


function assignCrew(dice, div){
    crew_assignment[dice-1] += 1;
    console.log(crew_assignment);
    div.remove();
}

function resolveThreats(){

    let threat_die = Math.floor((Math.random() * 6)+1);
    console.log("threat die throw:" + threat_die)

    active_threats.forEach(threat => {
        if(threat.activation_values.includes(threat_die)){
            if(threat.type === "standard"){
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
            }else if(threat.type === "special"){
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
  rollCrewAndLockIn(); 
  drawDice();

  newThreat();
  newThreat();
  newThreat();
  console.log("active_threats = ", active_threats);
  drawThreats();

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