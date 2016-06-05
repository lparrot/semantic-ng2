export class CoreUtil {

    public static isFunction(element:any) {
        return typeof element == 'function';
    }

    public static isNaN(element:any) {
        return element == undefined || element == null;
    }

}
