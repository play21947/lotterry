import { useEffect, useState } from "react"
import BottomBar from "../Components/BottomBar"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { EndPoint } from "../config"
import Swal from "sweetalert2"

const Finance = () => {

    let navigate = useNavigate()
    let location = useLocation()

    let [status_modal, setStatus_modal] = useState(false)

    let [amount, setAmount] = useState(0)
    let [genre, setGenre] = useState(0)

    let [allFinance, setAllFinance] = useState([])

    let [count, setCount] = useState(0)
    let [user, setUser] = useState([])

    const FinanceFunction = () => {

        // console.log("Genre : ", genre)

        let merchant_id = 6

        if (amount && amount >= 10) {
            axios.post(`${EndPoint}/api/finance`, {
                amount: amount,
                genre: genre == 0 ? 'ฝาก' : genre == 1 ? 'ถอน' : null,
                merchant_id: merchant_id
            }, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem("token")
                }
            }).then((res) => {
                if (res.data.bad_token) {
                    localStorage.removeItem('token')
                    navigate('/signin')
                } else {
                    if (res.data.finance_success) {
                        setStatus_modal(false)

                        setTimeout(() => {
                            window.open("https://lin.ee/Msso9Xi", '_blank')
                        }, 1000)
                    }
                }
            })
        } else {
            Swal.fire("จำนวนเงินไม่เพียงพอ")
        }
    }

    const GetMyFinance = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${EndPoint}/api/getmyfinance`, {
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

    const DeleteFinance = (finance_id) => {
        axios.post(`${EndPoint}/api/delete_finance`, {
            finance_id: finance_id
        }).then((res) => {
            if (res.data.deleted) {
                setCount(count + 1)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'ลบข้อมูลเสร็จสิ้น',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                if (res.data.impossible) {
                    Swal.fire("การกระทำเป็นไปไม่ได้")
                    setCount(count + 1)
                }
            }
        })
    }

    const GetUser = () => {
        return new Promise((resolve, reject) => {

            // console.log(localStorage.getItem('token'))

            axios.get(`${EndPoint}/api/get_user`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => {
                if (res.data.bad_token) {
                    navigate('/signin')
                } else {
                    resolve(res.data)
                }
                // console.log(res.data)
            })
        })
    }


    const initial = async () => {
        let ReturnMyFinance = await GetMyFinance();
        let ReturnMyDetail = await GetUser()

        setAllFinance(ReturnMyFinance)
        setUser(ReturnMyDetail)
    }

    useEffect(() => {
        initial()
    }, [count])

    return (
        <div className="finance-container">


            {status_modal ? <div className="modal-bg">
                <div className="modal-finance">
                    <img onClick={() => {
                        setStatus_modal(false)
                    }} className="modal-exit" src="./icons/close.png"></img>
                    <p></p>

                    <div>

                        <div className="finance-flex">
                            <p className="finance-amount">จำนวนเงิน : </p>
                            <input onChange={(text) => {
                                setAmount(text.target.value)
                            }} placeholder="100"></input>
                        </div>


                        <button onClick={() => {

                            if(user[0].token < amount){
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: 'จำนวนโทเคนไม่เพียงพอ',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }else{
                                FinanceFunction()
                            }

                        }} className="finance-btn">เติมเงิน</button>
                    </div>

                </div>
            </div> : null}

            <div className="header">
                <p>ฝาก / ถอน</p>
            </div>



            <div className="flex-deposit-withdraw">
                <div onClick={() => {
                    setGenre(0)
                    setStatus_modal(true)
                }} className="deposit">
                    <p>ฝากเงิน</p>
                </div>

                <div onClick={() => {
                    setGenre(1)
                    setStatus_modal(true)
                }} className="withdraw">
                    <p>ถอนเงิน</p>
                </div>

            </div>


            {user && user.length > 0 ? user[0].role == 1 ? <div onClick={() => {
                navigate('/verify')
            }} className="verify-btn">
                <p>อนุมัติโทเคน</p>
            </div> : null : null}


            <table className="table-finance">
                <thead>
                    <tr>
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
                                <td>{(item.date).split(' ')[0]}</td>
                                <td>{item.genre}</td>
                                <td>{item.amount}</td>
                                {item.status == 1 ? <td style={{ color: '#16a34a' }}>เสร็จสิ้น</td> : <div className="wait">
                                    <td>รออนุมัติ</td>
                                    <td>1-2 นาที</td>
                                </div>}
                                {item.status == 1 ? null : <td onClick={() => {
                                    DeleteFinance(item.id)
                                }}>X</td>}
                            </tr>
                        )
                    }) : null}
                </tbody>
            </table>

            <BottomBar />
        </div>
    )
}

export default Finance