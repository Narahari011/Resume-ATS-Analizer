import React from 'react'
import './admin.css'
import Skeleton from '@mui/material/Skeleton'
import WithAuthHOC from '../../utils/HOC/WithAuthHOC'
import { useState, useEffect } from 'react'
import axios from '../../utils/axios'

const Admin = () => {

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoader(true)
      try {
        const results = await axios.get(`/api/resume/get`);
        //console.log(results.data)
        setData(results.data.resume)
      } catch (error) {
        console.log(error)
        alert("Something Went Wrong !!")
      } finally {
        setLoader(false)
      }
    }


    fetchAllData()
  }, [])

  return (
    <div className='Admin'>
      <div className="AdminCardBlock">
        {
          loader && <>
            <Skeleton variant="rectangular"
              sx={{ borderRadius: "20px" }}
              width={266}
              height={400} >
            </Skeleton>

            <Skeleton variant="rectangular"
              sx={{ borderRadius: "20px" }}
              width={266}
              height={400} >
            </Skeleton>

            <Skeleton variant="rectangular"
              sx={{ borderRadius: "20px" }}
              width={266}
              height={400} >
            </Skeleton>



          </>
        }
        {
          data.map((item) => {
            return (
              <div key={item._id} className="AdminCard">
                <h2>{item.user?.name}</h2>
                <p style={{ color: 'blue' }}>{item.user?.email}</p>
                <h3>Score : {item?.score}%</h3>
                <p>{item?.feedback}</p>
              </div>
            )

          })

        }

      </div>
    </div>
  )
}

const AdminWithAuth = WithAuthHOC(Admin);
export default AdminWithAuth;
