import { Directive, ViewContainerRef, AfterViewInit, Input } from "@angular/core";

declare const Prism:any;

@Directive({
    selector: "[prismjs]"
})
export class PrismjsDirective implements AfterViewInit {

    @Input("prismjs") language:string;

    constructor(public viewContainer:ViewContainerRef) {
    }

    ngAfterViewInit():any {
        const html = Prism.highlight(this.viewContainer.element.nativeElement.innerText, Prism.languages[ this.language ]);
        const elClass = "language-" + this.language;
        this.viewContainer.element.nativeElement.innerHTML = `<pre class=${elClass}><code>${html}</code></pre>`;
    }

}
