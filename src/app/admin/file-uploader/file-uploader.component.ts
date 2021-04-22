import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  constructor(
    public api:ApiService,
    public dialogRef:MatDialogRef<FileUploaderComponent>
  ) { }

  ngOnInit(): void {
  }

  selectedFile:any;

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    }
  }

  loadingUpload:boolean;

  uploadFile() {
    this.loadingUpload = true;
    const input = new FormData();
    input.append('file', this.selectedFile);
    this.api.upload(input).subscribe(res => {
      this.updateProduct(res);
      console.log(res);
    }, err => {
      this.loadingUpload = false;
      alert('Upload gagal');

    })
  }

  updateProduct(data) {
    if (data.status) {
      this.loadingUpload = false;
      alert('File berhasil diunggah');
      this.dialogRef.close();
      return;
    }

    alert(data.message);
  }

}
