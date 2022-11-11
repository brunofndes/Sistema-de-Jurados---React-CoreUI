import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div className="mfs-auto">
        <span className="mr-1">Todos os direitos reservados</span>
        <a href="https://github.com/brunofndes" target="_blank" rel="noopener noreferrer">&copy; Bruno Fernandes</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
