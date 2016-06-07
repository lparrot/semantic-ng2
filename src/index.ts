import { CapitalizePipe } from "./pipes/index";
import { HttpService, SettingsService, GravatarService, StorageService, NotificationService } from "./services/index";
import { AccordionComponent, AccordionItemComponent } from "./components/accordion/index";
import { ButtonComponent, ButtonGroupComponent } from "./components/button/index";
import { CardComponent, CardContentComponent, CardExtraComponent, CardGroupComponent, CardImageComponent, CardMetaComponent } from "./components/card/index";
import { CheckboxComponent, CheckboxListComponent } from "./components/checkbox/index";
import { DatatableComponent } from "./components/datatable/index";
import { DividerComponent } from "./components/divider/index";
import { FlagComponent } from "./components/flag/index";
import { FormComponent } from "./components/form/index";
import { GravatarDirective } from "./components/gravatar/index";
import { IconComponent } from "./components/icon/index";
import { LabelComponent } from "./components/label/index";
import { MenuComponent, MenuBlockItemComponent, MenuItemDirective } from "./components/menu/index";
import { ModalComponent } from "./components/modal/index";
import { ProgressComponent } from "./components/progress/index";
import { SegmentComponent } from "./components/segment/index";
import { SidebarComponent } from "./components/sidebar/index";

export * from "./components/index";
export * from "./core/index";
export * from "./pipes/index";
export * from "./services/index";

export const SMT_DIRECTIVES:any[] = [
    AccordionComponent, AccordionItemComponent,
    ButtonComponent, ButtonGroupComponent,
    CardComponent, CardContentComponent, CardExtraComponent, CardGroupComponent, CardImageComponent, CardMetaComponent,
    CheckboxComponent, CheckboxListComponent,
    DatatableComponent,
    DividerComponent,
    FlagComponent,
    FormComponent,
    GravatarDirective,
    IconComponent,
    LabelComponent,
    MenuComponent, MenuBlockItemComponent, MenuItemDirective,
    ModalComponent,
    ProgressComponent,
    SegmentComponent,
    SidebarComponent
];

export const SMT_PIPES:any[] = [
    CapitalizePipe
];

export const SMT_PROVIDERS:any[] = [
    HttpService,
    SettingsService,
    GravatarService,
    StorageService,
    NotificationService
];