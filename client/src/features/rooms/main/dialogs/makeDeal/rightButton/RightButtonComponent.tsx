import useViewModel from "./RightButtonViewModel"
import {RightButtonProps} from "./RightButtonProps";

export function RightButtonComponent(props: RightButtonProps) {
    const {
        rightButtonTheme,
        rightButtonText,
        onRightAgreementClick
    } = useViewModel(props)
    return <button
        onClick={onRightAgreementClick}
        className={rightButtonTheme}>{rightButtonText}</button>
}