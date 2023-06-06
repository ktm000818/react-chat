import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useLoginCheck(){
    const navigate = useNavigate();
    const ACCESS_PAGES = ['/chat', '/'];
    const ACCESS_FOR_UNKNOWN_PAGES = ['/login', '/register', '/'];

    useEffect(() => {
        const recoilPersist = localStorage.getItem("recoil-persist")
        const currLocation = window.location.pathname;
        
        if(recoilPersist){
            if(JSON.parse(recoilPersist)?.loginState?.uid){
                //로그인 완료됐을 때
                if(!ACCESS_PAGES.includes(currLocation)){
                    navigate("/");
                }
            }else{
                //로그인 되지않았을 때
                if(!ACCESS_FOR_UNKNOWN_PAGES.includes(currLocation)){
                    navigate("/");
                }
            }
        }
    }, [])
}