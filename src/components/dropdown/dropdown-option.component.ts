import { Component, HostBinding, ElementRef, Input } from "@angular/core";
import { DropdownComponent } from "./dropdown.component";

@Component({
    selector: 'smt-dropdown-option',
    template: `
        <span *ngIf="description" class="description">{{description}}</span>
        <ng-content></ng-content>`
})
export class DropdownOptionComponent {

    initialized:boolean;

    parent:DropdownComponent;

    @HostBinding('class') classes:string = "item";

    @Input() value:string;

    @Input() description:string;

    constructor(dropdown:DropdownComponent, private elementRef:ElementRef) {
        this.parent = dropdown;
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.elementRef.nativeElement.setAttribute("data-value", this.value);
        })
    }

}

