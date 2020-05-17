
const countryForCode = 'https://restcountries.eu/rest/v2/currency/'; //+el codigo de pais de tres digitos

const wallHavenSearch = 'https://wallhaven.cc/api/v1/search?q='; //+ la capital del pais

let infoGeneral = {
    ISO2: "",
    flag: "",
    image: "",
}

function getCountryImages(ISO2, callback){
    
    infoGeneral.ISO2 = ISO2;
    getCountry(ISO2); //traigo la imagen del country

    console.log(infoGeneral)
    //callback(infoGeneral)
}



const getCountry = (iso2) => $.ajax({
    
    url: `${countryForCode}`+iso2,
    method: "GET",
    timeout: 0,
    success: function(response){
        infoGeneral.flag = response[0].flag
        
    }
    
});

const getImagen = (capital) => $.ajax({
    url: `${wallHavenSearch}`+capital,
    method: "GET",
    timeout: 0,
    
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        
    },
    dataType: "json",
    
    success: function(response){
        console.log(response[0])
    },
    error: function () {
        console.log("error");
    }
  });


