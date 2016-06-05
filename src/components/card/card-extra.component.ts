import { Component } from "@angular/core";

@Component({
    selector: 'smt-card-extra',
    template: `<ng-content></ng-content>`,
    host: {
        '[class.extra]': 'true',
        '[class.content]': 'true'
    }
})
export class CardExtraComponent {

    constructor() {
    }

}
