import { Component, Input } from "@angular/core";

@Component({
    selector: 'demo-header',
    template: `
        <h1 class="ui header">
            <div class="content">
            {{title}}
                <div class="sub header">
                    <span *ngIf="site">
                        <a target="_blank" href="{{url_site}}/{{site}}">Semantic UI</a> - 
                    </span>
                    <a target="_blank" href="{{url_wiki}}/{{wiki}}">Wiki</a>
                </div>
            </div>
        </h1> 
        <div class="ui divider"></div>`
})
export class DemoHeaderComponent {

    @Input() title:string;
    @Input() site:string;
    @Input() wiki:string;

    private url_site = 'http://semantic-ui.com';
    private url_wiki = 'https://github.com/lparrot/semantic-ng2/wiki';

}