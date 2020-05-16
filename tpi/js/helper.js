function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const showOnlyAmongBrothers = (target) => {
  $($(target).prop("tagName")).each((idx, el) => {
    $(el).hide();
  });
  $(target).show();
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
