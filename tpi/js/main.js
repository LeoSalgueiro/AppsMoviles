$(function () {
  jQuery(".datetimepicker").datetimepicker({
    timepicker: false,
    format: "d/m/Y",
  });

  // hide
  $("#search-summary").hide();
  $("#search-filter-row").hide();

  showOnlyAmongBrothers($("#summary-section"));
  getSummary.done((data) => {
    console.log(data);
    summary = $("#summary-section");
    genericBuild(summary, data.Global, data.Date);
  });
  $(".tab").click(function () {
    const tabIds = ["summary", "search"];
    if (tabIds.includes($(this).attr("id"))) {
      showOnlyAmongBrothers($(`#${$(this).attr("id")}-section`));
    }
  });

  $("#search-bar-btn").click(function () {
    const input = $("#search-bar-input").val();
    if (input.length) {
      getAllAvailableCountries.done((data) => {
        let match = null;
        for (const country of data) {
          for (const attr of getAllAvailableCountriesAttributes) {
            if (country[attr].includes(input)) {
              // alert(JSON.stringify(country));
              match = country;
              // first found is the result.
              break;
            }
          }
        }
        if (!match) {
          // TODO meterlo en un div
          alert("No se encontraron resultados para: " + input);
        } else {
          // trigger request to fetch country data with filters
          const filters = getFiltersValues();

          // TODO save on localstorage with filters
          const searchObject = {
            match,
            filters,
            timestamp: moment().format(DATE_ISO_FORMAT),
          };
          console.log(filters);
          getCountryData(
            buildGetCountryDataUrl(
              match.Slug,
              filters.status,
              filters.from,
              filters.to,
            ),
          ).done((data) => {
            console.log(data);
            getSummary.done((summaryData) => {
              console.log(summaryData);
              $("#search-summary").empty();
              $("#search-summary").html("<h3></h3>");
              genericBuild(
                $("#search-summary"),
                summaryData.Countries.find((x) => x.CountryCode === match.ISO2),
              );
              $("#search-summary").show("slow");
              $("#search-summary > h3").html("&nbsp;" + match.Country);
              const chartData = chartDataGenerator(data, filters.status);
              resetChartCanvas(chartData);
            });
            for (const item of data) {
              // generate results
            }
          });
        }
      });
    }
  });

  $("#search-filter-btn").click(function () {
    // change color of button
    $(this).addClass("background-secondary-light");
    if ($("#search-filter-row").is(":hidden")) {
      $("#search-filter-row").show("false");
    } else {
      // TODO reset filter on hide
      $("#search-filter-row").hide("slow");
      $(this).removeClass("background-secondary-light");
    }
  });
});
