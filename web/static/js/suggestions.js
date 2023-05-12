
  // Select the existing card_wrapper div
  const cardWrapper = $(".card_wrapper");

  console.log(suggestions)
  
  // Loop through the array of suggestions and create elements
  $.each(suggestions, function(index, entry) {
    // Create the card element

    
    const card = $("<div>").addClass("card");
  
  
    // Create the inner anchor element with the suggestions link
    const link = $("<a>").attr("href", entry[12]);
    
    // Create the poster div element
    const poster = $("<div>").addClass("poster");
    $("<img>").attr("src", entry[11]).appendTo(poster);
    poster.appendTo(link);
    
    // Create the details div element
    const details = $("<div>").addClass("details");
    $("<h1>").addClass("logo").text(entry[1]).appendTo(details);
    $("<h3>").text("Produced by " + entry[9]).appendTo(details);
    
    // Create the rating div element
    const rating = $("<div>").addClass("rating");
    $("<span>").text(entry[3]).appendTo(rating);
    rating.appendTo(details);
    
    // Create the tags div element
    const tags = $("<div>").addClass("tags");
    $("<span>").text(entry[7]).appendTo(tags);
    tags.appendTo(details);
    
    // Append the link to the card element
    link.appendTo(card);
    
    // Append the details element to the link
    details.appendTo(link);
    
    card.appendTo(cardWrapper);
  });
  