import { Component } from "@angular/core";
import { SMT_DIRECTIVES } from "../../../../src/index";
import { NotificationService } from "../../../../src/services/notification/notification.service";
import { SHARED_DIRECTIVES } from "../../shared/index";

@Component({
    selector: 'checkbox-demo',
    templateUrl: `/app/components/modules/checkbox/checkbox-demo.component.html`,
    directives: [ SMT_DIRECTIVES, SHARED_DIRECTIVES ]
})
export class CheckboxDemoComponent {

    constructor(private notification:NotificationService) {
    }

    beforeCheckedEvent(event) {
        this.notification.showInfo("Fired : beforeCheckedEvent");
    }

    beforeDeterminateEvent(event) {
        this.notification.showInfo("Fired : beforeDeterminateEvent");
    }

    beforeIndeterminateEvent(event) {
        this.notification.showInfo("Fired : beforeIndeterminateEvent");
    }

    beforeUncheckedEvent(event) {
        this.notification.showInfo("Fired : beforeUncheckedEvent");
    }

    changeEvent(event) {
        this.notification.showInfo("Fired : changeEvent");
    }

    checkedEvent(event) {
        this.notification.showInfo("Fired : checkedEvent");
    }

    determinateEvent(event) {
        this.notification.showInfo("Fired : determinateEvent");
    }

    disableEvent(event) {
        this.notification.showInfo("Fired : disableEvent");
    }

    enableEvent(event) {
        this.notification.showInfo("Fired : enableEvent");
    }

    indeterminateEvent(event) {
        this.notification.showInfo("Fired : indeterminateEvent");
    }

    uncheckedEvent(event) {
        this.notification.showInfo("Fired : uncheckedEvent");
    }

}