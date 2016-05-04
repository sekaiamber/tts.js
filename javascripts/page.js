// placeholder
var placeholder = {
  'chinese_page': function ($dom) {
    $dom.addClass('page-lang');
  }
}

$(document).ready(function() {
  $('p[name=js-placeholder]').each(function() {
    var $dom = $(this);
    var tag = $dom.html();
    if (placeholder[tag]) {
      placeholder[tag]($dom);
    }
  });
});