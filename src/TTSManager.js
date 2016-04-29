export default class TTSManager {
  constructor(speakers) {
    // build speakers
    speakers = speakers.map((s, i) => {
      return {
        factory: s,
        speaker: new s(),
        order: i,
        available: {
          base: false,
          track: false,
        },
      };
    });
    // props
    this.speakers = speakers;
    this.speaking = false;
    this.speaker = null;
    this._availableCallbacks = [];
    // init
    var self = this;
    for (var i = 0; i < this.speakers.length; i++) {
      var speaker = this.speakers[i];
      (function (speaker) {
        speaker.factory.available(function(res) {
          speaker.available = res;
          if (res.base) {
            if (self.speaker == null || (self.speaker && self.speaker.order > speaker.order)) {
              self.speaker = speaker;
              self.availableChange();
            }
          }
        });
      })(speaker);
    }
  }
  noop() {}
  
  availableChange(cb) {
    if (cb) {
      this._availableCallbacks.push(cb);
      if (this.speaker) {
        this.availableChange();
      }
    } else {
      for (var i = 0; i < this._availableCallbacks.length; i++) {
        this._availableCallbacks[i](this.speaker.available);
      }
    }
  }
  
  speak(msg, cb, err) {
    cb = cb || this.noop;
    err = err || this.noop;
    if (this.speaker) {
      console.log('speaking start: ' + msg);
      var chapter = new this.speaker.factory.Chapter(msg);
      var speaker = this.speaker.speaker;
      this.speaking = true;
      var self = this;
      speaker.speak(chapter, function() {
        self.speaking = false;
        console.log('speaking end: ' + msg);
        cb();
      }, function () {
        self.speaking = false;
        err();
      });
    }
  }
  
  speakTrack(msgs, cb, opts, err) {
      opts = opts || this.noop;
      cb = cb || this.noop;
      err = err || this.noop;
      var self = this;
      if (typeof opts == 'function') {
        opts = {
          onChapterEnded: opts
        }
      }
      msgs = msgs.map(function(msg) {
        return new self.speaker.factory.Chapter(msg);
      });
      var track = new this.speaker.factory.Track(msgs);
      for (var key in opts) {
        if (opts.hasOwnProperty(key)) {
          track[key] = opts[key];
        }
      }
      var speaker = this.speaker.speaker;
      this.speaking = true;
      speaker.speak(track, function() {
        self.speaking = false;
        cb();
      }, function () {
        self.speaking = false;
        err();
      });
    }
}