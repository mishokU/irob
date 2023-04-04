import useViewModel from "./LeftButtonViewModel"
import {LeftButtonProps} from "./LeftButtonProps";

export function LeftButtonComponent(props: LeftButtonProps) {
    const {
        leftButtonTheme,
        leftButtonText,
        onLeftAgreementClick
    } = useViewModel(props)
    return <button
        className={leftButtonTheme}
        onClick={onLeftAgreementClick}>{leftButtonText}</button>
}