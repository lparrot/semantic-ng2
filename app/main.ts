import "rxjs/Rx";
import { bootstrap } from "@angular/platform-browser-dynamic";
import { ROUTER_PROVIDERS } from "@angular/router-deprecated";
import { HTTP_PROVIDERS } from "@angular/http";
import { AppComponent } from "./components/index";
import { SMT_PROVIDERS } from "../src/index";

bootstrap(AppComponent, [ ROUTER_PROVIDERS, HTTP_PROVIDERS, SMT_PROVIDERS ]);