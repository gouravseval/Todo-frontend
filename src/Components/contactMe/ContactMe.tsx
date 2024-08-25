import { MessageCircle } from "lucide-react"
import "./contactme.css"
const ContactMe = () => {
    return (
        <a  href="mailto:gouravjangra033@gmail.com">
            <div className="h-10  contact flex items-center justify-center fixed bottom-14 right-6 w-10 border rounded-[50%] border-y-4 border-customcyan">
                <MessageCircle />
            </div>
        </a>
    )
}

export default ContactMe