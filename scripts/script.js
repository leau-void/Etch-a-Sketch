const gridContainer = document.querySelector("#grid-container");
const sizeSlider = document.querySelector("#size-slider");
let applySizeCheckbox = document.querySelector("#apply-size-checkbox");
let divColorChoiceButtons = document.querySelector("#color-btns-div");
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

divColorChoiceButtons.addEventListener("click", () => {
  let target = event.target;
  if (target.classList.contains("color-btns")) defineColor(target);
})

inputColorButton.addEventListener("change", () => {
    currentColor = inputColorButton.value;
    underlineSelectedButton(this);
});

sizeSliderLinks.forEach((link) => {
    link.addEventListener("click", setSizeSliderValue)
})

// until this


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

    gridContainer.addEventListener("mouseleave", () => {
      if (event.target.classList.contains("cell")) {
      let target = event.target;
      changeCellAtHover(target);
      }
    })


}


function changeSize() {
    buildGrid(sizeSlider.value);
}


function setSizeSliderValue() {
    sizeSlider.value = this.title;
}


function changeCellAtHover(cellToChange) {

    switch(typeof currentColor) {
      case "string":
        cellToChange.style.backgroundColor = currentColor;
        break;
      case "function":
        cellToChange.style.backgroundColor = currentColor(cellToChange);
        break;
    }

}


function defineColor(buttonPressed) {
  let buttonPressedId = buttonPressed.id
  let colorChoice;
  
  underlineSelectedButton(buttonPressed);

  switch(buttonPressedId) {
    case "black-color-btn":
      colorChoice = "black";
      break;

    case "erase-btn":
      colorChoice = "transparent";
      break;

    case "random-color-btn":
      colorChoice = randomColor;
      break;

    case "rainbow-colors-btn":
      colorChoice = alternateRainbowColors;
      break;

    case "gray-scale-btn":
      colorChoice = darkenGrayScale;
      break;

    default:
      colorChoice = currentColor;
    
  }

    currentColor = colorChoice;
}


function randomColor() {
    let color = `rgb(${rand(255)}, ${rand(255)}, ${rand(255)})`
    return color;
}
 

function rand(input) {
    let output = Math.floor(Math.random() * input)
    
    return output;
}


function alternateRainbowColors() {
    let rainbowColorArray = ["#e40303", "#ff8c00", "#ffed00", "#008026", "#004dff", "#750787"];

    if (colorCounter === 6) {
        colorCounter = 0;
    } //else {
     //   colorCounter++;
    //}
    return rainbowColorArray[colorCounter++];
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


function underlineSelectedButton(selectedButton) {
  let colorChoiceButtons = document.querySelectorAll("#color-btns-div > *");

    colorChoiceButtons.forEach((button) => {
        button.style.borderBottom = "2px solid transparent";
    });
  let colorChoiceButtonsHover = document.querySelectorAll("#color-btns-div > *:hover");
    colorChoiceButtonsHover.forEach((button) => {
      button.style.borderBottom = "2px solid black";
    })
    selectedButton.style.borderBottom = "2px solid black";
}