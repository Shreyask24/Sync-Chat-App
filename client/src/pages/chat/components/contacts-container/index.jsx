import { Button } from "@/components/ui/button";
import NewDM from "../chat-container/new-dm";
import ProfileInfo from "./components/profile-info";
import { useNavigate } from "react-router-dom";
import ChatWithAI from "../chat-ai/ChatWithAI";
import { useAppStore } from "@/store";

const ContactsContainer = () => {
    const { setSelectedChatType, setSelectedChatData } = useAppStore()


    const selectNewContact = (ai) => {
        setSelectedChatType("ai");
        setSelectedChatData(ai);
    }

    return (
        <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
            <div className="pt-3">
                <Logo />
            </div>
            <div className="my-5">
                <div className="flex items-center justify-between pr-10">
                    <Title text="Direct Messages" />
                    <NewDM />
                </div>
            </div>

            <div className="my-5">
                <div className="flex items-center justify-between pr-10">
                    <Title text="Channels" />
                </div>
            </div>

            <div className="my-5">
                <div className="flex items-center justify-center pr-10">
                    <Button className="bg-[#1C1D25] w-[70%]" variant="outline" onClick={() => selectNewContact("ai")}>Chat With AI</Button>
                </div>
            </div>
            <ProfileInfo />
        </div>
    )
}

export default ContactsContainer

export const Logo = () => {
    return (
        <div className="flex p-5  justify-start items-center gap-2">
            <svg
                id="logo-38"
                width="78"
                height="32"
                viewBox="0 0 78 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {" "}
                <path
                    d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
                    className="ccustom"
                    fill="#8338ec"
                ></path>{" "}
                <path
                    d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
                    className="ccompli1"
                    fill="#975aed"
                ></path>{" "}
                <path
                    d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
                    className="ccompli2"
                    fill="#a16ee8"
                ></path>{" "}
            </svg>
            <span className="text-3xl font-semibold ">Syncronus</span>
        </div>
    );
};


const Title = ({ text }) => {
    return (
        <>
            <h6 className="uppercase tracking-widest text-neutral-400 font-light pl-10 text-opacity-90 text-sm">{text}</h6>
        </>
    )
}