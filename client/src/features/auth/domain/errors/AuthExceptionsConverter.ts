import {getErrorMsg} from "../../../../data/errors/JSONErrorConverter";

export class AuthExceptionsConverter {

    convert(exception: any): string {
        return getErrorMsg(exception)
    }

}