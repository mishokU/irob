import {useState} from "react";
import {initNotification, usePopupContext} from "../../main/contexts/NotificationProvider";
import {useSendEmailMutation} from "../../../data/store/search/SearchApi";
import {initAskQuestionProps, useAskQuestionContext} from "../../main/contexts/AskQuestionProvider";

export default function AsqQuestionViewModel(emailValue: string) {

    const [email, setEmail] = useState<string>(emailValue)
    const [question, setQuestion] = useState("")

    const [sendEmail] = useSendEmailMutation()

    const askQuestion = useAskQuestionContext()
    const popupContext = usePopupContext()

    const onSendClick = async () => {
        try {
            const result = await sendEmail({fromEmail: email, message: question}).unwrap()
            askQuestion?.setVisibility(initAskQuestionProps())
            popupContext?.setState(initNotification(result.message))
        } catch (e) {
            popupContext?.setState(initNotification("Question not send!"))
        }
    }

    return {
        email,
        setEmail,
        question,
        setQuestion,
        onSendClick
    }

}