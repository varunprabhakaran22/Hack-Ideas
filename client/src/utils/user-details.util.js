import { __getCookie } from "./cookie.util";
import {FP_COOKIE_PREFIX} from '../constants/constants'



const __getToken = () => {
    const cookie = __getCookie(FP_COOKIE_PREFIX+ "ut");
    if (cookie !== undefined && cookie.cookieValue !== null && cookie.cookieValue !== undefined) {
        return cookie.cookieValue;
    }
    return "";
};



export {  __getToken,  };
