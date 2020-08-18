import { Component, ViewChild, ElementRef, ViewEncapsulation, Input, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit,OnDestroy {
  @ViewChild('video', {static: true}) $video: ElementRef;
  @ViewChild('left', {static: true}) $left: ElementRef;
  @ViewChild('right', {static: true}) $right: ElementRef;

  showLeft: boolean;
  showRight: boolean;
  showPlayList: boolean;

  // player: videojs.Player;
  brightness: number;
  volume: number;
  updatedScreen: boolean;

  private _brigthness: any;
  private _cordova: any;
  private _KioskPlugin: any;

  constructor(
    private elementRef: ElementRef,
  ) {
    this.brightness = 0;
    this.volume = 0;
    this._cordova = window['cordova'];
    this._brigthness = {
      setBrightness : () => {},
      getBrightness: () => {}
    };

    this._KioskPlugin = {
      exitKiosk: () => {}
    };

    //
    // make sure cordova is available
    if (!this._cordova) {
      return;
    }
    // this._brigthness = this._cordova.plugins.brightness;

    //
    // attach cordova KioskPlugin
    this._KioskPlugin = window['KioskPlugin'] || this._KioskPlugin;
  }

  ngOnInit() {
    // instantiate Video.js
    //    this.player = videojs(this.$target.nativeElement);

    //
    // check video existance
    if(!this.$video) {
      return;
    }

    this.volume = +(this.$video.nativeElement.volume * 100);
    this.$right.nativeElement.style.height = this.volume + '%';

    //
    // bind events
    this.$video.nativeElement.onended = this.onVideoEnd.bind(this);
  }

  ngOnDestroy() {
    // destroy player
    // if (this.player) {
    //   this.player.dispose();
    // }
  }

  onExitKiosk() {
    this._KioskPlugin.exitKiosk();
  }

  onVideoEnd($event) {
    this.showPlayList = true;
  }

  onVideoToggle() {
    this.showPlayList = false;
    if(this.$video.nativeElement.paused) {
      this.$video.nativeElement.play();
    } else {
      this.$video.nativeElement.pause();
    }
  }

  //
  // SCREEN
  onTouchBrightnessStart($event){
    this.showLeft = true;
    this.updatedScreen = false;
  }

  onTouchBrightnessEnd($event){
    this.showLeft = false;
    //
    // screen touch
    if(!this.updatedScreen) {
      this.onVideoToggle();
    }
  }


  onTouchBrightness($event){
    if(!this.showLeft) {
      return;
    }
    const height = innerHeight;
    const touchY = height - Math.min(Math.max(0, $event.changedTouches[0].pageY), height);
    this.brightness = ( touchY / height * 100) | 0;
    this.$left.nativeElement.style.height = this.brightness + '%';
    this._brigthness.setBrightness((this.brightness / 100), (success) => {

    }, (error) => {

    });
    this.updatedScreen = true;
  }

  //
  // VOLUME
  onTouchVolumeStart($event){
    this.showRight = true;
    this.updatedScreen = false;
  }

  onTouchVolumeEnd($event){
    this.showRight = false;
    //
    // screen touch
    if(!this.updatedScreen) {
      this.onVideoToggle();
    }
  }


  onTouchVolume($event){
    if(!this.showRight) {
      return;
    }
    const height = innerHeight;
    const touchY = height - Math.min(Math.max(0, $event.changedTouches[0].pageY), height);
    this.volume = ( touchY / height * 100)|0;
    this.$right.nativeElement.style.height = this.volume + '%';
    this.$video.nativeElement.volume = this.volume / 100;
    this.updatedScreen = true;
  }

}
