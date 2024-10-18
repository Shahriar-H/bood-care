import AsyncStorage from "@react-native-async-storage/async-storage";

export const api_url = 'http://192.168.0.110:4430'
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

export const daysCount = (fdate)=>{
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var firstDate = new Date(fdate);
  var secondDate = new Date();
  
  var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
  return diffDays
}