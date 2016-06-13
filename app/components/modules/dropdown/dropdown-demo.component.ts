import { Component } from "@angular/core";
import { SMT_DIRECTIVES } from "../../../../src/index";
import { SHARED_DIRECTIVES } from "../../shared/index";
import { Http } from "@angular/http";

@Component({
    selector: 'dropdown-demo',
    templateUrl: `/app/components/modules/dropdown/dropdown-demo.component.html`,
    directives: [ SMT_DIRECTIVES, SHARED_DIRECTIVES ]
})
export class DropdownDemoComponent {

    countries:any[];

    constructor(http:Http) {
        http.get("/app/assets/json/countries.json").map((res) => res.json()).subscribe((res) => {
            this.countries = res;
        })
    }

    onClick(event) {
        console.log('Clicked', event.target);
    }

}