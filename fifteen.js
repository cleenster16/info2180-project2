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
}