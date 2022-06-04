import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";

const Chat = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div style={{ width: "100%" }}>
        <MyChats fetchAgain={fetchAgain} />
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  )
}

export default Chat