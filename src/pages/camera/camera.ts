import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Plugins } from '@capacitor/core';

@IonicPage({
  name: 'page-camera'
})
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  resultMessage = 'click to grab photo!';
  base64Image;

  constructor(
    public navCtrl: NavController,
    public sanitizer: DomSanitizer
  ) {
  }

  grabPhoto() {
    const { Camera } = Plugins;

    Camera.getPhoto({
      quality: 100,
      resultType: 'base64'
    }).then(result => {
      this.resultMessage = 'Success!';
      this.base64Image = this.sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpeg;base64,' + result.base64_data);
    }).catch(err => {
      this.resultMessage = err;
    })
  }
}
