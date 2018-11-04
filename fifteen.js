window.onload = () => {
    const puzzlepieces = document.querySelectorAll('#puzzlearea div');
    const shufflebutton = document.querySelector("#shufflebutton");
    const blank = [300,300];

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
}