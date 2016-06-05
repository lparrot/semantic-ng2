import { Directive, Input, HostBinding } from "@angular/core";

@Directive({
    selector: '[smt-menu-item]',
    host: {
        '[class.item]': 'true'
    }
})
export class MenuItemDirective {

    @HostBinding('class.active')
    @Input() active:boolean;

    @HostBinding('class.disabled')
    @Input() disabled:boolean;

    @HostBinding('class.header')
    @Input() header:boolean;

    @HostBinding('class.right')
    @Input() right:boolean;

}
