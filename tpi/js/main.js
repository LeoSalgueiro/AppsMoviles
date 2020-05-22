$(function () {
  jQuery("#filter-from").datetimepicker({
    timepicker: false,
    minDate: new Date(2020, 1 - 1, 22),
    maxDate: "-1970/01/03",
    format: "d/m/Y",
  });

  jQuery("#filter-to").datetimepicker({
    timepicker: false,
    minDate: new Date(2020, 1 - 1, 22),
    maxDate: "-1970/01/02",
    format: "d/m/Y",
  });

  showHistory();
  // hide
  $("#search-summary").hide();
  $("#search-filter-row").hide();
  $("#search-history-container").hide();
  $("#loader-container").fadeOut(300);

  showOnlyAmongBrothers($("#summary-section"));
  getSummary.done((data) => {
    console.log(data);
    summary = $("#summary-section");
    genericBuild(summary, data.Global, data.Date);
  });
  $(".tab").click(function () {
    $(".tab").removeClass("activeTab");
    const tabIds = ["summary", "search", "aboutus"];
    if (tabIds.includes($(this).attr("id"))) {
      $(this).addClass("activeTab");
      showOnlyAmongBrothers($(`#${$(this).attr("id")}-section`));
    }
  });

  $("#search-bar-btn").click(function () {
    const input = $("#search-bar-input").val();
    if (input.length) {
      getAllAvailableCountries.done((data) => {
        let match = [];
        for (const country of data) {
          for (const attr of getAllAvailableCountriesAttributes) {
            if (
              country[attr]
                .toLocaleLowerCase()
                .includes(input.toLocaleLowerCase())
            ) {
              match.push(country);
              break;
            }
          }
        }
        if (match.length === 0) {
          // TODO meterlo en un div
          alert("No se encontraron resultados para: " + input);
        } else {
          if($("#search-list-countries2").children().length > 0){
            console.log("soy mayor a cero")
            $("#search-list-countries2").empty()
          }
          match = match.sort((a, b) => {
            return a.Country.length - b.Country.length;
          });
          console.table(match);
          listCountriesOnSearch(match);
        }
      });
    }
  });

  $("#search-history-clean-btn").click(function () {
    cleanHistory();
  });

  $("#search-filter-btn").click(function () {
    if (!$("#search-history-container").is(":hidden")) {
      $("#search-history-btn").click();
    }
    if ($("#search-filter-row").is(":hidden")) {
      $(this)
        .removeClass("background-secondary-dark")
        .addClass("background-lightgrey2")
        .addClass("darkslategrey")
        .addClass("union");
      $("#search-filter-row").show("false");
    } else {
      // TODO reset filter on hide
      $("#search-filter-row").hide("slow");
      $(this)
        .addClass("background-secondary-dark")
        .removeClass("background-lightgrey2")
        .removeClass("darkslategrey")
        .removeClass("union");
    }
  });

  $("#search-history-btn").click(function () {
    showHistory();
    if (!$("#search-filter-row").is(":hidden")) {
      $("#search-filter-btn").click();
    }
    if ($("#search-history-container").is(":hidden")) {
      $(this)
        .removeClass("background-secondary-dark")
        .addClass("background-lightgrey2")
        .addClass("darkslategrey")
        .addClass("union");
      $("#search-history-container").show("false");
    } else {
      // TODO reset filter on hide
      $("#search-history-container").hide("slow");
      $(this)
        .addClass("background-secondary-dark")
        .removeClass("background-lightgrey2")
        .removeClass("darkslategrey")
        .removeClass("union");
    }
  });
});

jQuery.ajaxSetup({
  beforeSend: function () {
    $("#loader-container").fadeIn(300);
  },
  complete: function () {
    $("#loader-container").fadeOut(300);
  },
});
