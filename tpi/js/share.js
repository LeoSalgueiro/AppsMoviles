$("#destinatary").on("change paste keyup", function () {
  if (validateField($(this))) {
    $("form").attr("action", `mailto:${$(this).val()}`);
  }
  submitBtnEnabled();
});

$("#subject").on("change paste keyup", function () {
  validateField($(this));
  submitBtnEnabled();
});

$("#body").on("change paste keyup", function () {
  validateField($(this));
  submitBtnEnabled();
});

$(document).ready(function () {
  $("#submit").attr("disabled", true);
});

const validateField = (target) => {
  let passes = false;
  if (target.val().length < 1) {
    target.parent().find(".error-message").removeClass("hidden");
  } else {
    target.parent().find(".error-message").addClass("hidden");
    passes = true;
  }
  return passes;
};

const submitBtnEnabled = () => {
  if (
    $("#destinatary").val().length &&
    $("#subject").val().length &&
    $("#body").val().length
  ) {
    $("#submit").removeAttr("disabled");
  } else {
    $("#submit").attr("disabled", true);
  }
};
