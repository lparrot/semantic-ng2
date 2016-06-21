import { DemoHeaderComponent } from "./demo-header.component";
import { CodeblockComponent } from "./prismjs/codeblock.component";
import { PrismjsDirective } from "./prismjs/prismjs.directive";

export * from './demo-header.component';
export * from "./prismjs/index";

export const SHARED_DIRECTIVES:any[] = [
    DemoHeaderComponent,
    CodeblockComponent, PrismjsDirective
];
