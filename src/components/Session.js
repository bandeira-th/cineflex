import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import seatsObj from "../seatsObj"
import { AZULCLARO, AMARELOCLARO } from "../constants/colors.js"
import Seat from "./Seat"

export default function Session({session, setSession}) {
    const [seats, setSeats] = useState([])
    const [selectedSeats, setSelectedSeats] = useState([])
    const [costumerName, setCostumerName] = useState("")
    const [constumerCPF, setCostumerCPF] = useState("")
    const [takenSeats, setTakenSeats] = useState([])
    const [postInfo, setPostInfo] = useState({})
 
    const {idSessao} = useParams()

    useEffect(()=>{
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)
        promisse.then(res => {setSession(res.data)}).then(setSeats(session.seats))
        promisse.catch(err => console.log(err))
    },[])

    if (session === undefined){
        return <h1>Carregando...</h1>
    } 
    
 

    function handleSeats (clickedSeat){
        if (clickedSeat.isAvailable === false) {
            alert("Este assento não está disponível")
            return;
          }
        if(clickedSeat.isAvailable){
            const filteredSeats = selectedSeats.filter((s) => !(s.id === clickedSeat.id));
            setSelectedSeats([...filteredSeats]);
        } else {
            setSelectedSeats([])
        }
        
    }

    return (
        <StyledSession>
            <h1>Selecione os assentos</h1>
            <SeatsContainer>
                {seats.map((seat)=>{
                    return (<Seat seat={seat} handleSeats={handleSeats}/>)
                })}
            </SeatsContainer>

        </StyledSession>
    )
}

const StyledSession = styled.div`
  width: 375px;
  
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
 
  h1{
    width: 100%;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 400;
  }
`

const SeatsContainer = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 7px;
   
`

