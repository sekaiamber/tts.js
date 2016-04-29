/**
 * tts.js
 *
 * Copyright 2016 Xu Xiaomeng(@sekaiamber)
 *
 * Released under the MIT and GPL Licenses.
 *
 * ------------------------------------------------
 *  author:  Xu Xiaomeng
 *  version: 0.0.1
 *  source:  github.com/sekaiamber/tts.js
 */

import TTSManager from './TTSManager';
import {Speakers} from './speakers';

(function(context) {
  context.TTSManager = TTSManager;
  for (var key in Speakers) {
    if (Speakers.hasOwnProperty(key)) {
      context[key] = Speakers[key];
    }
  }
})(window);