import {useEffect, useState} from "react";
import {UiFAQModel} from "./UiFAQModel";
import {email} from "../../constants/Constants";

export default function FaqViewModel() {

    const [items, setItems] = useState<UiFAQModel[]>([])

    useEffect(() => {

        setItems([
            {
                id: 0,
                answer: `You can delete your account anytime. Just email us ${email}. ` +
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
                id: 3,
                answer: "Yes",
                question: "Is it free to register?",
                isAnswerVisible: false
            },
            {
                id: 4,
                question: "How confidential are my transactions on IROB?",
                answer: "All negotiations and transactions are confidential. Contracts are stored on our " +
                    "secure online platform and accessible only by the seller and the buyer who made the deal.",
                isAnswerVisible: false
            },
            {
                id: 5,
                question: "How to upload content on IROB?",
                answer: "Click on Upload content and fill all required fields.",
                isAnswerVisible: false
            },
            {
                id: 6,
                question: "Can you create room without content?",
                answer: "Yes you can create room with out content and attach later in the room",
                isAnswerVisible: false
            },
            {
                id: 7,
                question: "Can you cancel all notifications?",
                answer: "Yes you can cancel all notifications in profile settings. Go to Profile -> Change profile -> Notifications.",
                isAnswerVisible: false
            },
            {
                id: 8,
                question: "How to buy content?",
                answer: "First, open the catalog, then click on the content, in the content card, if you liked everything, " +
                    "click \"Open chat\", start negotiating a deal, if everyone was satisfied with all the conditions, then confirm the deal. " +
                    "As soon as there is confirmation from both sides, the buyer will be able to pay for the content.",
                isAnswerVisible: false
            },
            {
                id: 9,
                question: "How to purchase deal?",
                answer: "As soon as the payment window is available to you, you will see all the necessary cost there." +
                    " If not, then you need to connect the wallet. If you agree with it, then click on \"Execute\", then Metamask" +
                    " will open, in which you must first send a commission to the service, then sign a contract," +
                    " then deploy it, and the last step will be sending money to the seller! " +
                    " If something goes wrong, also email us for help with the current error time.",
                isAnswerVisible: false
            },
            {
                id: 10,
                question: "Why my content marked as bad content?",
                answer: "You probably received too many complaints about your content, which is why " +
                    "it is marked as inappropriate content. To remove this tag, write to us for help",
                isAnswerVisible: false
            }
        ])

    },[])

    return {
        items
    }

}