import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  constructor(
    public api:ApiService,
    public dialogRef:MatDialogRef<FileUploaderComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData
  ) { }

  ngOnInit(): void {
    console.log(this.dialogData);
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
      this.updateBook(data);
      alert('File berhasil diunggah');
      this.loadingUpload = false;
      this.dialogRef.close();
      return;
    }

    alert(data.message);
  }

  updateBook(data) {
    this.api.put('book/' + this.dialogData.id, {
      url: data.url
    }).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
