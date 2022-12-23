import BottomBar from "../Components/BottomBar"
import axios from 'axios'
import { useEffect, useState } from "react"
import { EndPoint } from "../config"

const Home = () => {

    let [tickets, setTickets] = useState([])

    const GetAllTickets = () => {
        return new Promise((resolve, reject) => {
            axios.get(EndPoint + '/api/all_tickets').then((res) => {
                resolve(res.data)
            })
        })
    }

    const Initial = async () => {
        let all_ticket = await GetAllTickets()

        console.log(all_ticket)

        // ChangeData

        setTickets(all_ticket)
    }

    useEffect(() => {
        Initial()
    }, [])

    return (
        <div className="home-container">

            <div className="header">
                <p>หน้าหลัก</p>
            </div>

            {/* <div className="tickets-container">
                {tickets && tickets.length > 0 ? tickets.map((item) => {
                    return (
                        <div className="ticket-box" key={item.id}>
                            <p className="ticket-number">{item.ticket_number}</p>
                        </div>
                    )
                }) : null}
            </div> */}




            <BottomBar />
        </div>
    )
}

export default Home