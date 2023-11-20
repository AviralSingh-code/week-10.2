import { atom } from "recoil";

export const userState = atom<{isLoading: boolean, userEmail: null | string}>({
    key: "userStatekey",
    default: {
        isLoading: true,
        userEmail: null
    }
});