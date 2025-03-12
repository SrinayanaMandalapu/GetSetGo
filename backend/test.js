// Imports the Places library
const {PlacesClient} = require('@googlemaps/places').v1;

// Instantiates a client
const placesClient = new PlacesClient();

async function callSearchText() {
  // Construct request
  const request = {
    textQuery : "Tourist Attractions in Delhi",
  };

  // Run request
  const response = await placesClient.searchText(request, {
    otherArgs: {
      headers: {
        'X-Goog-FieldMask': 'places.displayName',
      },
    },
  });
  for (let i = 0; i <= 10 ; i++){
    console.log(response[0].places[i].displayName.text);
  }
  
}

callSearchText();