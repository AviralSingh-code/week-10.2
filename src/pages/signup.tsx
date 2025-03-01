import { useState } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { userState } from "@/store/atoms/user";
import { Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import { NEXT_URL } from "@/config";
function Login()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const router = useRouter()
    const setUser = useSetRecoilState(userState);

    return <div>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"}>
                Welcome to Coursera. Sign up below
                </Typography>
            </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card variant={"outlined"} style={{width: 400, padding: 20}}>
                <TextField
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                />
                <br/><br/>
                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    fullWidth={true}
                    label="Password"
                    variant="outlined"
                    type={"password"}
                />
                <br/><br/>

                <Button
                    size={"large"}
                    variant="contained"
                    onClick={async() => {
                        const response = await axios.post(`${NEXT_URL}/api/admin/signup`, {
                            username: email,
                            password: password
                        },{
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        let data = response.data;
                        localStorage.setItem("token", data.token);
                        setUser({userEmail: email, isLoading: false});
                        router.push("/courses");
                    }}

                > Signup</Button>
            </Card>
        </div>
    </div>
}

export default Login;