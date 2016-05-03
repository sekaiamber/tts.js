# tts.js
*v0.1*

## Description
Javascript API for the Text-to-Speech service, provide an interface to manage built-in TTS speaker or your own TTS service.

## Develop
I use webpack as module bundler. Our code depend on following project:

* Node.js(NPM)
* [Webpack](https://webpack.github.io/)

```shell
$ cd path/to/repo
```

Install dependencies.
```shell
$ npm install
```

Build `.min.js` file, run following command, and find min file in `/tts.js`:
```shell
$ npm run build
```

## Usage

### Speaker

`tts.js` use `Speaker` class to handle each TTS service.

#### .available( callback )

Each speaker provide an static `available` function to tell whether this service is available:

```javascript
// NativeSpeaker will detect whether your browser support
// speechSynthesis or not
NativeSpeaker.available(function(res) {
  console.log(res);
});
// The result look like this:
// {
//   base: true,
//   track: true,
// }
// This means the browser support NativeSpeaker's base service and
// support play track.
```

#### .speak( source [, cb [, err]] )

Speaker instance can speak an source class instance(Chapter or Track).

```javascript
// get an instance
var speaker = new NativeSpeaker();
speaker.speak(a_chapter_or_track, function() {
  console.log('finish');
});
```

#### Chapter and Track

Speaker should implement 2 static properties: Chapter and Track. They can point which chapter or track class are recommended to be used in this speaker.

```javascript
var speaker = new NativeSpeaker();
// use recommended Chapter
var chapter = new NativeSpeaker.Chapter('Something to speak', 'en-US');
speaker.speak(chapter);
// use your own Chapter
var chapter2 = new MyNativeChapter('Something to speak');
speaker.speak(chapter2);
```

### Chapter

Chapter class is the base service of `tts.js`.

#### .play( [callback [, err ]] )

Play the message.

```javascript
var chapter = new NativeSpeaker.Chapter('Something to speak', 'en-US');
chapter.play();
```

### Track

Track class can combine multiple Chapters one by one.

#### .play( [callback [, err ]] )

Play the message.

```javascript
var msgs = [
  'Something to speak',
  'Long long ago',
  'There is a beautiful girl'
];
var chapters = msgs.map(function(msg) {
  return new NativeSpeaker.Chapter(msg);
});
var track = new NativeSpeaker.Track(chapters, 'en-US');
track.play();
```

### Use TTSManager

Using `TTSManager` is an easy way to manage your TTS service from `tts.js`.

#### constructor(speakers)

Use one or more speakers to initialize TTSManager.

```javascript
// Pass one or more speakers into manager
var ttsmanager = new TTSManager([NativeSpeaker, BaiduSpeaker]);
// This means if NativeSpeaker is available, the manager will use
// NativeSpeaker, if not, the manager will detect if BaiduSpeaker
// is available.
```

#### .availableChange( callback )

When a speaker's available state changes, the callback will be invoked.

```javascript
var ttsmanager = new TTSManager([NativeSpeaker, BaiduSpeaker]);
ttsmanager.availableChange(function(res) {
  console.log(res);
});
// availableChange's callback may be invoked 2 times here.
```

#### .speak(msg [, cb [, err ]] )

Let TTSManager speak a string.

```javasciprt
var ttsmanager = new TTSManager([NativeSpeaker, BaiduSpeaker]);
ttsmanager.speak('Something to speak');

// ....

ttsmanager.speak('Something to speak');
```

#### .speakTrack(msgs [, cb [, opts [, err ]]] )

Let TTSManager speak a list of strings.

```javascript
var ttsmanager = new TTSManager([NativeSpeaker, BaiduSpeaker]);
ttsmanager.speakTrack([
  'Something to speak',
  'Long long ago',
  'There is a beautiful girl'
]);
```

## LICENSE

Copyright 2016 Xu Xiaomeng(@sekaiamber)

Released under the MIT and GPL (version 2 or later) Licenses.