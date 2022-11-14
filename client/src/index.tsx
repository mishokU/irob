import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import {ModalState} from "./context/ModalContext";
import {Provider} from "react-redux";
import {store} from "./data/store";
import './index.css';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<Provider store={store}>
    <BrowserRouter>
        <ModalState>
            <App />
        </ModalState>
    </BrowserRouter>
</Provider>)