import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-upload-images",
  templateUrl: "./upload-images.component.html",
  styleUrls: ["./upload-images.component.scss"],
})
export class UploadImagesComponent implements OnInit {
  public bannerImageMessage: string;
  public bannerImageProgress: number;
  public cardImageMessage: string;
  public cardImageProgress: number;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  uploadBannerImage(files) {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);

    this.http
      .post(`${environment.apiUrl}/manage/UploadBanner`, formData, {
        reportProgress: true,
        observe: "events",
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.bannerImageProgress = Math.round(
            (100 * event.loaded) / event.total
          );
        }
        if (this.bannerImageProgress === 100)
          this.bannerImageMessage = "De afbeelding is geüpload";
      });
  }

  uploadCardImage(files) {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);

    this.http
      .post(`${environment.apiUrl}/manage/UploadCardImage`, formData, {
        reportProgress: true,
        observe: "events",
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.cardImageProgress = Math.round(
            (100 * event.loaded) / event.total
          );
        }
        if (this.bannerImageProgress === 100)
          this.cardImageMessage = "De afbeelding is geüpload";
      });
  }
}
