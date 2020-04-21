/*
    Narrow Down Decision Maker JavaScript
    v1.0 | 4/20/2020
*/

// initialize all event listeners
document.getElementById("makeDecisionButton").addEventListener("click", setOptions);

document.getElementById("restart").addEventListener("click", restart);

document.getElementById("newDecision").addEventListener("click", newDecision);

document.getElementById("addOptionButton").addEventListener("click", addOptions);

document.getElementById("decideForMeButton").addEventListener("click", decideForMe);

document.getElementById("choice1").addEventListener("click", choose);

document.getElementById("choice2").addEventListener("click", choose);

//create base array for options
var options = new Array();

//initializes options array and calls appropriate methods
function setOptions(){
    var choicesIn = document.getElementsByClassName("choice-input");
    var choices = new Array();
    for(var i = 0; i < choicesIn.length; i++){
        if(choicesIn[i].value !== "")
            choices.push(choicesIn[i].value);
    }
    options = choices;
    if(options.length > 1)
        decisionMakerSetup();
    else if(options.length == 1)
        showDecision();
    else
        alert("Option fields cannot be empty");
}

//selects random options and sets buttons in decisionmaker div to those text values
function decisionMakerSetup(){
    document.getElementById("choices-in").style.display = "none";
    document.getElementById("decisionmaker").style.display = "block";
    var numOptions = options.length;
        
    var num1 = Math.floor(Math.random() * numOptions);
    do{
        var num2 = Math.floor(Math.random() * numOptions);
    }
    while(num1 == num2);

    document.getElementById("choice1").innerHTML = options[num1];
    document.getElementById("choice2").innerHTML = options[num2];
}

//removes non-selected option from options array
function choose(){
    if(this.getAttribute("id") === "choice1")
        options.splice(options.indexOf(document.getElementById("choice2").innerHTML), 1);
    else
        options.splice(options.indexOf(document.getElementById("choice1").innerHTML), 1);
    console.log(options);
    if(options.length > 1){
        decisionMakerSetup();
    }
    else{
        showDecision();
    } 
}

//displays result
function showDecision(){
    document.getElementById("decisionmaker").style.display = "none";
    document.getElementById("choices-in").style.display = "none";
    document.getElementById("decision").style.display = "block";
    document.getElementById("decision-text").innerHTML = options[0];
}

//restarts process with filled text boxes
function restart(){
    document.getElementById("choices-in").style.display = "block";
    document.getElementById("decision").style.display = "none";
}

//restarts process with empty text boxes
function newDecision(){
    var choicesIn = document.getElementsByClassName("choice-input");
    for(var i = 0; i < choicesIn.length; i++){
        choicesIn[i].value = "";
    }
    restart();
}

//adds extra text field to option input div
function addOptions(){
    var optionField = document.createElement("INPUT");
    optionField.setAttribute("type", "text");
    optionField.setAttribute("class", "choice-input");
    document.getElementById("options").appendChild(optionField);
}

//selects random option and displays that result
function decideForMe(){
    var choicesIn = document.getElementsByClassName("choice-input");
    var choices = new Array();
    for(var i = 0; i < choicesIn.length; i++){
        if(choicesIn[i].value !== ""){
            choices.push(choicesIn[i].value);
        }
    }
    if(choices.length >= 1){
        choice = choices[Math.floor(Math.random() * choices.length)];
        options = new Array(choice);
        showDecision();
    }
    else
        alert("Option fields cannot be empty");
}