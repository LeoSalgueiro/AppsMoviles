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

const buildGetCountryDataUrl = (
  countrySlug,
  status = "all",
  from = undefined,
  to = undefined,
) => {
  let dayOne = "";
  if (from === undefined || to === undefined) {
    dayOne = "dayone/";
  }
  // build url
  let build = `${baseUrl}${dayOne}country/${countrySlug}`;
  if (status != "all") {
    build += `/status/${status}`;
  }
  if (from) {
    build += `?from=${from}`;
  }
  if (to) {
    build += from ? `&to=${to}` : `?to=${to}`;
  }
  console.log(build);
  return build;
};

const getCountryData = (url) => {
  return $.ajax({
    url,
    method: "GET",
    timeout: 0,
  });
};
