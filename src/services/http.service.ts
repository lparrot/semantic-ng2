import "rxjs/Rx";
import { Http, Headers, RequestOptions, RequestMethod, Request, URLSearchParams } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpConfig } from "./model/http-config.model";
import { StorageService } from "./storage/storage.service";

/**
 * Service pour les webservices restful
 */
@Injectable()
export class HttpService {

    config:HttpConfig = new HttpConfig();

    /**
     * Constructeur
     * @param http
     */
    constructor(private http:Http, private storage:StorageService) {
    }

    /**
     * Retourne la méthode GET de la route
     * @param url Url de la route
     * @param params Paramètres a envoyer a la requete
     * @returns {Observable<Response>} Réponse de la méthode GET de la route
     */
    get(url:string, params?:Object):Observable<any> {
        // Récupération du token dans le localstorage
        let token = this.storage.getItem("token");

        // Entête HTTP pour dire qu'on va lui envoyer du json
        let httpHeaders = new Headers({ 'Content-Type': 'application/json' });

        if (token) {
            // Ajout du token en entête
            httpHeaders.append("Authorization", token);
        }

        // Création des options de la requête
        let options = new RequestOptions({
            method: RequestMethod.Get,
            url: this.config.url + url,
            headers: httpHeaders
        });

        // Création des paramètres d'url à envoyer
        if (params) {
            options.search = new URLSearchParams();
            Object.keys(params).forEach((key) => {
                options.search.set(key, params[ key ]);
            });
        }

        // Création de la requête
        let request = new Request(options);

        // Envoi de la requête
        return this.http.request(request).map(res => res.json()).catch(err => {
            return Observable.throw(err.json() || 'Une erreur technique est survenue');
        });
    }

    /**
     * Retourne la méthode POST de la route
     * @param url Url de la route
     * @param body Corps de la requête avec les paramètres a envoyer au format JSON
     * @returns {Observable<Response>} Réponse de la méthode POST de la route
     */
    post(url:string, body:any):Observable<any> {
        // Récupération du token dans le localstorage
        let token = this.storage.getItem("token");

        // Entête HTTP pour dire qu'on va lui envoyer du json
        let httpHeaders = new Headers({ 'Content-Type': 'application/json' });

        // Création du corps de la requête
        let httpBody = JSON.stringify(body);

        if (token) {
            // Ajout du token en entête
            httpHeaders.append("Authorization", token);
        }

        // Création des options de la requête
        let options = new RequestOptions({
            method: RequestMethod.Post,
            url: this.config.url + url,
            headers: httpHeaders,
            body: httpBody
        });

        // Création de la requête
        let request = new Request(options);

        // Envoi de la requête
        return this.http.request(request).map(res => res.json()).catch(err => {
            return Observable.throw(err.json() || 'Une erreur technique est survenue');
        });
    }

}