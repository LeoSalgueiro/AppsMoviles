const apiConf = {
  baseUrl: "https://api.covid19api.com/",
};

const { baseUrl } = apiConf;

const getSummary = $.ajax({
  url: `${baseUrl}/summary`,
  method: "GET",
  timeout: 0,
});

const getAllAvailableCountries = $.ajax({
  url: `${baseUrl}/countries`,
  method: "GET",
  timeout: 0,
});

const getAllAvailableCountriesAttributes = ["Country", "Slug", "ISO2"];
