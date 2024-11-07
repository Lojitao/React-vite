import { useState,useEffect,useRef,memo } from "react"
import { Skeleton } from 'antd';

const DonateCard = ({itemCard})=>{
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

  return (
    <div className="flex flex-col w-30%">
        {
          !isImageReady? (// 取得資料及加載圖片完成前，都要顯示骨架屏
            <>
              <Skeleton.Image active
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  aspectRatio: '4 / 2', // 與圖片的比例保持一致
                  display: 'block' 
                }} 
              />
              <Skeleton active />
            </>
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
        <p>{itemCard.planName}</p>
        <p>{itemCard.summary}</p>
      </div>
  );
}

export default DonateCard