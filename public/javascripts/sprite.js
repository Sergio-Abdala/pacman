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
		this.frame = 0;
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
			if (!(GLOBAIS.contLoop % 5)) {//frequencia na mudança do sprite
				if (this.movRight) {
					if (GLOBAIS.nerfar) {
						this.srcY = 0;
					}else{
						this.srcY = 144;
					}
				}
				if (this.movLeft) {
					if (GLOBAIS.nerfar) {
						this.srcY = 16;
					}else{
						this.srcY = 160;
					}					
				}
				if (this.movUp) {
					if (GLOBAIS.nerfar) {
						this.srcY = 34;
					}else{
						this.srcY = 178;
					}
				}
				if (this.movDown) {
					if (GLOBAIS.nerfar) {
						this.srcY = 48;
					}else{
						this.srcY = 192;	
					}					
				}
				//animação
				if (!GLOBAIS.status) {
					if (this.srcX == 472) {
						this.srcX = 456;
					}else{
						this.srcX = 472;
					}
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
		//grão
		if (this.flag == 'grao' && colide(this, sprites[encontrar('player')])) {
			this.flag = 'remover';
			GLOBAIS.somar++;
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
			if (this.posX > cnv.width/2+5 && this.posY < cnv.height/2+15 && this.posY > cnv.height/2-20){
				this.flag = 'remover';
				//quantos pontos
				if (this.srcX == 504) {
					//100 pontos
					GLOBAIS.somar += 100;
				}
				if (this.srcX == 520) {
					GLOBAIS.somar += 200;
				}
				if (this.srcX == 536) {
					GLOBAIS.somar += 500;
				}
				if (this.srcX == 552) {
					GLOBAIS.somar += 700;
				}
				if (this.srcX == 568) {
					GLOBAIS.somar += 1000;
				}
				if (this.srcX == 584) {
					GLOBAIS.somar += 2000;
				}
				if (this.srcX == 600) {
					GLOBAIS.somar += 5000;
				}
				//fantasmas
				if (this.srcX == 456) {
					GLOBAIS.somar += 200;
				}
				if (this.srcX == 472) {
					GLOBAIS.somar += 400;
				}
				if (this.srcX == 488) {
					GLOBAIS.somar += 800;
				}
				if (this.srcX == 504) {
					GLOBAIS.somar += 800;
				}
			}
		}
		if (GLOBAIS.somar) {
			GLOBAIS.pontos++;
			GLOBAIS.somar--;
			GLOBAIS.txt = 'SCORE: '+ GLOBAIS.pontos;
		}
		if (this.flag == 'fantom') {
			if (!(GLOBAIS.contLoop % 10)) {
				if(this.frame ){
					this.frame=0;this.srcX -= this.lar;
				}else{
					this.frame=1;this.srcX += this.lar;
				}
			}
			if (GLOBAIS.nerfar) {//fantasma nerfado
				this.srcY = 64;
				if (GLOBAIS.fim) {
					//alternando cor fim do nerf
					if (this.frame) {
						if (this.srcX != 456+this.lar*8 && this.srcX != 456+this.lar*9) {//soma 2 ao vezes para mudar pro claro de 8 para 10
							this.srcX = 456+this.lar*8;
						}
					}else{
						if (this.srcX != 456+this.lar*10 && this.srcX != 456+this.lar*11) {//soma 2 ao vezes para mudar pro claro de 8 para 10
							this.srcX = 456+this.lar*10;
						}
					}						
				}else{
					if (this.srcX != 456+this.lar*8 && this.srcX != 456+this.lar*9) {//soma 2 ao vezes para mudar pro claro de 8 para 10
						this.srcX = 456+this.lar*8;
					}
				}				
							
			}else{//fantasma normal
				this.srcY = 64+16*this.cor;
				if (this.movRight && this.srcX != 456 && this.srcX != 456+this.lar) {
					this.srcX = 456;
				}
				if (this.movLeft && this.srcX != 456+this.lar*2 && this.srcX != 456+this.lar*3) {
					this.srcX = 456+this.lar*2;
				}
				if (this.movUp && this.srcX != 456+this.lar*4 && this.srcX != 456+this.lar*5) {
					this.srcX = 456+this.lar*4;
				}
				if (this.movDown && this.srcX != 456+this.lar*6 && this.srcX != 456+this.lar*7) {
					this.srcX = 456+this.lar*6;
				}
			}			
			//colidir
			for (let j = 0; j < sprites.length; j++) {				
				//colidir com ajuste
				if (sprites[j].flag == 'ajuste') {
					if (colide(this, sprites[j]) && this.ajuste != j) {
						//console.log('ajuste '+ sprites[j].posX +', '+ sprites[j].posY);
						this.movDown = this.movLeft = this.movRight = this.movUp = false;
						if (this.meiox() < sprites[j].meiox()) {
							this.posX+=this.speed;
						}
						if (this.meiox() > sprites[j].meiox()) {
							this.posX-=this.speed;
						}
						if (this.meioy() < sprites[j].meioy()) {
							this.posY+=this.speed;
						}
						if (this.meioy() > sprites[j].meioy()) {
							this.posY-=this.speed;
						}
						let temporariox = this.meiox() - sprites[j].meiox();
						let xok = false; let yok = false;
						if (temporariox < 0) {
							temporariox *= -1;
						}
						if (temporariox < 1) {
							xok = true;
						}
						let temporarioy = this.meioy() - sprites[j].meioy();
						if (temporarioy < 0) {
							temporarioy *= -1;
						}
						if (temporarioy < 1) {
							yok = true;
						}
						if (xok && yok) {
							this.ajuste = j;
						}
					}
					if (this.ajuste == j && !this.movUp && !this.movDown && !this.movLeft && !this.movRight) {
						//decidir direção
						//console.log('decidir direção '+ sprites[j].direcao +' contLoop: '+ GLOBAIS.contLoop);
						let arr = sprites[j].direcao.split(",");
						let sort = Math.random() * (arr.length-1);
						//console.log('sort : '+ sort.toFixed(0));
						switch (arr[sort.toFixed(0)]) {//GLOBAIS.contLoop%arr.length
							case 'u':
								this.movUp = true;
								//console.log('movUp');
								if (sprites[j].posX == 108 && sprites[j].posY == 114) {
									sprites[j].flag = 'remover';//remove ajuste que liberta da prisão o fantasma					
								}
								break;
							case 'd':
								this.movDown = true;
								//console.log('movDown');
								break;
							case 'l':
								this.movLeft = true;
								//console.log('movLet');
								break;
							case 'r':
								this.movRight = true;
								//console.log('movRight');
								break;
						
							default:
								console.log(this.flag +' sem movimento');
								break;
						}
					}
				}
			}
			if (colide(this, sprites[encontrar('player')])) {
				console.log('colisão '+ this.flag +' player');
				if (this.srcX > 580) {
					console.log('pacman comeu');
					//??? inserir pontos do fantasma comido
					sprites.push(new Sprite('images/pacmanTransparente.png', 'pontos', 456+16*contar('zoio'), 64+16*4, 16, 16, this.posX, this.posY));
					//fantasma vira zoio
					this.flag = 'zoio';
					this.srcX = 584;
					this.srcY = 79;					
				}else{
					//console.log('pacman se fodeu morreu...');
					GLOBAIS.feedback = 'pacman se fodeu morreu...';
					voltar();
					GLOBAIS.gameOver = true;
					GLOBAIS.status = 'morrendo';
				}
			}
		}
		if (this.flag == 'zoio') {
			if (this.posX > 87 && this.posX < 136 && this.posY > 97 && this.posY < 128 && !GLOBAIS.nerfar) {
				this.flag = 'fantom';
			}
			for (let k = 0; k < sprites.length; k++) {
				let obj = sprites[k];
				if (obj.flag == 'ajuste') {
					if (colide(this, obj)) {///colisão zoio com ajuste
						switch (obj.zoio) {
							case 'u':
								this.movDown = false;
								this.movLeft = false;
								this.movRight = false;
								this.movUp = true;
								break;
							case 'd':
								this.movDown = true;
								this.movLeft = false;
								this.movRight = false;
								this.movUp = false;
								break;
							case 'l':
								this.movDown = false;
								this.movLeft = true;
								this.movRight = false;
								this.movUp = false;
								break;
							case 'r':
								this.movDown = false;
								this.movLeft = false;
								this.movRight = true;
								this.movUp = false;
								break;
						
							default:
								this.movDown = false;
								this.movLeft = false;
								this.movRight = false;
								this.movUp = false;
								break;
						}
					}
				}
			}
		}
		if (this.flag == 'power') {
			if(!(GLOBAIS.contLoop % 7)){//animação...
				switch (this.frame) {
					case 0:
						this.srcX = 34;
						break;
					case 1:
						this.srcX = 100;
						break;
					case 2:
						this.srcX = 162;
						break;
					case 3:
						this.srcX = 216;
						break;
					case 4:
						this.lar -= 3;
						this.srcX = 258;
						//mudar y
						if (this.srcY == 16) {
							this.srcY = 94;
						}else{
							this.srcY = 16;
						}
						break;
					case 5:
						this.lar += 3;
						this.srcX = 296;
						break;
					case 6:
						this.srcX = 350;
						break;
					case 7:
						this.srcX = 410;
						break;
					
					default:
						this.frame = -1;
						break;
				}
				this.frame++;
			}
			if (colide(this, sprites[encontrar('player')])) {//colisão com player
				this.flag = 'remover';
				GLOBAIS.nerfar = true;
				setTimeout(()=>{
					GLOBAIS.fim = true;
					setTimeout(() =>{
						GLOBAIS.nerfar = false;
						GLOBAIS.fim = false;
					}, 3000);
				}, 5000);
			}
		}
		//garantia de que personagens em movimento ñ sairão para fora da tela
		if (this.flag == 'fantom' || this.flag == 'zoio') {
			if (this.posX < this.lar*-1) {
				this.movDown = false;
				this.movLeft = false;
				this.movRight = true;
				this.movUp = false;
			}
			if (this.posX > cnv.width/2 + this.lar) {
				this.movDown = false;
				this.movLeft = true;
				this.movRight = false;
				this.movUp = false;
			}
			if (this.posY < this.alt*-1) {
				this.movDown = true;
				this.movLeft = false;
				this.movRight = false;
				this.movUp = false;
			}
			if (this.posY > cnv.height + this.alt) {
				this.movDown = false;
				this.movLeft = false;
				this.movRight = false;
				this.movUp = true;
			}
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
	if (p1.flag == 'fantom') {
		p1.lar = 14;p1.alt = 14;
	}
	//catetos distancia entre os pontos
	let catx = p1.meiox() - p2.meiox();
	let caty = p1.meioy() - p2.meioy();
	//soma das metades
	let somax = p1.metax() + p2.metax();
	let somay = p1.metay() + p2.metay();
	// tocando-se!!!!!!!!!!
	if (Math.abs(catx) < somax && Math.abs(caty) < somay) {
		//setTimeout(function(){ p2.ver = true; }, 1000);
		let overlapx = somax - Math.abs(catx);
		let overlapy = somay - Math.abs(caty);
		if (overlapx >= overlapy) { //colisão por cima ou por baixo
			this.metaHorizontal = this.metaVertical = null;
			p1.movUp = p1.movDown = p1.movLeft = p1.movRight = false;
			//fantom tem que escolher entre esquerda e direita???
			if (p1.flag == 'fantom') {
				//(GLOBAIS.contLoop%2) ? p1.movRight = true : p1.movLeft = true;

			}
			if (caty > 0) { // bateu a cabeça do personagem colidiu parte de cima do personagem que esta sendo controlado
				p1.posY += overlapy;
				//
				//console.log(p1.flag +' bateu cabeça: '+ p2.flag);
			} else {
				p1.posY -= overlapy;
				//
				//console.log(p1.flag +' esta pisando: '+ p2.flag);
			}			
		} else { // colisão pelos lados esquerda ou direita
			this.metaHorizontal = this.metaVertical = null;
			p1.movUp = p1.movDown = p1.movLeft = p1.movRight = false;
			//fantom tem que escolher entre subir ou descer???
			if (p1.flag == 'fantom') {
				//(GLOBAIS.contLoop%2) ? p1.movUp = true : p1.movDown = true;
			}
			if(catx > 0){ // colidiu na esquerda
				p1.posX += overlapx;
				//
				//console.log(p1.flag +' bateu à esquerda: '+ p2.flag);
			}else{
				p1.posX -= overlapx;
				//
				//console.log(p1.flag +' bateu à direita: '+ p2.flag);
			}
		}
	}
	if (p1.flag == 'fantom') {
		p1.lar = 16;p1.alt = 16;
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
	let temp = p1.lar;
	let temp1 = p1.alt;
	if (p1.flag == 'power') {
		p1.lar = p1.lar * p1.escala;
		p1.alt = p1.alt * p1.escala;
	}
	let catx = p1.meiox() - p2.meiox();
	let caty = p1.meioy() - p2.meioy();
	//soma das metades
	let somax = p1.metax() + p2.metax();
	let somay = p1.metay() + p2.metay();
	
	// tocando-se!!!!!!!!!!
	if (Math.abs(catx) < somax && Math.abs(caty) < somay) {
		//
		if (p1.flag == 'power') {
			p1.lar = temp;
			p1.alt = temp1;
		}
		return true;
	}else{
		if (p1.flag == 'power') {
			p1.lar = temp;
			p1.alt = temp1;
		}
		return false;
	}
}