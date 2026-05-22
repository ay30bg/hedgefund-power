import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback
} from "react";

const SupportContext = createContext();

export const SupportProvider = ({ children }) => {

    const [unreadSupportCount, setUnreadSupportCount] = useState(0);

    const API = process.env.REACT_APP_API_URL;

    const fetchUnreadSupportCount = useCallback(async () => {

        try {

            const res = await fetch(
                `${API}/api/support/unread-count`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const data = await res.json();

            if (res.ok) {
                setUnreadSupportCount(data.count || 0);
            }

        } catch (err) {
            console.error(err);
        }

    }, [API]);

    useEffect(() => {

        if (!localStorage.getItem("token")) return;

        fetchUnreadSupportCount();

    }, [fetchUnreadSupportCount]);

    return (
        <SupportContext.Provider
            value={{
                unreadSupportCount,
                setUnreadSupportCount,
                fetchUnreadSupportCount
            }}
        >
            {children}
        </SupportContext.Provider>
    );
};

export const useSupport = () => useContext(SupportContext);
