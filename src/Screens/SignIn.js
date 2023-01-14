import { useState } from "react"
import axios from 'axios'
import { EndPoint } from "../config"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"

const SignIn = () => {

    // Gadjet
    let navigate = useNavigate()

    // Variable

    let [cvt_phone, setCvtPhone] = useState('')
    let [password, setPassword] = useState('')

    const AuthFunction = () => {
        axios.post(`${EndPoint}/api/sign_in`, {
            phone_number: cvt_phone,
            password: password
        }).then((res) => {
            if (!res.data.status) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'เบอร์โทรศัพท์ไม่ถูกต้อง',
                    showConfirmButton: true,
                    // timer: 1500
                })
            } else {
                localStorage.setItem("token", res.data.token)

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'กำลังเข้าสู่ระบบ',
                    showConfirmButton: false,
                    timer: 1500
                })

                setTimeout(() => {
                    navigate('/')
                }, 1300)
            }
            // console.log("SignIn : ", res.data)
        })
    }


    // 2, 6
    // console.log(cvt_phone.length)

    return (
        <div className="sign-in-container">
            <p className="welcomeback-text">สลากนำโชค !</p>
            <p className="welcome-sec-text">At vero eos et accusamus et iusto odio</p>
            <input onChange={(text) => {
                setCvtPhone(text.target.value)
            }} className="sign-in-phone" placeholder="เบอร์โทรศัพท์" value={cvt_phone} ></input>
            <input onChange={(text) => {
                setPassword(text.target.value)
            }} className="sign-in-phone" placeholder="รหัสผ่าน" value={password} type="password"></input>
            <button onClick={() => {
                AuthFunction()
            }} className="sign-in-button">เข้าสู่ระบบ</button>
            <p onClick={()=>{
                navigate('/signup')
            }} className="register-link">สมัครสมาชิก</p>
        </div>
    )
}

export default SignIn