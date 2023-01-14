import BottomBar from "../Components/BottomBar"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import axios from "axios"
import { EndPoint } from "../config"

const Account = () => {

    let navigate = useNavigate()

    let [user, setUser] = useState([])


    const GetProfile = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${EndPoint}/api/profile`, {
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
        let ReturnGetProfile = await GetProfile()

        // console.log(ReturnGetProfile)

        setUser(ReturnGetProfile)
    }

    const GoEditProfile = () => {
        navigate('/edit_profile')
    }

    useEffect(() => {
        initial()
    }, [])

    return (
        <div className="account-container">

            <div className="header">
                <p>โปรไฟล์</p>
            </div>

            {user && user.length > 0 ? <div className="account-box">
                <p className="name-account">{user[0].name}</p>
            </div> : null}

            <div onClick={() => {
                navigate("/reference")
            }} className="acc-box-ref">
                <p className="acc-middle">แนะนำเพื่อน รับฟรี 5%</p>
            </div>


            <div className="header-account">
                <p>ข้อมูลส่วนตัว</p>
            </div>


            {user && user.length > 0 ? <div>
                <div onClick={() => {
                    GoEditProfile()
                }} className="acc-box">
                    <p className="acc-left">ชื่อเล่น</p>
                    <div className="acc-flex">
                        <p>{user[0].name}</p>
                        <img src="./icons/next.png"></img>
                    </div>
                </div>

                <div onClick={() => {
                    GoEditProfile()
                }} className="acc-box">
                    <p className="acc-left">เบอร์โทรศัพท์</p>
                    <div className="acc-flex">
                        <p>{user[0].phone_number}</p>
                        <img src="./icons/next.png"></img>
                    </div>
                </div>

                <div onClick={() => {
                    GoEditProfile()
                }} className="acc-box">
                    <p className="acc-left">เพื่อนที่แนะนำ</p>
                    <div className="acc-flex">
                        <p>{user[0].ref}</p>
                        <img src="./icons/next.png"></img>
                    </div>
                </div>

                <div onClick={() => {
                    GoEditProfile()
                }} className="acc-box">
                    <p className="acc-left">ชื่อ</p>
                    <div className="acc-flex">
                        <p>{user[0].pre_name}</p>
                        <img src="./icons/next.png"></img>
                    </div>
                </div>

                <div onClick={() => {
                    GoEditProfile()
                }} className="acc-box">
                    <p className="acc-left">นามสกุล</p>
                    <div className="acc-flex">
                        <p>{user[0].last_name}</p>
                        <img src="./icons/next.png"></img>
                    </div>
                </div>

                <div onClick={() => {
                    GoEditProfile()
                }} className="acc-box">
                    <p className="acc-left">ธนาคาร</p>
                    <div className="acc-flex">
                        <p>{user[0].bank_name}</p>
                        <img src="./icons/next.png"></img>
                    </div>
                </div>

                <div onClick={() => {
                    GoEditProfile()
                }} className="acc-box">
                    <p className="acc-left">เลขที่บัญชี</p>
                    <div className="acc-flex">
                        <p>{user[0].bank_number}</p>
                        <img src="./icons/next.png"></img>
                    </div>
                </div>

            </div> : null}

            <button className="acc-box" style={{ backgroundColor: 'firebrick', outline: 'none', color: 'white', fontFamily: 'medium', display: 'flex', justifyContent: 'center', fontSize: '22px', border: 'none', cursor: 'pointer' }} onClick={() => {
                Swal.fire({
                    title: 'ออกจากระบบ?',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ออกจากระบบ',
                    cancelButtonText: 'ยกเลิก'
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.removeItem("token")
                        setTimeout(() => {
                            navigate('/')
                        }, 1200)
                    }
                })
            }}>ออกจากระบบ</button>

            <BottomBar />
        </div>
    )
}

export default Account