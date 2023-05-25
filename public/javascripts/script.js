var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');
//GLOBAIS VARIAVEIS.
var sprites = new Array();

var GLOBAIS = {
    vida: 3,
    pontos: 0
}
//inserir player
sprites.push(new Sprite('images/pacman.png', 'player', 488, 144, 14, 14, 0, 4));
cnv.height = 248;

sprites[encontrar('player')].img.onload = function(){
    loop();
}

//************************************************************************************************ */
function loop(){
    
    // limpar tela
	ctx.clearRect(0,0,cnv.width,cnv.height);
	for (let i = 0 ; i < sprites.length; i++) {//percorre array de sprites

		//if (!pause && !gameOver) {/////////////
			sprites[i].exe();/////////////////  movimento do jogo...            
		//}////////////////////////////////////
		sprites[i].render();/////////////// renderiza na tela...
	}    
    ctx.font = "10px Arial";//  TEXTO...
    ctx.fillText("texto... ", cnv.width/4, cnv.height/2);
	requestAnimationFrame(loop, "canvas");
}
function encontrar(flag){//descobre index do objeto que corresponda a flag com maior index do array
	for (let i = sprites.length - 1; i >= 0; i--) {
		if (sprites[i].flag == flag) {
			return i;
		}
	}
    return false;
}
function contar(obj){//descobre quantos objetos com a mesma flag tem em jogo
    let countObj = 0;
	for (let i = sprites.length - 1; i >= 0; i--) {
		if (sprites[i].flag == obj) {
			countObj++
		}
	}
    return countObj;
}
/*********************************************************************************************************/
//paredes do laberinto 228 0
sprites.push(new Sprite('images/pacman.png', 'parede', 228, 0, 225, 4, 0, 0));
sprites.push(new Sprite('images/pacman.png', 'parede', 288, 0, 8, 28, 60, 0));
sprites.push(new Sprite('images/pacman.png', 'parede', 288, 0, 8, 28, 156, 0));
sprites.push(new Sprite('images/pacman.png', 'parede', 228, 0, 4, 48, 0, 0));
sprites.push(new Sprite('images/pacman.png', 'parede', 228, 44, 20, 16, 0, 43));
sprites.push(new Sprite('images/pacman.png', 'parede', 248, 20, 24, 8, 20, 20));
sprites.push(new Sprite('images/pacman.png', 'parede', 264, 44, 8, 40, 36, 44));
sprites.push(new Sprite('images/pacman.png', 'parede', 312, 20, 56, 8, 84, 20));
sprites.push(new Sprite('images/pacman.png', 'parede', 408, 20, 24, 8, 180, 20));
sprites.push(new Sprite('images/pacman.png', 'parede', 448, 0, 4, 48, 220, 0));
sprites.push(new Sprite('images/pacman.png', 'parede', 432, 44, 20, 16, 204, 44));
//ajustar personagem / player aos corredores do laberinto
sprites.push(new Sprite('images/pacman.png', 'ajuste', 509, 200, 7, 7, 9, 9));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 509, 200, 7, 7, 48, 9));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 509, 200, 7, 7, 9, 33));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 509, 200, 7, 7, 25, 33));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 509, 200, 7, 7, 48, 33));