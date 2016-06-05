import { Directive, Input, ElementRef } from "@angular/core";
import { GravatarService } from "../../services/gravatar/gravatar.service";

@Directive({
    selector: "img[smt-gravatar]"
})
export class GravatarDirective {

    @Input() email:string;

    constructor(private element:ElementRef, private gravatar:GravatarService) {
    }

    ngAfterViewInit() {
        this.gravatar.convertToGravatar(this.email).subscribe(
            (data) => {
                if (data) {
                    this.element.nativeElement.src = data.entry[ 0 ].thumbnailUrl;
                }
            },
            (error) => console.error("can't get gravatar's account info.")
        )
    }

}
