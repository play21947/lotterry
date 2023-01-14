import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { EndPoint } from '../config'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    let [cvt_phone, setCvtPhone] = useState('')
    let [password, setPassword] = useState('')
    let [confirm_password, setConfirmPassword] = useState('')
    let [name, setName] = useState('')
    let [ref, setRef] = useState('')

    let navigate = useNavigate()

    const RegisterFunction = () => {
        if (password == confirm_password) {
            axios.post(`${EndPoint}/api/sign_up`, {
                phone_number: cvt_phone,
                password: password,
                name: name,
                ref: ref
            }).then((res) => {
                if (res.data.status) {

                    // console.log("Sign Up : ", res.data)

                    localStorage.setItem("token", res.data.token)

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'กำลังเข้าสู่ระบบ',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    setTimeout(()=>{
                        navigate('/')
                    }, 1500)

                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'มีบัญชีผู้ใช้นี้อยู่แล้ว',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                // console.log(res.data)
            })
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'รหัสผ่านไม่ตรงกัน',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return (
        <div className="sign-in-container">
            <p className="welcomeback-text">สมัครสมาชิก</p>
            <p className="welcome-sec-text">At vero eos et accusamus et iusto odio</p>
            <input onChange={(text) => {
                setCvtPhone(text.target.value)
            }} className="sign-in-phone" placeholder="เบอร์โทรศัพท์"></input>
            <div className='flex-password'>
                <input onChange={(text) => {
                    setPassword(text.target.value)
                }} className="sign-in-phone-2" placeholder="รหัสผ่าน" ></input>
                <input onChange={(text) => {
                    setConfirmPassword(text.target.value)
                }} className="sign-in-phone-2" placeholder="ยืนยันรหัสผ่าน"></input>
            </div>
            <input onChange={(text) => {
                setName(text.target.value)
            }} className="sign-in-phone" placeholder="ชื่อเล่น"></input>
            <input onChange={(text) => {
                setRef(text.target.value)
            }} className="sign-in-phone" placeholder="เบอร์เพื่อนแนะนำ"></input>
            <button onClick={()=>{
                RegisterFunction()
            }} className='register-btn'>สมัครสมาชิก</button>
        </div>
    )
}

export default SignUp