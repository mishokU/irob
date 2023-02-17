import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import {ModalState} from "./context/ModalContext";
import {Provider} from "react-redux";
import {persistor, store} from "./data/store";
import './index.css';
import App from "./App";
import {ModalsProvider} from "./features/main/ModalsProvider";
import {CreateRoomModalProvider} from "./features/main/CreateRoomModalProvider";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<ModalsProvider>
    <CreateRoomModalProvider>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <ModalState>
                        <App />
                    </ModalState>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </CreateRoomModalProvider>
</ModalsProvider>)