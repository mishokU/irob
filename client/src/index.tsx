import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import {ModalState} from "./context/ModalContext";
import {Provider} from "react-redux";
import {store} from "./data/store";
import './index.css';
import App from "./App";
import {AuthProvider} from "./features/auth/middleware/AuthProvider";
import {ModalsProvider} from "./features/main/ModalsProvider";
import {CreateRoomModalProvider} from "./features/main/CreateRoomModalProvider";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<AuthProvider>
    <ModalsProvider>
        <CreateRoomModalProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <ModalState>
                        <App />
                    </ModalState>
                </BrowserRouter>
            </Provider>
        </CreateRoomModalProvider>
    </ModalsProvider>
</AuthProvider>)