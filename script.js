const container = document.querySelector(".container");
const button = document.querySelector("#change_squares")
let side_len = 4, r = 0, g = 0, b = 0;


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

            div_square.addEventListener("mouseover", (event) => {
                //let opacity = 0;
                event.target.classList.add("green");
                //opacity = parseFloat(event.target.style.opacity) + 0.1;
                //event.target.style.opacity = "" + opacity;
            })
        }

        container.appendChild(div_row);
        updateLenghts();
    }
}


button.addEventListener("click", () => {
    side_len = prompt("Set the new number of squares per side");
    if (side_len > 100) {
        side_len = 100;
    } else if (side_len < 1) {
        side_len = 1;
    }
    container.innerHTML = "";
    createGrid();
})


createGrid();