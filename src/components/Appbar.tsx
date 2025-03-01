import { userState } from "@/store/atoms/user";
import { isUserLoading } from "@/store/selectors/isUserLoading";
import { userEmailState } from "@/store/selectors/userEmail";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";

function Appbar()
{
    const router = useRouter();
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);

    if(userLoading)
    {
        return <div></div>
    }

    if(userEmail)
    {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            zIndex: 1
        }}>
            <div style={{marginLeft: 10, cursor: "pointer"}} onClick={()=>{
                router.push('/');
            }}>
                <Typography variant="h6">Coursera</Typography>
            </div>
            <div style={{display: "flex"}}>
                <div style={{marginRight: 10, display: "flex"}}>
                <div style={{marginRight: 10}}>
                        <Button
                            onClick={() => {
                                router.push("/addcourse")
                            }}
                        >Add course</Button>
                    </div>

                    <div style={{marginRight: 10}}>
                        <Button
                            onClick={() => {
                                router.push("/courses")
                            }}
                        >Courses</Button>
                    </div>

                    <Button
                        variant={"contained"}
                        onClick={() => {
                            localStorage.setItem("token", "");
                            setUser({
                                isLoading: false,
                                userEmail: null
                            })
                        }}
                    >Logout</Button>
                </div>
            </div>
        </div>
    }
    else
    {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            zIndex: 1
        }}>
            <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
                router.push("/")
            }}>
                <Typography variant={"h6"}>Coursera</Typography>
            </div>
    
            <div style={{display: "flex"}}>
                <div style={{marginRight: 10}}>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            router.push("/signup")
                        }}
                    >Signup</Button>
                </div>
                <div>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            router.push("/signin")
                        }}
                    >Signin</Button>
                </div>
            </div>
        </div>
    }
}

export default Appbar;