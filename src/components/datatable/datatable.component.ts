import "rxjs/Rx";
import { Component, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, OnChanges } from "@angular/core";
import { ButtonComponent } from "../button/button.component";
import { CoreUtil } from "../../core/util/core.util";
import { HttpService } from "../../services/http.service";
import { SettingsService } from "../../services/settings.service";
import { ClassUtil } from "../../core/util/class.util";
import { DatatableField } from "./model/datatable-field.model";
import { DatatableInfo } from "./model/datatable-info.model";
import { StorageService } from "../../services/storage/storage.service";

declare var jQuery:any;

@Component({
    selector: 'smt-datatable',
    template: `
        <section>
            <div class="ui text menu">
                <div class="item">
                    <div class="inline fields">
                        <div class="field">
                            <label for="select_length">Show</label>
                            <select [(ngModel)]="info.limit" (ngModelChange)="onLengthChangeEvent($event)" class="ui dropdown" id="select_length">
                                <option *ngFor="let limit of info.limits" value="{{limit}}">{{limit}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="right item">
                    <div class="ui action input">
                        <input [(ngModel)]="info.search" type="text" placeholder="Search...">
                        <button #buttonSearch class="ui primary button" (click)="onSearch()">Search</button>
                    </div>
                </div>
            </div>
        </section>
        <section class="ui top attached basic segment">
            <table #table [ngClass]="classes">
                <div class="ui inverted dimmer">
                    <div class="ui text loader">Loading</div>
                </div>
                <thead>
                <tr>
                    <th *ngFor="let field of info.fields" (click)="onFieldSort(field)">
                        <span>{{field.label}}</span>
                        <i *ngIf="field.sort == 'asc'" class="icon caret up sort-icon"></i>
                        <i *ngIf="field.sort == 'desc'" class="icon caret down sort-icon"></i>
                    </th>
                </tr>
                </thead>
                <tbody *ngIf="info.data.length > 0">
                <tr *ngFor="let data of info.data; let i = index" (click)="onSelect(data, i)" [ngClass]="{'row-selected' : selectedIndex.page == info.page && selectedIndex.index == i}">
                    <td [ngStyle]="{'cursor' : selectable ? 'pointer' : 'normal'}" *ngFor="let field of info.fields">{{field.callback ? field.callback(data[field.value]) : data[field.value]}}</td>
                </tr>
                </tbody>
                <tbody *ngIf="info.data.length < 1">
                <tr>
                    <td [attr.colspan]="info.fields.length">
                        <div class="ui message">
                            <div class="header">
                                No data !
                            </div>
                            <p>There is no data, please search before show results !</p>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </section>
        <section class="ui bottom attached clearing segment">
            <div class="ui right floated pagination menu">
                <a class="icon item" (click)="info.page <= 1 ? '' : onPageChange(info.page - 1)" [ngClass]="{'disabled' : info.page <= 1}">
                    <i class="left chevron icon"></i>
                </a>
                <a class="item" (click)="onPageChange(1)" [ngClass]="{'active' : info.page == 1}">1</a>
                <a class="item" (click)="onPageChange(2)" [ngClass]="{'active' : info.page == 2}">2</a>
                <a class="item" (click)="onPageChange(3)" [ngClass]="{'active' : info.page == 3}">3</a>
                <a class="item" (click)="onPageChange(4)" [ngClass]="{'active' : info.page == 4}">4</a>
                <a class="icon item" (click)="info.page >= 4 ? '' : onPageChange(info.page + 1)" [ngClass]="{'disabled' : info.page >= 4}">
                    <i class="right chevron icon"></i>
                </a>
            </div>
        </section>`,
    directives: [ ButtonComponent ]
})
export class DatatableComponent implements AfterViewInit, OnChanges {

    classes:string[];

    initialized = true;

    searching:boolean;

    selectedIndex:{page?:number, index?:number} = {};

    @Input() name:string;

    @Input() info:DatatableInfo;

    @Input() dataField:string = "data";

    @Input() selectable:boolean;

    @Input() selected:any;

    @Input() searchOnInit:boolean = true;

    @Input() saveState:boolean;

    @Output() lengthChange:EventEmitter<any> = new EventEmitter();

    @Output() selectedChange:EventEmitter<any> = new EventEmitter();

    @ViewChild("buttonSearch") buttonSearch:ElementRef;

    @ViewChild("table") table:ElementRef;

    constructor(private http:HttpService, private settings:SettingsService, private storage:StorageService) {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngAfterViewInit() {
        if (this.saveState) {
            if (CoreUtil.isNaN(this.name)) {
                throw new Error("L'attribut 'name' est obligatoire");
            }
        }
        setTimeout(() => {
            if (!this.info.limits || this.info.limits.length < 1) {
                this.info.limits = [ 10, 25, 50, 100 ];
            }
            if (this.saveState) {
                let state = JSON.parse(this.storage.getItem(this.name));
                if (state == null) {
                    this.initInfos();
                } else {
                    this.info.page = state.page;
                    this.info.limit = state.limit;
                    this.info.search = state.search;
                }
            } else {
                this.initInfos();
            }
            if (this.searchOnInit) {
                this.settings.settingsLoaded.subscribe(()=> this.onSearch());
            }
        });
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui", "sortable", "table" ]);
        classUtil.addClassIfTrue(this.selectable, "selectable");
        this.classes = classUtil.getClasses();
        this.initialized = true;
    }

    onFieldSort(field:DatatableField) {
        this.info.fields.forEach((val) => {
            if (val != field) {
                val.sort = null;
            }
        });
        if (CoreUtil.isNaN(field.sort)) {
            field.sort = 'asc';
        } else if (field.sort == 'asc') {
            field.sort = 'desc';
        } else if (field.sort == 'desc') {
            field.sort = null;
        }
        this.onSearch();
    }

    onLengthChangeEvent(event) {
        setTimeout(() => {
            this.onSearch().then(() => {
                this.lengthChange.emit({
                    event: event,
                    value: this.info.limit
                });
            });
        });
    }

    onPageChange(page:number) {
        this.info.page = page;
        this.onSearch();
    }

    onSelect(data:any, index:number) {
        this.selectedIndex = {
            page: this.info.page,
            index: index
        };
        this.selected = data;
        this.selectedChange.emit(data);
        this.toLocalStorage();
    }

    private hideDimmer() {
        jQuery(this.table.nativeElement).dimmer('hide');
    }

    private initInfos() {
        this.info.search = '';
        this.info.page = 1;
        if (CoreUtil.isNaN(this.info.limit) || (this.info.limits && this.info.limits.indexOf(this.info.limit) == -1)) {
            this.info.limit = this.info.limits[ 0 ];
        }
    }

    private onSearch() {
        this.showDimmer();
        let params = {
            page: this.info.page.toString(),
            limit: this.info.limit.toString(),
            search: this.info.search
        };
        return new Promise((resolve) => this.http.get(this.settings.getAction(this.info.action), params).subscribe((res) => {
            this.info.data = res.results;
            this.hideDimmer();
            this.toLocalStorage();
            resolve(true);
        }));
    }

    private showDimmer() {
        jQuery(this.table.nativeElement).dimmer('show');
    }

    private toLocalStorage() {
        if (this.saveState) {
            this.storage.setItem(this.name, JSON.stringify({
                page: this.info.page,
                limit: this.info.limit,
                search: this.info.search
            }));
        }
    }

}