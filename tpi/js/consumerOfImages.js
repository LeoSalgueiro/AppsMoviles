const countryForCode = "https://restcountries.eu/rest/v2/alpha/"; //+el codigo de pais de tres digitos
const randomCovidImages = [
  "",
  "https://www.elpaccto.eu/wp-content/uploads/2020/03/fusion-medical-animation-rnr8D3FNUNY-unsplash-scaled.jpg",
  "https://cdn.cnn.com/cnnnext/dam/assets/200215174142-coronavirus-cambian-criterios-para-contabilizarlo-pkg-antonanzas-00020006.jpg",
  "https://s1.eestatic.com/2020/03/05/como/Coronavirus-Enfermedades_infecciosas-Infecciones-Como_hacer_472464572_147429913_1024x576.jpg",
  "https://wtov9.com/resources/media/6d60feaa-9e0a-4f74-9ac3-fe2671a6733d-large16x9_GettyImages1203626286.jpg?1584668466722",
];

const getRandomCovidImage = () => {
  const random = Math.floor(Math.random() * randomCovidImages.length);
  console.log("random image", random);
  return randomCovidImages[random === 0 ? 1 : random];
};

const pixabayParte1 =
  "https://pixabay.com/api/?key=16581745-b1d7d985385c1702b85b0971b&image_type=photo&category=places&min_width=3840&min_height=2160&q="; //+ la capital del pais
let infoGeneral = {
  ISO2: "",
  flag: "",
  image: "",
};

function getCountryImages(ISO2, callback) {
  infoGeneral.ISO2 = ISO2;
  getCountry(ISO2, callback); //traigo la imagen del country
}

const getCountry = (iso2, callback) =>
  $.ajax({
    url: `${countryForCode}` + iso2,
    method: "GET",
    timeout: 0,
    success: function (resFlag) {
      infoGeneral.flag = resFlag.flag;
      getImagen(resFlag.capital).done(function (resCapital) {
        if (typeof resCapital.hits[0] === "undefined") {
          infoGeneral.image = getRandomCovidImage();
        } else {
          infoGeneral.image = resCapital.hits[0].largeImageURL;
        }
        callback(infoGeneral);
      });
    },
  });

const getImagen = (capital) => {
  return $.ajax({
    url: `${pixabayParte1}` + capital,
    method: "GET",
    timeout: 0,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    dataType: "json",
  });
};

const getCountryFlag = (iso2) => {
  return $.ajax({
    url: `${countryForCode}` + iso2,
    method: "GET",
    timeout: 0,
  });
};
