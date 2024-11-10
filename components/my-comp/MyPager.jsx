import { useGetitems } from '@/hooks/useGetitem';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import PagerView from 'react-native-pager-view';

export default function MyPager() {
  const {getdata} = useGetitems()
  const [data, setdata] = useState([]);
  const pagerRef = useRef(null);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    getdata({query:{},table:"slides"}).then((res)=>{
      setdata(res)
    })
  }, []);

  // Auto-play effect with interval
  useEffect(() => {
    const interval = setInterval(() => {
      setPageIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= data.length) return 0; // Loop back to the first page
        return nextIndex;
      });
    }, 7000); // Set your delay here (e.g., 3000ms = 3 seconds)

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [data.length]);

  // Update the page in PagerView
  useEffect(() => {
    if (pagerRef.current) {
      pagerRef.current.setPage(pageIndex);
    }
  }, [pageIndex]);


  return (
    <View className="bg-red-400 w-full mt-4">
      {data&&<PagerView className="bg-white  h-[155px] p-5 rounded-md" initialPage={0} ref={pagerRef}>
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
