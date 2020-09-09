
$(document).ready(function() {

  $(".send-message").click(
    function() {
      sendMessage();
      setTimeout(function(){risposta("ok!")}, 3000);
    }
  );

  $("#input-message").keyup(
    function(event) {
      if(event.which == 13) {
        sendMessage();
        setTimeout(function(){risposta("ok!")}, 3000);
      }
    }
  );

});



function sendMessage() {
  // inserisco il valore dell'input (che abbiamo inserito nell html)all'interno di una variabile
  // il val è inventato per noi da un esterno e ci permette di ottenere il valore da un selettore
  var inputText = $("#input-message").val();


  if(inputText != "") {
    var templateMessage = $(".templates .message-row").clone();

    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var time = hours + ":" + minutes;

    templateMessage.find(".message-text").text(inputText);
    templateMessage.find(".message-time").text(time);
    templateMessage.addClass("sent");

    $(".chat").append(templateMessage);
    $("#input-message").val("");
  }

}

// con questa funzione do una risposta all'utente
function risposta(text) {
  // faccio una copia del templeates
  var template = $(".templates .message-row").clone();
  // inserisco il testo p nel template
  template.find("p").text(text);
  // appendo il nuovo oggetto
  $(".chat").append(template);



}








// applico una funzione timeOut che nel momento in cui scrivo un messaggio
// l altro utente mi da una risposta ok
