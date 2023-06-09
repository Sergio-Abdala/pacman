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
	feedback: null,
	status: null,
	fruta: 0,
	adv: true,
	qts: 12,//quantas posições aparecem no rank...
	pontosNecessariosParaGanharVida: 15000,
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
	//animar obj em pause 
	if (GLOBAIS.status) {
		switch (GLOBAIS.status) {
			case 'morrendo':
				if (!sprites[encontrar('player')].frame) {
					playSom('morrer');
				}
				//GLOBAIS.feedback = 'pacman esta morrendo...';
				if (sprites[encontrar('player')].srcY < 220) {
					sprites[encontrar('player')].srcY = 247;
				}
				if (!(GLOBAIS.contLoop%8)) {
					//animação do pacman morrendo mudar frame depois voltar status a null
					sprites[encontrar('player')].srcX = 458 + 17*sprites[encontrar('player')].frame;
					console.log('frame '+ sprites[encontrar('player')].frame);
					if (sprites[encontrar('player')].frame > 10) {
						GLOBAIS.status = false;						
						GLOBAIS.pause = true;
						sprites[encontrar('player')].srcY = 144;
						sprites[encontrar('player')].srcX = 488;
						sprites[encontrar('player')].posX = 104;
						sprites[encontrar('player')].posY = 181;
						sprites[encontrar('player')].frame=0;
						if (GLOBAIS.vida) {
							GLOBAIS.gameOver=false;
							GLOBAIS.vida--;
							sprites[encontrar('vida')].flag = 'remover';
							playSom('start');
						}else{
							playSom('endGame');
							GLOBAIS.txt = 'FIM DE JOGO '+ GLOBAIS.pontos;
							endGame();
						}
					}else{
						sprites[encontrar('player')].frame++;
					}
				}
				break;
		
			default:
				break;
		}
	}
	//GLOBAIS.txt = "texto... ";
    ctx.font = "15px Arial";//  TEXTO...
	ctx.fillStyle = "#fff";
    ctx.fillText(GLOBAIS.txt, cnv.width/2+20, cnv.height/2);
	//
	if (GLOBAIS.feedback) {
		ctx.font = "10px Arial";
		ctx.fillText(GLOBAIS.feedback, cnv.width/2+20, cnv.height-10);
	}
	rank(GLOBAIS.qts);
	GLOBAIS.contLoop++;
	if (!contar('grao')) {//restart do jogo...
		restart();
	}
	//aciona habeas corpus apenas uma vez ao iniciar pontuação....
	if(GLOBAIS.pontos && GLOBAIS.adv){
		console.log('adv ok');
		GLOBAIS.adv = false;
		habeascorpus(2000);
		playSom('start');
	}
	//ligar ia
	if (contar('fantom') > 3) {
		if (contar('grao') < 290) {
			sprites[encontrar('fantom',3)].ia = true;				
		}else{
			sprites[encontrar('fantom',3)].ia = false;
		}
		if (contar('grao') < 190) {
			sprites[encontrar('fantom',2)].ia = true;			
		}else{
			sprites[encontrar('fantom',2)].ia = false;
		}
		if (contar('grao') < 90) {
			sprites[encontrar('fantom',1)].ia = true;
		}else{
			sprites[encontrar('fantom',1)].ia = false;
		}
		if (contar('grao') < 9) {
			sprites[encontrar('fantom')].ia = true;
		}else{
			sprites[encontrar('fantom')].ia = false;
		}
	}
	requestAnimationFrame(loop, "canvas");
}/****************************************************************************************************/

paredes(1);
ajuste();
graos();
power(6,14);
power(206,14);
power(6,215);
power(206,215);

fantom(0,105,110);sprites[encontrar('fantom')].movRight=true;
fantom(1,105,110);sprites[encontrar('fantom')].movRight=true;
fantom(2,105,110);sprites[encontrar('fantom')].movLeft=true;
fantom(3,105,110);sprites[encontrar('fantom')].movLeft=true;
feedbackFantom(0);
feedbackFantom(1);
feedbackFantom(2);
feedbackFantom(3);

vida();
timeFruta();

cnv.width = 450;
cnv.height = 248;
//inserir player
sprites.push(new Sprite('images/pacmanTransparente.png', 'player', 488, 144, 14, 14, 104, 181));

sprites[encontrar('player')].img.onload = function(){
	GLOBAIS.pause = true;
	console.log('start');	
    loop();	
}
/********************************************************************************************/
function encontrar(flag, n){//descobre index do objeto que corresponda a flag com maior index do array
	let num = n;
	for (let i = sprites.length - 1; i >= 0; i--) {
		if (sprites[i].flag == flag) {
			if(!num){
				return i;
			}
			num--;
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
	sprites.push(new Sprite('images/pacmanTransparente.png', 'ajuste', 500, 200, 7, 7, 108, 114));sprites[encontrar('ajuste')].direcao = 'u';sprites[encontrar('ajuste')].zoio = 'u';
}
function voltar(){
	while (encontrar('fantom')) {
		sprites[encontrar('fantom')].flag = 'zoio';
	}
}
function habeascorpus(t) {
	if (t > 15000) {
		t = 1000;
	}
	setTimeout(()=>{
		libertar(); //console.log('liberdade!!! ==> '+ t);				
		t += 4000;
		habeascorpus(t);
	}, t);
}
function vida(){
	for (let k = 0; k < GLOBAIS.vida; k++) {
		sprites.push(new Sprite('images/pacmanTransparente.png', 'vida', 508, 200, 8, 7, 250+8*k, 130));
		
	}
}
function addVida(){
	sprites.push(new Sprite('images/pacmanTransparente.png', 'vida', 508, 200, 8, 7, 250+8*GLOBAIS.vida, 130));
	
}
function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
}
function deleteCokie(cname){
	document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
function endGame() {	
	let cont = 0;
	let ptemp = false;
	let ntemp = false;
	do {
		if (getCookie(cont+1+'ST')) {	console.log('existe a posição '+cont+1+' => '+ getCookie(cont+1+'ST'));
			//este registro é menor que GLOBAIS.pontos
			if (parseInt(getCookie(cont+1+'ST')) < GLOBAIS.pontos && !ptemp && !ntemp) { console.log('e menor que '+ GLOBAIS.pontos);
				ptemp = getCookie(cont+1+'ST');
				ntemp = getCookie('nome'+cont);
				setCookie(cont+1+'ST',GLOBAIS.pontos, 3650);
				setCookie('nome'+cont,prompt('digite seu nome...'), 3650);
			}
			//avaliar oq tem nos temporarios
			if (ptemp && ntemp) {
				//avaliar se temporario é maior que atual
				if(ptemp > parseInt(getCookie(cont+1+'ST'))){
					
					let pt = getCookie(cont+1+'ST');
					let nt = getCookie('nome'+cont);
					setCookie(cont+1+'ST',ptemp, 3650);
					setCookie('nome'+cont,ntemp, 3650);
					ptemp = pt;
					ntemp = nt;
				}		
			}
		}else{
			setCookie(cont+1+'ST',GLOBAIS.pontos, 3650);
			setCookie('nome'+cont,prompt('digite seu nome...'), 3650);
		}
		cont++;
	} while (getCookie(cont+1+'ST') && getCookie('nome'+cont));
	//novo registro
	if (ptemp && ntemp) { console.log('novo registro');
		setCookie(cont+1+'ST',ptemp, 3650);
		setCookie('nome'+cont,ntemp, 3650);
	}else{
		setCookie(cont+1+'ST',GLOBAIS.pontos, 3650);
		setCookie('nome'+cont,prompt('digite seu nome...'), 3650);
	}
}
function rank(n) {
	for (let i = 0; i < n; i++) {
		//
		let pos = i+1;
		let col = 0;
		let lin = 0;
		let z = 0;
		if (i > 4) {
			col = 1;
			lin = 75;
			ctx.font = "9px Arial";
			z = (i-5)*5;
		}else{
			ctx.font = "10px Arial";
		}
		if (getCookie(pos+'ST') && getCookie('nome'+i)) {
			let esp;
			(pos < 10) ? esp = ' ' : esp = '';
			
			ctx.fillText(pos+'º st '+esp+ getCookie('nome'+i).substring(0, 8).toUpperCase(), cnv.width/2+2 + 120*col, 25+15*i-lin-z);
			ctx.fillText(getCookie(pos+'ST'), cnv.width/2+6 + 80 + 115*col, 25+15*i-lin-z);
			//
		}else{
			ctx.fillText(pos+'º st VAZIO 000', cnv.width/2+4 + 120*col, 25+15*i-lin-z);
		}
	}
}
function restart(){
	graos();
	power(6,14);
	power(206,14);
	power(6,215);
	power(206,215);
	sprites[encontrar('player')].posX = 104;
	sprites[encontrar('player')].posY = 181;
	voltar();
	GLOBAIS.nerfar = false;
	GLOBAIS.txt = 'VOCÊ VENCEU... ';
	GLOBAIS.pause = true;
	addVida();
	GLOBAIS.vida++;
	GLOBAIS.feedback = 'ganhou vida extra... vidas = '+GLOBAIS.vida;
	GLOBAIS.pontosNecessariosParaGanharVida += 5000;
	playSom('start');
}
function feedbackFantom(tp){	
	sprites.push(new Sprite('images/pacmanTransparente.png', 'feedback', 456, 64+16*tp, 16, 16, 230, 150+16*tp));
	sprites.push(new Sprite('images/pacman.png', 'seta', 458+16*tp, 305, 16, 16, 250, 150+16*tp));
	sprites.push(new Sprite('images/pacman.png', 'ia', 560, 283, 16, 16, 270, 150+16*tp));
}
function seta(ghost) {	
	let set = ghost.cor -3;
	(set < 0) ? set *= -1 : set;
	if (ghost.movUp) {//cor é a posição do fantasma: 0,1,2,3		
		sprites[encontrar('seta',set)].srcX = 458;
	}
	if (ghost.movRight) {//cor é a posição do fantasma: 0,1,2,3		
		sprites[encontrar('seta',set)].srcX = 458+16;
	}
	if (ghost.movDown) {//cor é a posição do fantasma: 0,1,2,3		
		sprites[encontrar('seta',set)].srcX = 458+16*2;
	}
	if (ghost.movLeft) {//cor é a posição do fantasma: 0,1,2,3	
		sprites[encontrar('seta',set)].srcX = 458+16*3;
	}
	if (ghost.ia) {
		sprites[encontrar('ia',set)].srcX = 577;
	}else{
		sprites[encontrar('ia',set)].srcX = 560;
	}
}
function playSom(tipo) {
	let som = document.createElement('audio');
	switch (tipo) {
		case 'comer':
			som.src = 'sons/comer.wav';
			break;
		case 'start':
			som.src = 'sons/start.wav';
			break;
		case 'morrer':
			som.src = 'sons/morrer.wav';
			break;
		case 'comerFantasma':
			som.src = 'sons/comerFantasma.wav';
			break;
		case 'power':
			som.src = 'sons/powerpellet and fruit.wav';
			break;
		case 'fruta':			
			som.src = 'sons/blueghost.wav';
			break;
		case 'endGame':
			som.src = 'sons/fimDeJogo.mp3';
			break;

		default:
			break;
	}
	
	som.addEventListener('canplaythrough',()=>{
		som.play();
	},false);
}
function timeFruta(tempo) {
	tempo ? tempo : tempo=5000;
	setTimeout(() => {
		if (!contar('fruta')) {
			fruta(GLOBAIS.fruta, 104,131);
			(GLOBAIS.fruta < 7) ? GLOBAIS.fruta++ : GLOBAIS.fruta = 0;
		}
	}, tempo);
}