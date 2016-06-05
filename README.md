# Semantic-ng2

- Demo : https://semantic-ng2.herokuapp.com/
- Wiki page:  https://github.com/lparrot/semantic-ng2/wiki

## Installation

### Using Angular CLI

Open terminal, go into folder where you want to create the project and run these commands

```console
npm install -g angular-cli
ng new project-name
```

Go into the newly created folder and run

```console
npm install -S semantic-ng2
```

After installing the semantic-ng2 package, edit following files:

- `angular-cli-build.js`

```javascript
vendorNpmFiles: [
    ...
    'semantic-ng2/**/*'
]
```

- `src/system-config.ts`

```typescript
const map: any = {
    'semantic-ng2': 'vendor/semantic-ng2'
};

const packages:any = {
    'semantic-ng2': {defaultExtension: 'js'}
};
```

- `src/index.html`

Into the `head` tag
```html
<link rel="stylesheet" href="vendor/semantic-ng2/build/css/vendors.css">
<link rel="stylesheet" href="vendor/semantic-ng2/build/css/semantic-ng2.css">
```

Before `</body>` tag
```html
<script src="vendor/semantic-ng2/build/js/vendors-min.js"></script>
```

- `src/main.ts`

```typescript
import {SMT_PROVIDERS} from "semantic-ng2/semantic-ng2";
import {HTTP_PROVIDERS} from "@angular/http";

bootstrap(... , [HTTP_PROVIDERS, SMT_PROVIDERS]);
```

You can now use semantic-ng2 into all your components !

## Usage

The import for all semantic-ng2 package classes is

```typescript
import {...} from "semantic-ng2/semantic-ng2";
```

Edit `src/app/project-name.component.ts` file and add

```typescript
import {SMT_DIRECTIVES} from "semantic-ng2/semantic-ng2";
```

Add into `@Component` annotation

```javascript
@Component({
    ...,
    directives: [SMT_DIRECTIVES]
})
```

Edit `src/app/project-name.component.html` file and add

```html
<a smt-button [circular]="true" [color]="'red'" [icon]="'user'">Button</a>
```

Finally, in the terminal, start the project

```console
ng server
```

Now open your browser and go to the `http://localhost:4200/` url.

You should be able to see a red circular button with a user icon and `Button` text :)