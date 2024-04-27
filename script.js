var meuCanvas = document.getElementById("meu-canvas");
var contexto = meuCanvas.getContext("2d");


//velocidade do Jogo
var numeroEstagios = 8;
var estagiosJogo = 0;

function velocidadeJogo () {
    estagiosJogo++;

    if (estagiosJogo >= numeroEstagios) {
        estagiosJogo = 0;
    }
}


//definição da Plataforma
var plataforma = {
    x: 0,
    y: meuCanvas.height - 50,
    largura: meuCanvas.width,
    altura: 50
}

var gravidade = 5;


//definição do Personagem como Objeto
var personagem = {
    x: 10,
    y: 10,
    largura: 25,
    altura: 60,
    
    imagem: new Image(),
    imagemParadoEsquerda: new Image(),
    imagemParadoDireita: new Image(),
    imagemCorrendoEsquerda: new Image(),
    imagemCorrendoDireita: new Image(),
    imagemAtacandoEsquerda:new Image(),
    imagemAtacandoDireita: new Image(),
    imagemX: 0,
    imagemY: 0,

    posicao: {
        esquerda: false,
        direita: true
    },

    movimento: {
        esquerda: false,
        direita: false
    },

    chaveAtaque: true,
    tempoAtaque: 0
}

personagem.imagem.src = "animacaoPronta2.png";
personagem.imagemParadoEsquerda.src = "./imagensDoJogo/personagem/paradoEsquerda.png"
personagem.imagemParadoDireita.src = "./imagensDoJogo/personagem/paradoDireita.png";
personagem.imagemCorrendoEsquerda.src = "./imagensDoJogo/personagem/correndoEsquerda.png";
personagem.imagemCorrendoDireita.src = "./imagensDoJogo/personagem/correndoDireita.png";
personagem.imagemAtacandoEsquerda.src = "./imagensDoJogo/personagem/atacandoEsquerda.png";
personagem.imagemAtacandoDireita.src = "./imagensDoJogo/personagem/atacandoDireita.png";


//desenhar a Plataforma
function desenharPlataforma () {
    contexto.fillRect(plataforma.x, plataforma.y, plataforma.largura, plataforma.altura);
}


//desenho do Personagem no Canvas
function desenharPersonagem () {

    if (personagem.tempoAtaque > 0) {
        
        if (personagem.posicao.esquerda) {

            contexto.drawImage(personagem.imagemAtacandoEsquerda, personagem.imagemX*60, 0, 60, 60, personagem.x - 35, personagem.y, 60, 60);
            //console.log(personagem.imagemX);
            personagem.imagemX++;

        }else if (personagem.posicao.direita) {
            
            contexto.drawImage(personagem.imagemAtacandoDireita, personagem.imagemX*60, 0, 60, 60, personagem.x, personagem.y, 60, 60);
            //console.log(personagem.imagemX);
            personagem.imagemX++;

        }

    }else if (personagem.tempoAtaque <= 0) {
        
        if (personagem.posicao.esquerda) {
            //desenhar ele parado para a esquerda
            //desenhar ele andando para a esquerda

            if (!personagem.movimento.esquerda) {
                //desenho parado

                personagem.imagemX++;

                if (personagem.imagemX >= 6) {
                    personagem.imagemX = 0;
                }

                //contexto.drawImage(personagem.imagem, personagem.imagemX*100, 100, 100, 100, 0, 0, 100, 100);
                contexto.drawImage(personagem.imagemParadoEsquerda, personagem.imagemX*25, 0, 25, 60, personagem.x, personagem.y, 25, 60);
        
            }else if (personagem.movimento.esquerda) {
                //desenhar andando

                if (personagem.imagemX >= 5) {
                    personagem.imagemX = 0;
                }

                //contexto.drawImage(personagem.imagem, personagem.imagemX*100, 300, 100, 100, 0, 0, 100, 100);
                contexto.drawImage(personagem.imagemCorrendoEsquerda, personagem.imagemX*25, 0, 25, 60, personagem.x, personagem.y, 25, 60);

                personagem.imagemX++;
            }

        }else if (personagem.posicao.direita) {
            //desenhar ele parado para a direita
            //desenhar ele andando para a direita

            if (!personagem.movimento.direita) {
                //desenho parado

                personagem.imagemX++;

                if (personagem.imagemX >= 6) {
                    personagem.imagemX = 0;
                }

                //contexto.drawImage(personagem.imagem, personagem.imagemX*100, 0, 100, 100, 0, 0, 100, 100);
                contexto.drawImage(personagem.imagemParadoDireita, personagem.imagemX*25, 0, 25, 60, personagem.x, personagem.y, 25, 60);

            }else if (personagem.movimento.direita) {
                //desenhar andando
                
                if (personagem.imagemX >= 5) {
                    personagem.imagemX = 0;
                }

                //contexto.drawImage(personagem.imagem, personagem.imagemX*100, 200, 100, 100, 0, 0, 100, 100);
                contexto.drawImage(personagem.imagemCorrendoDireita, personagem.imagemX*25, 0, 25, 60, personagem.x, personagem.y, 25, 60);

                personagem.imagemX++;
            }

        }

    }
}


//movimentação do Personagem
document.addEventListener("keydown", function (evento) {
    if (evento.key === "ArrowLeft") {
        personagem.movimento.esquerda = true;
        personagem.posicao.esquerda = true;
        personagem.posicao.direita = false;
    } else if (evento.key === "ArrowRight") {
        personagem.movimento.direita = true;
        personagem.posicao.esquerda = false;
        personagem.posicao.direita = true;
    }

    if (evento.key === " ") {

        if (personagem.chaveAtaque && personagem.tempoAtaque <= 0) {
            
            if (personagem.imagemX > 0 && personagem.chaveAtaque) {
                //zerar para começar a animação
                personagem.imagemX = 0;
                
            }
            
            personagem.chaveAtaque = false;
            personagem.tempoAtaque = 3;
        }

    }
});

document.addEventListener("keyup", function (evento) {
    if (evento.key === "ArrowLeft") {
        personagem.movimento.esquerda = false;
    } else if (evento.key === "ArrowRight") {
        personagem.movimento.direita = false;
    }

    if (evento.key === " ") {
        if (!personagem.chaveAtaque) {
            personagem.chaveAtaque = true;
        }
    }
});

function atualizarMovimentoPersonagem () {
    //Movimento do Personagem
    if (personagem.tempoAtaque <= 0) {
        if (personagem.movimento.esquerda && personagem.x > 0) {
            personagem.x-=5;
        }else if (personagem.movimento.direita && (personagem.x + personagem.largura) < meuCanvas.width) {
            personagem.x+=5;
        }
    }

    //Fisica do Personagem
    if (personagem.y + personagem.altura < (meuCanvas.height - plataforma.altura)) {
        personagem.y += gravidade;
    }

}

function ataquePersonagem () {
    if (personagem.tempoAtaque > 0) {
        personagem.tempoAtaque--;
    }
}


//Desenhar Inimigos
var quantidadeInimigos = 3;
var listaInimigos = [];

var imagemInimigo = {
    paradoEsquerda: new Image(),
    paradoDireita: new Image(),
    correndoEsquerda: new Image(),
    correndoDireita: new Image()
}

imagemInimigo.paradoEsquerda.src = "./imagensDoJogo/inimigo/paradoEsquerda.png";
imagemInimigo.paradoDireita.src = "./imagensDoJogo/inimigo/paradoDireita.png";
imagemInimigo.correndoEsquerda.src = "./imagensDoJogo/inimigo/correndoEsquerda.png";
imagemInimigo.correndoDireita.src = "./imagensDoJogo/inimigo/correndoDireita.png";

var numero = 0;

function atualizaQuantidadeInimigos () {
    for (i=0; listaInimigos.length < quantidadeInimigos; i++) {
        
        listaInimigos.push({
            x: 0,
            y: 0,
            largura: 25,
            altura: 60,
            tempoEspera: 0,
            tempoAndar: 0,
            movimentoInimigo: false,
            esquerda: null,
            direita: null,

            movendo: false,
            parado: true,
        
            imagemX: 0
        });
    }

    if (numero < quantidadeInimigos) {
        listaInimigos[numero].tempoEspera = Math.random()*30;
        numero++;
    }
}


function desenharInimigos () {
    for (i=0; i<listaInimigos.length; i++) {
        
        var inimigo = listaInimigos[i];

        if (inimigo.esquerda && inimigo.parado) {
            contexto.drawImage(imagemInimigo.paradoDireita, inimigo.imagemX*25, 0, inimigo.largura, 
                inimigo.altura, inimigo.x, inimigo.y, inimigo.largura, inimigo.altura);

                inimigo.imagemX++;
                if (inimigo.imagemX >= 6) {
                    inimigo.imagemX = 0;
                }
                
        }else if (inimigo.direita && inimigo.parado) {
            contexto.drawImage(imagemInimigo.paradoEsquerda, inimigo.imagemX*25, 0, inimigo.largura, 
                inimigo.altura, inimigo.x, inimigo.y, inimigo.largura, inimigo.altura);

                inimigo.imagemX++;
                if (inimigo.imagemX >= 6) {
                    inimigo.imagemX = 0;
                }
                
        }else if (inimigo.esquerda && inimigo.movendo) {
            
            contexto.drawImage(imagemInimigo.correndoDireita, inimigo.imagemX*25, 0, inimigo.largura, inimigo.altura,
                inimigo.x, inimigo.y, inimigo.largura, inimigo.altura);

            if (inimigo.imagemX >= 4) {
                inimigo.imagemX = 0;
            }
            inimigo.imagemX++;
        }else if (inimigo.direita && inimigo.movendo) {
            
            contexto.drawImage(imagemInimigo.correndoEsquerda, inimigo.imagemX*25, 0, inimigo.largura, inimigo.altura, 
                inimigo.x, inimigo.y, inimigo.largura, inimigo.altura);

                if (inimigo.imagemX >= 4) {
                    inimigo.imagemX = 0;
                }
                inimigo.imagemX++;
        }
    }
}


//Posição do Inimigo em relação ao personagme
function posicionarInimigo () {
    for (i=0; i < listaInimigos.length; i++) {

        var inimigo = listaInimigos[i];

        if (inimigo.x < personagem.x) {
            //está a esquerda
            inimigo.esquerda = true;
            inimigo.direita = false;
        }else if (personagem.x < inimigo.x) {
            //está a direita
            inimigo.esquerda = false;
            inimigo.direita = true;
        }

    }
}


//Mover Inimigos
function moverInimigos(){
    for (i=0; i<listaInimigos.length; i++) {
        
        //Aplicando gravidade
        if (listaInimigos[i].y + listaInimigos[i].altura < (meuCanvas.height - plataforma.altura)) {
            listaInimigos[i].y += gravidade;
        }


        //gerenciando o tempo de estrategia do Inimigo
        if (listaInimigos[i].tempoEspera > 0 && !listaInimigos[i].movimentoInimigo) {
            listaInimigos[i].tempoEspera--;
        }else if (listaInimigos[i].tempoEspera <= 0 && !listaInimigos[i].movimentoInimigo) {
            listaInimigos[i].movimentoInimigo = true;
            listaInimigos[i].tempoAndar = Math.random()*50;
        }else if (listaInimigos[i].movimentoInimigo && listaInimigos[i].tempoAndar > 0) {
            listaInimigos[i].tempoAndar--;
        }else if (listaInimigos[i].movimentoInimigo && listaInimigos[i].tempoAndar <= 0) {
            listaInimigos[i].movimentoInimigo = false;
            listaInimigos[i].tempoEspera = Math.random()*50;
        }

        
        //fazendo o Inimigo Andar com a condição do tempo de movimento maior que 0
        if (listaInimigos[i].tempoAndar > 0) {
            //Fazer o inimigo andar
            if (listaInimigos[i].x + listaInimigos[i].largura < personagem.x) {
                listaInimigos[i].x+=2;
                listaInimigos[i].movendo = true;
                listaInimigos[i].parado = false;
            }else if (personagem.x + personagem.largura < listaInimigos[i].x) {
                listaInimigos[i].x-=2;
                listaInimigos[i].movendo = true;
                listaInimigos[i].parado = false;
            }
        }else {
            listaInimigos[i].parado = true;
        }
    }
    
}


//Desenhos
function desenharTudo () {
    contexto.clearRect(0, 0, meuCanvas.width, meuCanvas.height);
    desenharPlataforma();
    desenharPersonagem();
    desenharInimigos();
}


//Rodar o Jogo
function rodarJogo () {
    velocidadeJogo();
    atualizaQuantidadeInimigos();

    if (estagiosJogo === 0) {
        desenharTudo();
        atualizarMovimentoPersonagem();
        ataquePersonagem();
        posicionarInimigo();
        moverInimigos();
    }

    requestAnimationFrame(rodarJogo);
}

rodarJogo();