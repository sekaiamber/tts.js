// speakers
var speakers = {
  native: {
    name: 'Native Speaker',
    description: 'Use Html5 SpeechSynthesis API.'
  },
  baidu: {
    name: 'Baidu Speaker',
    description: 'Use Baidu translate TTS service.'
  }
}

// placeholder
var placeholder = {
  'chinese_page': function ($dom) {
    $dom.addClass('page-lang');
  },
  'browser_support_table': function ($dom) {
    var tts = window.__tts;
    var t = function () {
      console.log(1);
      $dom.empty();
      var $table = $('<table><thead><tr><th>Speaker</th><th>Description</th><th>Base Service<br>Available</th><th>Book Service<br>Available</th></tr></thead><tbody></tbody></table>');
      var $tbody = $('tbody', $table);
      for (var i = 0; i < tts.speakers.length; i++) {
        var speaker = tts.speakers[i];
        var $tr = $('<tr></tr>');
        $tr.append('<td>' + speakers[speaker.speaker.name].name + '</td>');
        $tr.append('<td>' + speakers[speaker.speaker.name].description + '</td>');
        $tr.append('<td>' + speaker.available.base + '</td>');
        $tr.append('<td>' + speaker.available.book + '</td>');
        $tbody.append($tr);
      }
      $dom.append($table);
    }
    tts.available(function() {
      t();
    });
  }
}

$(document).ready(function() {
  window.__tts = new TTSManager([NativeSpeaker, BaiduSpeaker]);
  $('p[name=js-placeholder]').each(function() {
    var $dom = $(this);
    var tag = $dom.html();
    if (placeholder[tag]) {
      placeholder[tag]($dom);
    }
  });
});