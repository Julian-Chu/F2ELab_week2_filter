// tslint:disable:use-life-cycle-interface
// tslint:disable:quotemark
import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgModel } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  data: any;
  events: any = [];
  keyword = "";

  @ViewChild("tKeyword") tKeyword: NgModel;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http
      .get(
        "https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97"
      )
      .subscribe((value: any) => {
        this.events = value.result.records.slice(0, 10);
        this.data = this.events;
      });
  }

  ngAfterViewInit() {
    this.tKeyword.valueChanges.subscribe(key => {
      if (key === "" || key === null || key === undefined) {
        this.data = this.events;
      } else {
        this.data = this.events.filter(event => {
          return (
            event.Description.includes(key) ||
            event.Add.includes(key) ||
            event.Name.includes(key)
          );
        });
        console.log(this.data);
        console.log(this.events);
      }
    });
  }
}
