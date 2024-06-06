let prodottiCarrello = [
  {
    taglia: 38,
    nome: 'Nike Dunk Low Retro',
    genere: 'Scarpa - Donna',
    prezzo: 199.99
  }
];

document.addEventListener('DOMContentLoaded', function(){
  creaTaglie();
  selezionaImmagine();
});

function prendiProdotto(){
  const dettagli = document.querySelector('main');
  const lista = dettagli.querySelectorAll('#ulTaglie li');
  const nome =  dettagli.querySelector('#dettagliProdotto h1');
  const prezzo = dettagli.querySelector('#dettagliProdotto p span');
  const genere =  dettagli.querySelector('#dettagliProdotto h3');
  
  //Controllo valore nullo
  let valore = '0';
  for (const elemento of lista) {
    if(elemento.querySelector('input').checked){
      valore = elemento.querySelector('input').value;
    };
  };
  
  if(!valore == '0'){
    //crea oggetto
    let prodotto = {
      taglia : parseFloat(valore),
      nome : nome.innerHTML,
      prezzo : parseFloat(prezzo.innerHTML),
      genere : genere.innerHTML
    };
    prodottiCarrello.push(prodotto);
    CreaCarrello(prodottiCarrello);
  };
};

function CreaCarrello(prodotti){  
  let htmlUl = ''
  for(let i = 1; i < prodotti.length; i++){
    htmlUl += `
      <li>
        <div class="imgCarrello">
          <img src="../style/img/Scarpa/6.jpg" alt="">
        </div>
        <div>
          <p class="nomeScarpa">${prodotti[i].nome}</p>
          <p class="genere">${prodotti[i].genere}</p>
          <p class="taglia">Taglia/Misura <span>${prodotti[i].taglia}</span></p>
          <p class="totaleScarpa">${prodotti[i].prezzo}</p>
        </div>
        <div class="elimProdotto">
          <button onclick='eliminaProd(${i})'>t</button>
        </div>
      </li>
    `;
  }
  document.querySelector('#elementiCarrello ul').innerHTML = htmlUl;
  mostraCarrello();
};
 
function eliminaProd(indice){
  if (confirm("Sei sicuro di voler eliminare il prodotto?")){
    prodottiCarrello.splice(indice, 1);
    CreaCarrello(prodottiCarrello);
}
};  

function mostraCarrello(){
  let carrello = document.getElementById('elementiCarrello');
  carrello.style.display = 'inline-block';

  let timeCarrello ;
  timeCarrello = setTimeout(chiudiCarrello, 2500);

  carrello.addEventListener('mouseover', function(){
    clearTimeout(timeCarrello);
  });

  carrello.addEventListener('mouseout', function(){
    timeCarrello = setTimeout(chiudiCarrello, 1250);
  });
  
  function chiudiCarrello(){
    carrello.style.display = 'none';
  };
};

function selezionaImmagine(){
  const listaImg = document.querySelectorAll('#fotoProdotto ul li');
  const imgMostra = document.querySelector('#containerMostra');

  for (let i = 0; i < listaImg.length; i++) {
    // img.onclick = function(){
    //   const src = this.querySelector('img').src;
    //   imgMostra.src = src;
    // };
    if(i == listaImg.length - 1){
      listaImg[i].onmouseover =  function(){
        imgMostra.innerHTML = `
        <video width="800"  height="1000" muted autoplay loop>
          <source src="../style/img/Scarpa/video.mp4">
        </video>
        `;
      };
    }else{
      listaImg[i].onmouseover =  function(){
        imgMostra.innerHTML = this.innerHTML;
      };
    };
  };
};

function creaTaglie(){
  let htmlLi = '';
  let ul = document.getElementById('ulTaglie');
  const random = Math.floor(Math.random() * 12);

  for(i = 0; i < random; i++){
    htmlLi += `
      <li>
        <input type="radio" id="T${38 + i}" value="${38 + i}" name="taglia">
        <label for="T${38 + i}">EU ${38 + i}</label>
      </li>
    `;
    if(i <= 6){
      htmlLi += `
      <li>
        <input type="radio" id="T${38 + i}.5" value="${38 + i}.5" name="taglia">
        <label for="T${38 + i}.5">EU ${38 + i}.5</label>
      </li>
    `;
    };
  };

  if(random == 0){
    htmlLi = '<li><h3>Il prodotto non e\' al momento disponibile</h3></li>'
    ul.style.gridTemplateColumns = 'auto'; 
    document.getElementById('carrello').style.display = 'none';
  };
  ul.innerHTML = htmlLi;
};