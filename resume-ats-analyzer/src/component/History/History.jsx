import React, { useState, useEffect, useContext } from 'react'
import './history.css'
import Skeleton from '@mui/material/Skeleton'
import WithAuthHOC from '../../utils/HOC/WithAuthHOC'
import axios from '../../utils/axios'
import { AuthContext } from '../../utils/AuthContext'

const History = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const { userInfo } = useContext(AuthContext)

  useEffect(() => {
    if (!userInfo?._id) {
      setData([])
      return
    }

    const fetchUserData = async () => {
      setLoader(true)
      try {
        const results = await axios.get(`/api/resume/guest`)
        //console.log(results.data)
        setData(results.data.resume)
      } catch (err) {
        console.log(err)
        alert("Something Went Wrong !!")
      } finally {
        setLoader(false)
      }
    }
    fetchUserData()
  }, [userInfo?._id])

  return (
    <div className='History'>
      <div className="HistoryCardBlock">

        {loader && <>
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: "20px" }}
            width={236}
            height={200}
          />


          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: "20px" }}
            width={236}
            height={200}
          />


          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: "20px" }}
            width={236}
            height={200}
          />

          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: "20px" }}
            width={236}
            height={200}
          />


        </>

        }

        {data.map((item) => (
          <div key={item._id} className="HistoryCard">
            <div className="cardPercentage">{item.score}%</div>
            <p>Resume Name :{item.resume_name}</p>
            <p>{item.feedback}</p>
            <p>Date:{item.createdAt.slice(0, 10)}</p>
          </div>
        ))}

      </div>
    </div>
  )
}


const HistoryWithAuth = WithAuthHOC(History)
export default HistoryWithAuth
