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
    ctx.fillText(GLOBAIS.txt+GLOBAIS.pontos, cnv.width/2+20, cnv.height/2);
	GLOBAIS.contLoop++;
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
sprites.push(new Sprite('images/pacman.png', 'parede', 264, 76, 32, 8, 36, 76));
sprites.push(new Sprite('images/pacman.png', 'parede', 312, 20, 56, 8, 84, 20));
sprites.push(new Sprite('images/pacman.png', 'parede', 408, 20, 24, 8, 180, 20));
sprites.push(new Sprite('images/pacman.png', 'parede', 448, 0, 4, 48, 220, 0));
sprites.push(new Sprite('images/pacman.png', 'parede', 432, 44, 20, 16, 204, 44));
sprites.push(new Sprite('images/pacman.png', 'parede', 288, 44, 32, 16, 60, 44));
sprites.push(new Sprite('images/pacman.png', 'parede', 336, 44, 8, 40, 108, 44));
sprites.push(new Sprite('images/pacman.png', 'parede', 312, 76, 56, 8, 84, 76));
sprites.push(new Sprite('images/pacman.png', 'parede', 360, 44, 32, 16, 132, 44));
sprites.push(new Sprite('images/pacman.png', 'parede', 408, 44, 8, 40, 180, 44));
sprites.push(new Sprite('images/pacman.png', 'parede', 384, 76, 32, 8, 156, 76));
sprites.push(new Sprite('images/pacman.png', 'parede', 228, 76, 20, 56, 0, 76));
sprites.push(new Sprite('images/pacman.png', 'parede', 264, 100, 32, 8, 36, 100));
sprites.push(new Sprite('images/pacman.png', 'parede', 264, 100, 8, 32, 36, 100));
sprites.push(new Sprite('images/pacman.png', 'parede', 312, 100, 56, 32, 84, 100));
sprites.push(new Sprite('images/pacman.png', 'parede', 384, 100, 32, 8, 156, 100));
sprites.push(new Sprite('images/pacman.png', 'parede', 408, 100, 8, 32, 180, 100));
sprites.push(new Sprite('images/pacman.png', 'parede', 432, 76, 20, 56, 204, 76));
sprites.push(new Sprite('images/pacman.png', 'parede', 288, 124, 8, 32, 60, 124));
sprites.push(new Sprite('images/pacman.png', 'parede', 264, 148, 56, 8, 36, 148));
sprites.push(new Sprite('images/pacman.png', 'parede', 336, 148, 8, 32, 108, 148));
sprites.push(new Sprite('images/pacman.png', 'parede', 312, 172, 56, 8, 84, 172));
sprites.push(new Sprite('images/pacman.png', 'parede', 384, 124, 8, 32, 156, 124));
sprites.push(new Sprite('images/pacman.png', 'parede', 360, 148, 56, 8, 132, 148));
sprites.push(new Sprite('images/pacman.png', 'parede', 264, 172, 32, 8, 36, 172));
sprites.push(new Sprite('images/pacman.png', 'parede', 384, 172, 32, 8, 156, 172));
sprites.push(new Sprite('images/pacman.png', 'parede', 228, 148, 20, 32, 0, 148));
sprites.push(new Sprite('images/pacman.png', 'parede', 432, 148, 20, 32, 204, 148));
sprites.push(new Sprite('images/pacman.png', 'parede', 336, 196, 8, 32, 108, 196));
sprites.push(new Sprite('images/pacman.png', 'parede', 312, 220, 56, 8, 84, 220));
sprites.push(new Sprite('images/pacman.png', 'parede', 228, 176, 4, 72, 0, 176));
sprites.push(new Sprite('images/pacman.png', 'parede', 448, 176, 4, 72, 220, 176));
sprites.push(new Sprite('images/pacman.png', 'parede', 248, 196, 24, 32, 20, 196));
sprites.push(new Sprite('images/pacman.png', 'parede', 408, 196, 24, 32, 180, 196));
sprites.push(new Sprite('images/pacman.png', 'parede', 288, 196, 32, 8, 60, 196));
sprites.push(new Sprite('images/pacman.png', 'parede', 288, 196, 8, 32, 60, 196));
sprites.push(new Sprite('images/pacman.png', 'parede', 360, 196, 32, 8, 132, 196));
sprites.push(new Sprite('images/pacman.png', 'parede', 384, 196, 8, 32, 156, 196));
sprites.push(new Sprite('images/pacman.png', 'parede', 228, 244, 224, 4, 0, 244));
//ajustar personagem / player aos corredores do laberinto mini pacman = srcX, srcY = 500, 200,
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 9, 9));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 48, 9));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 72, 9));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 144, 9));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 170, 9));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 210, 9));

sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 9, 33));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 25, 33));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 48, 33));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 72, 33));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 96, 33));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 120, 33));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 144, 33));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 170, 33));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 192, 33));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 210, 33));

sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 24, 64));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 48, 64));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 74, 64));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 96, 64));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 120, 64));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 144, 64));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 168, 64));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 192, 64));

sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 24, 90));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 74, 90));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 144, 90));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 192, 90));

sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 48, 114));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 74, 114));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 144, 114));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 168, 114));

sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 24, 138));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 48, 138));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 74, 138));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 96, 138));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 120, 138));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 144, 138));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 168, 138));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 192, 138));


sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 24, 162));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 74, 162));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 96, 162));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 120, 162));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 144, 162));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 192, 162));

sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 9, 185));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 24, 185));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 48, 185));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 74, 185));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 96, 185));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 120, 185));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 144, 185));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 168, 185));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 192, 185));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 210, 185));

sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 74, 210));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 96, 210));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 120, 210));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 144, 210));

sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 9, 234));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 48, 234));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 74, 234));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 144, 234));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 168, 234));
sprites.push(new Sprite('images/pacman.png', 'ajuste', 500, 200, 7, 7, 210, 234));

//grãos distancia entre grãos 8
grao(10,26);
grao(50,18);
grao(50,26);
grao(58,34);
grao(66,34);
grao(74,18);
grao(74,26);
grao(146,18);
grao(146,26);
grao(154,34);
grao(162,34);
grao(58,34);

grao(210,26);
grao(170,18);
grao(170,26);

grao(58,66);
grao(66,66);
grao(82,66);
grao(90,66);

grao(130,66);
grao(138,66);
grao(154,66);
grao(162,66);

grao(50,122);
grao(50,130);

grao(170,130);
grao(170,122);

grao(10, 186);
grao(18, 186);

grao(202, 186);
grao(210, 186);

grao(138,210);
grao(130,210);

grao(82,210);
grao(90,210);
grao(74,170);
grao(74,178);

grao(98,154);
grao(98,146);

grao(122,154);
grao(122,146);

grao(146,178);
grao(146,170);

for (let k = 0; k < 3; k++){
	grao(154+8*k,114);
	grao(50+8*k,114);
	grao(34+8*k,138);
	grao(170+8*k,138);
	grao(74,210+8*k);
	
	grao(98,194+8*k);
	grao(122,194+8*k);
	grao(146,210+8*k);
	
}
	
for (let k = 0; k < 4; k++){
	grao(50,42+8*k);//terceira linha vertical posX
	grao(98,42+8*k);//sexta posX
	grao(122,42+8*k);//setima posX
	grao(170,42+8*k);//oitava posX

}
for (let k = 0; k < 5; k++) {
	grao(34+8*k,90);
	grao(154+8*k,90);
	grao(10,194+8*k);
	grao(50,194+8*k);
	grao(170,194+8*k);
	grao(210,194+8*k);
}

for (let k = 0; k < 6; k++) {
	grao(10+8*k,10);//primeira linha horizontal cima posY e vertical posX
	grao(10+8*k,34);//segunda linha horizontal cima posY
	//
	grao(170+8*k,10);
	grao(170+8*k,34);

}
for (let k = 0; k < 8; k++) {
	grao(82+8*k,90);
	grao(82+8*k,138);
}
for (let k = 0; k < 9; k++) {
	grao(34+8*k,162);
	grao(122+8*k,162);
	grao(122+8*k,186);
	grao(34+8*k,186);
}

for (let k = 0; k < 10; k++) {
	grao(74+8*k,10);//quarta linha vertical posX
	grao(74+8*k,34);
	grao(74,66+8*k);//terceira linha horizontal posY
	grao(146,66+8*k);
	
}
for (let k = 0; k < 19; k++) {
	grao(26,42+8*k);//segunda linha vertical posX
	grao(194,42+8*k);//nona posX

	
}
for (let k = 0; k < 26; k++) {
	grao(10+8*k, 234);
}

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