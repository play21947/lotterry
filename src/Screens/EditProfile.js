import BottomBar from "../Components/BottomBar"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import axios from "axios"
import { EndPoint } from "../config"

const EditProfile = () => {

    let navigate = useNavigate()

    let [user, setUser] = useState([])
    let [name, setName] = useState('')
    let [pre_name, setPre_name] = useState('')
    let [last_name, setLast_name] = useState('')
    let [number_phone, setNumber_phone] = useState('')
    let [bank_name, setBank_name] = useState('')
    let [bank_number, setBank_number] = useState('')
    let [ref, setRef] = useState('')
    let [id, setId] = useState(null)

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

    const EditUpdate=()=>{

        if(id && pre_name && last_name && bank_name && bank_number){
            axios.post(`${EndPoint}/api/edit_update`,{
                user_id: id,
                pre_name: pre_name,
                last_name: last_name,
                bank_name: bank_name,
                bank_number: bank_number
            }).then((res)=>{
                if(res.data.edited){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'แก้ไขข้อมูลเรียบร้อยเเล้ว',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const initial = async () => {
        let ReturnGetProfile = await GetProfile()

        // console.log(ReturnGetProfile)

        setId(ReturnGetProfile[0].id)
        setName(ReturnGetProfile[0].name)
        setPre_name(ReturnGetProfile[0].pre_name)
        setLast_name(ReturnGetProfile[0].last_name)
        setNumber_phone(ReturnGetProfile[0].phone_number)
        setBank_name(ReturnGetProfile[0].bank_name)
        setBank_number(ReturnGetProfile[0].bank_number)
        setRef(ReturnGetProfile[0].ref)

        setUser(ReturnGetProfile)
    }

    const GoEditProfile = () => {
        navigate('/edit_profile')
    }

    useEffect(() => {
        initial()
    }, [])

    return (
        <div className="edit-container">
            <div className="header"><p>แก้ไขโปรไฟล์</p></div>

            {user && user.length > 0 ?
                <div className="edit-boxs">
                    <p>ชื่อเล่น</p>
                    <input className="edit-input-disable" disabled value={name}></input>
                    <p>เบอร์โทรศัพท์</p>
                    <input className="edit-input-disable" disabled value={number_phone}></input>
                    <p>คนที่แนะนำ</p>
                    <input className="edit-input-disable" disabled value={ref}></input>
                    <p>ชื่อ</p>
                    <input onChange={(text) => {
                        setPre_name(text.target.value)
                    }} value={pre_name}></input>
                    <p>นามสกุล</p>
                    <input onChange={(text) => {
                        setLast_name(text.target.value)
                    }} value={last_name}></input>
                    <p>ธนาคาร</p>
                    <input onChange={(text) => {
                        setBank_name(text.target.value)
                    }} value={bank_name}></input>
                    <p>เลขที่บัญชี</p>
                    <input onChange={(text) => {
                        setBank_number(text.target.value)
                    }} value={bank_number}></input>

                    <button onClick={()=>{
                        EditUpdate()
                    }} className="edit-btn">แก้ไข</button>
                </div> : null}


                <BottomBar/>
        </div>
    )
}

export default EditProfile