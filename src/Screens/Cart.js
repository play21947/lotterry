import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import BottomBar from "../Components/BottomBar"
import { EndPoint } from "../config"

const Cart = () => {

    let navigate = useNavigate()

    let [allbought, setBought] = useState([])

    let [ticket_target, setTicket_target] = useState('')
    let [purchase, setPurchase] = useState([])
    let [user, setUser] = useState([])

    let updateSearchPurchase = purchase.filter((item) => {
        return item.ticket.includes('t' + ticket_target)
    })

    // console.log(updateSearchPurchase)

    const GetAllBought = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${EndPoint}/api/allbought`, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
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

    const GetUserCheck = (ticket) => {
        return new Promise((resolve, reject) => {
            axios.post(`${EndPoint}/api/check_user`, {
                ticket_target: ticket
            }, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
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

    const GetUser = () => {
        return new Promise((resolve, reject) => {

            console.log(localStorage.getItem('token'))

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
        let ReturnGetAllBought = await GetAllBought()
        let ReturnPurchase = await GetUserCheck()
        let ReturnUser = await GetUser()

        // console.log(ReturnPurchase)

        setBought(ReturnGetAllBought)
        setPurchase(ReturnPurchase)
        setUser(ReturnUser)
    }


    useEffect(() => {
        initial()
    }, [])

    return (
        <div>

            <div className="header">
                <p>กระเป๋า</p>
            </div>


            <table className="table-finance">
                <thead>
                    <tr>
                        <th>วันที่</th>
                        <th>ตัวเลข</th>
                        <th>ราคา</th>
                        <th>สถานะ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {allbought && allbought.length > 0 ? allbought.map((item) => {
                        return (
                            <tr className="tr-finance">
                                <td>{(item.date).split(' ')[0]}</td>
                                <td>{(item.ticket).split('t')[1]}</td>
                                <td>{item.amount}</td>
                                {item.status == 0 ? <td className="status-wait">รอผล</td> : <td className="status-success">สำเร็จ</td>}

                            </tr>
                        )
                    }) : null}
                </tbody>
            </table>

            {user && user.length > 0 ? user[0].role == 1 ? <div>
                <div className="check-header">
                    <p>เช็คเลขที่คนซื้อ</p>
                </div>

                <div className="box-check">
                    <input placeholder="XX" onChange={(text) => {
                        setTicket_target(text.target.value)
                    }}></input>
                </div>



                <div className="box-users">
                    {updateSearchPurchase && updateSearchPurchase.length > 0 ? updateSearchPurchase.map((item) => {
                        console.log("What : ", item)
                        return (
                            <div className="box-users-detail">
                                {ticket_target ? <p>{item.phone_number} : {item.amount} ฿</p> : null}
                            </div>
                        )
                    }) : null}
                </div>
            </div> : null : null}


            <BottomBar />
        </div>
    )
}

export default Cart