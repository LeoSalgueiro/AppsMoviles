const DATE_ISO_FORMAT = "YYYY-MM-DDThh:mm:00.000[Z]";
const DATE_FRIENDLY_FORMAT = "YYYY-MM-DD hh:mm";
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

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const showOnlyAmongBrothers = (target, inVelocity = "slow") => {
  $($(target).prop("tagName")).each((idx, el) => {
    $(el).hide();
  });
  $(target).show(inVelocity);
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
    from: moment($("#filter-from").val(), DATE_FRIENDLY_FORMAT).format(
      DATE_ISO_FORMAT,
    ),
    to: moment($("#filter-to").val(), DATE_FRIENDLY_FORMAT).format(
      DATE_ISO_FORMAT,
    ),
  };
};

const exampleWithStatus = {
  Country: "Argentina",
  CountryCode: "AR",
  Province: "",
  City: "",
  CityCode: "",
  Lat: "-38.42",
  Lon: "-63.62",
  Cases: 0,
  Status: "confirmed",
  Date: "2020-01-23T00:00:00Z",
};

const example = {
  Country: "Argentina",
  CountryCode: "AR",
  Province: "",
  City: "",
  CityCode: "",
  Lat: "-38.42",
  Lon: "-63.62",
  Confirmed: 0,
  Deaths: 0,
  Recovered: 0,
  Active: 0,
  Date: "2020-01-22T00:00:00Z",
};

const chartDataGeneratorAllStatus = (countryDataArray) => {
  const fixedFields = {
    fill: false, // const
    lineTension: 0.1, // const
    borderWidth: 2, // const
  };

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

const resetChartCanvas = (data) => {
  console.log(data);
  $("#chart").remove();
  $("#search-result-chart").append(
    `<canvas id="chart" width="400" height="300"></canvas>`,
  );
  var ctx = document.getElementById("chart").getContext("2d");
  myLineChart = new Chart(ctx, data);
};
