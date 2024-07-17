const container = document.querySelector(".container");
const slider = document.querySelector(".slider");
const sides = document.querySelector(".sides")
const random_color = document.querySelector(".random_color");
const color_pick = document.querySelector("#color_pick");
const shading = document.querySelector(".shading")
const eraser = document.querySelector(".eraser");
const see_sq = document.querySelector(".see_squares");
let random = false, shade = false, draw = false, erase = false, side_len = 16;


function randomColor() {
    let r, g, b;
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
    return Array(r, g, b);
}


function updateLenghts() {
    let square_side = container.clientHeight / side_len;

    const allRows = document.querySelectorAll(".row");
    allRows.forEach(x => x.setAttribute("style", "height:" + square_side + "px"));

    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(x => x.setAttribute("style", "width:" + square_side + "px"));
}


function createGrid() {
    for (let j = 0; j<side_len; j++) {
        div_row = document.createElement("div");
        div_row.classList.add("row");

        for (let i = 0; i<side_len; i++) {
            div_square = document.createElement("div");
            div_square.classList.add("square");
            div_row.appendChild(div_square);
        }

        container.appendChild(div_row);
    }

    updateLenghts();
}


// --- Creates first grid (16x16) ---


createGrid();


// --- Events ---


slider.addEventListener("mouseup", () => {
    side_len = slider.value;
    if (side_len > 100) {
        side_len = 100;
    } else if (side_len < 1) {
        side_len = 1;
    }
    container.innerHTML = "";
    createGrid();
})


slider.addEventListener("mousemove", () => {
    sides.innerHTML = `${slider.value} x ${slider.value}`
})


random_color.addEventListener("click", () => {
    random_color.classList.toggle("green_border");
    random_color.classList.toggle("red_border");
    random = random ? false : true;
})


shading.addEventListener("click", () => {
    shading.classList.toggle("green_border");
    shading.classList.toggle("red_border");
    shade = shade ? false : true;
})


eraser.addEventListener("click", () => {
    eraser.classList.toggle("green_border");
    eraser.classList.toggle("red_border");
    erase = erase ? false : true;
})


container.addEventListener("click", (event) => {
    draw = draw ? false : true;
})


container.addEventListener("mouseover", (event) => {
    const target = event.target;

    if (target.classList.contains("square") && draw) {
        if (!erase) {
            if (!random) {
                target.style.backgroundColor = color_pick.value;
            } else {
                target.style.backgroundColor = "rgb(" + randomColor().toString() + ")";
            }
            
            if (shade && ((target.style.opacity == 1) || (target.style.opacity == ""))) {
                target.style.opacity = 0.1;
            } else if (shade && target.style.opacity < 1) {
                target.style.opacity = parseFloat(target.style.opacity) + 0.1;
            } else {
                target.style.opacity = 1;
            }
        } else {
            target.style.backgroundColor = "";
            target.style.opacity = 1;
        }
    }
})