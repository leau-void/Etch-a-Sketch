const gridContainer = document.querySelector("#grid-container");
const sizeSlider = document.querySelector("#size-slider");
let applySizeCheckbox = document.querySelector("#apply-size-checkbox");
let colorChoiceButtons = document.querySelectorAll(".color-btns");
let backgroundRemoveButton = document.querySelector("#background-remove-btn")
let backgroundHtml = document.querySelector("html");
let colorCounter = 5;
let inputColorButton = document.querySelector("#input-color-btn");
let sizeSliderLinks = document.querySelectorAll(".range-links")
let labels = document.querySelectorAll("label");
// starts with randomColor
let currentColor = randomColor;
//

// runs at start
buildGrid(sizeSlider.value);


applySizeCheckbox.addEventListener("change", changeSize);

colorChoiceButtons.forEach((button) => {
    button.addEventListener("click", defineColor)
});

inputColorButton.addEventListener("change", () => {
    currentColor = inputColorButton.value;
    underlineSelectedButton(this);
});

sizeSliderLinks.forEach((link) => {
    link.addEventListener("click", setSizeSliderValue)
})

backgroundRemoveButton.addEventListener("click", changeBackground);
//

function setSizeSliderValue() {
    sizeSlider.value = this.title;
}

function changeBackground() {
    let newBackgroundColor = prompt("What color would you like as a background?\r\n" + 
    "Type Black or White to change the grid lines to the opposite color.\r\n" + "Type 'default-background' to get the background image back.", "black");
    if (!!newBackgroundColor) newBackgroundColor = newBackgroundColor.toLowerCase();
    if (!!newBackgroundColor && isColor(newBackgroundColor)) {
        backgroundHtml.style.backgroundColor = newBackgroundColor;
        backgroundHtml.style.backgroundImage = "none";
        if (newBackgroundColor === "black") {
            //change border colors so they can be seen
            //only works with black, would like to find a fix
            gridContainer.style.borderColor = "white";
            let cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.style.borderColor = "white";
            })
            backgroundHtml.style.color = "white";
            labels.forEach((label) => {
                label.style.color = "white";
            });
        } else if (newBackgroundColor === "white") {
            gridContainer.style.borderColor = "black";
            let cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
            cell.style.borderColor = "black";
            })
            backgroundHtml.style.color = "black";
            labels.forEach((label) => {
                label.style.color = "black";
            });
        }
    } else if (!!newBackgroundColor && newBackgroundColor === "default-background") {
            backgroundHtml.style.backgroundImage = "url(../images/wanderer-1920x1080.jpg)";
            backgroundHtml.style.backgroundColor = "none";
            colorChoiceButtons.forEach((button) => {
                button.style.color = "black";
             });
            backgroundRemoveButton.style.color = "black";
            backgroundHtml.style.color = "black";
            labels.forEach((label) => {
                label.style.color = "white";
            });
    } else if (!!newBackgroundColor && !(isColor(newBackgroundColor))) {
        alert("Invalid input.")
    }
}

function isColor(strColor){
    var s = new Option().style;
    s.color = strColor;
    return s.color == strColor;
}

function defineColor() {
    let buttonChoice = this.id;
    if (buttonChoice === "black-color-btn") {
        buttonChoice = "black";
        underlineSelectedButton(this);
    } else if (buttonChoice === "erase-btn") {
        buttonChoice = "transparent";
        underlineSelectedButton(this);
    } else if (buttonChoice === "random-color-btn") {
        buttonChoice = randomColor;
        underlineSelectedButton(this);
    } else if (buttonChoice === "rainbow-colors-btn") {
        buttonChoice = alternateRainbowColors;
        underlineSelectedButton(this);
    } else if (buttonChoice === "gray-scale-btn") {
        buttonChoice = darkenGrayScale;
        underlineSelectedButton(this);
    } else {
        buttonChoice = currentColor;
    }

    currentColor = buttonChoice;
}

function underlineSelectedButton(selectedButton) {
    colorChoiceButtons.forEach((button) => {
        button.style.borderBottom = "2px solid transparent";
    });
    selectedButton.style.borderBottom = "2px solid black";
}

function darkenGrayScale(cell) {
    let currentCellColor = cell.style.backgroundColor;
    
    if (!currentCellColor || currentCellColor[0] !== "r") return "rgb(255, 255, 255)";
   
    let arrayCellColorRgb = currentCellColor.split(",");
    let valueR = arrayCellColorRgb[0].slice(4);
    let valueG = Number(arrayCellColorRgb[1]);
    let valueB = arrayCellColorRgb[2].substring(1, arrayCellColorRgb[2].length -1);
   
    if (valueR == 0 || valueR != valueG || valueR != valueB || valueR < 25) {
     return "rgb(255, 255, 255)";
   } 

   let newRgbValue = (valueR - 25);
   return `rgb(${newRgbValue}, ${newRgbValue}, ${newRgbValue})`
}

function alternateRainbowColors() {
    let rainbowColorArray = ["#e40303", "#ff8c00", "#ffed00", "#008026", "#004dff", "#750787"];

if (colorCounter === 5) {
    colorCounter = 0;
} else {
    colorCounter++;
}
return rainbowColorArray[colorCounter];
}

function changeSize() {
    buildGrid(sizeSlider.value);
}

function changeCellAtHover() {
    if (typeof currentColor === "function") {
        this.style.backgroundColor = currentColor(this);
    } else if (typeof currentColor === "string") {
        this.style.backgroundColor = currentColor;
    }
}

function buildGrid(cellsPerSide) {
  
    //remove old cells
    let oldCells = document.querySelectorAll(".cell");
    oldCells.forEach((cell) => cell.remove());
  
    //grid size container
    gridContainer.style.gridTemplateColumns = `repeat(${cellsPerSide}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${cellsPerSide}, 1fr)`;
  
  
    let cellsTotal = (cellsPerSide ** 2);

    for (let i=0; i < cellsTotal; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        gridContainer.appendChild(cell);
    }

    //add eventListeners
    let cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
        cell.addEventListener("mouseenter", changeCellAtHover)
    });

}



function randomColor() {
  let color = `rgb(${rand(255)}, ${rand(255)}, ${rand(255)})`
  return color;
}

function rand(input) {
  let output = Math.floor(Math.random() * input)
  
  return output;
}