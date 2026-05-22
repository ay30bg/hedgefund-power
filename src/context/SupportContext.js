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

    // TEMPORARY LOCAL HIDE
    const [supportOpened, setSupportOpened] = useState(false);

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
            // IGNORE OLD UNREAD COUNT
            if (supportOpened && data.count > 0) {
                return;
            }

            setUnreadSupportCount(data.count || 0);

        } catch (err) {
            console.error(err);
        }

    }, [API, supportOpened]);

    // INITIAL FETCH
    useEffect(() => {

        if (!localStorage.getItem("token")) return;

        fetchUnreadSupportCount();

    }, [fetchUnreadSupportCount]);

    // OPEN SUPPORT
    const clearSupportBadge = () => {

        setSupportOpened(true);

        setUnreadSupportCount(0);
    };

    // NEW ADMIN MESSAGE
    const restoreSupportBadge = () => {

        setSupportOpened(false);

        fetchUnreadSupportCount();
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
