document.addEventListener('DOMContentLoaded', function(){

  //Slider Header Sconti
  setInterval(sliderSconti, 7500);

  //Main
  const slider = document.querySelectorAll('.slider');
  for(let i = 0; i < slider.length; i++){
    const bottoni = slider[i].querySelectorAll('button');
    const container = slider[i].querySelector('.container');
    for(let x = 0; x < bottoni.length; x++){
      bottoni[x].onclick = function(){
        muoviSlider(bottoni[x], container);
      };
    };
  };
});

function muoviSlider(bottone, container){  
  let widthDiv = container.querySelector('div').offsetWidth;
  if(bottone.classList.contains('pre')){
    container.scrollBy(`-${widthDiv}`, 0);
  }else{
    container.scrollBy(widthDiv, 0);
  };
};

function sliderSconti(){
  const sliderSconti = document.querySelectorAll('#sliderSconti div');

  for(let i = sliderSconti.length - 1; i >= 0; i--){
    //se i == 0
    if(sliderSconti[i].classList.contains('davanti')){
      if(i == 0){
        //aggiunge classe "davanti" al prossima immagine slider
        sliderSconti[i + 1].classList.add('davanti');
        //Rimuove la classe "davanti" e aggiunge "visibile" che lo porta a visualizzarsi a schermo
        sliderSconti[i].classList.remove('davanti');
        sliderSconti[i].classList.add('visibile');
        //Rimuove la classe visibile
        sliderSconti[sliderSconti.length - 1].classList.remove('visibile');
      }else if(i == sliderSconti.length - 1){
        //se il caso e l'ultimo dell'array di div delo slider
        sliderSconti[0].classList.add('davanti');

        sliderSconti[i].classList.remove('davanti');
        sliderSconti[i].classList.add('visibile');

        sliderSconti[i - 1].classList.remove('visibile');
      }else{
        //tutti gli altri casi centrali che non hanno bisogno di controlli
        sliderSconti[i + 1].classList.add('davanti');

        sliderSconti[i].classList.remove('davanti');
        sliderSconti[i].classList.add('visibile');

        sliderSconti[i - 1].classList.remove('visibile');
      };
    };
  };
};