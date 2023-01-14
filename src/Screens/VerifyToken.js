import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { EndPoint } from '../config'
import Swal from 'sweetalert2'
import BottomBar from '../Components/BottomBar'

const VerifyToken = () => {

    let [allFinance, setAllFinance] = useState([])

    let [count, setCount] = useState(0)

    const GetAllWaitVerify = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${EndPoint}/api/get_all_wait_verify`, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem("token")
                }
            }).then((res) => {
                if (res.data.bad_token) {
                    alert("bad Token")
                } else {
                    resolve(res.data)
                }
            })
        })
    }


    const VerifyTokenFunction = (user_id, merchant_id, finance_id) => {
        axios.post(`${EndPoint}/api/updateVerify`, {
            finance_id: finance_id,
            user_id: user_id,
            merchant_id: merchant_id
        }).then((res) => {
            if (res.data.update_success) {
                setCount(count + 1)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'อนุมัติสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    const initial = async () => {
        let ReturnAllWaitVerify = await GetAllWaitVerify();

        // console.log(ReturnAllWaitVerify)
        setAllFinance(ReturnAllWaitVerify)
    }

    useEffect(() => {
        initial()
    }, [count])

    return (
        <div>

            <div className="header">
                <p>อนุมัติโทเคน</p>
            </div>

            <table className="table-finance">
                <thead>
                    <tr>
                        <th>ชื่อเล่น</th>
                        <th>วัน</th>
                        <th>รายการ</th>
                        <th>จำนวน</th>
                        <th>สถานะ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {allFinance && allFinance.length > 0 ? allFinance.map((item) => {
                        return (
                            <tr className="tr-finance">
                                <div className='finance-flex-table'>
                                    <p>{item.name}</p>
                                    {item.status == 1 ? null : <p>{item.phone_number}</p>}
                                </div>
                                <td>{(item.date).split(' ')[0]}</td>
                                <td>{item.genre}</td>
                                <td>{item.amount}</td>
                                <td>{item.status == 1 ? <p className='status-success'>สำเร็จ</p> : <p className='status-wait'>รออนุมัติ</p>}</td>
                                {item.status == 1 ? null : <td><button onClick={() => {
                                    VerifyTokenFunction(item.user_id, item.merchant_id, item.id)
                                }} className='verify-btn-each'>อนุมัติ</button></td>}
                            </tr>
                        )
                    }) : null}
                </tbody>
            </table>

            <BottomBar />

        </div>
    )
}


export default VerifyToken