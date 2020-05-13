const apiConf = {
  baseUrl: "https://api.covid19api.com/",
};

const { baseUrl } = apiConf;

const getSummary = $.ajax({
  url: `${baseUrl}/summary`,
  method: "GET",
});
