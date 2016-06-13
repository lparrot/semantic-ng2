import { CoreUtil } from "./core.util";
import { SimpleChange } from "@angular/core";
declare var _:any;

/**
 * Classe utilitaire pour la génération des classes des composants
 */
export class ClassUtil {

    /**
     * Liste des classes
     */
    private classes:string[];

    /**
     * Constructeur
     * @param classesToAdd {string[]}
     */
    constructor(classesToAdd:string[]) {
        this.classes = ClassUtil.clean(classesToAdd);
    }

    public static controlValues(list:any[], attributeName:string, value:any, nullable:boolean = false):boolean {
        if (value != undefined) {
            if (!nullable) {
                if (CoreUtil.stringIsEmpty(value)) {
                    console.error(`${attributeName}: Value is required.`);
                    return false;
                }
            } else {
                if (CoreUtil.stringIsEmpty(value) || value == true) {
                    return true;
                }
                if (value == false) {
                    return false;
                }
            }
            if (list.indexOf(value) == -1) {
                console.error(`${attributeName}: Value ${value} is incorrect.`);
            } else {
                return true;
            }
            return false;
        }
        return false;
    }

    /**
     * Ajoute une classe
     * @param classToAdd {string}
     */
    addClass(classToAdd:string) {
        if (classToAdd) {
            this.classes.push(ClassUtil.format(classToAdd));
        }
    }

    /**
     * Ajoute une classe si la condition est fausse
     * @param condition {boolean}
     * @param classToAdd {string}
     */
    addClassIfFalse(condition:boolean, classToAdd:string) {
        this.addClassIfTrue(!condition, classToAdd);
    }

    /**
     * Ajoute une classe si la condition est vrai
     * @param condition {boolean}
     * @param classToAdd {string}
     */
    addClassIfTrue(condition:boolean, classToAdd:string) {
        if (condition == true) {
            this.addClass(classToAdd);
        }
    }

    /**
     * Ajoute un tableau de classe
     * @param classesToAdd {string[]}
     */
    addClasses(classesToAdd:string[]) {
        if (classesToAdd) {
            let classes:string[] = ClassUtil.clean(classesToAdd);
            if (classes.length > 0) {
                this.classes = _.union(this.classes, classes);
            }
        }
    }

    /**
     * Retourne la valeur literale du nombre passé en paramètre
     * @param number {number}
     * @returns {string}
     */
    addNumericClass(number:number) {
        if (!CoreUtil.isNaN(number)) {
            let numbers = [
                { number: 0, literal: "zero" },
                { number: 1, literal: "one" },
                { number: 2, literal: "two" },
                { number: 3, literal: "three" },
                { number: 4, literal: "four" },
                { number: 5, literal: "five" },
                { number: 6, literal: "six" },
                { number: 7, literal: "seven" },
                { number: 8, literal: "eight" },
                { number: 9, literal: "nine" },
                { number: 10, literal: "ten" },
                { number: 11, literal: "eleven" },
                { number: 12, literal: "twelve" },
                { number: 13, literal: "thirteen" },
                { number: 14, literal: "fourteen" },
                { number: 15, literal: "fifteen" },
                { number: 16, literal: "sixteen" }
            ];

            let result = _.find(numbers, { number: number });
            if (result) {
                this.addClass(result.literal);
            }
        }
    }

    detectChanges(change:SimpleChange) {
        if (change && change.currentValue) {
            return true;
        }
        return false;
    }

    /**
     * Retourne la liste des classes
     * @returns {string[]}
     */
    getClasses() {
        return this.classes;
    }

    /**
     * Retourne la liste des classes en string
     * @returns {string}
     */
    getStringClasses() {
        return this.classes.join(" ").trim().toLowerCase();
    }

    /**
     * Nettoie la liste de classes pour supprimer les elements inutiles
     * @param classesToClean {string[]}
     * @returns {string[]}
     */
    private static clean(classesToClean:string[]):string[] {
        return _.compact(classesToClean).map((classe) => ClassUtil.format(classe));
    }

    /**
     * Reformate la classe (suppression des espaces vides + lowercase)
     * @param classToFormat {string}
     * @returns {string}
     */
    private static format(classToFormat:string):string {
        return classToFormat.trim().toLowerCase();
    }

}
