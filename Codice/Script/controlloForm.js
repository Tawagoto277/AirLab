let datiUtente = {
  nome : '',
  cognome : '',
  via : '',
  indirizzo : [
    {
      cap : '',
      citta : '',
      paese : '',
      email : '',
      numero : ''
    }
  ],
  carta :
    {
      numero : '',
      mmaa : '',
      cvv : ''
    }
}

let numeroIndirizzi = 1;
document.addEventListener('DOMContentLoaded', () => {
  prendiInput();
  // document.getElementById('aggIndirizzo').onclick = () =>{
  //   creaIndirizzoAggiuntivo();
  //   prendiInput();
  // };
});

function controlloindirizzo(){
  const inputs = document.querySelectorAll('main form input');
  const bottone = document.getElementById('salvaB');
  let controllo = true;

  for (const input of inputs) {
    if(input.classList.contains('errore') || input.value.trim() == ''){
        controllo = false;
    };
  };

  if(controllo){
    bottone.classList.remove('salvaBloccato');
    bottone.classList.add('salvaSbloccato');
  };

  if(bottone.classList.contains('salvaSbloccato')){
    bottone.onclick = () => avanzaCarta();
  };
};

function controlloCarta(){
  const inputs = document.querySelectorAll('#aggiungiCarta input');
  const bottone = document.getElementById('salvaC');
  let controllo = true;

  for (const input of inputs) {
    if(input.classList.contains('errore') || input.value.trim() == ''){
        controllo = false;
    };
  };

  if(controllo){
    bottone.classList.remove('salvaBloccato');
    bottone.classList.add('salvaSbloccato');
  };

  if(bottone.classList.contains('salvaSbloccato')){
    bottone.onclick = () => {
      avanzaFine();
      creaHtmlIndirizzo(datiUtente);
    };
  };
};

function avanzaCarta(){
  const indirizzi = document.getElementById('formIndirizzo');
  const pagamenti = document.getElementById('metodoPagamento');

  indirizzi.style.maxHeight = '30px';
  pagamenti.style.maxHeight = 'none';
};

function avanzaFine(){
  const fine = document.getElementById('verificaFinale');
  const pagamenti = document.getElementById('metodoPagamento');

  pagamenti.style.maxHeight = '30px';
  fine.style.maxHeight = 'none';
};

function creaHtmlIndirizzo(dati){
  const box = document.getElementById('datiSpedizione');
  let html = `
    <h3>
      Grazie il suo ordine e stato preso in carica sara spedito a ${dati.nome} ${dati.cognome}.
    </h3>
    <h4>
      ${dati.via} - ${dati.indirizzo[0].citta} - CAP : ${dati.indirizzo[0].cap}.
    </h4>
    <h4>
      Sara inviata una email a ${dati.indirizzo[0].email} per i dettagli della spedizine.
    </h4>
  `;

  box.innerHTML = html;
};

function prendiInput(){
  const inputForm = document.querySelectorAll('main input[type=text]');

  for (const input of inputForm) {
    input.onchange = () => {
      controllaValore(input);
      controlloindirizzo();
      controlloCarta()
    };
  };

  return inputForm;
};

function controllaValore(input){
  let regex;

  switch(input.placeholder){
    case 'Nome':
        regex = /^[A-Za-z\s'-]+$/
        if(controllo(input)){datiUtente.nome = input.value.trim()};
      break;
    case 'Cognome':
        regex = /^[A-Za-z\s'-]+$/
        if(controllo(input)){datiUtente.cognome = input.value.trim()};
      break;
    case 'Indirizzo e numero civico':
        regex = /^[A-Za-z0-9\s',\-°\/]+$/
        if(controllo(input)){datiUtente.via = input.value.trim()};
      break;
    case 'CAP*':
        regex = /^\d{5}$/
        if(controllo(input)){datiUtente.indirizzo[input.name[input.name.length - 1]].cap = input.value.trim()}
      break;
    case 'Citta*':
        regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/
        if(controllo(input)){datiUtente.indirizzo[input.name[input.name.length - 1]].citta = input.value.trim()};
      break;
    case 'Paese/Regione':
        regex = /^[A-Za-z\s-']+$/
        if(controllo(input)){datiUtente.indirizzo[input.name[input.name.length - 1]].paese = input.value.trim()};
      break;
    case 'Email':
        regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(controllo(input)){datiUtente.indirizzo[input.name[input.name.length - 1]].email = input.value.trim()};
      break;
    case 'Numero di telefono':
        regex = /^((00|\+)\d{2}[\. ]??)??3\d{2}[\. ]??\d{6,7}([\,\;]((00|\+)\d{2}[\. ]??)??3\d{2}[\. ]??\d{6,7})*$/
        if(controllo(input)){datiUtente.indirizzo[input.name[input.name.length - 1]].numero = input.value.trim()};
        break;
    case 'Numero carta' :
        regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
        if(controllo(input)){datiUtente.carta.numero = input.value.trim()};
        break;
    case 'MM/AA' :
        regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if(controllo(input)){datiUtente.carta.mmaa = input.value.trim()};
      break;
    case 'CVV' :
        regex = /^[0-9]{3,4}$/;
        if(controllo(input)){datiUtente.carta.cvv = input.value.trim()};
      break;
  };

  function controllo(input){
    if(!regex.test(input.value.trim()) || input.value.trim() == ''){
      input.classList.add('errore');
      return false;
    }else{
      input.classList.remove('errore');
      return true;
    };
  };
};

// function creaIndirizzoAggiuntivo(){
//   const lista = document.querySelector('main form ul.indirizzi');
//   let html = `
//     <li>
//       <input type="text" name="cap${numeroIndirizzi}" placeholder="CAP*" id="caputente${numeroIndirizzi}" autocomplete="off">
//       <input type="text" name="citta${numeroIndirizzi}" placeholder="Citta*" id="cittauUtente${numeroIndirizzi}" autocomplete="off">
//       <input type="text" name="paese${numeroIndirizzi}" placeholder="Paese/Regione" id="paeseUtente${numeroIndirizzi}" autocomplete="off">
//       <input type="text" name="email${numeroIndirizzi}" placeholder="Emial" id="emailUtente${numeroIndirizzi}" autocomplete="off">
//       <input type="text" name="tel${numeroIndirizzi}" placeholder="Numero di telefono" id="tel${numeroIndirizzi}" autocomplete="off">
//     </li>
//   `;
//   numeroIndirizzi++;
//   lista.innerHTML += html;
// };
