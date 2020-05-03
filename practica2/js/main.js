/**
 * Here goes the js and jquery main code.
 */
const games = [];
const cart = [];
var total = 0;

const recalculateTotal = () => {
  total = 0;
  for (const game of cart) {
    total += game.price;
  }
  console.log(total);
  $("#cart-total").html(total);
};

const hideAll = () => {
  $(".section").each(function () {
    $(this).addClass("hidden");
  });
};

const handleAddBtnClick = (e, gameId) => {
  console.log("adding to cart: ", gameId);
  const gameFound = games.find((x) => x.id === gameId);
  cart.push(gameFound);

  // container change color
  $(e.target).parent().parent().addClass("selected");

  // turn img opac
  $(e.target).parent().parent().find($("img")).addClass("opacity");

  // hide add btn
  $(e.target).parent().find($(".add-btn")).addClass("hidden");

  // show takeout btn
  $(e.target).parent().find($(".takeout-btn")).removeClass("hidden");

  console.log(cart);
  recalculateTotal();
};

const handleTakeOutBtnClick = (e, gameId) => {
  cart.splice(
    cart.findIndex((x) => x.id === gameId),
    1
  );

  // container change color
  $(e.target).parent().parent().removeClass("selected");

  // remove img opacity
  $(e.target).parent().parent().find($("img")).removeClass("opacity");

  // show add btn
  $(e.target).parent().find($(".add-btn")).removeClass("hidden");

  // hide takeout btn
  $(e.target).parent().find($(".takeout-btn")).addClass("hidden");

  console.log(cart);
  recalculateTotal();
};

const buildArticles = (gameList) => {
  for (const game of gameList) {
    const gameInfo = document.createElement("div");
    const footer = document.createElement("div");

    const img = document.createElement("img");
    $(img)
      .addClass("product-image")
      .attr("src", game.picture)
      .attr("alt", game.title);

    const article = document.createElement("article");

    const addBtn = document.createElement("button");
    $(addBtn)
      .addClass("add-btn")
      .html("Agregar al carrito")
      .attr("onclick", `handleAddBtnClick(event, ${game.id})`);

    const takeOutBtn = document.createElement("button");
    $(takeOutBtn)
      .addClass("takeout-btn")
      .addClass("hidden")
      .html("Quitar del carrito")
      .attr("onclick", `handleTakeOutBtnClick(event, ${game.id})`);

    $(gameInfo)
      .append(img)
      .append(`<h4>${game.title} (${game.released.substr(6, 4)})</h4>`)
      .append(`<p>${game.about}</p>`)
      .append(`<p>Lanzamiento: <strong>${game.released}</strong></p>`);

    $(footer)
      .append(`<div class="price"><strong>$ ${game.price}</strong></div>`)
      .append(addBtn)
      .append(takeOutBtn);

    $(article)
      .attr("id", `article-${game.id}`)
      .addClass("article")
      .append(gameInfo)
      .append(footer);

    $(`#${game.category}-section .items`).append(article);
    games.push(game);
  }
};

const fetchData = (url) => {
  $.get(url, function (data) {
    console.log(data);
    buildArticles(data);
  }).fail(function () {
    console.log(
      "Fetching with local data from data/games.json because of 'GitHubPages non-https' resource error"
    );
    $.getJSON("./data/games.json", function (data) {
      buildArticles(data);
    });
  });
};

// init
fetchData("http://www.json-generator.com/api/json/get/bGxypiHpbC?indent=2");
hideAll();

// ready
$(document).ready(function () {
  $("#cart-total").html(total);
  $(".cat-selection").click(function () {
    hideAll();
    // show
    $(`#${$(this).attr("id")}-section`).removeClass("hidden");
  });
});
