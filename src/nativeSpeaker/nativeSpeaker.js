import BaseSpeaker from './../baseSpeaker';
import NativeChapter from './nativeChapter';

export default class NativeSpeaker extends BaseSpeaker {
  constructor() {
    super('native');
  }
  
  static available(cb) {
    if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
      var voices = window.speechSynthesis.getVoices().filter(function(v) {return v.lang == 'zh-CN'});
      if (voices.length > 0) {
        // Safari, firefox
        return cb({
          base: true,
          book: true
        });
      } else {
        // chrome
        window.speechSynthesis.onvoiceschanged = function() {
          voices = window.speechSynthesis.getVoices().filter(function(v) {return v.lang == 'zh-CN'});
          return cb({
            base: voices.length > 0,
            book: voices.length > 0,
          });
        };
      }
    } else {
      return cb({
        base: false,
        book: false
      });
    }
  }
}

NativeSpeaker.Chapter = NativeChapter;