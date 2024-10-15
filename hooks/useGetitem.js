import { useState } from "react";
import {api_url,post_option} from "../scripts/lib"
import { ToastAndroid } from "react-native";

export const useGetitems  = ()=>{
    const [responsedata, setresponsedata] = useState();
    const fetchData = async ({query, table})=>{
        const response =  await fetch(api_url+"/get-item",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify({query, table})
        })
        const result = await response.json();
        
        if(result.status!==200){
            return ToastAndroid.show(result.message,ToastAndroid.SHORT)
        }
        setresponsedata(result?.result)
        return result?.result
    }

    const getdata=({query, table})=>{
        return new Promise((resolve, reject)=>{
            fetchData({query, table}).then((res)=>{
                if(res){
                    resolve(res)
                }else{
                    reject("Error Occured")
                }
        })
    })}

    return {responsedata,getdata}

}