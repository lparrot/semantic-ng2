import { Component } from "@angular/core";
import { HttpService } from "../../../../src/services/http.service";
import { SMT_DIRECTIVES } from "../../../../src/index";
import { NotificationService } from "../../../../src/services/notification/notification.service";

declare var faker:any;

@Component({
    selector: "generator-demo",
    templateUrl: "/app/components/admin/generator/generator-demo.component.html",
    directives: [ SMT_DIRECTIVES ]
})
export class GeneratorDemoComponent {

    user:any;

    constructor(private http:HttpService, private notification:NotificationService) {

    }

    generateUsers() {
        let lastname = faker.name.lastName();
        let firstname = faker.name.firstName();
        let user = {
            email: faker.internet.email(firstname.toLowerCase(), lastname.toLowerCase()),
            password: '123',
            lastname: lastname,
            firstname: firstname,
            job: faker.name.jobTitle(),
            avatar: faker.image.avatar(),
            address: faker.fake("{{address.streetAddress}} {{address.zipCode}} {{address.county}}"),
            birthday: faker.date.between('1996-01-01', '2000-12-31')
        };
        this.http.post("/users", user).subscribe((res) => {
            this.notification.showSuccess("User created !");
            console.log(res);
            this.user = res.results;
        })
    }

}