var simple_prefs = require('sdk/simple-prefs');
var preferences = require('sdk/preferences/service');
var windows = require('sdk/windows').browserWindows;
var window_utils = require('sdk/window/utils');

var x = -1.0;
var refresh = function() {
    var window = window_utils.getFocusedWindow();

    var width = window.screen.availWidth;
    var scaling = parseFloat(preferences.get('layout.css.devPixelsPerPx'));

    if(scaling < 0) {
        //nonsense, reset.
        scaling = 1.0;
        x = 1.0;
    }

    if (width < 1000) {
        x = 1.0; // reset target scaling
    } else if (scaling*width > simple_prefs.prefs['screenWidth']) {
        x = simple_prefs.prefs['pixelRatio'] / 10.0; // set scaling to magnif.
    }

    //console.log('width=' + width + ', targetscaling=' + x + ', scaling=' + scaling);

    preferences.set('layout.css.devPixelsPerPx', x+'');

};

windows.on('activate', refresh);
simple_prefs.on('', refresh);
