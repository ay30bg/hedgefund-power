// import React, {
//     createContext,
//     useContext,
//     useEffect,
//     useState,
//     useCallback
// } from "react";

// const SupportContext = createContext();

// export const SupportProvider = ({ children }) => {

//     const API = process.env.REACT_APP_API_URL;

//     const [unreadSupportCount, setUnreadSupportCount] = useState(0);

//     // IMPORTANT
//     const [hasOpenedSupport, setHasOpenedSupport] = useState(false);

//     const fetchUnreadSupportCount = useCallback(async () => {

//         // DO NOT REFETCH AFTER SUPPORT OPENED
//         if (hasOpenedSupport) return;

//         try {

//             const res = await fetch(
//                 `${API}/api/support/unread-count`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`
//                     }
//                 }
//             );

//             const data = await res.json();

//             if (res.ok) {
//                 setUnreadSupportCount(data.count || 0);
//             }

//         } catch (err) {
//             console.error(err);
//         }

//     }, [API, hasOpenedSupport]);

//     useEffect(() => {

//         if (!localStorage.getItem("token")) return;

//         fetchUnreadSupportCount();

//     }, [fetchUnreadSupportCount]);

//     return (
//         <SupportContext.Provider
//             value={{
//                 unreadSupportCount,
//                 setUnreadSupportCount,
//                 fetchUnreadSupportCount,
//                 hasOpenedSupport,
//                 setHasOpenedSupport
//             }}
//         >
//             {children}
//         </SupportContext.Provider>
//     );
// };

// export const useSupport = () => useContext(SupportContext);

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

    // LAST TIME USER OPENED SUPPORT
    const [lastSeenTimestamp, setLastSeenTimestamp] = useState(
        localStorage.getItem("lastSeenSupportTimestamp") || null
    );

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

            // backend should return latest admin message timestamp
            const latestMessageTime = data.latestMessageTime;

            // if no new message after support opened
            if (
                lastSeenTimestamp &&
                latestMessageTime &&
                new Date(latestMessageTime) <= new Date(lastSeenTimestamp)
            ) {
                setUnreadSupportCount(0);
                return;
            }

            setUnreadSupportCount(data.count || 0);

        } catch (err) {
            console.error(err);
        }

    }, [API, lastSeenTimestamp]);

    useEffect(() => {

        if (!localStorage.getItem("token")) return;

        fetchUnreadSupportCount();

    }, [fetchUnreadSupportCount]);

    // OPEN SUPPORT
    const markSupportAsSeen = () => {

        const now = new Date().toISOString();

        localStorage.setItem(
            "lastSeenSupportTimestamp",
            now
        );

        setLastSeenTimestamp(now);

        setUnreadSupportCount(0);
    };

    return (
        <SupportContext.Provider
            value={{
                unreadSupportCount,
                setUnreadSupportCount,
                fetchUnreadSupportCount,
                markSupportAsSeen
            }}
        >
            {children}
        </SupportContext.Provider>
    );
};

export const useSupport = () => useContext(SupportContext);
