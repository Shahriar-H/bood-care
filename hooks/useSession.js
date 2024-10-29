import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const useSessionget = ()=>{
    const [data, setdata] = useState({});

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('user');
          if(jsonValue != null){
            let dataobj = JSON.parse(jsonValue)
            setdata(dataobj)
          }
        //   return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
          // error reading value
        }
    };

    useEffect(() => {
        getData()
    }, []);

    return {data,getData}
}

export default useSessionget