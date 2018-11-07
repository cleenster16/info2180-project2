/*
Extra features added: 
    1. Transitions.
    2. Resizing of the grid.
*/

window.onload = () => {
    let puzzlepieces = document.querySelectorAll('#puzzlearea div');
    const shufflebutton = document.querySelector("#shufflebutton");
    let blank = [300,300];
    addElement("controls", "button", "resizebutton", "Resize");
    let resizebutton = document.getElementById("resizebutton");

    shufflebutton.onclick = shufflePuzzle;
    
    makePuzzle(4, puzzlepieces);
    addElement("controls", "button", "sizebutton", "4 x 4");
    let sizebutton = document.getElementById("sizebutton");

    resizebutton.addEventListener("click", function() {
        if (document.querySelectorAll('#puzzlearea div').length == 15){
            makePuzzle(6, document.querySelectorAll('#puzzlearea div'));
            sizebutton.innerHTML = "6 x 6";
        }else if (document.querySelectorAll('#puzzlearea div').length == 35){
            makePuzzle(3, document.querySelectorAll('#puzzlearea div'));
            sizebutton.innerHTML = "3 x 3";
        }else if (document.querySelectorAll('#puzzlearea div').length == 8){
            makePuzzle(4, document.querySelectorAll('#puzzlearea div'));
            sizebutton.innerHTML = "4 x 4";
        }
    });
    
    function makePuzzle(size, puzzlepieces){        

        blank = [(size-1)*100,(size-1)*100];

        let puzzlearea = document.getElementById("puzzlearea");
        puzzlearea.style.width = `${(size*100)}px`;
        puzzlearea.style.height = `${size*100}px`;

        let numPieces = (size * size);
        if (numPieces < puzzlepieces.length){
            for (let i=0; i < (puzzlepieces.length - numPieces)+1; i++){
                deletePiece("puzzlearea");
            } 
        }else if(numPieces > puzzlepieces.length){
            for (let i=1; i < (numPieces - puzzlepieces.length); i++){
                addPiece("puzzlearea", "div", puzzlepieces.length+i);
            }
        }

        puzzlepieces = document.querySelectorAll('#puzzlearea div');
        puzzlepieces.forEach((puzzlepiece, i) => {
            puzzlepiece.classList.add("puzzlepiece");
            puzzlepiece.style.left = `${(i % size) * 100}px`;
            puzzlepiece.style.top = `${parseInt(i / size) * 100}px`;
            bgPos = `-${puzzlepiece.style.left} -${puzzlepiece.style.top}`;
            puzzlepiece.style.backgroundPosition = bgPos;

            puzzlepiece.onmouseover = checkMoves;
            puzzlepiece.onmouseout = removeMovable;
            puzzlepiece.onclick = movePiece;

            addAnimation(puzzlepiece);
        });
    }

    function shufflePuzzle(){
        function swapPiece(piece1, piece2){
            temp = piece1.style.left;
            piece1.style.left = piece2.style.left;
            piece2.style.left = temp;
      
            temp = piece1.style.top;
            piece1.style.top = piece2.style.top;
            piece2.style.top = temp;
        }
        puzzlepieces = document.querySelectorAll('#puzzlearea div');
        for (let i = 0; i < 100; i++) {
            direction = Math.floor(Math.random()) == 1 ? "left" : "top";
            swapPiece(
                puzzlepieces[Math.floor(Math.random() * puzzlepieces.length)],
                puzzlepieces[Math.floor(Math.random() * puzzlepieces.length)]
            );
        }
    }

    function movePiece() {
        if (canMoveRight(this) || canMoveLeft(this)) {
            slidePiece(this, "left", 0);
        } else if (canMoveUp(this) || canMoveDown(this)) {
            slidePiece(this, "top", 1);
        }
    }

    function slidePiece(puzzlepiece, direction, idx) {
        temp = parseInt(puzzlepiece.style[direction]);
        puzzlepiece.style[direction] = `${blank[idx]}px`;
        blank[idx] = temp;
    }

    function canMoveLeft(puzzlepiece) {
        return (
            parseInt(puzzlepiece.style.left) - blank[0] === 100 &&
            parseInt(puzzlepiece.style.top) === blank[1]
        );
    }
    
    function canMoveRight(puzzlepiece) {
        return (
            parseInt(puzzlepiece.style.left) - blank[0] === -100 &&
            parseInt(puzzlepiece.style.top) === blank[1]
        );
    }
    
    function canMoveUp(puzzlepiece) {
        return (
            parseInt(puzzlepiece.style.top) - blank[1] === 100 &&
            parseInt(puzzlepiece.style.left) === blank[0]
        );
    }
    
    function canMoveDown(puzzlepiece) {
        return (
            parseInt(puzzlepiece.style.top) - blank[1] === -100 &&
            parseInt(puzzlepiece.style.left) === blank[0]
        );
    }

    function checkMoves() {
        if (
            canMoveRight(this) ||
            canMoveLeft(this) ||
            canMoveUp(this) ||
            canMoveDown(this)
        ){
            this.classList.add("movablepiece");
        }
    }
    
    function removeMovable() {
        this.classList.remove("movablepiece");
    }

    function addAnimation(puzzlepiece){
        puzzlepiece.style.transition = "all 0.7s cubic-bezier(.55,0,.1,1)";
    }

    function addElement(parentId, elementTag, elementId, html){
        var p = document.getElementById(parentId);
        var newElement = document.createElement(elementTag);
        newElement.setAttribute('id', elementId);
        newElement.innerHTML = html;
        p.appendChild(newElement);
    }

    function addPiece(parentId, elementTag, html){
        var p = document.getElementById(parentId);
        var newElement = document.createElement(elementTag);
        newElement.innerHTML = html;
        p.appendChild(newElement);
    }

    function deleteElement(elementClass){
        let element = document.getElementsByClassName(elementClass);
        element.parent.removeChild(element);
    }

    function deletePiece(parentId){
        const parent = document.getElementById(parentId);
        let element = document.querySelectorAll('#puzzlearea div');
        element[element.length-1].remove();
    }

}