import AsyncStorage from "@react-native-async-storage/async-storage";

export const api_url = 'https://blood-api.bloodmate.org'
// export const api_url = 'https://bloodapi.vercel.app'
// export const api_url = 'http://192.168.0.110:4430'
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
  const firstDate = new Date(fdate);
  const secondDate = new Date();

  let years = secondDate.getFullYear() - firstDate.getFullYear();
  let months = secondDate.getMonth() - firstDate.getMonth();
  let days = secondDate.getDate() - firstDate.getDate();

  // Adjust months and years if necessary
  if (days < 0) {
    months -= 1;
    // Calculate days in the previous month
    const previousMonth = new Date(secondDate.getFullYear(), secondDate.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return years+"Y, "+months+"M, "+days;
}