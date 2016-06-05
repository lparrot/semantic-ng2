import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

declare var md5:any;

@Injectable()
export class GravatarService {

    constructor(private http:Http) {
    }

    convertToGravatar(email:string):Observable<any> {
        let emailMD5 = md5(email);
        return this.http.get("https://www.gravatar.com/" + emailMD5 + ".json").map((res) => res.json());
    }

}