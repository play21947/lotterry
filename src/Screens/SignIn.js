import { useState } from "react"

const SignIn = () => {

    let [cvt_phone, setCvtPhone] = useState('')


    // 2, 6
    // console.log(cvt_phone.length)

    return (
        <div className="sign-in-container">
            <p className="welcomeback-text">ยินดีต้อนรับกลับ!</p>
            <p className="welcome-sec-text">At vero eos et accusamus et iusto odio</p>
            <input onChange={(text) => {
                setCvtPhone(text.target.value)
            }} className="sign-in-phone" placeholder="เบอร์โทรศัพท์" value={cvt_phone}></input>
            <button className="sign-in-button">เข้าสู่ระบบ</button>
        </div>
    )
}

export default SignIn