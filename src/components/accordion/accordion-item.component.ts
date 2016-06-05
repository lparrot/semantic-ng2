import { Component, Input } from "@angular/core";
import { IconComponent } from "../icon/icon.component";
import { AccordionComponent } from "./accordion.component";

@Component({
    selector: 'smt-accordion-item',
    template: `
        <div class="title">
            <i smt-icon="dropdown"></i>
            {{title}}
        </div>
        <div class="content" [ngClass]="{field : parent.field == true}">
            <ng-content></ng-content>
        </div>`,
    directives: [ IconComponent ]
})
export class AccordionItemComponent {

    parent:AccordionComponent;

    @Input() title:string;

    constructor(accordion:AccordionComponent) {
        this.parent = accordion;
    }

}