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
  $("#search-bar-input").val(historyObject.match.Country);
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

  $("#search-bar-btn").click();
};
