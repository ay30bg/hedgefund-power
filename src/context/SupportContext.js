import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback
} from "react";

const SupportContext = createContext();

export const SupportProvider = ({ children }) => {

    const API = process.env.REACT_APP_API_URL;

    const [unreadSupportCount, setUnreadSupportCount] = useState(0);

    // THIS PREVENTS BADGE REMOUNT
    const [badgeCleared, setBadgeCleared] = useState(false);

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

            if (!res.ok) return;

            // IF USER ALREADY OPENED SUPPORT,
            // DO NOT RESTORE OLD BADGE
            if (badgeCleared) {

                // ONLY RESTORE IF COUNT INCREASES AGAIN
                if (data.count > unreadSupportCount) {

                    setBadgeCleared(false);

                    setUnreadSupportCount(data.count);
                }

                return;
            }

            setUnreadSupportCount(data.count || 0);

        } catch (err) {
            console.error(err);
        }

    }, [API, badgeCleared, unreadSupportCount]);

    useEffect(() => {

        if (!localStorage.getItem("token")) return;

        fetchUnreadSupportCount();

        const interval = setInterval(() => {
            fetchUnreadSupportCount();
        }, 5000);

        return () => clearInterval(interval);

    }, [fetchUnreadSupportCount]);

    // CLEAR BADGE
    const clearSupportBadge = () => {

        setBadgeCleared(true);

        setUnreadSupportCount(0);
    };

    // NEW MESSAGE
    const restoreSupportBadge = (count) => {

        setBadgeCleared(false);

        setUnreadSupportCount(count);
    };

    return (
        <SupportContext.Provider
            value={{
                unreadSupportCount,
                clearSupportBadge,
                restoreSupportBadge,
                fetchUnreadSupportCount
            }}
        >
            {children}
        </SupportContext.Provider>
    );
};

export const useSupport = () => useContext(SupportContext);
