import BaseSource from './baseSource';

export default class BaseTrack extends BaseSource {
  constructor(chapters) {
    super();
    chapters = chapters || [];
    for (let i = 0; i < chapters.length; i++) {
      let chapter = chapters[i];
      this[i] = chapter;
    }
    this.length = chapters.length;
    
    this.onChapterEnded = this.noop;
    this.onChapterStart = this.noop;
  }
  
  play(cb, err) {
    if (this.length == 0) {
      cb();
      return;
    }
    let self = this;
    function _play(i) {
      self.onChapterStart(self[i].source, i);
      if (i == self.length - 1) {
        self[i].play(function() {
          self.onChapterEnded(self[i].source, i);
          cb();
        });
      } else {
        self[i].play(function() {
          self.onChapterEnded(self[i].source, i);
          _play(i + 1);
        });
      }
    }
    _play(0);
  }
}