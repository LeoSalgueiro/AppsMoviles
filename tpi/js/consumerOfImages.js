
const countryForCode = 'https://restcountries.eu/rest/v2/currency/'; //+el codigo de pais de tres digitos

const pixabayParte1 = 'https://pixabay.com/api/?key=16581745-b1d7d985385c1702b85b0971b&image_type=photo&category=places&min_width=2500&min_height=2500&q='; //+ la capital del pais
let infoGeneral = {
    ISO2: "",
    flag: "",
    image: "",
}

function getCountryImages(ISO2, callback){
    
    infoGeneral.ISO2 = ISO2;
    getCountry(ISO2); //traigo la imagen del country
    //callback(infoGeneral)
}



const getCountry = (iso2) => $.ajax({
    
    url: `${countryForCode}`+iso2,
    method: "GET",
    timeout: 0,
    success: async function(response){
        infoGeneral.flag = response[0].flag
        await getImagen(response[0].capital)
        //console.log(infoGeneral) ver resultado en la consola
    }
    
});

const getImagen = (capital) => $.ajax({
    url: `${pixabayParte1}`+capital,
    method: "GET",
    timeout: 0,
    
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        
    },
    dataType: "json",
    
    success: function(response){
        console.log(response.hits[0].largeImageURL)
        if(typeof(response.hits[0]) === 'undefined'){
            infoGeneral.image = "https://i.pinimg.com/originals/93/e3/97/93e3971ac2d293b8270fd045a3b78b99.jpg"; //si no hay ninguna imagen para poner, pone por defecto la de la app (podria ser la bandera del pais)
        }
        else{
            infoGeneral.image = response.hits[0].largeImageURL
        }
        
    },
    error: function () {
        console.log("error");
    }
  });


