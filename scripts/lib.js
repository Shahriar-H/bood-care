import AsyncStorage from "@react-native-async-storage/async-storage";

export const api_url = 'http://192.168.0.109:4430'
export const post_option = {
    method:"POST",
    headers:{
        "Content-type":"application/json"
    }
}

export const getDataFromLocalstorage = async (objname) => {
    try {
      const jsonValue = await AsyncStorage.getItem(objname);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log(e);
      
    }
  };