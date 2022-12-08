import { useEffect, useState } from "react";
import styled from "styled-components";
import MoviesPage from "./components/MoviesPage";
import axios from "axios";
import Header from "./components/Header";


export default function App() {
  const [movies, setMovies] = useState([])
  
  useEffect(()=>{
    const req = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies")
    req.then(res => {setMovies(res.data)})
  },[])

  return (
    <>
      <StyledApp>
        <Header />
        <MoviesPage movies={movies}/>
      </StyledApp>
    </>
  );
}

const StyledApp = styled.div`
  width: 100%;
  height: 810px;
  display: flex;
  flex-direction: column;
  align-items: center;
`



