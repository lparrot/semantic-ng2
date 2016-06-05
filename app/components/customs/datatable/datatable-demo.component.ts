import { Component } from "@angular/core";
import { SMT_DIRECTIVES } from "../../../../src/index";
import { DatatableInfo } from "../../../../src/components/datatable/model/datatable-info.model";
import { DatatableField } from "../../../../src/components/datatable/model/datatable-field.model";
import { NotificationService } from "../../../../src/services/notification/notification.service";

@Component({
    selector: 'datatable-demo',
    templateUrl: `/app/components/customs/datatable/datatable-demo.component.html`,
    directives: [ SMT_DIRECTIVES ]
})
export class DatatableDemoComponent {

    datatableInfo:DatatableInfo;

    user:any;

    userList:any[];

    constructor(private notification:NotificationService) {
        this.datatableInfo = new DatatableInfo();
        this.datatableInfo.data = [];
        this.datatableInfo.action = "get paginated user";
        this.datatableInfo.fields = [
            new DatatableField("Id", "_id"),
            new DatatableField("Email", "email"),
            new DatatableField("Lastname", "lastname"),
            new DatatableField("Firstname", "firstname"),
            new DatatableField("Birthday", "birthday")
            // new DatatableField("Birthday", "birthday", (data) => ConverterUtil.convertToDate(data))
        ];
    };

    onSelect(event) {
        this.notification.showInfo(`Selected : ${event.firstname} ${event.lastname}`);
    }

    onTestApiComplete() {
        this.datatableInfo.data = this.userList;
    }

}