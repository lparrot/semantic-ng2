import { Injectable } from "@angular/core";

declare var toastr:any;

@Injectable()
export class NotificationService {

    constructor() {
    }

    clear() {
        toastr.clear();
    }

    remove() {
        toastr.remove();
    }

    showSuccess(message, title?) {
        this.show(message, 'success', title);
    }

    showInfo(message, title?) {
        this.show(message, 'info', title);
    }

    showWarning(message, title?) {
        this.show(message, 'warning', title);
    }

    showError(message, title?) {
        this.show(message, 'error', title);
    }

    private show(message, level, title?) {
        toastr[ level ](message, title);
    }

}
