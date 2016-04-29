import BaseTrack from './baseTrack';
import BaseChapter from './baseChapter';

export default class BaseSpeaker {
  constructor(name) {
    this.name = name;
  }
  speak(source, cb, err) {
    cb = cb || this.noop;
    err = err || this.noop;
    try {
      source.play(cb, err);
    } catch (e) {
      err(e);
    }
  }
  toString() { throw new Error('Not yet implemented'); }
  noop() {}
  
  static available(cb) { throw new Error('Not yet implemented'); };
}

BaseSpeaker.Track = BaseTrack;
BaseSpeaker.Chapter = BaseChapter;