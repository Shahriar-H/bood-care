import { useState } from "react";
import {api_url,post_option} from "../scripts/lib"
import { ToastAndroid } from "react-native";

export const useAdditem  = ()=>{
    const [responsedata, setresponsedata] = useState();
    const insertData = async ({data, table})=>{
        const response =  await fetch(api_url+"/insert-item",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify({data, table})
        })
        const result = await response.json();
        
        if(result.status!==200){
            return ToastAndroid.show(result.message,ToastAndroid.SHORT)
        }
        setresponsedata(result?.result)
        return result?.result
    }

    const insertdata=({data, table})=>{
        return new Promise((resolve, reject)=>{
            insertData({data, table}).then((res)=>{
                if(res){
                    resolve(res)
                }else{
                    reject("Error Occured")
                }
        })
    })}

    return {responsedata,insertdata}

}