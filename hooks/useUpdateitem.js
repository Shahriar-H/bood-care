import { useState } from "react";
import {api_url,post_option} from "../scripts/lib"
import { ToastAndroid } from "react-native";

export const useUpdateitem  = ()=>{
    const [responsedata, setresponsedata] = useState();
    const updateData = async ({data, table,id})=>{
        const response =  await fetch(api_url+"/update-item",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify({data, table,id})
        })
        const result = await response.json();
        
        if(result.status!==200){
            return ToastAndroid.show(result.message,ToastAndroid.SHORT)
        }
        setresponsedata(result?.result)
        return result?.result
    }

    const updateitem=({data, table,id})=>{
        return new Promise((resolve, reject)=>{
            updateData({data, table,id}).then((res)=>{
                if(res){
                    resolve(res)
                }else{
                    reject("Error Occured")
                }
        })
    })}

    return {responsedata,updateitem}

}