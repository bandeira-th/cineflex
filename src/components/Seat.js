import styled from "styled-components"
import { useEffect, useState } from "react"
import { AZULMAISCLARO, TEALCLARO, AMARELOCLARO, AZULCLARO, TEALESCURO  } from "../constants/colors"



export default function Seat({seat, isSelected, handleSeats}) {
    const [status, setStatus] = useState("disponível")
    useEffect(() => {
      if (isSelected) {
          setStatus("selecionado")
      } else if (seat.isAvailable) {
          setStatus("disponível")
      } else {
          setStatus("indisponível")
      }
  }, [isSelected])

  return(
    <StyledSeat status={status} onClick={() => handleSeats(seat)}>
      {seat.name}
    </StyledSeat>
  )


}
    



const StyledSeat = styled.button`
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 1px solid ${props => {switch(props.status){ 
                                          case "disponível":
                                            return AZULCLARO;
                                          case "selecionado":
                                            return TEALESCURO;
                                          case "indisponível":
                                            return AMARELOCLARO
                                          
                                          }
                                        }
                                      };
        background-color: ${props => {switch(props.status){ 
                                          case "disponível":
                                            return AZULMAISCLARO;
                                          case "selecionado":
                                            return TEALCLARO;
                                          case "indisponível":
                                            return AMARELOCLARO
                                          
                                          }
                                        }
                                      }

`