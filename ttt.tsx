import './styles.css';

export function TicTacToeHtml() {
    return (
        <>
            <dialog id="winner-modale">
            <div>
                
            </div>
            </dialog>
            <div id="tic-tac-toe-board">
                <h1>Tic Tac Toe</h1>
                <h3>&copy; 2026 Justus Decker - Written in HTML, CSS & JS</h3>
                <div className="row">
                    <div className="column" id="0_0" onClick={() => ttt.SetColumn(this)}>💤</div>
                    <div className="column" id="0_1" onClick={() => ttt.SetColumn(this)}>💤</div>
                    <div className="column" id="0_2" onClick={() => ttt.SetColumn(this)}>💤</div>
                </div>
                <div className="row">
                    <div className="column" id="1_0" onClick={() => ttt.SetColumn(this)}>💤</div>
                    <div className="column" id="1_1" onClick={() => ttt.SetColumn(this)}>💤</div>
                    <div className="column" id="1_2" onClick={() => ttt.SetColumn(this)}>💤</div>
                </div>
                <div className="row">
                    <div className="column" id="2_0" onClick={() => ttt.SetColumn(this)}>💤</div>
                    <div className="column" id="2_1" onClick={() => ttt.SetColumn(this)}>💤</div>
                    <div className="column" id="2_2" onClick={() => ttt.SetColumn(this)}>💤</div>
                </div>
            </div>
            <script src="./script.js"/>
        </>
    )
}


interface Column {
    xy: string
    content: HTMLElement
    x: number
    y: number
    isEmpty: boolean
    player: null | number
}
class TicTacToe {
    currentPlayer: boolean;
    versusCom: boolean; // unused
    modal: HTMLElement
    constructor() {
        this.currentPlayer = false;
        this.versusCom = false;
        this.modal = document.getElementById('winner-modale')!;
        

    }
    ResetColumns() {
        this.GetColumns(false).forEach(col => {
            document.getElementById(col.xy)!.innerText = '💤';
        })
    }
    
    GetColumns(rotation: boolean) {
        let Columns:Array<Column> = [];
        for (let i = 0; i < 9; i++) {
            
            const y = rotation ? i % 3 : Math.floor(i / 3);
            const x = rotation ? Math.floor(i / 3) : i % 3;
            const col = document.getElementById(`${y}_${x}`)!;
            const player = col.innerText == '❌' ? -1 : 1
            const isEmpty = col.innerText == '' || col.innerText == '💤';
            Columns.push({xy: `${y}_${x}` , content: col, x: x, y: y, isEmpty: isEmpty, player: isEmpty ? null : player})
            
        }
        console.log(Columns)
        return Columns;
    }

    ShowDrawModale() {

        this.modal.innerHTML = `<h1>Unentschieden!</h1><div onclick="window.location.reload()" id="rbtn">Neues Spiel</div>`;
        
        (this.modal as HTMLDialogElement).showModal();
    }

    ShowWinnerModale() {

        this.modal.innerHTML = `<h1>Player ${this.currentPlayer ? 1 : 2} Wins!</h1><div onclick="window.location.reload()" id="rbtn">Neues Spiel</div>`;
        
        (this.modal as HTMLDialogElement).showModal();
    }

    CheckWinCondition() {
        let e = 9;
        // not pretty and mathematical but it works for now
        const c = this.GetColumns(true)
        const c0 = Number(c[0].player)
        const c1 = Number(c[1].player)
        const c2 = Number(c[2].player)

        const c3 = Number(c[3].player)
        const c4 = Number(c[4].player)
        const c5 = Number(c[5].player)

        const c6 = Number(c[6].player)
        const c7 = Number(c[7].player)
        const c8 = Number(c[8].player)
        const win_conds = [
            {res: c0 + c1 + c2, colorize: [0, 1, 2]},
            {res: c3 + c4 + c5, colorize: [3, 4, 5]},
            {res: c6 + c7 + c8, colorize: [6, 7, 8]},

            {res: c0 + c3 + c6, colorize: [0, 3, 6]},
            {res: c1 + c4 + c7, colorize: [1, 4, 7]},
            {res: c2 + c5 + c8, colorize: [2, 5, 8]},

            {res: c0 + c4 + c8, colorize: [0, 4, 8]},
            {res: c2 + c4 + c6, colorize: [2, 4, 6]},
        ]
        
        c.forEach(element => {
            if (element.isEmpty) {
                e--;
            }
        });
        console.log("e", e)
        if (e == 9) {
            console.log("Draw");
            this.Draw();
        }

        win_conds.forEach(wc => {
            if (wc.res == 3) {
                console.log('player 1 wins');
                this.Win(wc.colorize);
                
            }
            if (wc.res == -3) {
                console.log('player 2 wins');
                this.Win(wc.colorize);
            }
        })
        
    }

    Draw() {
        const c = this.GetColumns(true)
        c.forEach(element => {
            element.content.classList.add('failure');
            element.content.classList.remove('column');
            element.content.classList.remove('blocked');
        });
        this.ShowDrawModale()
    }

    Win(colorize) {
        const c = this.GetColumns(true)
        let counter = 0;
        c.forEach(element => {
            console.log(element, counter)
            if (colorize.includes(counter)) {
                element.content.classList.add('success');
            } else {
                element.content.classList.add('failure');
            }
            element.content.classList.remove('column');
            element.content.classList.remove('blocked');
            counter++;
        });
        this.ShowWinnerModale()
    }
    SetColumn(obj) {
        let success = false;
        if (obj.innerText != '' && obj.innerText != '💤') {
            return;
        }
        if (this.currentPlayer) {
            obj.innerText = '❌';
            success = true;
        } else {
            obj.innerText = '⭕️';
            success = true;
        }
        if (success) {
            this.currentPlayer = !this.currentPlayer;
            obj.className = 'column blocked';
        }
        this.CheckWinCondition();
    }
}