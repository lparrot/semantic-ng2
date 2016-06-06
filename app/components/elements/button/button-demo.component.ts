import { Component } from "@angular/core";
import { SMT_DIRECTIVES, SMT_PIPES, ConstUtil, ButtonComponent, ButtonApi } from "../../../../src/index";
import { NotificationService } from "../../../../src/services/notification/notification.service";
import { SHARED_DIRECTIVES } from "../../shared/index";

@Component({
    selector: 'button-demo',
    templateUrl: `/app/components/elements/button/button-demo.component.html`,
    directives: [ SMT_DIRECTIVES, SHARED_DIRECTIVES ],
    pipes: [ SMT_PIPES ]
})
export class ButtonDemoComponent {

    public apiInfo:ButtonApi;
    public lists:Object;

    constructor(private notification:NotificationService) {
        this.lists = {
            emphasis: ConstUtil.EMPHASIS_LIST,
            color: ConstUtil.COLOR_LIST,
            size: ConstUtil.SIZE_LIST,
            social: ButtonComponent.socialList
        };

        this.apiInfo = new ButtonApi();
        this.apiInfo.action = "get all user";
        this.apiInfo.params = {
            page: 1,
            limit: 50000,
            search: ""
        }
    }

    onCompleteApi(event) {
        this.notification.showInfo("Api call completed !");
        console.log(event);
    }

}