import { Helmet } from "react-helmet";
import FlowiseEmbed from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";

export default function ChatBot() {
    return(
        <Helmet>
            <script type="module">
              {`
            import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
            Chatbot.init({
              chatflowid: "98b7a173-bf68-4683-a209-5f8db8169fac",
              apiHost: "https://frontend-production-cd58.up.railway.app",
              theme: {
                button: {
                    backgroundColor: "white",
                    right: 30,
                    bottom: 20,
                    size: "medium",
                    customIconSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWcFin1OtcZI4XHbA1q1pZfv7yYuo-9d9erA&usqp=CAU",
                },
                chatWindow: {
                    welcomeMessage: "Hi, I am PathFinder bot, ask me any questions regarding interview experiences and I will try to answer them.",
                    backgroundColor: "#ffffff",
                    height: 600,
                    width: 400,
                    poweredByTextColor: "#FFFFFF",
                    botMessage: {
                        backgroundColor: "#95D6F2",
                        textColor: "#303235",
                        showAvatar: true,
                        avatarSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVegbTYVkHvoXZRTJKIwaYK19m9bq4FQeo-75iiyY&s",
                    },
                    userMessage: {
                        backgroundColor: "#FFBE88",
                        textColor: "#303235",
                        showAvatar: true,
                        avatarSrc: "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
                    },
                    textInput: {
                        placeholder: "Type your prompt here...",
                        backgroundColor: "#ffffff",
                        textColor: "#303235",
                        sendButtonColor: "#3B81F6",
                    }
                }
            }
            });
          `}
            </script>
          </Helmet>
    );
}