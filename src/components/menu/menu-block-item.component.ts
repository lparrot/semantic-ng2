import { Component, Input } from "@angular/core";

@Component({
    selector: '[smt-menu-block-item]',
    template: `
        <div *ngIf="header" class="header">{{header}}</div>
        <div class="menu">
            <ng-content></ng-content>
        </div>`,
    host: {
        '[class.item]': 'true'
    }
})
export class MenuBlockItemComponent {

    @Input() header:string;

}
