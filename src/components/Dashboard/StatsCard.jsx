import React, { useEffect, useState } from 'react'
import {BsArrowDownShort} from "react-icons/bs"

export default function StatsCard({ count, title, stats, date }) {
  const [sales, setSales] = useState()

  useEffect(() => {
    if (stats === 0 && count !== 0) {
      setSales(100);
    } else if(stats === 0 && count === 0){
      setSales(0);
    } else {
      setSales(((count-stats) / stats) * 100);
    }
  }, [title,stats,date])

  return (
    <div style={{ boxShadow: "1px 1px 6px rgba(0,0,0,0.15)" }} className='flex-1 min-w-[200px] h-[200px] bg-[white] rounded-lg p-2 relative'>
      <h3 className='text-xl font-[500]'>{title}</h3>
      <div className='flex absolute top-[50%] translate-y-[-50%]'>
        <p className='text-8xl font-[500]'>{count}</p>
        <BsArrowDownShort style={sales > 0 ? { color: "#3aff3a",rotate:"180deg" } : sales === 0 ? {display:"none"} : { color: "red" }} className='text-3xl place-self-end font-[500]'/>
        <p style={sales > 0 ? { color: "#3aff3a" } : sales === 0 ? {} : { color: "red" }} className='text-lg place-self-end font-[500]'>{`${sales?.toFixed(2)?.replace(".00","")}%`}</p>
      </div>

    </div>
  )
}
