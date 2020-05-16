$("#share-destinatary").on("change paste keyup", function () {
  if (validateField($(this))) {
    $("#share-form").attr("action", `mailto:${$(this).val()}`);
  }
  submitBtnEnabled();
});

$("#share-subject").on("change paste keyup", function () {
  validateField($(this));
  submitBtnEnabled();
});

$("#share-body").on("change paste keyup", function () {
  validateField($(this));
  submitBtnEnabled();
});

$(document).ready(function () {
  $("#share-submit").attr("disabled", true);
  $(".error-message").hide();
  $("#share-body").focus(function () {
    $(this).setCursorPosition(
      `Mira esta informacion sobre COVID19...

    Mensaje: `.length
    );
    $(this).scrollTop(0);
  });
});

const validateField = (target) => {
  let passes = false;
  if (target.val().length < 1) {
    target.parent().find(".error-message").show();
  } else {
    target.parent().find(".error-message").hide();
    passes = true;
  }
  return passes;
};

const submitBtnEnabled = () => {
  if (
    $("#share-destinatary").val().length &&
    $("#share-subject").val().length &&
    $("#share-body").val().length
  ) {
    $("#share-submit").removeAttr("disabled");
  } else {
    $("#share-submit").attr("disabled", true);
  }
};

const showShareForm = (btn) => {
  showOnlyAmongBrothers($("#share-section"));
  const infoCard = $(btn).parent().parent().parent();
  const countryName = infoCard.find(".countryName").attr("id");
  const NewConfirmed = infoCard.find(".NewConfirmed").find("strong").html();
  const TotalConfirmed = infoCard.find(".TotalConfirmed").find("strong").html();
  const NewDeaths = infoCard.find(".NewDeaths").find("strong").html();
  const TotalDeaths = infoCard.find(".TotalDeaths").find("strong").html();
  const NewRecovered = infoCard.find(".NewRecovered").find("strong").html();
  const TotalRecovered = infoCard.find(".TotalRecovered").find("strong").html();
  const Date = infoCard.find(".Date").html();
  const message = `Mira esta informacion sobre COVID19...

  Mensaje: 
  

  PANORAMA EN ${countryName.toUpperCase()}:

    Nuevos confirmados: ${NewConfirmed}
    Total confirmados: ${TotalConfirmed}

    Nuevas muertes: ${NewDeaths}
    Total muertes: ${TotalDeaths}

    Nuevos recuperados: ${NewRecovered}
    Total recuperados: ${TotalRecovered}

  Ultima actualizacion: ${Date}
  `;

  $("#share-body").val(message);
};
