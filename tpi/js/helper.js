const DATE_ISO_FORMAT = "YYYY-MM-DDThh:mm:00.000[Z]";
const DATE_FRIENDLY_FORMAT = "YYYY-MM-DD hh:mm";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const showOnlyAmongBrothers = (target, inVelocity = "slow") => {
  $($(target).prop("tagName")).each((idx, el) => {
    $(el).hide();
  });
  $(target).show(inVelocity);
};

//SET CURSOR POSITION
$.fn.setCursorPosition = function (pos) {
  this.each(function (index, elem) {
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  });
  return this;
};

const getFiltersValues = () => {
  return {
    status: $("#filter-status").find(":selected").val(),
    from: moment($("#filter-from").val(), DATE_FRIENDLY_FORMAT).format(
      DATE_ISO_FORMAT,
    ),
    to: moment($("#filter-to").val(), DATE_FRIENDLY_FORMAT).format(
      DATE_ISO_FORMAT,
    ),
  };
};
