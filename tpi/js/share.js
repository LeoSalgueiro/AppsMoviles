$("#destinatary").on("change paste keyup", function () {
  const destinatary = $("#destinatary").val();
  $("form").attr("action", `${`mailto:${destinatary}`}`);
});
