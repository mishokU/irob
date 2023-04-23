import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux";
import {persistor, store} from "./data/store";
import './index.css';
import App from "./App";
import {ModalsProvider} from "./features/main/contexts/ModalsProvider";
import {CreateRoomModalProvider} from "./features/main/contexts/CreateRoomModalProvider";
import {PersistGate} from "redux-persist/integration/react";
import {MetaMaskProvider} from "metamask-react";
import {CreateNotificationProvider} from "./features/main/contexts/NotificationModelProvider";
import {ContentFullCardProvider} from "./features/main/contexts/ContentFullCardProvider";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<ModalsProvider>
    <CreateRoomModalProvider>
        <ContentFullCardProvider>
            <CreateNotificationProvider>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <BrowserRouter>
                            <MetaMaskProvider>
                                <App/>
                            </MetaMaskProvider>
                        </BrowserRouter>
                    </PersistGate>
                </Provider>
            </CreateNotificationProvider>
        </ContentFullCardProvider>
    </CreateRoomModalProvider>
</ModalsProvider>)