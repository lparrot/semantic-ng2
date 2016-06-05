declare var _:any;

export class ConverterUtil {

    public static convertToDate(date:{day:number, month:number, year:number}):string {
        if (date && date.day && date.month && date.year) {
            return `${_.padStart(date.day, 2, '0')}/${_.padStart(date.month, 2, '0')}/${date.year}`;
        }
        return "N/C";
    }

}