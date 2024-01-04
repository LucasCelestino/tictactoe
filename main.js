const gameboard = {
    positions: ['','','','','','','','',''],
    winnablePositions: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],
    checkWin:false
}

const gameFlow = {
    isRunningGame: true,
}

const playerController = {
    player:'',
    randomPlayer: () => {
        let random = Math.floor(Math.random() * 2);
        random === 0 ? playerController.player = 'X' : playerController.player = 'O';
    }
}

document.querySelector('.btn-play_again').addEventListener('click', reset)

playerController.randomPlayer();
renderGame();

function renderGame()
{
    document.querySelector('.gameboard').innerHTML = '';
    document.querySelector('.player-text').innerHTML = `Turno: ${playerController.player}`;

    for(i in gameboard.positions)
    {
        let div_item = document.createElement('div');
        div_item.setAttribute('data-item', i);
        div_item.classList.add('item');

        if(gameboard.positions[i] !== '')
        {
            div_item.innerHTML = gameboard.positions[i];
        }

        div_item.addEventListener('click', makePlay)

        document.querySelector('.gameboard').appendChild(div_item)
    }

    if(checkWinner('X')) {
        gameFlow.isRunningGame = false;
        gameboard.checkWin = false;
        document.querySelector('.p-win').innerHTML = 'O jogador X venceu!';
        document.querySelector('.btn-play_again').style.display = 'block';
        document.querySelector('.player-text').innerHTML = '';
    }
    else if(checkWinner('O')) {
        gameFlow.isRunningGame = false;
        gameboard.checkWin = false;
        document.querySelector('.p-win').innerHTML = 'O jogador O venceu!';
        document.querySelector('.btn-play_again').style.display = 'block';
        document.querySelector('.player-text').innerHTML = '';
    }
    else if(checkDraw()) {
        gameFlow.isRunningGame = false;
        gameboard.checkWin = false;
        document.querySelector('.p-win').innerHTML = 'O jogo deu empate!';
        document.querySelector('.btn-play_again').style.display = 'block';
        document.querySelector('.player-text').innerHTML = '';
    }

}

function makePlay(e)
{
   let item = e.target.getAttribute('data-item');

   if(gameFlow.isRunningGame && gameboard.positions[item] === '' && !gameboard.checkWin)
    {
        gameboard.positions[item] = playerController.player;
        changePlayer();
        renderGame();
    }
}

function changePlayer()
{
    playerController.player === 'X' ? playerController.player = 'O' : playerController.player = 'X';
}

function checkWinner(p)
{
    for(i in gameboard.winnablePositions)
    {

        let item = gameboard.winnablePositions[i]; // item = [0,1,2]

        if(gameboard.positions[item[0]] === p && gameboard.positions[item[1]] === p && gameboard.positions[item[2]] === p)
        {
            return true;
        }
    }
}

function reset()
{
    gameboard.positions = ['','','','','','','','',''];
    gameFlow.isRunningGame = true;
    gameboard.checkWin = false;
    document.querySelector('.p-win').innerHTML = '';
    document.querySelector('.btn-play_again').style.display = 'none';
    playerController.randomPlayer();
    renderGame();
}

function checkDraw()
{
    for(i in gameboard.positions)
    {
        if(gameboard.positions[i] == '')
        {
            return false;
        }
    }

    return true;
}