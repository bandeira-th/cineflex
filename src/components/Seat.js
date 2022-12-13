import styled from "styled-components"




export default function Seat({seat, handleSeat}) {
    <>
    {!seat.selected ? (
      <StyledSeat className={`seat ${seat.status}`} onClick={() => handleSeat(seat)}>
        {seat.id}
      </StyledSeat>
    ) : (
      <StyledSeat className={`seat selected`} onClick={() => handleSeat(seat)}>
        {seat.id}
      </StyledSeat>
    )}
  </>


const StyledSeat = styled.button`
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 1px solid;
        background-color: ${props => props.isAvailable? AZULCLARO : AMARELOCLARO};

`