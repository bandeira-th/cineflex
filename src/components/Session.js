import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import seatsObj from "../seatsObj"
import { AZULCLARO, AMARELOCLARO } from "../constants/colors.js"

export default function Session({session, setSession}) {
    const [selectedSeats, setSelectedSeats] = useState([])
    const [costumerName, setCostumerName] = useState("")
    const [constumerCPF, setCostumerCPF] = useState("")

    const {idSessao} = useParams()

    useEffect(()=>{
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)
        promisse.then(res => setSession(res.data))
        promisse.catch(err => console.log(err))
    },[])

    if (session === undefined){
        return <h1>Carregando...</h1>
    }



    return (
        <StyledSession>
            <h1>Selecione os assentos</h1>
            <SeatsContainer>
                {session.seats.map((seat)=>{
                    return <StyledSeatBtn isAvailable={seat.isAvailable}>{seat.name}</StyledSeatBtn>
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

const StyledSeatBtn = styled.button`
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 1px solid;
        background-color: ${props => props.isAvailable? AZULCLARO : AMARELOCLARO};

`