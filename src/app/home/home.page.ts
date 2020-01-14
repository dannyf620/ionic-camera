import { Component } from '@angular/core';
import { CameraOptions } from '@ionic-native/camera';
import { Camera } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FilesService } from '../services/files.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private camera: Camera,
              private file: File,
              private filesService: FilesService) { }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imagePath) => {
      this.sendToServer(imagePath);
    }, (err) => {
      console.log(err);
    });
  }

  readFile(file: any) {
    console.log(file);
    const reader = new FileReader();
    reader.onload = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      formData.append('file', imgBlob, file.name);
      this.filesService.sendFile(formData).subscribe(res => console.log(res));
    };
    reader.readAsArrayBuffer(file);
  }

  sendToServer(filePath) {
    this.file.resolveLocalFilesystemUrl(filePath)
      .then(entry => {
        (entry as FileEntry).file(file => this.readFile(file));
      })
      .catch(err => {
        console.log(err);
      });
  }

}
