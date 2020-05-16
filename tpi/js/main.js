$(function () {
  jQuery(".datetimepicker").datetimepicker();
  showOnlyAmongBrothers($("#summary-section"));
  getSummary.done((data) => {
    console.log(data);
    const summary = $("#summary-section");
    genericBuild(
      summary,
      data.Global,
      moment(data.Date).startOf("day").fromNow(),
    );
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
              alert(JSON.stringify(country));
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
            timestamp: moment().format("YYYY-MM-DDThh:mm:00.000") + "Z",
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
          });
        }
      });
    }
  });
});

const getFiltersValues = () => {
  return {
    status: $("#filter-status").find(":selected").val(),
    from:
      moment($("#filter-from").val(), "YYYY-MM-DD hh:mm").format(
        "YYYY-MM-DDThh:mm:00.000",
      ) + "Z",
    to:
      moment($("#filter-to").val(), "YYYY-MM-DD hh:mm").format(
        "YYYY-MM-DDThh:mm:00.000",
      ) + "Z",
  };
};
