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
var Text = {
  notSupport: 'Your browser does not support every Speaker in `tts.js`.<br>Please change another modern browser(like Chrome), or implement a Speaker by yourself.',
  speaking: 'Speaking',
  click_me: 'Click Me',
  demo: 'This is a demo of `tts.js`.',
  example_speak_book: {
    title: "The Hitchhiker's Guide to the Galaxy",
    sub_title: 'Chapter 1, Paragraph 1',
    author: 'Douglas Adams',
    text: 'The only person for whom the house was in any way special was Arthur Dent, and that was only because it happened to be the one he lived in. He had lived in it for about three years, ever since he had moved out of London because it made him nervous and irritable. He was about thirty as well, dark haired and never quite at ease with himself. The thing that used to worry him most was the fact that people always used to ask him what he was looking so worried about. He worked in local radio which he always used to tell his friends was a lot more interesting than they probably thought. It was, too — most of his friends worked in advertising.'
  }
}

// placeholder
var placeholder = {
  'chinese_page': function ($dom) {
    $dom.addClass('page-lang');
    $dom.empty();
    $dom.append('中文说明');
  },
  'browser_support_table': function ($dom) {
    var tts = window.__tts;
    var t = function () {
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
    tts.available(t);
    t();
  },
  'quick_demo': function ($dom) {
    var tts = window.__tts;
    $dom.addClass('quick-demo');
    $dom.empty();
    $dom.append(Text.notSupport);
    $dom.addClass('warning');
    var t = function () {
      $dom.empty();
      $dom.removeClass('warning');
      var $bt = $('<div class="bt">' + Text.click_me + '</div>');
      $bt.click(function () {
        if (!$bt.hasClass('speaking')) {
          $bt.addClass('speaking');
          $bt.html(Text.speaking);
          tts.speak(Text.demo, function () {
            $bt.removeClass('speaking');
            $bt.html(Text.click_me);
          });
        }
      });
      $dom.append($bt);
      $dom.append('<div>' + Text.demo + '</div>')
    }
    tts.available(t);
  },
  'example_speak': function ($dom) {
    var tts = window.__tts;
    $dom.addClass('example-speak');
    $dom.empty();
    $dom.append(Text.notSupport);
    $dom.addClass('warning');
    var t = function () {
      $dom.empty().removeClass('warning');
      var $input = $('<input type="text" value="Type a sentence here." class="example-speak-input"></input>');
      var $bt = $('<input type="button" value="Speak"></input>');
      $bt.click(function () {
        var str = $('.example-speak-input').val();
        $bt.attr('disabled', 'disabled');
        tts.speak(str, function () {
          $bt.removeAttr('disabled');
          console.log('speaking finish');
        });
      });
      $dom.append($input).append($bt);
    }
    tts.available(t);
  },
  'example_speak_book': function ($dom) {
    var tts = window.__tts;
    $dom.addClass('example-speak-book');
    $dom.empty();
    $dom.append(Text.notSupport);
    $dom.addClass('warning');
    var t = function () {
      $dom.empty().removeClass('warning');
      var book = Text.example_speak_book;
      var text = book.text.split('. ');
      var $text = $('<blockquote class="example-speak-book-text"></blockquote>');
      for (var i = 0; i < text.length; i++) {
        var tt = i == text.length - 1 ? text[i] : text[i] + '. ';
        $text.append($('<span tts-index="' + i + '">' + tt + '</span>'));
      }
      var $info = $('<p class="info"><span><i>' + book.title + '</i></span>, <span>"' + book.sub_title + '"</span>, <span>' + book.author + '</span><input type="button" value="Speak"></input></p>');
      var $bt = $('input', $info);
      $bt.click(function () {
        $bt.attr('disabled', 'disabled');
        var strs = $('.example-speak-book-text span').map(function () {
          return $(this).html();
        });
        strs = Array.prototype.slice.call(strs);
        tts.speakBook(strs, function () {
          $bt.removeAttr('disabled');
          console.log('speaking finish');
        }, {
          onChapterStart: function (source, index) {
            $(".example-speak-book-text span[tts-index=" + index + "]").addClass('speaking');
          },
          onChapterEnded: function () {
            $(".example-speak-book-text span").removeClass('speaking');
          }
        });
      });
      $dom.append($text).append($info);
    }
    tts.available(t);
  }
}

$(document).ready(function () {
  window.__tts = new TTSManager([NativeSpeaker, BaiduSpeaker]);
  $('p[name=js-placeholder]').each(function () {
    var $dom = $(this);
    var tag = $dom.html();
    if (placeholder[tag]) {
      placeholder[tag]($dom);
    }
  });
});