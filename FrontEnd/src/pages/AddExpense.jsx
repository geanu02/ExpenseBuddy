import styled from 'styled-components'

const Container = styled.div`
    width: auto;
    height: 75vh;
    align-items: center;
    justify-content: center;
    background-color: azure;
    padding: 16px 20px;
`

export default function AddExpense() {
  return (
    <Container>
        <h2>Add Expense Page</h2>
    </Container>
  )
}