import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import axios from "axios"
import { EndPoint } from "../config"

const BottomBar = () => {

    let navigate = useNavigate()

    let [quantity, setQuantity] = useState(0)

    const GetAllBought=()=>{
        return new Promise((resolve, reject)=>{
            axios.get(`${EndPoint}/api/allbought`,{
                headers:{
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res)=>{
                if(res.data.bad_token){
                    Swal("Bad Token")
                }else{
                    resolve(res.data)
                }
            })
        })
    }


    const initial=async()=>{
        let ReturnGetAllBought = await GetAllBought()

        // console.log(ReturnGetAllBought)

        setQuantity(ReturnGetAllBought.length)
    }

    useEffect(()=>{
        initial()
    }, [])

    return (
        <div className="bottom-bar-container">
            <div onClick={() => {
                navigate("/")
            }} className="bottom-box">
                <img src="./icons/home.png"></img>
                <p>หน้าหลัก</p>
            </div>

            <div onClick={() => {
                navigate('/finance')
            }} className="bottom-box">
                <img src="./icons/money.png"></img>
                <p>ฝาก / ถอน</p>
            </div>

            <div onClick={() => {
                navigate('/cart')
            }} className="bottom-box">
                <div className="circle">
                    <p>{quantity}</p>
                </div>
                <img src="./icons/bagpack.png"></img>
                <p>กระเป๋า</p>
            </div>

            <div onClick={() => {
                navigate("/account")
            }} className="bottom-box">
                <img src="./icons/user.png"></img>
                <p>ฉัน</p>
            </div>
        </div>
    )
}

export default BottomBar