import { useGetitems } from '@/hooks/useGetitem';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import PagerView from 'react-native-pager-view';

export default function MyPager() {
  const {getdata} = useGetitems()
  const [data, setdata] = useState([]);

  useEffect(() => {
    getdata({query:{},table:"slides"}).then((res)=>{
      setdata(res)
    })
  }, []);
  return (
    <View className="bg-red-400 w-full mt-4">
      {data&&<PagerView className="bg-white  h-[155px] p-5 rounded-md" initialPage={0}>
            {
              data&&data?.map((item,index)=>{
                return <View className='h-[150px] border border-gray-200 rounded' key={index}>
                    <Image
                    key={index}
                    source={{uri:item?.image}}
                    resizeMode="cover"
                    className={`rounded max-w-full h-[140px] m-1`}
                  />
                </View>
              })
            }
          </PagerView>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
