import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import { CINZAESCURO, LARANJA, BRANCO } from "../constants/colors"

export default function Showtimes() {
  const [showtimes, setShowTimes] = useState(undefined)

  const {idFilme} = useParams()

  useEffect(()=>{
    const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`)
    promisse.then(res => setShowTimes(res.data.days))
  },[])
  
  
  if(showtimes === undefined){
    return <h1>Carregando...</h1>
   
  }
  
  return(
    <StyledShowtimes>
      <h1>Escolha o horário</h1>
      {showtimes.map((showtime)=>{
        return(
          <ShowtimeCard>
            <p><span>{showtime.weekday}</span>- {showtime.date}</p>
            <div>{showtime.showtimes.map((hour)=>{
              return <button>{hour.name}</button>
            })}
            </div>
          </ShowtimeCard>
          ) 
      })}
    </StyledShowtimes>
  )

}

const StyledShowtimes = styled.div`
  width: 375px;
  height: 693px;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
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
const ShowtimeCard = styled.div`
  width: 90%;
  margin-bottom: 23px;
  display: flex;
  flex-direction: column;
  p , span {
    font-size: 20px;
  }
  p{
    margin-bottom: 30px;
  }
  div{
    display: flex;
    justify-content: flex-start;
    gap: 8px;
  }
  button{
    background: ${LARANJA};
    border: none;
    border-radius: 3px;
    width: 83px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${BRANCO} ;
    font-size: 18px;
  }
`