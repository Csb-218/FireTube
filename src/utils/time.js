

const Time = (time) => {

    const t1 = time?.replace("PT","")
    const t2 = t1?.includes('H') && t1?.replace("H",":")
    const t3 = t2?.includes('M') && t2?.replace("M",":")
    const t4 = t3?.includes('S') && t3?.replace("S","")
    const m_time = t4
    console.log(m_time , t1 ,t2,t3,t4 , 9999)
  return (
     m_time
  )
}

export default Time