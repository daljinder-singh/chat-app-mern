import React, {useEffect} from 'react'

let speed = 2; // 1 - Fast | 2 - Medium | 3 - Slow
let interval = speed * 5;

const userInfo = JSON.parse(localStorage.getItem("chat"));

const Messages = ({ messages }) => {
    useEffect( () =>{
        startScroll()
    },[messages])

const startScroll = () =>{
    const DOM = document.querySelector('.messages_section')
    let id = setInterval( ()=>{
        const scrollHight = DOM.scrollHeight - Math.abs(DOM.scrollTop)
        DOM.scrollBy(0, 20)
        if((DOM.clientHeight ) === scrollHight){
            clearInterval(id);
        }
        
    }, interval);
}
    return (
        <div className="messages_section">
            {
                messages && messages.map((item, key) => {
                    return <div key={key}>{item?.sender?._id === userInfo?._id ? <span className="usermessage">{item?.content}</span> : <span className="clientmessage">{item?.content}</span>}
                    </div>
                })
            }

        </div>
    )
}
export default Messages