// Select the existing card_wrapper div
const cardWrapper = $(".card_wrapper")

if (search_history == null){
  $(".word").text("No results")
}
// Loop through the array of suggestions and create elements
else{
    $.each(search_history, function(index, entry) {
        
        var ind = entry[0];
        // Parse the JSON string into an object
        var history = entry[1];
        if (logged_in){
            history = JSON.parse(history);
        }

        // Access the properties from the JSON object
        var content_type = history.content_type;
        var genres = history.genres;
        var themes = history.themes;
        var producers = history.producers;
        var dates = history.dates;
        
        
        // Create the card element
        const card = $("<div>").addClass("card");
        
        // Create the dot container
        var dotContainer = $('<div>').addClass('dot-container');
        for (var i = 0; i < 4; i++) {
            dotContainer.append($('<div>').addClass('dot'));
        }
    
        var details = $('<div>').addClass('details');
        details.append($('<p>').addClass('t_d').text('Log ' + (ind)));
        details.append($('<p>').addClass('ques').text('Would you like an anime or a manga?'));
        details.append($('<p>').addClass('ans').text(': ' + content_type));
        details.append($('<p>').addClass('ques').text('Are there any genres you\'re interested in?'));
        details.append($('<p>').addClass('ans').text(': ' + genres.join(", ")));
        details.append($('<p>').addClass('ques').text('Are there any themes you\'re interested in?'));
        details.append($('<p>').addClass('ans').text(': ' + themes.join(", ")));
        if (content_type == "anime"){
            details.append($('<p>').addClass('ques').text('Are there any particular studios you\'d like to look up?'));
        }
        else{
            details.append($('<p>').addClass('ques').text('Any specific authors you\'d like to look up?'));
        }

        details.append($('<p>').addClass('ans').text(': ' + producers.join(", ")));
        details.append($('<p>').addClass('ques').text('Are there any year preferences?'));
        details.append($('<p>').addClass('ans').text(': '+ dates));

        // Create the suggests button
        var suggestsButton = $('<button>').attr('id', 'suggests_b').text('Results').on('click', function() {
            var url = `/suggestions?content_type=${encodeURIComponent(content_type)}&genres=${encodeURIComponent(JSON.stringify(genres))}&themes=${encodeURIComponent(JSON.stringify(themes))}&producers=${encodeURIComponent(JSON.stringify(producers))}&dates=${encodeURIComponent(dates)}`;
            window.location.href = url;
        });

        // Append the dot container, details, and suggests button to the card
        card.append(dotContainer);
        card.append(details);
        card.append(suggestsButton);

        card.val(ind);

        // Append the card to the card wrapper element
        $('.card_wrapper').append(card);
        
        card.appendTo(cardWrapper);
    });
}



$('.card_wrapper').on('click', '.card button', function() {
    var card = $(this).closest('.card');
    var ind = card.val();
  
    // Retrieve the data from the card using the index value
    var entry = search_history[ind];
    var history = entry[1];
    if (logged_in){
        history = JSON.parse(history);
    }
  
    // Access the properties from the history object
    var content_type = history.content_type;
    var genres = history.genres;
    var themes = history.themes;
    var producers = history.producers;
    var dates = history.dates;
  
    // Construct the URL using the data
    var url = `/suggestions?content_type=${encodeURIComponent(content_type)}&genres=${encodeURIComponent(JSON.stringify(genres))}&themes=${encodeURIComponent(JSON.stringify(themes))}&producers=${encodeURIComponent(JSON.stringify(producers))}&dates=${encodeURIComponent(dates)}`;
  
    // Redirect to the URL
    window.location.href = url;
  });

  function sortResults() {
    var cardWrapper = $('.card_wrapper');
    var cards = cardWrapper.children('.card').get();

    var order = $('#sort').val();

    cards.sort(function(a, b) {
      var valueA = $(a).val();
      var valueB = $(b).val();
        
      if (order === 'oldest') {
        return valueA - valueB;
      } else if (order === 'latest') {  
        return valueB - valueA;
      }
    });
  
    cardWrapper.empty();
    $.each(cards, function(index, card) {
        cardWrapper.append(card);
    });
  }

  $('#sort').on('input', function() {
    sortResults();
  });