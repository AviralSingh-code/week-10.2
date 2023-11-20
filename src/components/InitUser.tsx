import { NEXT_URL } from "@/config";
import { userState } from "@/store/atoms/user";
import axios from "axios";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export function InitUser()
{
    const setUser = useSetRecoilState(userState);

    useEffect(()=>{
        
        function callback(response)
        {
            if(response.data.username)
            {
                setUser({
                    isLoading: false,
                    userEmail: response.data.username
                });
            }
            else
            {
                setUser({
                    isLoading: false,
                    userEmail: null
                });
            }
        }
        axios.get(`${NEXT_URL}/api/admin/me`,{
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(callback);
    },[]);

    return <div></div>
}