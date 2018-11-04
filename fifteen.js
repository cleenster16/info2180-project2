window.onload = () => {
    const puzzlepieces = document.querySelectorAll('#puzzlearea div');
    const shufflebutton = document.querySelector("#shufflebutton");
    const blank = [300,300];

    shufflebutton.onclick = shufflePuzzle;

    makePuzzle(4, puzzlepieces);

    function makePuzzle(size, puzzlepieces){
        puzzlepieces.forEach((puzzlepiece, i) => {
            puzzlepiece.classList.add("puzzlepiece");
            puzzlepiece.style.left = `${(i % size) * 100}px`;
            puzzlepiece.style.top = `${parseInt(i / size) * 100}px`;
            bgPos = `-${puzzlepiece.style.left} -${puzzlepiece.style.top}`;
            puzzlepiece.style.backgroundPosition = bgPos;

            puzzlepiece.onclick = movePiece;
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

}