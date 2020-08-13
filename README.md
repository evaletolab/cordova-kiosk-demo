Video Player Kiosk App 
======================

This example use **cordova-plugin-kiosk** - see https://github.com/hkalina/cordova-plugin-kiosk

FEATURES
--------

* play video from start on "deviceready" event.
* play video from start on "resume" event.
* dafficher une liste de lecture avec des miniatures lorsque la vidéo est terminée.
* videos assets are installed localy (available offline)
* sound level control on right side of the screen
* brightness level control on left side of the screen
* replace local file with new video (optional)

NOT AVAILABLE
-------------
* ability to control the hardware buttons behavior


INITIAL SETUP
------------------------------------

    cordova plugin add cordova-plugin-kiosk
    cordova plugin add cordova-plugin-brightness
    cordova plugin add cordova-plugin-file

    ANDROID_HOME=/opt/android-sdk cordova run


To remove app from device use adb:
----------------------------------

    $ANDROID_HOME/platform-tools/adb uninstall jk.cordova.kioskdemo

**WARNING** Before installation ensure you have USB debug mode enabled. Without it you can have a problem to remove the app from device.

