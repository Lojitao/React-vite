import { useState, useEffect, useRef, memo,useLayoutEffect } from "react";
import { Skeleton } from "antd";
import httpApis from "@/apis";
import DonateCard from "@/component/donateCard";

const RaiseList = () => {
  const [cardList, setCardList] = useState([]);
  const loading = useRef(false);
  const initialLoad = useRef(false);//標記初始載入
  const hasMoreRef = useRef(true); // 使用 useRef 來管理是否還有更多數據可以加載
  const normalListQuery = useRef({
    page: 1,
    limit: 6,
    key: "",
    orderby: ""
  }); // 用來控制當前加載的頁數
  const observerRef = useRef(null); // 用來引用 Intersection Observer 的標記元素

  //創建Intersection Observer和監聽標記的元素
  useEffect(()=>{
    //創建Observer實例
    const observerInstance = new IntersectionObserver(
      (entries) => {//TODO:observer是幹嘛的？
        // entries.forEach(entry => {if (entry.isIntersecting && initialLoad.current && hasMoreRef.current) {
        entries.forEach(entry => {if (entry.isIntersecting && initialLoad.current && hasMoreRef.current) {
          normalListQuery.current.page += 1;
          loadDonateList()
        }}
      )},
      {
        root: null, // 使用視窗作為容器
        rootMargin: '0px',
        threshold: 1.0 // 目標元素完全進入視口時觸發
      }  
    )
    //監聽標記的DOM元素
    if (observerRef.current) observerInstance.observe(observerRef.current);
    
    //組件被卸載時，清除觀察器
    return () => {
      if (observerRef.current) observerInstance.unobserve(observerRef.current)
    }
  },[])

  // 初次渲染只加載第一頁的數據
  useEffect(() => {
    //loadDonateList();
    const fetchData = async () => {
      await loadDonateList();
      initialLoad.current=true; // 標記初始加載已完成
    };
    fetchData(); // 調用異步函數
  }, []); // 空依賴數組，保證只在初次渲染時調用一次



  
  // 加載捐款列表的函數
  async function loadDonateList() {
    console.log('loadDonateList');
    
    if (loading.current || !hasMoreRef.current) return; // 如果當前處於加載狀態，直接返回
    loading.current = true; // 設置為加載中狀態

    try {
      const { data, count } = await httpApis.donateplanes.NormalLoad(normalListQuery.current);

      // 計算最大頁數
      const calculatedTotalPages = Math.ceil(count / normalListQuery.current.limit);
      if (normalListQuery.current.page >= calculatedTotalPages) hasMoreRef.current = false; 
      
      const handleData = data.map(({ description, categoryName, ...other }) => {
        let parsedPics = "";
        try {
          parsedPics = JSON.parse(description);
        } catch (error) {
          console.error("Failed to parse pics:", error);
          parsedPics = []; // 或者給個默認值，比如空數組
        }
        return {
          ...other,
          description,
          planName: categoryName,
          imgSrc: `${import.meta.env.VITE_BASE_IMG_URL}${parsedPics}`
        };
      });

      // 合併新數據到現有的 cardList
      setCardList((prevList) => [...prevList, ...handleData]);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      loading.current = false; // 加載完成後，設置為非加載狀態
    }
  }

  return (
    <div className="flex flex-col h-100vh">
      <div className="flex gap-4 flex-wrap">
        {cardList.map((itemCard, index) => (
          <DonateCard key={itemCard.id || index} itemCard={itemCard} />
        ))}
      </div>
      {/* 加載中顯示骨架屏 */}
      {loading.current && (
        <Skeleton.Node active
          style={{
            width: "100%",
            height: "100vh",
            aspectRatio: "1 / 1",
            display: "block"
          }}
        />
      )}
      {/* 加載更多的標記元素 */}
      {<div ref={observerRef} className="w
      100% bg-black" style={{ height: "0px" }}></div>}
      
    </div>
  );
};

export default RaiseList;