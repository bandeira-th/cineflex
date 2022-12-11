import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import { CINZAESCURO, LARANJA, BRANCO, AZULMAISCLARO } from "../constants/colors"

export default function Showtimes({showtimes ,setShowTimes}) {
  

  const {idFilme} = useParams()

  useEffect(()=>{
    const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`)
    promisse.then(res => setShowTimes(res.data))
  },[])
  
  
  if(showtimes === undefined){
    return <h1>Carregando...</h1>
   
  }
  
  return(
    <>
      <StyledShowtimes>
      <h1>Escolha o horário</h1>
      {showtimes.days.map((day)=>{
        return(
          <ShowtimeCard key={day.id}>
            <p><span>{day.weekday}</span>- {day.date}</p>
            <div>{day.showtimes.map((hour)=>{
              return(
                <Link to={`/session/${hour.id}`} key={hour.id}>
                  <button key={hour.id}>{hour.name}</button>
                </Link>
              ) 
            })}
            </div>
          </ShowtimeCard>
          ) 
      })}
    
    </StyledShowtimes>
    <ShowtimeFooter>
     <img src={showtimes.posterURL} />
     <h2>{showtimes.title}</h2>
    </ShowtimeFooter>
    </>
    
  )

}

const StyledShowtimes = styled.div`
  width: 375px;
  height: 450px;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  h1 {
    width: 100%;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 400;
  }
`;
const ShowtimeFooter = styled.footer`
  width: 375px;
  background-color: ${AZULMAISCLARO};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
  padding: 14px 10px;
  img{
    width: 64px;
    padding: 8px;
    background-color: ${BRANCO};
    border-radius: 2px;
  }
  h2 {
    font-size: 20px;
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