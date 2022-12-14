import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import {LARANJA, seatColors } from "../constants/colors.js"
import Seat from "./Seat"
import Footer from "./Footer.js"

export default function Session({session, setSession, setSuccessInfo, successInfo}) {
    
    const [seats, setSeats] = useState([])
    const [selectedSeats, setSelectedSeats] = useState([])
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const navigate = useNavigate()

 
    const {idSessao} = useParams()

    useEffect(()=>{
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)
        promisse.then(res => {setSession(res.data) ; setSeats(res.data.seats)})
        promisse.catch(err => console.log(err))
    },[])

    if (session === undefined){
        return <h1>Carregando...</h1>
    } 
    
 

    function handleSeats(seat) {
        if (!seat.isAvailable) {
            alert("Esse assento não está disponível")
        } else {
            // some retorna true ou se encontrar ao menos 1 elemento na array que passe no teste
            // retorna false se não encontrar nenhum
            const isSelected = selectedSeats.some((s) => s.id === seat.id)

            if (isSelected) {
                //filter retorna uma cópia da array onde ele foi implementado contendo apenas os itens que passaram no teste
                //nesse caso só serão incluidos na cópia os ids que forem diferentes do id passado
                const newList = selectedSeats.filter((s) => s.id !== seat.id)
                setSelectedSeats(newList)
            } else {
                setSelectedSeats([...selectedSeats, seat])
            }
        }
    }

    function buyTickets(e) {
        e.preventDefault()
        const ids = selectedSeats.map(s => s.id)

        const body = {
            ids: ids,
            name: name,
            cpf: cpf
        }
        if (ids.length === 0) {
            alert("Selecione pelo menos um assento")
        } else {
            axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", body)
                .then(res => {
                    setSuccessInfo({
                        time: session.name,
                        date: session.day.date,
                        movieTitle: session.movie.title,
                        tickets: selectedSeats.map(s => s.name),
                        name: name,
                        cpf: cpf

                    })
                    navigate("/sucesso")
                })
                .catch(err => console.log(err.response.data))

        }
    }

    return (
        <StyledSession>
            <h1>Selecione os assentos</h1>
            <SeatsContainer>
                {seats.map((seat)=>{
                    return (
                    <Seat 
                        key={seat.id}
                        seat={seat} 
                        handleSeats={handleSeats}
                        isSelected={selectedSeats.some((s) => s.id === seat.id)}
                        />)
                })}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle status="selected" />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status="available" />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status="unavailable" />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <Form onSubmit={buyTickets}>
                <label htmlFor="name">Nome do Comprador</label>
                <input
                    id="name"
                    placeholder="Digite seu nome..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />

                <label htmlFor="cpf">CPF do Comprador</label>
                <input
                    id="cpf"
                    placeholder="Digite seu CPF..."
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                    required
                />

                <button type="submit">Reservar Assento(s)</button>
            </Form>

            <Footer
                movieTitle={session.movie.title}
                poster={session.movie.posterURL}
                weekday={session.day.weekday}
                time={session.name}
            />
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
  label{
    margin-right: 165px;
  }
 
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
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 70%;
    justify-content: space-between;
    margin: 10px;

`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`

const CaptionCircle = styled.div`
    border: 1px solid ${props => seatColors[props.status].border};
    background-color: ${props => seatColors[props.status].background};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    cursor: ${props => props.status === "unavailable" ? "none" : "pointer"};
    `

const Form = styled.form`
    width: 375px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    font-size: 18px;
    gap: 15px;
    button {
        align-self: center;
        width: 225px;
        height: 42px;
        background-color: ${LARANJA };
        color: #fff;
        border: none;
        border-radius: 3px;
    }
    input {
        width: 327px;
        height: 51px;
    }
`

