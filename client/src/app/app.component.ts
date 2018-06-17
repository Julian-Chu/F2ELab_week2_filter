import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  data: any;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http
      .get(
        "https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97"
      )
      .subscribe((value: any) => {
        this.data = value.result.records.slice(0, 3);
      });
  }
}
