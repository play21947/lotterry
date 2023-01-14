import BottomBar from "../Components/BottomBar"
import axios from 'axios'
import { useEffect, useState } from "react"
import { EndPoint } from "../config"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const Home = () => {

    // Gadjet

    let navigate = useNavigate()

    // Variable

    let merchant = 6

    let [tickets, setTickets] = useState([])
    let [user, setUser] = useState('')

    let [select, setSelect] = useState(null)

    let [ticket_merchant, setTicket_merchant] = useState([])

    let [status_modal, setStatus_modal] = useState(false)

    let [select_number, setSelect_number] = useState(null)
    let [select_money, setSelect_money] = useState(null)

    let [amount, setAmount] = useState(null)

    let [count, setCount] = useState(0)

    const PurchaseFunction = (amount_input) => {
        Swal.fire({
            title: `${select_number.split('t')[1]} = ${amount ? amount : select_money}`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'สั่งซื้อ',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(select_number)
                axios.post(`${EndPoint}/api/purchase`, {
                    num_select: select_number.split('t')[1],
                    amount: amount_input,
                    merchant_id: merchant
                }, {
                    headers: {
                        authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }).then((res) => {
                    if (res.data.UpdateTokenUser) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'ซื้อสำเร็จ',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'มีคนซื้อเลขนี้ไปเเล้ว',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }

                    setCount(count + 1)
                    setStatus_modal(false)
                })
            }
        })

    }

    const GetAllTickets = () => {
        return new Promise((resolve, reject) => {
            axios.get(EndPoint + '/api/all_tickets').then((res) => {
                resolve(res.data)
            })
        })
    }


    const GetTicketMerchant = (merchant_id) => {
        return new Promise((resolve, reject) => {
            axios.post(`${EndPoint}/api/get_ticket_merchant`, {
                merchant_id: merchant_id
            }).then((res) => {
                if (res.data) {
                    resolve(setTicket_merchant(Object.entries(res.data[0]).sort()))
                    // console.log([Object.entries(res.data[0]).sort()][0])
                }
            })
        })
    }

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

    const Initial = async () => {

        let ReturnUser = await GetUser()

        setUser(ReturnUser)

        // console.log(ReturnUser)

        let all_ticket = await GetAllTickets()

        setTickets(all_ticket)

        let ReturnTicketMerchant = await GetTicketMerchant(merchant)

        // console.log("Return Ticket : ", ReturnTicketMerchant)
    }

    useEffect(() => {
        Initial()
    }, [count])

    return (
        <div className="home-container">



            {status_modal ? <div className="modal-bg">
                <div className="modal-buy">
                    <img onClick={() => {
                        setAmount(null)
                        setStatus_modal(false)
                    }} className="modal-exit" src="./icons/close.png"></img>

                    <div>
                        <div className="stick-modal">
                            <p className="select-number">{select_number.split('t')[1]}</p>
                            <p className="select-eq">=</p>
                            <input onChange={(text) => {
                                setAmount(text.target.value)
                            }} placeholder={select_money}></input>
                        </div>

                        {amount > select_money ? <p>กรอกเงินเกินจำนวน</p> : null}


                        {amount > select_money ? <button className="modal-submit-gray">ยืนยัน</button> : <button onClick={() => {
                            if (!amount || amount < 10) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: 'กรุณากรอกจำนวนเงิน',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            } else {
                                PurchaseFunction(amount)
                            }
                        }} className="modal-submit">ยืนยัน</button>}
                    </div>
                </div>
            </div> : null}

            <div className="big-header">
                <div className="header-left">
                    <p>สลาก 2 ตัวล่าง</p>
                    <p>งวดที่ 17 มค 66</p>
                </div>
                <div className="header-right">
                    <p>ใบละ 10 - 100 ฿</p>
                    <p>ถูก 1 : 70</p>
                </div>
            </div>


            {/* <div className="box-handle">
                {nums.map((item, index) => {
                    return (
                        <div onClick={() => {
                            if (select == item) {
                                setSelect(null)
                            } else {
                                setSelect(item.toString())
                            }
                        }} key={index} className="box-num">
                            <p>{item}</p>
                        </div>
                    )
                })}
            </div> */}



            {/* Header Merchant */}


            {/* <div className="tickets-container">
                {tickets && tickets.length > 0 ? tickets.map((item) => {
                    return (
                        <div onClick={() => {
                            
                        }} className="ticket-box" key={item.id}>
                            <p className="ticket-number">{item.user_id}</p>
                        </div>
                    )
                }) : null}
            </div> */}



            {user && user.length > 0 ? <div className="user-detail">
                <p className="username">ชื่อ : {user[0].name}</p>
                {/* <p>แนะนำเพื่อน : {user[0].ref}</p> */}
                <div style={{display: 'flex'}}>
                    <p className="token">โทเคน :</p>
                    <p style={{marginLeft: '5px', color: '#16a34a', fontFamily: 'medium'}}>{user[0].token.toLocaleString()} ฿</p>
                </div>
            </div> : null}


            {/* {ticket_merchant && ticket_merchant.length > 0 ? <div className="split-num">
                <p>สลาก</p>
                <p>ใบละ {ticket_merchant[0][1]} บาท</p>
            </div> : null} */}

            <div className="board">
                {ticket_merchant && ticket_merchant.length > 0 ? ticket_merchant.map((item) => {
                    if (item[0] != 'id' && item[0] != 'user_id') {
                        return (
                            <div className="contain-box">
                                {item[1] == 0 ? <div className="box-num-gray">
                                    <p>{(item[0]).split('t')[1]}</p>
                                    <p>{item[1]}</p>
                                </div> :
                                    <div onClick={() => {
                                        setSelect_number(item[0])
                                        setSelect_money(item[1])
                                        setStatus_modal(true)
                                    }} className="box-num">
                                        <p>{(item[0]).split('t')[1]}</p>
                                        <p>{item[1]}</p>
                                    </div>}
                            </div>
                        )
                    }
                }) : <div className="wait-board"><p>กรุณาเลือกร้านที่ต้องการ</p></div>}
            </div>




            {/* {select ? <div className="modal-bottom">
                <div className="modal-detail">
                    <p>คุณต้องการเลือกเลข : {select ? select : null}</p>
                    <button onClick={() => {
                        PurchaseFunction()
                    }}>ตกลง</button>
                </div>
            </div> : null} */}




            <BottomBar />
        </div>
    )
}

export default Home