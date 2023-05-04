import {useEffect, useState} from "react";
import {UiFAQModel} from "./UiFAQModel";


export default function FaqViewModel() {

    const [items, setItems] = useState<UiFAQModel[]>([])

    useEffect(() => {

        setItems([
            {
                id: 0,
                answer: "You can delete your account anytime. Just email us usov.misha@gmail.com. " +
                    "We'll be sorry to see you go but we're committed to making every process easy for you or you can delete " +
                    "in profile -> change profile -> account management -> Click on \"Deleting data and account\".",
                question: "How can I delete my IROB profile?",
                isAnswerVisible: false
            },
            {
                id: 1,
                answer: "When you delete your IROB profile all your data including everything linked to your film/tv " +
                    "content will be deleted." +
                    " You will already have possession of any documents you've already downloaded." +
                    " You'll be able to download all important documents related to each deal done.",
                question: "What happens to my data when I delete my IROB profile?",
                isAnswerVisible: false
            },
            {
                id: 2,
                answer: "For now choose Forgot your password? before you login and change to a new password from the link we send you.",
                question: "How do I change or reset my password?",
                isAnswerVisible: false
            },
            {
                id: 2,
                answer: "Yes",
                question: "Is it free to register?",
                isAnswerVisible: false
            },
            {
                id: 2,
                question: "How confidential are my transactions on Cinemarket?",
                answer: "All negotiations and transatcions are confidential. Contracts are stored on our " +
                    "secure online platform and accessible only by the seller and the buyer who made the deal.",
                isAnswerVisible: false
            }
        ])

    },[])

    return {
        items
    }

}