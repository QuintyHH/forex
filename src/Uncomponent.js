import React, { useReducer } from 'react'
const UC_ADUNARE = "[Ultimulcomponent]==> :D ADUNARE"
const mathAdunareAction = () => ({
  type: UC_ADUNARE2121
})

const mathAdunareCuAction = numar => ({
  type: "[Ultimulcomponent]==> :D ADUNARE CU",
  numar
}) 

const mathScadereAction = () => ({
  type: "[Ultimulcomponent]==> :D SCADERE"
}) 

const mathReducer = (state = 7, action) =>{
  switch(action.type){
    case UC_ADUNARE: 
      return state+1
    case "[Ultimulcomponent]==> :D SCADERE":
      return state-1
    case "[Ultimulcomponent]==> :D ADUNARE CU":
      return state+action.numar
    default:
      return state
  }
}

const Ultimulcomponent = ({ name }) => {

  const [ state, dispatch ] = useReducer(mathReducer, 9)
  const plus = () => {
    dispatch(mathAdunareAction())
  }
  const plus2 = () => {
    const numarLaIntamplare = Math.round(Math.random()*10)
    dispatch(mathAdunareCuAction(numarLaIntamplare))
  }
  const minus = () => {
    dispatch(mathScadereAction())
  }

  return (
    <div>
      <ul>
        <li>Aici vreau sa apara o valoare { state }
          <button onClick={plus}>Plus</button>
          <button onClick={minus}>Minus</button>
          <button onClick={plus2}>Plus++</button>
        </li>
      </ul>
    </div>
  )
}

const Altcomponent = ({ name }) => {
  return (
    <div>
      <span>Ce vreau eu</span>
      <Ultimulcomponent name={ name }/>
    </div>
  )
}

const Cumvreaeu = ({ name }) => {
  return (<div>
            <p>Alt text</p>
            <Altcomponent name={ name }/>
          </div>)
}

export const Uncomponent = () => {
  const name = "Razvan"
  return (<div>
           <h1>Text</h1>
           <Cumvreaeu name={ name }/>
         </div>)
}