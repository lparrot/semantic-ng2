import { Component } from "@angular/core";
import { SMT_DIRECTIVES } from "../../../../src/index";
import { SHARED_DIRECTIVES } from "../../shared/index";

@Component({
    selector: "card-demo",
    templateUrl: '/app/components/views/card/card-demo.component.html',
    directives: [ SMT_DIRECTIVES, SHARED_DIRECTIVES ]
})
export class CardDemoComponent {

    public cards:any[];

    constructor() {
        this.cards = [
            {
                photo: '/app/assets/img/semantic/avatar/large/helen.jpg',
                header: 'Isae'
            },
            {
                photo: '/app/assets/img/semantic/avatar/large/joe.jpg',
                header: 'Joe'
            },
            {
                header1: 'Zoe',
                header2: 'Tom'
            },
            {
                photo: '/app/assets/img/semantic/avatar/large/stevie.jpg',
                header: 'Stevie'
            },
        ]
    }

}