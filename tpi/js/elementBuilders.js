const genericBuild = (target, item, date = null) => {
  date = date ? date : item.Date;
  date = moment(date).startOf("day").fromNow();
  target
    .append(
      `<div class="countryName" id="${
        item.Country ? item.Country : "el mundo"
      }" style="display: none;"></div>`,
    )
    .append(
      `<div class="row"><label for="NewConfirmed" class="col-5">Nuevos confirmados: </label><span name="NewConfirmed" class="col-3 NewConfirmed">
      <strong>${numberWithCommas(item.NewConfirmed)}</strong></span></div>`,
    )
    .append(
      `<div class="row"><label for="TotalConfirmed" class="col-5">Total confirmados: </label><span name="TotalConfirmed" class="col-3 TotalConfirmed">
      <strong>${numberWithCommas(item.TotalConfirmed)}</strong>
      </span></div>`,
    )
    .append('<hr class"rounded"/>')
    .append(
      `<div class="row"><label for="NewDeaths" class="col-5">Nuevas muertes: </label><span name="NewDeaths" class="col-3 NewDeaths">
      <strong>${numberWithCommas(item.NewDeaths)}</strong>
      </span></div>`,
    )
    .append(
      `<div class="row"><label for="TotalDeaths" class="col-5">Total muertes: </label><span name="TotalDeaths" class="col-3 TotalDeaths">
      <strong>${numberWithCommas(item.TotalDeaths)}</strong></span></div>`,
    )
    .append('<hr class"rounded"/>')

    .append(
      `<div class="row"><label for="NewRecovered" class="col-5">Nuevos recuperados: </label><span name="NewRecovered" class="col-3 NewRecovered">
        <strong>${numberWithCommas(item.NewRecovered)}</strong>
      </span></div>`,
    )
    .append(
      `<div class="row"><label for="TotalRecovered" class="col-5">Total recuperados: </label><span name="TotalRecovered" class="col-3 TotalRecovered">
      <strong>${numberWithCommas(item.TotalRecovered)}</strong>
      </span></div>`,
    ).append(`
    <div class="row infocard-footer">
      <div class="col-6"><p style="font-size:medium">Ultima actualización: <span class="Date">${date}</span></p></div>
      <div class="col-3"></div>
      <div class="col-3">
        <button class="circle-button background-primary" onclick="showShareForm(this)">
          <span class="white" style="font-size: 2rem; line-height: 0;">
            <i id="share-icon" class="fas fa-share-alt"></i>
          </span>
        </button>
      </div>
    </div>`);
};
