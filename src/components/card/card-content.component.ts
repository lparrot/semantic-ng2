import { Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'smt-card-content',
    template: `
            <a *ngIf="header" class="header" (click)="onClickHeader()">{{header}}</a>
            <ng-content select="smt-card-meta"></ng-content>
            <ng-content></ng-content>`,
    host: {
        '[class.content]': 'true'
    }
})
export class CardContentComponent {

    @Input() header:string;

    @Input() subtitle:string;

    @Output() headerClick:EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    onClickHeader() {
        this.headerClick.emit(null);
    }

}