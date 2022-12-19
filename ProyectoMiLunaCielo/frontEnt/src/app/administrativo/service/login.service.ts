import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  dtOptions: DataTables.Settings = {};
  constructor() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 5,
      language: {
        url: "../../../../assets/data/cdn-datatables.json",
      },
    };
  }
}
