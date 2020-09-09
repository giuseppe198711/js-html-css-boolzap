
$(document).ready(function() {
  // con un click  in questo caso sull'areoplanino
  // avvio un messaggio richiamo questo attraverso la funzione
  $(".send-message").click(
    // funzione
    function() {
      // nome funzione
      sendMessage();
      // qui invece richiamo la funzione con il nome di setTimeout
      // che dopo 3 secondi dal click mi da una risposta ok!
      setTimeout(function(){risposta("ok!")}, 3000);
    }
  );
  // con uninput sul tasto invio (N.13)
  $("#input-message").keyup(
    // funzione ?
    function(event) {
      // inserisco il numero del tasto invio
      // event è l oggetto che include varie proprieta relative al tasto premuto
      // which indica il codice del tasto premuto
      if(event.which == 13) {
        // nome della funzione
        sendMessage();
        // qui invece richiamo la funzione con il nome di setTimeout
        // che dopo 3 secondi dal keyUp mi da una risposta ok!
        setTimeout(function(){risposta("ok!")}, 3000);
      }
    }
  );

});

function sendMessage() {
  // inserisco il valore dell'input (che abbiamo inserito nell html)all'interno di una variabile
  // il "val" è inventato per noi da un esterno e ci permette di ottenere il valore da un selettore
  var inputText = $("#input-message").val();

  //  vuol dire input diverso da niente
  if(inputText != "") {
    // nomino questa clonazione templeMessage e mi clona il l elemento
    // .message-row figlio di templeates dobbiamo mettere sempre figlio di....
    // per evitare duplicati
    var templateMessage = $(".templates .message-row").clone();
    // prende la data ora minuti ecc
    // in questo caso a noi prendiamo solo ore e minuti e li mettiamo
    // insieme nella variabile time
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var time = hours + ":" + minutes;

    // nel momento in cui inseriremo il messaggio e lo invieremo
    // sara associato: 1)l orario attuale (time) 2)tutto quello che ha classe sent ossia: il colore
    // e il flex-end


    // prendo l elemento templateMessage e gli aggiungo il messaggio
    templateMessage.find(".message-text").text(inputText);
    // prendo l elemento templateMessage e gli aggiungo l orari di invio
    templateMessage.find(".message-time").text(time);
    // prendo l elemnto templateMessage e gli aggiungo la classe sent
    // che in questo caso mi sposta la chat a destra e la colora di verde
    templateMessage.addClass("sent");

    // tutto quello all'interno di templeMessage lo appendiamo all'interno della chat
    $(".chat").append(templateMessage);
    // svuotiamo l'input
    $("#input-message").val("");
  }

}

// con questa funzione do una risposta all'utente
function risposta(text) {
  // faccio una copia del templeates
  var template = $(".templates .message-row").clone();
  // inserisco il testo nel tag p del template
  template.find("p").text(text);
  // appendo il nuovo oggetto
  $(".chat").append(template);
}
// applico una funzione timeOut che nel momento in cui scrivo un messaggio
// l altro utente mi da una risposta ok

// seleziono la barra di ricerca e gli dico di eseguire delle istruzioni quando
// il suo valore viene modificato
document.getElementById('search').addEventListener("input",
// funzione (anonima)
function () {
  // ci salviamo in una variabile il valore all'interno della barra di ricerca
  var inputValue = document.getElementById('search').value;
  // trasformiamo il valore acuisito in lettere minuscole
  inputValue = inputValue.toLowerCase();
  // gli diciamo se la barra di ricerca non è vuota ma che ce qualcosa
  if (inputValue != "") {
    // nascondiamo tutti gli elementi momentaneamente
    $(".contact").addClass("d_none_imp");
    // mostriamo solo gli elementi che combaciano con la nostra ricerca con l attributo
    // data-search
    $("[data-search*=" + inputValue + "]").removeClass("d_none_imp");
    // invece se la barra di ricerca è vuota
  } else if (inputValue == "") {
    // facciamo ricomparire tutti gli elementi
    $(".contact").removeClass("d_none_imp");
  }
}
);
