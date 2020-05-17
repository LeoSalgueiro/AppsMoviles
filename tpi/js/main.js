$(function () {
  jQuery(".datetimepicker").datetimepicker({
    timepicker: false,
    format: "d/m/Y",
  });

  // hide
  $("#search-summary").hide();
  $("#search-filter-row").hide();
  $("#search-history-container").hide();

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
              const item = summaryData.Countries.find(
                (x) => x.CountryCode === match.ISO2,
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
                    match.Country,
                );
              });
              $("#search-summary").show("slow");

              resetChartCanvas(chartDataGenerator(data, filters.status));
            });
          });
        }
      });
    }
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
