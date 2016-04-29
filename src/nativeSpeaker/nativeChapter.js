import BaseChapter from './../baseChapter';

export default class NativeChapter extends BaseChapter {
  constructor(msg, lang) {
    super(msg);
    lang = lang || 'zh-CN';
    let utterance = new SpeechSynthesisUtterance();
    let voices = window.speechSynthesis.getVoices().filter(function(v) {
      return v.lang == 'zh-CN';
    });
    utterance.voice = voices[0]; // Note: some voices don't support altering params
    utterance.voiceURI = 'native';
    utterance.volume = 1; // 0 to 1
    utterance.rate = 1; // 0.1 to 10
    utterance.pitch = 1; //0 to 2
    utterance.text = msg;
    utterance.lang = lang;

    this.utterance = utterance;
    this.source = this.utterance;
  }
  
  play() {
    // this.utterance.onend = function(e) {
    //   cb(e);
    // };
    // Don't use `.onend` even in Chrome, this is not stabilized.
    // https://bugs.chromium.org/p/chromium/issues/detail?id=509488
    // http://stackoverflow.com/questions/23483990/speechsynthesis-api-onend-callback-not-working
    speechSynthesis.speak(this.utterance);
    function _wait() {
      if ( ! window.speechSynthesis.speaking ) {
        cb();
        return;
      }
      window.setTimeout( _wait, 100 );
    }
    _wait();
  }
}