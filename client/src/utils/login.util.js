import { __deleteCookie, __getCookie } from "./cookie.util";
import { G_URL ,FP_COOKIE_PREFIX } from "../constants/constants";


const check_login = () => {
    const token_cookie = __getCookie(FP_COOKIE_PREFIX);
    return (
        token_cookie.cookieExists &&
        token_cookie.cookieValue !== undefined &&
        token_cookie.cookieValue !== null
    );
};

const logout_user = () => {
    let cookies = document.cookie.split(";");
    cookies.map((cookie) => __deleteCookie(cookie.split("=")[0]));
    //Remove localstoreage if any

    // After logout redirect user to homepage
    setTimeout(() => {
        window.location = decodeURIComponent(G_URL);
    }, 1000);
};



export { check_login, logout_user };
