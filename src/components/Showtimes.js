export default function Showtimes() {

}

const StyledShowtimes = styled.div`
  width: 375px;
  height: 810px;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  img{
    width: 145px;
    padding: 8px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
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