import { CapitalizePipe } from "./pipes/index";
import { HttpService, SettingsService, GravatarService, StorageService, NotificationService } from "./services/index";
import { AccordionComponent, AccordionItemComponent } from "./components/accordion/index";
import { ButtonComponent, ButtonGroupComponent } from "./components/button/index";
import { CardComponent, CardContentComponent, CardExtraComponent, CardGroupComponent, CardImageComponent, CardMetaComponent } from "./components/card/index";
import { CheckboxComponent, CheckboxListComponent } from "./components/checkbox/index";
import { ContainerComponent } from "./components/container/index";
import { DatatableComponent } from "./components/datatable/index";
import { DividerComponent } from "./components/divider/index";
import { DropdownComponent, DropdownOptionComponent } from "./components/dropdown/index";
import { FlagComponent } from "./components/flag/index";
import { FormComponent } from "./components/form/index";
import { GravatarDirective } from "./components/gravatar/index";
import { IconComponent, IconGroupComponent } from "./components/icon/index";
import { LabelComponent } from "./components/label/index";
import { MenuComponent, MenuBlockItemComponent, MenuItemDirective } from "./components/menu/index";
import { ModalComponent, ModalActionComponent, ModalContentComponent, ModalHeaderComponent } from "./components/modal/index";
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
    ContainerComponent,
    DatatableComponent,
    DividerComponent,
    DropdownComponent, DropdownOptionComponent,
    FlagComponent,
    FormComponent,
    GravatarDirective,
    IconComponent, IconGroupComponent,
    LabelComponent,
    MenuComponent, MenuBlockItemComponent, MenuItemDirective,
    ModalComponent, ModalActionComponent, ModalContentComponent, ModalHeaderComponent,
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