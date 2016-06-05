import { Component, Input } from "@angular/core";

@Component({
    selector: 'smt-card-image',
    template: `<img src="{{image}}">`,
    host: {
        '[class.image]': 'true'
    }
})
export class CardImageComponent {

    @Input() image:string;

    constructor() {
    }

}