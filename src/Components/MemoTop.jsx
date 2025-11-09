import React from 'react';

const MemoTop = () => {
  return(
    <>
      <header id='Header' className='bg-emerald-400 py-4 text-2xl font-bold'>
         <p>{thisYear}年{thisMonth}月{date}日({weekDay}曜日)</p>
      </header>
    </>
  )
}

const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth()+1;
const date = today.getDate();
const day = today.getDay();
const week = ["日", "月", "火", "水", "木", "金", "土"];
const weekDay = week[day];


export default MemoTop;