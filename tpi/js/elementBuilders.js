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

const buildHistoryCard = (target, historyObject, index) => {
  console.log("timestamp", historyObject.timestamp);
  const timestamp = moment(historyObject.timestamp, "unix").fromNow();
  const status =
    historyObject.filters.status === "all"
      ? "Todos"
      : historyObject.filters.status === "confirmed"
      ? "Confirmados"
      : historyObject.filters.status === "deaths"
      ? "Muertos"
      : historyObject.filters.status === "recovered"
      ? "Recuperados"
      : "";

  const spanStatus = `
  <div class="col">
  <span id="${index}-status"><strong>Status:</strong>  ${status}</span>
  </div>`;

  const spanFrom = historyObject.filters.from
    ? `
    <div class="col">
      <span id="${index}-from"><strong>Desde:</strong>  ${moment(
        historyObject.filters.from,
      ).format(DATE_FRIENDLY_FORMAT)}
      </span>
    </div>`
    : "";

  const spanTo = historyObject.filters.to
    ? `
    <div class="col">
      <span id="${index}-to"><strong>Hasta:</strong> ${moment(
        historyObject.filters.to,
      ).format(DATE_FRIENDLY_FORMAT)}
      </span>
    </div>`
    : "";

  target.append(`
  <article class="row card background-paper hoverable" id="search-history-art-${index}" onclick="searchFromHistory(${index})">
    <div class="container">
      <div class="row">
        <span class="col"><strong>Pais buscado:</strong> ${historyObject.match.Country}</span>&nbsp;
      </div>
      <div class="row">
        ${spanStatus}
        ${spanFrom}
        ${spanTo}
      </div>
      <div class="row">
        <span class="grey" style="float:right">${timestamp}</span>
      </div>
    </div>
  </article>
  `);
};

const buildEmptyHistory = (target) => {
  target.append(`
  <article class="row card background-paper">
    <span>No se encontraron resultados</span>
  </article>
  `);
};

const buildSearchResultItem = (target, countryName) => {
  getCountryFlag(countryName.ISO2)
    .done(function (res) {
      target.append(`
    <article id="search-list-country-${
      countryName.Country
    }_${countryName.Slug}_${countryName.ISO2}" 
        class="row card background-white hoverable country-item" onclick="presentCountryData('${
          countryName.Country
        }', '${countryName.Slug}', '${countryName.ISO2}')">
      <span class="col"><img src="${
        res.flag
      }" alt="country" style="width: 32px" /></span>
      <span class="col font-heavy">${countryName.Country}</span>
      <span class="col font-light">(pob. ${nFormatter(res.population)})</span>
    </article>
    `);
    })
    .fail(function () {
      target.append(`
    <article id="search-list-country-${countryName.Country}_${countryName.Slug}_${countryName.ISO2}" 
        class="row card background-white hoverable country-item" onclick="presentCountryData('${countryName.Country}', '${countryName.Slug}', '${countryName.ISO2}')">
      <span class="col font-heavy">${countryName.Country}</span>
    </article>
    `);
    });
};
