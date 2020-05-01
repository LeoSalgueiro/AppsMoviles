/**
 * Here goes the js and jquery main code.
 */
const hideAll = () => {
  $(".section").each(function () {
    $(this).addClass("hidden");
  });
};

const fetchData = (games) => {
  $.get(
    "http://www.json-generator.com/api/json/get/clqOukMfVK?indent=2",
    function (data) {
      games.push(...data);
    }
  );
};

// init
let games = [];
fetchData(games);
hideAll();

// ready
$(document).ready(function () {
  console.log(games);

  $(".cat-selection").click(function () {
    hideAll();
    // show
    $(`#${$(this).attr("id")}-section`).removeClass("hidden");
  });
});
