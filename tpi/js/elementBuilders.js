const genericBuild = (target, item, date = null) => {
  target
    .append(
      `<div class="row"><label for="NewConfirmed" class="col-3">Nuevos confirmados: </label><span name="NewConfirmed" class="col-3">${numberWithCommas(
        item.NewConfirmed
      )}</span></div>`
    )
    .append(
      `<div class="row"><label for="TotalConfirmed" class="col-3">Total confirmados: </label><span name="TotalConfirmed" class="col-3">${numberWithCommas(
        item.TotalConfirmed
      )}</span></div>`
    )
    .append('<hr class"rounded"/>')
    .append(
      `<div class="row"><label for="NewDeaths" class="col-3">Nuevas muertes: </label><span name="NewDeaths" class="col-3">${numberWithCommas(
        item.NewDeaths
      )}</span></div>`
    )
    .append(
      `<div class="row"><label for="TotalDeaths" class="col-3">Total muertes: </label><span name="TotalDeaths" class="col-3">${numberWithCommas(
        item.TotalDeaths
      )}</span></div>`
    )
    .append('<hr class"rounded"/>')

    .append(
      `<div class="row"><label for="NewRecovered" class="col-3">Nuevos recuperados: </label><span name="NewRecovered" class="col-3">${numberWithCommas(
        item.NewRecovered
      )}</span></div>`
    )
    .append(
      `<div class="row"><label for="TotalRecovered" class="col-3">Total recuperados: </label><span name="TotalRecovered" class="col-3">${numberWithCommas(
        item.TotalRecovered
      )}</span></div>`
    )
    .append(`<p style="font-size:medium">Ultima actualización: ${date}</p>`);
};
