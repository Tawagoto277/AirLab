const prodotti = [
  {
    nome : 'Nike Lab Dunk Low',
    img : '1.jpg',
    modello : 'scarpa',
    colore : 'Multicolore',
    prezzo : 159.89,
    genere : [
      tagliaUomo = {
        taglia : 'Uomo',
        numero : [38,39,40,41,42,43,44,45]
      },
      tagliaDonna = {
        taglia : 'Donna',
        numero : [38,39,40,41,42]
      },
      tagliaBambino = {
        taglia : 'bambino',
        numero : [32,33,34,35,36,37,38,39,40]
      }
    ]
  },
  {
    nome : 'Nike Lab NBA Super 2000',
    img : '2.jpg',
    modello : 'scarpa',
    colore : 'Dark Stucco/Summit White/Oro metallizzato/Nero',
    prezzo : 129.99,
    genere : [
      tagliaUomo = {
        taglia : 'Uomo',
        numero : [38,39,40,41,42,43,44,45]
      },
      tagliaDonna = {
        taglia : 'Donna',
        numero : [38,39,40,41,42]
      },
      tagliaBambino = {
        taglia : 'bambino',
        numero : [32,33,34,35,36,37,38,39,40]
      }
    ]
  },
  {
    nome : 'Nike Lab Super',
    img : '3.jpg',
    modello : 'scarpa',
    colore : 'Bianco/Dark Stucco',
    prezzo : 89.99,
    genere : [
      tagliaUomo = {
        taglia : 'Uomo',
        numero : [38,39,40,41,42,43,44,45]
      },
      tagliaDonna = {
        taglia : 'Donna',
        numero : [38,39,40,41,42]
      },
      tagliaBambino = {
        taglia : 'bambino',
        numero : [32,33,34,35,36,37,38,39,40]
      }
    ]
  },
  {
    nome : 'Jordan Lab Ultra',
    img : '4.jpg',
    modello : 'scarpa',
    colore : 'Bianco/Wolf Grey/Antracite/Team Red',
    prezzo : 139.99,
    genere : [
      tagliaUomo = {
        taglia : 'Uomo',
        numero : [38,39,40,41,42,43,44,45]
      },
      tagliaDonna = {
        taglia : 'Donna',
        numero : [38,39,40,41,42]
      },
      tagliaBambino = {
        taglia : 'bambino',
        numero : [32,33,34,35,36,37,38,39,40]
      }
    ]
  },
  {
    nome : 'Nike Lab Dunk Low',
    img : '5.jpg',
    modello : 'scarpa',
    colore : 'Bianco/Nero',
    prezzo : 100.99,
    genere : [
      tagliaUomo = {
        taglia : 'Uomo',
        numero : [38,39,40,41,42,43,44,45]
      },
      tagliaDonna = {
        taglia : 'Donna',
        numero : [38,39,40,41,42]
      },
      tagliaBambino = {
        taglia : 'bambino',
        numero : [32,33,34,35,36,37,38,39,40]
      }
    ]
  },
];//Oggetto contente le scarpe "nel negozio"

document.addEventListener('DOMContentLoaded', function(){
  generaCarrelloProdotti(prodottiRandom);//Genera carrello
});

let prodottiRandom = generaNumRandom();
function generaNumRandom(){
  let elenco = [];
  let numeriprodotti = Math.floor((Math.random() * 10) + 1);
  //il quantitativo di prodotti presenti nel carrello
  for(let i = 0; i < numeriprodotti; i++){
    let random = Math.floor((Math.random() * 5));
    //la varieta di prodotti nel carrello (cinque scarpe diverse)
    elenco.push(random);
  };
  return elenco;
};

function generaCarrelloProdotti(listaProdotti){
  const box = document.getElementById('listaCarrello');
  
  if(listaProdotti.length == 0){
    box.innerHTML = `
      <h3>Il Carrello e' al momento vuoto ma puoi riempirlo quando vuoi con i nostri articoli</h3>
    `;
  }else{
    box.innerHTML = generaHtmlProdottiCarrello(listaProdotti);
  };

  calcolaTotale(listaProdotti);

  function generaHtmlProdottiCarrello(pCarrello){
    let html =  '<ul>';
    let i = 0;
    for (const p of pCarrello) {
      let genereT = Math.floor(Math.random()*3);

      html += `
      <li>
        <div class="imgP">
          <img src="../style/img/ScarpeCarrello/${p + 1}.jpg" alt="scarpa">
        </div>
        <div class="dettagliP">
          <h2>
            ${prodotti[p].nome}
          </h2>
          <h3>
          ${prodotti[p].prezzo}
          </h3>
          <p>Scarpa - ${prodotti[p].genere[genereT].taglia}</p>
          <p>${prodotti[p].colore}</p>
          <p class="taglie">
            Taglia/misure
            <select name="tProd">
              ${generaOptionMisure(prodotti[p].genere[genereT].numero)}
            </select>
          </p>
          <p class="quantita">
            Quantita'
            <select name="qntPro">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
          <ul>
            <li><a>g</a></li>
            <li><a>h</a></li>
            <li><a onclick = 'elimina(${i})'>t</a></li>
          </ul>
        </div>
        <div class="ritiri">
          <p>Ritiro gratuito</p>
          <p><a href="#">Trova un negozio</a></p>
        </div>
      </li>
      `;
      i++;
    };//Creo l'html del carrello con vari prodotti

    return html;
  };  

  function generaOptionMisure(numeriTaglia){
    let html = '';
    for (const option of numeriTaglia) {
      html += `
        <option value="${option}">${option}</option>
      `;
    };
    return html;
  };
};

function elimina(n){
  if (confirm("Sei sicuro di voler eliminare il prodotto?")){
    prodottiRandom.splice(n ,1);
    generaCarrelloProdotti(prodottiRandom);
  };
};

function calcolaTotale(prodottiCarrello){
  //prodottiCarrello Array o 0
  let totale = 0 ;
  const carrello = document.getElementById('dettagliOrdine');

  if(prodottiCarrello.length == 0){
    carrello.querySelector('p:nth-of-type(2)').innerHTML  = '-';
    carrello.querySelector('p:nth-of-type(6)').innerHTML  = '0.00';
  }else{
    for (const p of prodottiCarrello) {
      totale += prodotti[p].prezzo;
    };
    carrello.querySelector('p:nth-of-type(2)').innerHTML  = totale.toFixed(2);
    carrello.querySelector('p:nth-of-type(6)').innerHTML  = totale.toFixed(2);
  };
};

function modificaCarrello(indice){
  //indice deve avere valore true  false
  const lista = document.getElementById('listaProdotti');
  const totale = document.getElementById('TotaleSpesa');
  const form = document.getElementById('formPagamento');
  const epilogo = document.getElementById('epilogo');

  if(indice == 1){
    lista.style.display = 'none';
    totale.style.display = 'none';
    form.style.display = 'block';
    epilogo.style.display = 'block';

    pagamento();
  }else{
    lista.style.display = 'block';
    totale.style.display = 'block';
    form.style.display = 'none';
    epilogo.style.display = 'none';
  };
};

function pagamento(){
  calcolaTotEpilogo(prodottiRandom);
  creaListaProdottiEpilogo(prodottiRandom);

  function calcolaTotEpilogo(listaProdotti){
    const epilogo = document.getElementById('listaEpilogo');
    let totale = 0;
    
    for (const p of listaProdotti) {
      totale += prodotti[p].prezzo;
    };

    epilogo.querySelector('li:nth-of-type(2)').innerHTML = totale.toFixed(2);
    epilogo.querySelector('li:nth-of-type(6)').innerHTML = totale.toFixed(2);
  };

  function creaListaProdottiEpilogo(listaProdotti){
    const listaCarrelo = document.querySelector('#epilogo section ul');
    let html = '' ;

    for (const p of listaProdotti) {
      html += `
      <li class="listaCarrelloEpilogo">
        <ul>
          <li><img src="../style/img/ScarpeCarrello/${prodotti[p].img}" alt=""></li>
          <li>${prodotti[p].nome}</li>
          <li>Colore : ${prodotti[p].colore}</li>
          <li>Prezzo : ${prodotti[p].prezzo}</li>
        </ul>
      </li>
      `;
    };

    listaCarrelo.innerHTML = html;
  };
};