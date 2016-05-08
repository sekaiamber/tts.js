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
var text_en = {
  notSupport: 'Your browser does not support every Speaker in `tts.js`.<br>Please change another modern browser(like Chrome), or implement a Speaker by yourself.',
  speaking: 'Speaking',
  click_me: 'Click Me',
  demo: 'This is a demo of `tts.js`.',
  example_speak: 'Type a sentence here.',
  example_speak_book: {
    title: "The Hitchhiker's Guide to the Galaxy",
    sub_title: 'Chapter 1, Paragraph 1',
    author: 'Douglas Adams',
    text: 'The only person for whom the house was in any way special was Arthur Dent, and that was only because it happened to be the one he lived in. He had lived in it for about three years, ever since he had moved out of London because it made him nervous and irritable. He was about thirty as well, dark haired and never quite at ease with himself. The thing that used to worry him most was the fact that people always used to ask him what he was looking so worried about. He worked in local radio which he always used to tell his friends was a lot more interesting than they probably thought. It was, too — most of his friends worked in advertising.'
  },
  split: '.',
}
var text_cn = {
  notSupport: '你的浏览器不支持`tts.js`的任何一个Speaker<br>请换一个现代浏览器（比如Chrome），或者自己实现一个Speaker',
  speaking: 'Speaking',
  click_me: '点击播放',
  demo: '这是`tts.js`的demo。',
  example_speak: '在这里输入一些东西。',
  example_speak_book: {
    title: "银河系漫游指南",
    sub_title: '第一章，第一段',
    author: '道格拉斯·亚当斯',
    text: '这是一所普通的房子，无论从哪个方面来看都毫不起眼。也许这所房子只对惟一一个人有着特殊的意义，那就是阿瑟·邓特，而这也仅仅只因为他碰巧是住在里面的人而已。自从搬出伦敦那个让他紧张和急躁的鬼地方，阿瑟住在这儿已经3年了。他大概30岁上下，高个子，深色头发，属于那种总也平静不下来的家伙。他最大的焦虑就是，周围的人总是问他为什么看上去这么焦虑。他在当地的广播电台工作，他总是告诉自己的朋友们这份工作比他们想像中的有趣得多。而实际上，他的大部分朋友本身就是在这家电台工作的。'
  },
  split: '。',
}
var text_lang = {
  'en-US': text_en,
  'zh-CN': text_cn,
}
var LANG;
var Text;

// placeholder
var placeholder = {
  'chinese_page': function ($dom) {
    $dom.addClass('page-lang');
    $dom.empty();
    $dom.append('<a href="./index_cn.html">中文说明</a>');
  },
  'english_page': function ($dom) {
    $dom.addClass('page-lang');
    $dom.empty();
    $dom.append('<a href="./index.html">English Document</a>');
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
      var $input = $('<input type="text" value="' + Text.example_speak + '" class="example-speak-input"></input>');
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
      var text = book.text.split(/[\.。]/);
      var $text = $('<blockquote class="example-speak-book-text"></blockquote>');
      for (var i = 0; i < text.length; i++) {
        var tt = i == text.length - 1 ? text[i] : text[i] + Text.split;
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
  },
  'support_speaker': function($dom) {
    var tts = window.__tts;
    $dom.empty();
    var $table = $('<table><thead><tr><th>Speaker</th><th>Description</th></tr></thead><tbody></tbody></table>');
    var $tbody = $('tbody', $table);
    for (var i = 0; i < tts.speakers.length; i++) {
      var speaker = tts.speakers[i];
      var $tr = $('<tr></tr>');
      $tr.append('<td>' + speakers[speaker.speaker.name].name + '</td>');
      $tr.append('<td>' + speakers[speaker.speaker.name].description + '</td>');
      $tbody.append($tr);
    }
    $dom.append($table);
  }
}

$(document).ready(function () {
  LANG = $('p[doc-lang]').attr('doc-lang');
  Text = text_lang[LANG];
  window.__tts = new TTSManager([{
    speaker: NativeSpeaker,
    opt: [LANG]
  }, BaiduSpeaker]);
  $('p[name=js-placeholder]').each(function () {
    var $dom = $(this);
    var tag = $dom.html();
    if (placeholder[tag]) {
      placeholder[tag]($dom);
    }
  });
});