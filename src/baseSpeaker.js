export default class BaseSpeaker {
  constructor(source) {
    this.source = source;
  }
  speak(cb, err) {
    cb = cb || this.noop;
    err = err || this.noop;
    try {
      this.source.play(cb, err);
    } catch (e) {
      err(e);
    }
  }
  toString() { throw new Error('Not yet implemented'); }
  noop() {}
  
  static available(cb) { throw new Error('Not yet implemented'); };
}