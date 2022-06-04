import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Messages from "../Messages/Messages";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Chat.css";
let socket;


const Chat = () => {
	const [Room, setRoom] = useState("");
	const [messages, setMessages] = useState([]);
	const [socketConnected, setSocketConnected] = useState(false);
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [chatList, setChatList] = useState([])
	const [newMessage, setNewMessage] = useState('')
	const [notification, setNotification] = useState([]);
	const [selectedChat, setSelectedChat] = useState('')
	const [notiMessage, showMessage] = useState(false)
	const [chats, setChats] = useState([])

	const navigate = useNavigate();

	const userInfo = JSON.parse(localStorage.getItem("chat"));

const config = {
	headers: {
		"Content-type": "application/json",
		Authorization: `Bearer ${userInfo.token}`,
	},
};

	if(!userInfo) navigate('/')


	const inputHandle = e => {
		setNewMessage(e.target.value)
	}
	const handleSearch = async (e) => {
		e.preventDefault();
		if (!search) {
			alert("Please Enter something in search");
			return;
		}
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_SOCKET_URL}/api/user?search=${search}`,
				config
			);

			const arr = JSON.parse(localStorage.getItem('searchResult')) || [];
			const newData = [...arr, ...data];
			localStorage.setItem('searchResult', JSON.stringify(newData))
			setSearchResult(data)
		} catch (error) {
			alert("Error Occured!");
		}
	};

	const fetchChats = async () => {
		try {
			const { data } = await axios.get(`${process.env.REACT_APP_SOCKET_URL}/api/chat`, config);
			setChats(data);
		} catch (error) {
			console.log("Error Occured!");
		}
	};

	const accessChat = async (userId) => {
		try {
			const { data } = await axios.post(`${process.env.REACT_APP_SOCKET_URL}/api/chat`, { userId }, config);
			setRoom(data.users.find((c) => c._id === userId));
			setSelectedChat(data);

		} catch (error) {
			console.log("Error fetching the chat");
		}
	};
	const fetchMessages = async () => {
		if (!Room?._id) return;
		let id;
		chats.forEach((user) => {
			user.users.find(c => {
			 if (c._id === Room?._id) id = user?._id 
			})})
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_SOCKET_URL}/api/message/${id}`,
				config
			);
			setMessages(data);
			socket.emit("join chat", Room?._id);
		} catch (error) {
			console.log("Error Occured!");
		}
	};
	const sendMessage = async (e) => {
		e.preventDefault()
		if (newMessage) {
			try {
				const { data } = await axios.post(
					`${process.env.REACT_APP_SOCKET_URL}/api/message`,
					{
						content: newMessage,
						chatId: selectedChat,
					},
					config
				);
				setNewMessage("");
				socket.emit("new message", data);
				setMessages([...messages, data]);
			} catch (error) {
				console.log("Error Occured!");
			}
		}
	};
	const messageNotification=()=>{
		showMessage(true)
		setTimeout(()=>{
setNotification([])
		}, 5000)
	}

	useEffect(() => {
		socket = io(process.env.REACT_APP_SOCKET_URL);
		socket.emit("setup", userInfo);
		socket.on("connected", () => setSocketConnected(true));

	}, []);
	console.log(socketConnected)
	useEffect(() => {
		setChatList(JSON.parse(localStorage.getItem('searchResult')) || [])
		fetchMessages()
		fetchChats()
	}, [searchResult, Room])

	useEffect(() => {
		socket.on("message recieved", (newMessageRecieved) => {
			if (
				!selectedChat
				|| selectedChat._id !== newMessageRecieved.chat._id
			) {
				if (!notification.includes(newMessageRecieved)) {
					setNotification([newMessageRecieved, ...notification]);
				  }
				} else {
				  setMessages([...messages, newMessageRecieved]);
				}
		});
	});
	return (
		<>
			<div className="outerContainer">
				<div className="chat_list" >
					<form className='list_form'>
						<label>
							<input
								className="gridOne"
								required
								placeholder="Search by name"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</label>
						<button onClick={handleSearch}>search</button>
					</form>
					{/* user List */}
					{chatList?.map((item, index) => (
						<li key={index} onClick={() => accessChat(item._id)} >{item.name}</li>
					))}

				</div>
				<div className="container">
					<div className="room_name"><span>{Room.name} </span> <span className='notification'
					onClick={messageNotification}
					>{!notiMessage ? notification.length : notification.map(item => {
						return `n: ${item.sender.name}, m: ${item.content}`
						})}</span>
					</div>
					{/* all message */}
					<Messages messages={messages} />

					{/* message box */}
					<form className="form">
						<input
							className="input"
							type="text"
							placeholder="Type a message..."
							value={newMessage}
							onChange={inputHandle}
						/>
						<button className="sendButton" onClick={sendMessage}>Send</button>
					</form>
				</div>
			</div>

		</>
	);
};

export default Chat;



