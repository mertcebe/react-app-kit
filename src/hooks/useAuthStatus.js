import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/myFirebaseConfig";
import { useEffect, useState } from "react";


export default () => {
    let [isAuthorized, setIsAuthorized] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthorized(true);
            }
            else {
                setIsAuthorized(false);
            }
        })
    }, []);
    return { isAuthorized }
}