import "rxjs/Rx";
import { Injectable, EventEmitter } from "@angular/core";
import { Http } from "@angular/http";
import { CoreUtil } from "../core/util/core.util";
import { SettingsConfig } from "./model/settings-config.model";
import { ActionRestUrl } from "./model/action-rest-url.model";

declare var $:any, _:any;

@Injectable()
/**
 * Elements de configuration de l'application
 */
export class SettingsService {

    config:SettingsConfig = new SettingsConfig();

    settingsLoaded:EventEmitter<any> = new EventEmitter();
    /**
     * Configuration par rapport à l'environnement actuel
     */
    private settings:Object;
    /**
     *  Environnement utilisé
     */
    private env:Object;
    /**
     * Actions restful
     */
    private actions:ActionRestUrl[];

    /**
     * Si la configuration a déjà été chargée ou non
     */
    private loaded:boolean = false;

    /**
     * Constructeur
     * @param http
     */
    constructor(private http:Http) {
        this.config.actionsFile = "actions.json";
        this.config.envFile = "env.json";
    }

    /**
     * Retourne la valeur de la clé du fichier d'environnement
     * @param key
     * @returns {any}
     */
    getEnv(key:any) {
        return this.env[ key ];
    }

    /**
     * Retourne la valeur de la clé du fichier de configuration par rapport à l'environnement actuel
     * @param key
     * @returns {any}
     */
    getSetting(key:any) {
        return this.settings[ key ];
    }

    /**
     * Retourne l'url de l'action selectionnée
     * @param action
     * @returns {string}
     */
    getAction(action:string, params?:Object):string {
        if (this.actions) {
            let url = this.actions.find((actionRestUrl:ActionRestUrl) => actionRestUrl.name == action).url;
            if (params) {
                Object.keys(params).forEach(key => {
                    url = _.replace(url, `{${key}}`, params[ key ] ? params[ key ].toString() : '');
                });
            }
            return url;
        }
    }

    /**
     * Méthode de chargement des objets par rapport aux fichiers de configuration JSON
     */
    load() {
        if (!this.loaded) {
            if (CoreUtil.isNaN(this.config)) {
                throw new Error(`Configuration obligatoire.`);
            }

            return new Promise((resolve) => {
                // Recherche du fichier d'environnement
                this.http.get(`${this.config.folder}/${this.config.envFile}`).map(res => res.json()).toPromise().then(envData => {
                    this.env = envData
                    this.http.get(`${this.config.folder}/${envData.env}.json`).map(res => res.json()).toPromise().then(settingsData => {
                        this.settings = settingsData;
                        this.http.get(`${this.config.folder}/${this.config.actionsFile}`).map(res => res.json()).toPromise().then(actionsData => {
                            this.actions = actionsData[ 'urls' ];
                            this.actions.forEach((element) => $.fn.api.settings.api[ element.name ] = settingsData[ 'api_rest' ] + element.url);
                            this.loaded = true;
                            this.settingsLoaded.emit(true);
                            console.log("Settings loaded");
                            resolve(this);
                        })
                    })
                })
            })
        } else {
            this.settingsLoaded.emit(true);
            return new Promise(resolve => resolve(this));
        }
    }
}