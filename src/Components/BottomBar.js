import { useNavigate } from "react-router-dom"

const BottomBar = () => {

    let navigate = useNavigate()

    return (
        <div className="bottom-bar-container">
            <div onClick={()=>{
                navigate("/")
            }} className="bottom-box">
                <img src="./icons/home.png"></img>
                <p>หน้าหลัก</p>
            </div>
            <div onClick={()=>{
                navigate('/cart')
            }} className="bottom-box">
                <div className="circle">
                    <p>3</p>
                </div>
                <img src="./icons/bag.png"></img>
                <p>ตะกร้า</p>
            </div>
            <div onClick={()=>{
                navigate("/account")
            }} className="bottom-box">
                <img src="./icons/user.png"></img>
                <p>ฉัน</p>
            </div>
        </div>
    )
}

export default BottomBar