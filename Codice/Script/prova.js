function controllaBottone(bottone){
  const inputs = document.querySelectorAll('main form input');

  for (const input of inputs) {
    if(input.classList.contains('errore') || input.value == ''){
      bottone.classList.add('salvaBloccato');
      bottone.classList.remove('salvaSbloccato');
    }else{
      bottone.classList.add('salvaSbloccato');
      bottone.classList.remove('salvaBloccato');
    };
  };

  bottone.onclick = () =>{
    if(bottone.classList.contains('salvaSbloccato')){
      prosegui(bottone);
    };
  };
};

function prosegui(bottone){
  const indirizzo = document.getElementById('formIndirizzo');
  const pagamenti = document.getElementById('metodoPagamento');
  const fine = document.getElementById('verificaFinale');

  if(bottone.id == 'salvaB'){
    indirizzo.style.maxHeight = '30px';
    pagamenti.style.maxHeight = 'none';
  }else{
    pagamenti.style.maxHeight = '30px';
    fine.style.maxHeight = 'none';
  };
};