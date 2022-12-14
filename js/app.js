/*
Játék szabályok:

- A játék 2 szereplős és körökre osztott
- Minden egyes körben az adott játékos dob a kockával, ahányszor csak szeretne. A dobások eredménye hozzáadódik a játékos adott körben
  elért pontszámához, ami értelem szerűen minden körben nulláról indul.
- Ha az aktuális játékos 1-et dob, akkor az összes addigi pontja elveszik, és átadja a dobás jogát a következő játékosnak.
- A játékos választhatja a 'Megtartom' gombot is. Ebben az esetben az adott körben elért pontok száma, hozzáadódik a játékos összes
  pontszámához. Majd a dobás joga a másik játékosra száll.
- Az a játékos nyer, aki előbb eléri a 100 pontot.  

*/

var pontSzamok, korPontSzam, aktivJatekos, kocka;
init();

//Kocka eltültetése a játék elején
document.querySelector('.dice').style.display = "none";

//Alapértékek beállítása
document.getElementById('score-0').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-1').textContent = 0;

// -----------------DOBÁS FUNKCIÓ -----------------

//Dobás gomb bedobása eventbe
document.querySelector('.btn-roll').addEventListener("click", function () {



  kocka = Math.floor(Math.random() * 6) + 1;
  var kockaDom = document.querySelector('.dice');
  kockaDom.style.display = "block";
  kockaDom.src=`img/dice-${kocka}.png`;


  //Ha nem egyest dobunk akkor
  if(kocka !== 1){
    korPontSzam = pontSzamok[aktivJatekos] += kocka;
    document.querySelector('#current-'+ aktivJatekos).textContent =korPontSzam;
    console.log("A(z) " + aktivJatekos + ". játékos pontszáma: " + pontSzamok[aktivJatekos]+" mert " + kocka + ' értéket dobott' );
    document.getElementById("score-"+ aktivJatekos).textContent = kocka;


    //HA EGYEST DOB
  }else{
    pontSzamok[aktivJatekos] = 0;
    korPontSzam = 0;
    console.log("A(z) " + aktivJatekos + ". játékos pontszáma: " + pontSzamok[aktivJatekos] + " mert 1-es kockát dobott" );
    document.querySelector('#current-'+ aktivJatekos).textContent = pontSzamok[aktivJatekos];

    //HA a 0. player dobott egyest
    if(aktivJatekos === 0){
      //SCORE ALAPHELYZETBE ÁLLÍTÁSA
      document.getElementById("score-"+ aktivJatekos).textContent = 0;

      //CLASSOK MÓDOSÍTÁSA ÉS DOBÓKOCKA ELTÜNTETÉSE
      document.querySelector('.player-0-panel').classList.toggle('active');
      document.querySelector('.player-1-panel').classList.toggle('active');
      document.querySelector('.dice').style.display = "none";
      aktivJatekos = 1;
    //HA az 1. player dobott egyest
    }else{ 
            //SCORE ALAPHELYZETBE ÁLLÍTÁSA
      document.getElementById("score-"+ aktivJatekos).textContent = 0;

            //CLASSOK MÓDOSÍTÁSA ÉS DOBÓKOCKA ELTÜNTETÉSE
      document.querySelector('.player-0-panel').classList.toggle('active');
      document.querySelector('.player-1-panel').classList.toggle('active');
      document.querySelector('.dice').style.display = "none";
      aktivJatekos = 0;
    }
  }
})




//Megtartom gomb eventje
document.querySelector('.btn-hold').addEventListener("click", function(){
  //Ha a 0. player van soron
  if(aktivJatekos === 0){

    document.getElementById("score-"+ aktivJatekos).textContent = 0;
    document.querySelector('.dice').style.display = "none";
   korPontSzam = pontSzamok[aktivJatekos] ;

   //HA NYER AZ ELSŐ JÁTÉKOS
   if(pontSzamok[aktivJatekos] >= 30){
    aktivJatekos = 0;
    document.getElementById("score-"+ aktivJatekos).textContent = "Nyert";
    console.log(pontSzamok[aktivJatekos]);
    document.querySelector('.btn-hold').style.display = "none";
    document.querySelector('.btn-roll').style.display = "none";
  }
   console.log("A(z) " + aktivJatekos + " Értékét megtartotta mert a megtartom gombot választotta, értéke: "+ korPontSzam);
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.add('active');
    aktivJatekos = 1;

   
  //Ha az 1. player van
  }else{

    document.getElementById("score-"+ aktivJatekos).textContent = 0;
    korPontSzam = pontSzamok[aktivJatekos] ;
    document.querySelector('.dice').style.display = "none";

    if(pontSzamok[aktivJatekos] >= 30){
      aktivJatekos = 1;
      document.getElementById("score-"+ aktivJatekos).textContent = "Nyert";
      console.log(pontSzamok[aktivJatekos]);
      document.querySelector('.btn-hold').style.display = "none";
      document.querySelector('.btn-roll').style.display = "none";
    }

    console.log("A(z) " + aktivJatekos + " Értékét megtartotta mert a megtartom gombot választotta, értéke: "+ korPontSzam );
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    aktivJatekos = 0;
    
  }
})








//ÚJ JÁTÉK
document.querySelector(".btn-new").addEventListener("click", function(){
  init();

  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.btn-hold').style.display = "block";
  document.querySelector('.btn-roll').style.display = "block";




})

function init(){
  pontSzamok = [0,0];
  korPontSzam = 0;
  aktivJatekos = 0;

  document.querySelector('.dice').style.display = "none";
  document.querySelector('#current-'+ 0).textContent = pontSzamok[0];
  document.querySelector('#current-'+ 1).textContent = pontSzamok[0];
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
}