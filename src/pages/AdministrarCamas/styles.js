import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
`

export const TitleContainer = styled.div`
  margin: 20px 0 50px 20px;
  display: flex;
  justify-content: flex-start;
  color: ${props => props.theme.colors.primary};
  h1 {
    line-height: 50px;
    font-size: 2.4em;
  }
  .icon {
    font-size: 3em;
    margin-right: 20px;
  }
`

export const PacienteContainer = styled.div`
  width: 80%;
  display: grid;
  margin: auto;
  grid-template-rows: 50px 1fr 100px;
  height: 100%;

`

export const BuscadorContainer = styled.div`

`

export const TablaContainer = styled.div`
  margin: 40px 0;
  h1 {
    padding-left: 20px;
    font-size: 1.5em;
    text-align: left;
    width: 100%;
    color: ${props=> props.theme.colors.primary};
    font-family: 'Roboto Mono', monospace;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    /* height: 40vh; */
  }
  th {
    color: ${props=> props.theme.colors.primary}
  }
  th, td {
    font-family: 'Roboto Mono', monospace;
    text-align: left;
    padding-top: 16px;
    padding-bottom: 16px;
  }
  tr {
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    box-sizing: border-box;
  }
  td {
    color: #999;
    font-size: 15px;
    line-height: 1.4;
  }
  .sexo{
    width: 100px;
    /* max-width: 100px; */
  }
  .editar, .vigencia {
    width: 160px;
  }
  .small {
    width: 160px;
  }

  thead {
    position: sticky;
    top: 0;
    background-color: #fff;
  }
`

export const AnadirContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`