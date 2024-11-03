import React, { memo,useEffect,useState } from 'react';

const Pagination = memo(({ limit, page,total,onPageChange}) => {
  const pageRender = 2; // 每次渲染的頁碼按鈕數
  const pageTotal = Math.ceil(total / limit); // 總頁數
  const [pageGroup, setPageGroup] = useState([]); // 儲存頁碼分組
  
  useEffect(()=>{
    let pageData = []; // 用來儲存頁碼分組

    if(pageTotal>pageRender){//大於一頁碼數組
      for(let currentPage = 1 ; currentPage <= pageTotal ; currentPage+=pageRender){
        let group = []

        //製作頁數組
        for(let groupLoopTime = 0 ; currentPage+groupLoopTime<=pageTotal && groupLoopTime<pageRender; groupLoopTime++){
          group.push(currentPage+groupLoopTime)
        }
        //製作最後一頁數組
        if(group.length < pageRender){
          const starPage = group[group.length-1]-(pageRender-1)   
          group = Array.from({length:pageRender},(_,renderTime)=>starPage+renderTime)
        }
        pageData.push(group)
      }
    }
    if(pageTotal<=pageRender){//只有一頁碼數組
      let group = []
      const currentPage = 1
      group = Array.from({length:pageTotal},(_,renderTime)=>currentPage+renderTime)
      pageData.push(group)
    }

    setPageGroup(pageData)
  },[limit,page,total])

  const [currentPageGroupIdx, setCurrentPageGroupIdx] = useState(0); // 初始化渲染頁碼數組
  function prePageGroup(){
    if(currentPageGroupIdx > 0)setCurrentPageGroupIdx(currentPageGroupIdx-1)
  }
  function nextPageGroup(){  
    if(currentPageGroupIdx < pageGroup.length-1)setCurrentPageGroupIdx(currentPageGroupIdx+1)
  }

  return (
    <>
      <div className='flex gap-2 justify-center'>
        <div className='w-20px flex justify-center'>
          {currentPageGroupIdx > 0 && (
            <div onClick={prePageGroup} className='hover:cursor-pointer'>
              ...
            </div>
          )}
        </div>
        <div>
          {pageGroup.map((groupItem,groupIdx)=>(
            currentPageGroupIdx === groupIdx && (
            <React.Fragment key={groupIdx}>
              {groupItem.map(pageBtn=>
                <button key={pageBtn} className='w-30px'
                  onClick={()=>onPageChange(pageBtn)}
                >{pageBtn}
                </button>
              )}  
            </React.Fragment>
            )
          ))}
        </div>
        <div className='w-20px flex justify-center'>
          {currentPageGroupIdx < pageGroup.length-1 && (
            <div onClick={nextPageGroup} className='hover:cursor-pointer'>...</div>
          )}
        </div>
      </div>
    </>
  );
});

export default Pagination;