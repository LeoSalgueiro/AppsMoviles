const DATE_ISO_FORMAT = "YYYY-MM-DDThh:mm:00.000[Z]";
const DATE_FRIENDLY_FORMAT = "DD-MM-YYYY";
const chartOptions = (options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
});

const fixedFields = {
  fill: false, // const
  lineTension: 0.1, // const
  borderWidth: 2, // const
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const showOnlyAmongBrothers = (target, inVelocity = "slow") => {
  $($(target).prop("tagName")).each((idx, el) => {
    $(el).hide();
  });
  $(target).fadeIn(inVelocity);
};

//SET CURSOR POSITION
$.fn.setCursorPosition = function (pos) {
  this.each(function (index, elem) {
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  });
  return this;
};

const getFiltersValues = () => {
  return {
    status: $("#filter-status").find(":selected").val(),
    from: $("#filter-from").val().length
      ? moment($("#filter-from").val(), DATE_FRIENDLY_FORMAT).format(
          DATE_ISO_FORMAT,
        )
      : undefined,
    to: $("#filter-to").val().length
      ? moment($("#filter-to").val(), DATE_FRIENDLY_FORMAT).format(
          DATE_ISO_FORMAT,
        )
      : undefined,
  };
};

const chartDataGeneratorAllStatus = (countryDataArray) => {
  const labels = countryDataArray.map((x) => {
    return moment(x.Date).format("DD-MM-YYYY");
  });

  const confirmed = {
    borderColor: "orange",
    label: "Casos confirmados",
    data: countryDataArray.map((x) => {
      return x.Confirmed;
    }),
    ...fixedFields,
  };

  const deaths = {
    borderColor: "red",
    label: "Muertes",
    data: countryDataArray.map((x) => {
      return x.Deaths;
    }),
    ...fixedFields,
  };

  const recovered = {
    borderColor: "green",
    label: "Recuperados",
    data: countryDataArray.map((x) => {
      return x.Recovered;
    }),
    ...fixedFields,
  };

  return {
    type: "line", // const
    responsive: true, // const
    data: {
      labels,
      datasets: [confirmed, deaths, recovered],
    },
    options: chartOptions,
  };
};

const chartDataGenerator = (countryDataArray, status) => {
  if (status === "all") {
    return chartDataGeneratorAllStatus(countryDataArray);
  }

  const labels = countryDataArray.map((x) => {
    return moment(x.Date).format("DD-MM-YYYY");
  });

  const statusData = {
    borderColor:
      status === "confirmed" ? "green" : status === "deaths" ? "red" : "orange",
    label:
      status === "confirmed"
        ? "Casos confirmados"
        : status === "deaths"
        ? "Muertes"
        : "Recuperados",
    data: countryDataArray.map((x) => {
      return x.Cases;
    }),
    ...fixedFields,
  };

  return {
    type: "line", // const
    responsive: true, // const
    data: {
      labels,
      datasets: [statusData],
    },
    options: chartOptions,
  };
};

const resetChartCanvas = (data) => {
  console.log(data);
  $("#chart").remove();
  $("#search-result-chart").append(
    `<canvas id="chart" width="400" height="300"></canvas>`,
  );
  var ctx = document.getElementById("chart").getContext("2d");
  myLineChart = new Chart(ctx, data);
};

const searchFromHistory = (historyIndex) => {
  //11/05/2020
  const historyObject = getHistory()[historyIndex];
  console.log("found ", historyObject);
  // $("#search-bar-input").val(historyObject.match.Country);
  $("#filter-status").val(historyObject.filters.status).change();

  if (historyObject.filters.from) {
    $("#filter-from").val(
      moment(historyObject.filters.from).format(DATE_FRIENDLY_FORMAT),
    );
  }
  if (historyObject.filters.to) {
    $("#filter-to").val(
      moment(historyObject.filters.to).format(DATE_FRIENDLY_FORMAT),
    );
  }

  // $("#search-bar-btn").click();
  presentCountryData(
    historyObject.match.Country,
    historyObject.match.Slug,
    historyObject.match.ISO2,
  );
};

const listCountriesOnSearch = (match) => {
  $("#search-list-countries").html("");//con este no limpias el contenido, solo cambias una parte por vacio
  $("#search-list-countries2").html("");
  //$("#search-list-countries").empty(); //esto elimina todo el contenido de ese id y los childrens

  // hide filter and historial
  if (!$("#search-filter-row").is(":hidden")) {
    $("#search-filter-btn").click();
  }

  if (!$("#search-history-container").is(":hidden")) {
    $("#search-history-btn").click();
  }

  // hide summary and chart
  $("#search-summary").hide();
  $("#chart-container").hide();

  //for display matchs

  if (match.length > 10) {
    for (let i = 0; i < match.length; i++) {
      const country = match[i];

      if (i >= 10) {
        
        buildSearchResultItem2($("#search-list-countries2"), country);
        $("#search-list-countries2").hide();
      } else {
        buildSearchResultItem($("#search-list-countries"), country);
      }
    }
    seeMore($("#watch-more"), match);
  } else {
    for (const country of match) {
      buildSearchResultItem($("#search-list-countries"), country);
    }
  }
};

const presentCountryData = (Country, Slug, ISO2) => {
  // clean results
  $("#search-list-countries").html("");

  // show
  $("#search-summary").show();
  $("#chart-container").show();

  // hide filter and historial
  if (!$("#search-filter-row").is(":hidden")) {
    $("#search-filter-btn").click();
  }

  if (!$("#search-history-container").is(":hidden")) {
    $("#search-history-btn").click();
  }

  const choosedCountry = { Country, Slug, ISO2 };
  const filters = getFiltersValues();
  // TODO save on localstorage with filters
  const searchObject = {
    match: choosedCountry,
    filters,
    timestamp: Date.now().toString(),
  };
  pushObjectToHistory(searchObject);
  showHistory();

  console.log(filters);
  getCountryData(
    buildGetCountryDataUrl(
      choosedCountry.Slug,
      filters.status,
      filters.from,
      filters.to,
    ),
  ).done((data) => {
    console.log(data);
    getSummary.done((summaryData) => {
      console.log(summaryData);
      const item = summaryData.Countries.find(
        (x) => x.CountryCode === choosedCountry.ISO2,
      );

      // assign country flag to item

      $("#search-summary").empty();
      $("#search-summary").html(`<h3></h3>`);

      genericBuild($("#search-summary"), item);
      console.log(item);
      getCountryImages(item.CountryCode, function (countryImages) {
        $(".bg").css(
          "background-image",
          `linear-gradient(
                    to bottom,
                    #050505,
                    transparent,
                    transparent
                  ),url("${countryImages.image}")`,
        );
        $("#search-summary > h3").html(
          `<img src="${countryImages.flag}" alt="country" style="width: 32px" />` +
            "&nbsp;" +
            choosedCountry.Country,
        );
      });
      $("#search-summary").show("slow");

      resetChartCanvas(chartDataGenerator(data, filters.status));
    });
  });
};

function nFormatter(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}
