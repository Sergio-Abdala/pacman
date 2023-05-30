var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');
//GLOBAIS VARIAVEIS.
var sprites = new Array();

var GLOBAIS = {
    vida: 3,
    pontos: 0,
	somar: 0,
	pause: false,
	gameOver: false,
	nerfar: false,
	fim: false,
	txt: "SCORE : ",
	contLoop: 0
}

//************************************************************************************************ */
function loop(){
    
    // limpar tela
	ctx.clearRect(0,0,cnv.width,cnv.height);
	for (let i = 0 ; i < sprites.length; i++) {//percorre array de sprites

		if (!GLOBAIS.pause && !GLOBAIS.gameOver) {/////////////
			sprites[i].exe();/////////////////  movimento do jogo...            
		}////////////////////////////////////
		sprites[i].render();/////////////// renderiza na tela...
	}
	//for secundario para remover obj depois de renderizar
    for (let k = 0 ; k < sprites.length; k++) {//percorre array de sprites
        
        if (sprites[k].flag == 'remover') {
            sprites.splice(k, 1);//eliminar do array
        }
    }
	//GLOBAIS.txt = "texto... ";
    ctx.font = "15px Arial";//  TEXTO...
	ctx.fillStyle = "#fff";
    ctx.fillText(GLOBAIS.txt, cnv.width/2+20, cnv.height/2);
	GLOBAIS.contLoop++;

	if (!contar('grao')) {//fim de jogo...
		GLOBAIS.txt = 'FIM DE JOGO... ';
		GLOBAIS.gameOver = true;
	}


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
/*******************************************************************************************************/

paredes(1);
ajuste();
graos();
power(230,10);
power(130,181);

fantom(0,105,110);
sprites[encontrar('fantom')].movRight=true;
fantom(1,105,110);
sprites[encontrar('fantom')].movRight=true;
fantom(2,105,110);
sprites[encontrar('fantom')].movLeft=true;
fantom(3,105,110);
sprites[encontrar('fantom')].movLeft=true;

cnv.width = 450;
cnv.height = 248;
//inserir player
sprites.push(new Sprite('images/pacmanTransparente.png', 'player', 488, 144, 14, 14, 104, 181));

sprites[encontrar('player')].img.onload = function(){
	GLOBAIS.pause = true;
    loop();
}
/*fruta(6,130,181);
fruta(3,150,181);*/
/********************************************************************************************/
function grao(x,y){
	sprites.push(new Sprite('images/pacmanTransparente.png', 'grao', 210, 218, 3, 3, x, y));
}
function fruta(ps, x, y) {//srcY + alt = spritesheet pontos
	let lar = 16;
	let alt = 16;
	let srcX = 504 + lar*ps;
	let srcY = 1;// + alt*tp;
	
	sprites.push(new Sprite('images/pacmanTransparente.png', 'fruta', srcX, srcY, lar, alt, x, y));
}
function fantom(tp, x, y) {//105,110 saida prisão...
	sprites.push(new Sprite('images/pacmanTransparente.png', 'fantom', 456, 64+16*tp, 16, 16, x, y));
	sprites[encontrar('fantom')].speed=0.5 + 0.2*tp;
	sprites[encontrar('fantom')].cor = tp;
}
function power(x,y){
    sprites.push(new Sprite('images/coinsTransparente.png', 'power', 34, 16, 50, 50, x, y));
	sprites[encontrar('power')].escala=.2;
	console.log('power');
}
function libertar(){
	sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 108, 114));sprites[encontrar('ajuste')].direcao = 'u';sprites[encontrar('ajuste')].zoio = 'u';
}