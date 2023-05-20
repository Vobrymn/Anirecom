
  // Select the existing card_wrapper div
  const cardWrapper = $(".card_wrapper")
  
  $("#total_results").text(suggestions.length)

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

    producers = eval(entry[9])
    if (producers.length){
      $("<h3>").text("Produced by: " + producers.join(", ")).appendTo(details);
    }
    else{
      $("<h3>").text("Produced by: -").appendTo(details);
    }
    
    
    // Create the rating div element
    const rating = $("<div>").addClass("rating");
    // ------- Can you make it so that it becomes -/10 if there's no ratings given? ------------
    if (entry[3]){
      $("<span>").text(entry[3] + "/10").appendTo(rating);
    }
    else{
      $("<span>").text("-/10").appendTo(rating);
    }
    rating.appendTo(details);
    
    // Create the tags div element
    const tags = $("<div>").addClass("tags");
    tags_list = eval(entry[7])
    for (let i = 0; i < tags_list.length; i++) {
      $("<span>").text(tags_list[i]).appendTo(tags);
    }

    tags.appendTo(details);
    
    // Append the link to the card element
    link.appendTo(card);
    
    // Append the details element to the link
    details.appendTo(link);
    
    card.appendTo(cardWrapper);
  });
  