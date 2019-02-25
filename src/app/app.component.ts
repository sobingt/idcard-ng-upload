import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private http: HttpClient) {}
  title = "client";

  selectedFile: File;
  imagePreview: any;
  data= [];

  onFileUpload(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  OnUploadFile() {
    const formData: any = new FormData();
    formData.append("avatar", this.selectedFile, this.selectedFile.name);
    console.log(formData);
    //Upload file here send a binary data
    this.http.post("https://idcard-server.herokuapp.com/upload", formData).subscribe(
      res => {
        console.log(res);
        this.data = res.body;
      },
      err => {
        console.log(err);
      }
    );
  }
}
