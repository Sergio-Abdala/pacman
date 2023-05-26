function Sprite(imgSrc, flag, srcX, srcY, lar, alt, posX, posY){
	//atributos.............................
		this.img = new Image();
		this.img.src = imgSrc;
        this.srcX = srcX;
		this.srcY = srcY;
        this.lar = lar;
		this.alt = alt;
		this.escala = 1;
        this.posX = posX;
		this.posY = posY;
        this.movRight = false;
		this.movLeft = false;
		this.movUp = false;
		this.movDown = false;
		this.speed = 1;
        this.flag = flag;
    //metodos..............................
    this.render = function(){//renderizar em tela...
        //if (this.exibir) {
            ctx.drawImage(this.img, this.srcX, this.srcY, this.lar, this.alt, this.posX, this.posY, this.lar*this.escala, this.alt*this.escala);
        //}		
    }
    this.exe = function(){
        //movimento 
        if(this.movRight){
            this.posX += this.speed;
            
        }else if(this.movLeft){
            this.posX -= this.speed;
            
        }else{
            
        }
        if (this.movUp) {
            this.posY -= this.speed;
        }else if(this.movDown){
            this.posY += this.speed;
        }else{
			
        }
		/**********************************************************************************/
		//animação do player...............................................................
		if (this.flag == 'player') {
			if (!(GLOBAIS.contLoop % 10)) {//frequencia na mudança do sprite
				if (this.movRight) {
					this.srcY = 144;					
				}
				if (this.movLeft) {
					this.srcY = 160;
				}
				if (this.movUp) {
					this.srcY = 178;	
				}
				if (this.movDown) {
					this.srcY = 192;	
				}
				//animação
				if (this.srcX == 472) {
					this.srcX = 456;
				}else{
					this.srcX = 472;
				}
			}
		}
		//parede
		if (this.flag == 'parede') {
			bloqueando(sprites[encontrar('player')], this);
		}
		//ajuste
		if (this.flag == 'ajuste' && colide(this, sprites[encontrar('player')])) {
			
			if (!sprites[encontrar('player')].movLeft && !sprites[encontrar('player')].movRight && !sprites[encontrar('player')].movDown && !sprites[encontrar('player')].movUp) {
				//console.log('tocou ajuste parado'+ sprites[encontrar('player')].meiox() +' : '+ this.meiox());
				/*sprites[encontrar('player')].srcX = 488;
				sprites[encontrar('player')].srcY = 144;*/
				if (sprites[encontrar('player')].meiox() < this.meiox()) {
					sprites[encontrar('player')].posX++;
				}
				if (sprites[encontrar('player')].meiox() > this.meiox()) {
					sprites[encontrar('player')].posX--;
				}
				//
				if (sprites[encontrar('player')].meioy() < this.meioy()) {
					sprites[encontrar('player')].posY++;
				}
				if (sprites[encontrar('player')].meioy() > this.meioy()) {
					sprites[encontrar('player')].posY--;
				}
			}
		}
		//fruta
		if (this.flag == 'fruta' && colide(this, sprites[encontrar('player')])) {
			this.srcY += this.alt;
			this.flag = 'pontos';
		}
		//pontos
		if (this.flag == 'pontos') {
			if (this.posX < cnv.width/2+20) {
				this.posX++;
			}
			if (this.posX > cnv.width/2+20) {
				this.posX--;
			}
			if (this.posY < cnv.height/2-16) {
				this.posY++;
			}
			if (this.posY > cnv.height/2-16) {
				this.posY--;
			}
			if (this.posX == cnv.width/2+20 && this.posY == cnv.height/2-16){
				this.flag = 'remover';
				//quantos pontos
				if (this.srcX == 504) {
					//100 pontos
					GLOBAIS.somar += 100;
				}
				if (this.srcX == 520) {
					//100 pontos
					GLOBAIS.somar += 200;
				}
				if (this.srcX == 536) {
					//100 pontos
					GLOBAIS.somar += 500;
				}
				if (this.srcX == 552) {
					//100 pontos
					GLOBAIS.somar += 700;
				}
				if (this.srcX == 568) {
					//100 pontos
					GLOBAIS.somar += 1000;
				}
				if (this.srcX == 584) {
					//100 pontos
					GLOBAIS.somar += 2000;
				}
				if (this.srcX == 600) {
					//100 pontos
					GLOBAIS.somar += 5000;
				}
			}
		}
		if (GLOBAIS.somar) {
			GLOBAIS.pontos++;
			GLOBAIS.somar--;
		}
    }
}
Sprite.prototype.metax = function(){
	return (this.lar) / 2;
}
Sprite.prototype.metay = function(){
	return (this.alt) / 2;
}
Sprite.prototype.meiox = function(){
	return this.posX + this.metax();
}
Sprite.prototype.meioy = function(){
	return this.posY + this.metay();
}
function bloqueando(p1, p2){//(personagem, objeto)
	// p1 --> personagem
	// p2 --> parede bloqueante elemento de interação..
	//catetos distancia entre os pontos
	let catx = p1.meiox() - p2.meiox();
	let caty = p1.meioy() - p2.meioy();
	//soma das metades
	let somax = p1.metax() + p2.metax();
	let somay = p1.metay() + p2.metay();
	// tocando-se!!!!!!!!!!
	if (Math.abs(catx) < somax && Math.abs(caty) < somay) {
		//p2.ver = false;
		//setTimeout(function(){ p2.ver = true; }, 1000);
		let overlapx = somax - Math.abs(catx);
		let overlapy = somay - Math.abs(caty);
		if (overlapx >= overlapy) { //colisão por cima ou por baixo
			this.metaHorizontal = this.metaVertical = null;
			p1.movUp = p1.movDown = p1.movLeft = p1.movRight = false;
			if (caty > 0) { // bateu a cabeça do personagem colidiu parte de cima do personagem que esta sendo controlado
				p1.posY += overlapy;
				//
				console.log('bateu cabeça: '+ p2.id);
				if (p2.id == 'porta') {
					console.log('entrou '+ p2.txt);
					//aqui muda de fase....					
					sprites[encontrar('player')].fase = p2.txt;					
				}
			} else {
				p1.posY -= overlapy;
				//
				console.log('esta pisando: '+ p2.id);
				if (p2.id == 'porta') {
					console.log('saiu '+ p2.txt);
					//aqui muda de fase....					
					sprites[encontrar('player')].fase = p2.txt;					
				}
			}
		} else { // colisão pelos lados esquerda ou direita
			this.metaHorizontal = this.metaVertical = null;
			p1.movUp = p1.movDown = p1.movLeft = p1.movRight = false;
			if(catx > 0){ // colidiu na esquerda
				p1.posX += overlapx;
				//
				console.log('player bateu à esquerda: '+ p2.id);
			}else{
				p1.posX -= overlapx;
				//
				console.log('player bateu à direita: '+ p2.id);
			}
		}
	}
}
function empurando(p2, p1){//(personagem, objeto)
	// p1 --> personagem
	// p2 --> parede bloqueante elemento de interação..
	//catetos distancia entre os pontos
	let catx = p1.meiox() - p2.meiox();
	let caty = p1.meioy() - p2.meioy();
	//soma das metades
	let somax = p1.metax() + p2.metax();
	let somay = p1.metay() + p2.metay();
	// tocando-se!!!!!!!!!!
	if (Math.abs(catx) < somax && Math.abs(caty) < somay) {
		//p2.ver = false;
		//setTimeout(function(){ p2.ver = true; }, 1000);
		let overlapx = somax - Math.abs(catx);
		let overlapy = somay - Math.abs(caty);
		if (overlapx >= overlapy) { //colisão por cima ou por baixo
			if (caty > 0) { // bateu a cabeça do personagem colidiu parte de cima do personagem que esta sendo controlado
				p1.worldY += overlapy; 
			} else {
				p1.worldY -= overlapy;
			}
		} else { // colisão pelos lados esquerda ou direita
			if(catx > 0){ // colideu na esquerda
				p1.worldX += overlapx;
			}else{
				p1.worldX -= overlapx;
			}
		}
	}
}
function colide(p1, p2){
	// p1 --> personagem
	// p2 --> parede bloqueante elemento de interação..
	//catetos distancia entre os pontos
	let catx = p1.meiox() - p2.meiox();
	let caty = p1.meioy() - p2.meioy();
	//soma das metades
	let somax = p1.metax() + p2.metax();
	let somay = p1.metay() + p2.metay();
	// tocando-se!!!!!!!!!!
	if (Math.abs(catx) < somax && Math.abs(caty) < somay) {
		//p2.ver = false;
		return true;
	}else{
		return false;
	}
}