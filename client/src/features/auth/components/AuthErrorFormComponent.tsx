import {IMessage} from "../../../ui/interfaces/IMessage";

export function AuthErrorFormComponent({message}: IMessage) {
    return <p className="pt-1 pl-2 text-xs text-red-600">{message}</p>
}