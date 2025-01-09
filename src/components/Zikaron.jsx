import React, { useContext } from 'react'
import { GamePageContext } from '../pages/GamePage.jsx'

const Zikaron = () => {
    const room = useContext(GamePageContext);
  return (
    <div>Zikaron</div>
  )
}

export default Zikaron