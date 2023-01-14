import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { EndPoint } from '../config'
import { useNavigate } from 'react-router-dom'
import BottomBar from '../Components/BottomBar'

const Reference = () => {

    let navigate = useNavigate()

    let [user, setUser] = useState([])
    let [sub, setSub] = useState([])

    const GetUser = () => {
        return new Promise((resolve, reject) => {

            // console.log(localStorage.getItem('token'))

            axios.get(`${EndPoint}/api/get_user`, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => {

                // console.log("GetUser : ", res.data)

                if (res.data.bad_token) {
                    navigate('/signin')
                } else {
                    resolve(res.data)
                }
                // console.log(res.data)
            })
        })
    }

    const GetSub = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${EndPoint}/api/sub`, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem("token")
                }
            }).then((res) => {
                if (res.data.bad_token) {
                    navigate('/signin')
                } else {
                    resolve(res.data)
                }
            })
        })
    }

    const initial = async () => {
        let ReturnUser = await GetUser()
        let ReturnSub = await GetSub()

        setUser(ReturnUser)
        setSub(ReturnSub)
    }


    useEffect(() => {
        initial()
    }, [])

    return (
        <div className='ref-container'>
            {user && user.length > 0 ?
                <div className='ref-box'>
                    <p>ชื่อ : {user[0].name}</p>
                    <p>โทเคนสะสม : {user[0].total_ref} ฿</p>
                    <p>แนะนำ : {sub && sub.length > 0 ? sub.length : null} คน</p>
                </div> : null}

            <div className='sub-header'>
                <p>คนที่เเนะนำ</p>
            </div>

            <div className='sub-container'>
                {sub && sub.length > 0 ? sub.map((item, index) => {
                    return (
                        <div className='flex-ref'>
                            <p>{index + 1}. </p>
                            <p>{item.name}</p>
                        </div>
                    )
                }) : null}
            </div>


            <BottomBar/>
        </div>
    )
}

export default Reference