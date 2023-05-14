import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux";
import {persistor, store} from "./data/store";
import './index.css';
import App from "./application/App";
import {ModalsProvider} from "./features/main/contexts/ModalsProvider";
import {CreateRoomModalProvider} from "./features/main/contexts/CreateRoomModalProvider";
import {PersistGate} from "redux-persist/integration/react";
import {MetaMaskProvider} from "metamask-react";
import {CreateNotificationProvider} from "./features/main/contexts/NotificationModelProvider";
import {ContentFullCardProvider} from "./features/main/contexts/ContentFullCardProvider";
import {NotificationProvider} from './features/main/contexts/NotificationProvider';
import {AskQuestionProvider} from "./features/main/contexts/AskQuestionProvider";
import {CookiesProvider} from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<ModalsProvider>
    <CreateRoomModalProvider>
        <ContentFullCardProvider>
            <CreateNotificationProvider>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <BrowserRouter>
                            <MetaMaskProvider>
                                <NotificationProvider>
                                    <AskQuestionProvider>
                                        <CookiesProvider>
                                            <App/>
                                        </CookiesProvider>
                                    </AskQuestionProvider>
                                </NotificationProvider>
                            </MetaMaskProvider>
                        </BrowserRouter>
                    </PersistGate>
                </Provider>
            </CreateNotificationProvider>
        </ContentFullCardProvider>
    </CreateRoomModalProvider>
</ModalsProvider>)