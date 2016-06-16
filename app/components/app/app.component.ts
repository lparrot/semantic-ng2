import { Component } from "@angular/core";
import { RouteConfig, ROUTER_DIRECTIVES } from "@angular/router-deprecated";
import { SMT_DIRECTIVES, HttpService, SettingsService } from "../../../src/index";
import { HomeDemoComponent } from "../home/index";
import { ButtonDemoComponent, ContainerDemoComponent, FlagDemoComponent, IconDemoComponent, RevealDemoComponent, SegmentDemoComponent } from "../elements/index";
import { MenuDemoComponent } from "../collections/index";
import { AccordionDemoComponent, CheckboxDemoComponent, DropdownDemoComponent, ModalDemoComponent, ProgressDemoComponent, SidebarDemoComponent } from "../modules/index";
import { DatatableDemoComponent } from "../customs/index";
import { CardDemoComponent } from "../views/index";
import { GeneratorDemoComponent } from "../admin/index";
import { StorageService } from "../../../src/services/storage/storage.service";

declare var $:any, toastr:any;

@RouteConfig([
    { path: '/', name: 'HomeDemo', component: HomeDemoComponent, useAsDefault: true },
    { path: '/elements/button', name: 'ButtonDemo', component: ButtonDemoComponent },
    { path: '/elements/container', name: 'ContainerDemo', component: ContainerDemoComponent },
    { path: '/elements/flag', name: 'FlagDemo', component: FlagDemoComponent },
    { path: '/elements/icon', name: 'IconDemo', component: IconDemoComponent },
    { path: '/elements/reveal', name: 'RevealDemo', component: RevealDemoComponent },
    { path: '/elements/segment', name: 'SegmentDemo', component: SegmentDemoComponent },
    { path: '/collections/menu', name: 'MenuDemo', component: MenuDemoComponent },
    { path: '/views/card', name: 'CardDemo', component: CardDemoComponent },
    { path: '/modules/accordion', name: 'AccordionDemo', component: AccordionDemoComponent },
    { path: '/modules/checkbox', name: 'CheckboxDemo', component: CheckboxDemoComponent },
    { path: '/modules/dropdown', name: 'DropdownDemo', component: DropdownDemoComponent },
    { path: '/modules/modal', name: 'ModalDemo', component: ModalDemoComponent },
    { path: '/modules/progress', name: 'ProgressDemo', component: ProgressDemoComponent },
    { path: '/modules/sidebar', name: 'SidebarDemo', component: SidebarDemoComponent },
    { path: '/customs/datatable', name: 'DatatableDemo', component: DatatableDemoComponent },
    { path: '/admin/generator', name: 'GeneratorDemo', component: GeneratorDemoComponent }
])
@Component({
    selector: 'app',
    templateUrl: '/app/components/app/app.component.html',
    directives: [ ROUTER_DIRECTIVES, SMT_DIRECTIVES ]
})
export class AppComponent {

    menus:AppSidebarItem[] = [ {
        header: 'Elements',
        menuItems: [ {
            label: 'Button',
            route: [ 'ButtonDemo' ]
        }, {
            label: 'Container',
            route: [ 'ContainerDemo' ]
        }, {
            label: 'Flag',
            route: [ 'FlagDemo' ]
        }, {
            label: 'Icon',
            route: [ 'IconDemo' ]
        }, {
            label: 'Reveal',
            route: [ 'RevealDemo' ]
        }, {
            label: 'Segment',
            route: [ 'SegmentDemo' ]
        } ]
    }, {
        header: 'Collections',
        menuItems: [ {
            label: 'Menu',
            route: [ 'MenuDemo' ]
        } ]
    }, {
        header: 'Views',
        menuItems: [ {
            label: 'Card',
            route: [ 'CardDemo' ]
        } ]
    }, {
        header: 'Modules',
        menuItems: [ {
            label: 'Accordion',
            route: [ 'AccordionDemo' ]
        }, {
            label: 'Checkbox',
            route: [ 'CheckboxDemo' ]
        }, {
            label: 'Dropdown',
            route: [ 'DropdownDemo' ]
        }, {
            label: 'Modal',
            route: [ 'ModalDemo' ]
        }, {
            label: 'Progress',
            route: [ 'ProgressDemo' ]
        }, {
            label: 'Sidebar',
            route: [ 'SidebarDemo' ]
        } ]
    }, {
        header: 'Customs',
        menuItems: [ {
            label: 'Datatable',
            route: [ 'DatatableDemo' ]
        } ]
    }, {
        header: 'Admin',
        menuItems: [ {
            label: 'Generator',
            route: [ 'GeneratorDemo' ]
        } ]
    } ];

    constructor(private http:HttpService, settings:SettingsService, private storage:StorageService) {
        toastr.options = {
            progressBar: true,
            positionClass: "toast-bottom-right"
        };
        settings.config.folder = '/app/settings';
        settings.load().then(() => {
            http.config.url = settings.getSetting('apiRest');
            this.getToken();
        });
    }

    getToken() {
        this.http.post('/commons/login', { login: 'semantic-ng2', password: '123' }).subscribe((res) => {
            if (res.success) {
                this.storage.setItem('token', res.results);
            }
        })
    }

}