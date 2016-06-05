import { Component } from "@angular/core";
import { SMT_DIRECTIVES } from "../../../../src/index";
import { NotificationService } from "../../../../src/services/notification/notification.service";
import { ConstUtil } from "../../../../src/core/util/const.util";

@Component({
    selector: 'progress-demo',
    templateUrl: `/app/components/modules/progress/progress-demo.component.html`,
    directives: [ SMT_DIRECTIVES ]
})
export class ProgressDemoComponent {

    value1:number = 0;
    value2:number = 0;

    constructor(private notification:NotificationService) {
        this.lists = {
            color: ConstUtil.COLOR_LIST,
        };
    }

    ngAfterViewInit() {
        setInterval(() => {
            this.value1 = this.getRandomValue();
            this.value2 = this.getRandomValue();
        }, 2000)
    }

    private getRandomValue() {
        return Math.floor((Math.random() * 100));
    }

}