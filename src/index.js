import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <Router>
//            <Provider>
//                 <App />
//             </Provider> 
//         </Router>
//     </React.StrictMode>
// );