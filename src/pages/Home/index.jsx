import { useState,useEffect,useRef } from "react"
import httpApis from '@/apis'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Skeleton, Carousel,Button } from 'antd';
import DonateCard from '@/component/donateCard'

const MySwal = withReactContent(Swal);

const DonateTypeGroup = ({onChangeType})=>{
  const [btnTypes, setBtnTypes] = useState([
    {
      id:'1',
      typeId:'4b25e374-0f5e-415e-896e-c91423d9e375',
      btnName:'專案募款',
      API_NAME:'Load'
    },
    {
      id:'2',
      typeId:'0a70df4f-89e3-49f6-ac05-0cf923e9dd52',
      btnName:'未指定用途募款',
      API_NAME:'Load'
    },
    {
      id:'3',
      typeId:'83a5d2c9-04d0-4145-9341-6c206ec95621',
      btnName:'校內單位指定用途募款',//常駐型(校內單位指定用途募款)
      API_NAME:'NormalLoad'
    }
  ]); 
  const [currentBtnTypeId, setCurrentBtnTypeId] = useState('1')

  function changeType(btnItem){
    setCurrentBtnTypeId(btnItem.id)
    onChangeType(btnItem)
  }

  return (
    <>
      <div className="flex gap-2 justify-center mb-4">
        {btnTypes.map((btnItem) => (
          <div key={btnItem.id}
            onClick={()=>changeType(btnItem)}
            className={`border border-amber border-solid px-4 py-2 cursor-pointer 
              ${btnItem.id === currentBtnTypeId ? 'bg-amber-500 text-white' : 'bg-white text-black'}`}
          >
            {btnItem.btnName}
          </div>
        ))}
      </div>
    </>
  )
}

const Home = ()=>{
  const [loading, setLoading] = useState(true);
  const [imageList, setImageList] = useState([]);
  const carouselRef = useRef(null); // 使用 ref 來獲取 Carousel 實例
  const [cardList, setCardList] = useState([]);
 
  useEffect(() => {
    LoadBanners();
    
    loadDonateTypeList({ 
      API_NAME: 'Load', 
      typeId: '4b25e374-0f5e-415e-896e-c91423d9e375' 
    });
    // setTimeout(() => {
    // }, 3000);
  }, []);

  async function LoadBanners(){
    const {data} = await httpApis.banner.LoadBanner({
      page:1,
      limit:999,
      key:"",
      orderby:"sort asc"
    })
    setLoading(false); // 圖片數據加載完成
    const handleData = data.map(({pics,...other})=>{
      let parsedPics;
      try {
        parsedPics = JSON.parse(pics)
      } catch (error) {
        console.error("Failed to parse pics:", error);
        parsedPics = []; // 或者給個默認值，比如空數組
      }
      return {
        ...other,
        pics,
        imgSrc: `${import.meta.env.VITE_BASE_IMG_URL}${parsedPics}`
      };
    })
    setImageList(handleData)
  };

  async function loadDonateTypeList(item){
    const {API_NAME,typeId} = item
    let resList = []

    if(API_NAME === 'NormalLoad'){//常駐型(校內單位指定用途募款)load的參數
      const normalListQuery={
        page:1,
        limit:1000,
        key:"",
        orderby:""
      }
      const {data} = await httpApis.donateplanes[API_NAME](normalListQuery)
      resList = data
    }if(API_NAME === 'Load'){ //專案型(專案募款) | 未指定用途募款  
      const limitListQuery={//專案型(專案募款)|未指定用途募款，load的參數
        OrgId:"",
        PlanType:typeId,//專案型(專案募款)：預設 | 未指定用途募款
        page:1,
        limit:10,
        key:"",
        orderby:"sort desc"
      }
      const {data} = await httpApis.donateplanes[API_NAME](limitListQuery)
      const handleData = data.map(({pics,...other})=>{
        let parsedPics;
        try {
          parsedPics = JSON.parse(pics)
        } catch (error) {
          console.error("Failed to parse pics:", error);
          parsedPics = []; // 或者給個默認值，比如空數組
        }
        return {
          ...other,
          pics,
          imgSrc: `${import.meta.env.VITE_BASE_IMG_URL}${parsedPics}`
        };
      })
      console.log('handleData',handleData);
      
      resList = handleData
    }
    setCardList(resList)
  }

  return (
    <div className="relative w-full h-screen m-auto">
      {/* {Banner} */}
      {/* {loading ? (
        <div className="w-full h-full flex items-center justify-center"> 
          <Skeleton.Image
            active
            style={{ width: '100%', height: '100%', display: 'block' }}  
          />
        </div>
      ) : (
        <>
          <Button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-75"
            onClick={() => carouselRef.current.prev()}
          >
            上一章
          </Button>
          <Button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-75"
            onClick={() => carouselRef.current.next()}
          >
            下一章
          </Button>
          <Carousel autoplay ref={carouselRef} dots={false} className="w-full h-full">
            {imageList.map((item) => (
              <div key={item.id} className="w-full" style={{ aspectRatio: '4 / 2', overflow: 'hidden' }}>
                <img
                  src={item.imgSrc}
                  className="w-full h-full object-cover"
                  alt={`Slide ${item.id}`}
                />
              </div>
            ))}
          </Carousel>
        </>
      )} */}
      {/* 捐款Card */}
      {/* TODO:不給flex，<Skeleton.Node/>就需要寫死寬度，但就會讓RWD初始載入時會有一瞬間顯示scrollBar */}
      <div className="flex flex-col"> 
        <DonateTypeGroup onChangeType={loadDonateTypeList}/>
        {
          cardList.length===0?(<Skeleton.Node active
            style={{ 
              width: '100%', 
              height: 'auto', 
              aspectRatio: '4 / 1', // 與圖片的比例保持一致
              display: 'block',
            }} 
          />):
          (
          <div className="flex gap-4">
            {cardList.map((itemCard,index)=>{
              return(<DonateCard key={itemCard.id || index} itemCard={itemCard}/>)
            })}
          </div>
          )
        }
      </div>
      {/* News */}
      {/* 芳名錄 */}

    </div>
  )
}

export default Home
