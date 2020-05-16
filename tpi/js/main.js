$(function () {
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
        let match = false;
        for (const country of data) {
          for (const attr of getAllAvailableCountriesAttributes) {
            if (country[attr].includes(input)) {
              alert(JSON.stringify(country));

              // first found.
              match = true;
              break;
            }
          }
        }
        if (!match) {
          alert("no results for: " + input);
        }
      });
    }
  });
});
