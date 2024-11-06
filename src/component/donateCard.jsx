import { useState,useEffect,useRef,memo } from "react"
import { Skeleton } from 'antd';
const DonateCard = ({itemCard={}})=>{
const [isImageReady, setIsImageReady] = useState(false); // 控制圖片是否加載完畢

useEffect(() => {
  if (itemCard.imgSrc) {
    // 每次 itemCard更新時，顯示骨架屏
    setIsImageReady(false);

    // 創建一個新的圖片物件來進行預加載
    const img = new Image();
    img.src = itemCard.imgSrc;

    img.onload = () => {
      setIsImageReady(true);  // 預加載完成後顯示圖片
    };
  }

  }, [itemCard]);

  // const handleImageLoad = () => {
  //   console.log('图片加载完成');
  //   setIsImageLoaded(true); // 图片加载完成后，设置为已加载状态
  // };

  return (
    <div className="flex flex-col w-30%">
        {
          !isImageReady? (// 取得資料及加載圖片完成前，都要顯示骨架屏
            <Skeleton.Image active
              style={{ 
                width: '100%', 
                height: 'auto', 
                aspectRatio: '4 / 2', // 與圖片的比例保持一致
                display: 'block' 
              }} 
            />
          ) : (// 顯示圖片
            <div className="w-full" style={{ aspectRatio: '4 / 2' }}>
              <img
                src={itemCard.imgSrc}
                className="object-cover w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          )
        }
        {/* <div className="w-full" style={{ aspectRatio: '4 / 2' }}>
          <img
            src={itemCard.imgSrc}
            className="object-cover w-full h-full"
            style={{ width: '100%', height: '100%' }}
            alt={itemCard.planName || "Donation Image"}
          />
        </div> */}
        <p>{itemCard.planName}</p>
        <p>{itemCard.summary}</p>
      </div>

    // isLoading ? (
    //   <Skeleton.Image active style={{ width: '100%', height: '100%', display: 'block' }}  />
    // ) : (
    //   <div className="flex justify-center">

    //     <img src={itemCard.pics} alt="" />

    //     <p>{itemCard.planName}</p>
    //     <p>{itemCard.summary}</p>
    //   </div>
    // )
  );
}

export default DonateCard