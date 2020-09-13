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

      // quando clicco su uno dei contatti gli assegno la classe active e
      // la levo a tutti gli altri

       $(".contact").click(function() {

       // rimuovo la classe active ai contatti
       $(".contact").removeClass("active");


       //  rimuovo la classe active anche alle chat
       $(".chat").removeClass("active");


       // aggiungo la classe active a cio che ho cliccato in questo
       // caso ai contatti
       $(this).addClass("active");

       // dell'elemento cliccato mi salvo in una variabile  il suo valore
       // "data-chat" (che ho nell html)
       var infoContact = $(this).attr("data-contact");

       // applico la classe active alla chat con lo stesso valore
       $(".chat[data-chat="+infoContact+"]").addClass("active");

       });

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
      // appendulo il nuovo oggetto
      $(".chat").append(template);
    }









      // al click cancellare in messagio inviato o ricevuto
      $(".chat").on("click", ".info-chat li:last-child", function(){
        $(this).parents(".message-row").remove();

      });





      // per chiudere il poupapp della info chat-------------------
      //
      // $(".angle-icon .fa-angle-down").click(
      //   function () {
      //     $(this).siblings(".info-chat").toggle();
      //   }
      // );

       // da usare solamente quando ci sono parecchi eventi click che sappiamo che avverranno come
       // ad esempio la domanda e la risposta di una chat

      $(document).on("click", ".fa-angle-down",
        function () {
        $(this).siblings(".info-chat").toggle();
        }
      );

     // associo la chat al conatto di riferimento utilizzando l attributo data-contact
      $(".contact").click(
        function() {
          $(".contact").removeClass("active");
          $(this).addClass("active");

          var dataContatto = $(this).attr("data-contact");

          $(".chat").removeClass("active");
          $(".chat[data-chat="+dataContatto+"]").addClass("active");

          var img = $(this).find("img").attr("src");
          var name = $(this).find(".contact-name").text();
          var time = $(this).find(".contact-time").text();


          $(".col-right .avatar-img img").attr("src", img);
          $(".col-right .avatar-name").text(name);
          $(".col-right .avatar-last-access time").text(time);
          console.log($(".col-right .avatar-last-access time"));
        }
      );



      // quando l utente sta scrivendo qualcosa nell input search keyup si attiva al rilascio del tasto
      $("#search").keyup(
   function() {
     // prendo la variabile searchInput e sto salvando il valore dello scritto all'interno dell input
     var searchInput = $(this).val();

     // il valore all interno dell'input viene trasformato in minuscolo
     searchInput = searchInput.toLowerCase();

    // all interno della variabile contact-name  è racchiusa la lista dei contatti
     var contactsName = $(".contact .contact-name");

    // cerco in ogni contatto singolo...
     contactsName.each(function() {

       // nella variabile name ci salviamo il nome di ogni contatto
       var name = $(this).text();

       // trasformo il nome in lettere minuscole
       name = name.toLowerCase();

      // e quindi se il nome cercato è incluso in quelli della lista
       if(name.includes(searchInput) == true) {
         // li mostriamo insieme al contenitore del contatto chiamato contact
         $(this).parents(".contact").show();
         // li nascondiamo insieme al contenitore del contatto chiamato contact
       } else {
         $(this).parents(".contact").hide();
       }



     });

   }
 );
