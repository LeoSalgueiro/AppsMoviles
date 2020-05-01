/**
 * Here goes the js and jquery main code.
 */
const hideAll = () => {
  $(".section").each(function () {
    $(this).addClass("hidden");
  });
};

hideAll();

$(document).ready(function () {
  $(".cat-selection").click(function () {
    hideAll();
    // show
    $(`#${$(this).attr("id")}-section`).removeClass("hidden");
  });
});
