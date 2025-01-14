import {createContext, useEffect, useState} from 'react';
import axios from "axios";

export const AppContext = createContext(null);


export const AppProvider = ({ children }) => {
    const [user, setUser] = useState({ email: 'example@example.com', userId: '27' }); // 사용자 정보
    const [pageTitle, setPageTitle] = useState(''); // 화면 제목
    const [query, setQuery] = useState("");

    return (
        <AppContext.Provider value={{
            user,
            setUser,
            pageTitle,
            setPageTitle,
            query,
            setQuery,
        }}>
            { children }
        </AppContext.Provider>
    );
};

export default AppContext;