import React, { memo } from 'react';

const Pagination = memo(({ limit, page,total}) => {
  console.log('limit', limit);
  console.log('page', page);
  console.log('total', total);

  const pageRender = 3; // 每次渲染 7 個頁碼按鈕
  const pageTotal = Math.ceil(total / limit); // 計算總頁數
  const pageData = []; // 儲存分組的頁數按鈕
  // const [pageGroup,setPageGroup] = useState([])
  console.log('pageTotal',pageTotal);
  if(pageTotal>pageRender){
    for(let currentPage = 1 ; currentPage <= pageTotal ; currentPage+=pageRender){
      let group = []
      
      for(let groupLoopTime = 0 ; currentPage+groupLoopTime<=pageTotal && groupLoopTime<pageRender; groupLoopTime++){
        group.push(currentPage+groupLoopTime)
      }
      //最後一頁數組
      if(group.length < pageRender){
        const starPage = group[group.length-1]-(pageRender-1)
        console.log('starPage',starPage);
        
        group = Array.from({length:pageRender},(_,renderTime)=>starPage+renderTime)
      }
      pageData.push(group)
    }
    // setPageGroup(pageData)
  }
  if(pageTotal<=pageRender){
    let group = []
    const currentPage = 1
    group = Array.from({length:pageTotal},(_,renderTime)=>currentPage+renderTime)
    pageData.push(group)
    // setPageGroup(pageData)
  }

  console.log('pageData',pageData);
  
  return (
    <>
      <p>sadc</p>
    </>
  );
});

export default Pagination;