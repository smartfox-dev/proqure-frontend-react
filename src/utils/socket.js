import { io } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import { serverURL } from '../config';
import store from '../store';
import { setActiveUser } from '../store/slice/authSlice';
import { isEmpty } from '.';
import { setMessageList } from '../store/slice/categorySlice';
const socket = io(isEmpty(serverURL) ? '/' : serverURL, { transports: ['websocket'] });
// socket.disconnect();

socket.on("connect", () => {
    console.log("connect: ", socket.id);
})

socket.on("disconnect", () =>{
    console.log("disconnect: ", socket.id);
    // setLogOut();
})

socket.on("activeUser", (data) => {
    console.log("activeUser",data);
    store.dispatch(setActiveUser(data));
})

socket.on("newMessage", () => {
    console.log("newMessage");
    let token = window.localStorage.getItem('token');
    let decodedToken = decodeToken(token)
    let data = {user_id: decodedToken.id, user_email: decodedToken.email};
    store.dispatch(setMessageList(data));
})

function decodeToken(token) {
    const decodedToken = jwtDecode(token)
    return decodedToken
}
export default socket;