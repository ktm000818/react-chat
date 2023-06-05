import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useLoginCheck(){
    const navigate = useNavigate();

    useEffect(() => {
        const recoilPersist = localStorage.getItem("recoil-persist")
        if(recoilPersist){
            if(JSON.parse(recoilPersist)?.loginState?.uid){
                if(window.location.pathname !== "/"){
                    navigate("/");
                }
            }else{
                // navigate("/");
            }
        }
    }, [])
}