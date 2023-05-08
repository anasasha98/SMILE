import React from 'react'
import { Button } from 'react-bootstrap'

const SubTitle = ({title,btnTitle}) => {
  return (
   
    <div className="container"style={{color: 'var(--primary-color)',
        fontSize: '10px',
        fontWeight: '700'}}>
      <div className=" ">
        <div className='d-flex justify-content-center text-center '>
          <h4>{title}</h4>
        </div>
        {/* if conditional */}
        {btnTitle ? (
          <div className='d-flex justify-content-end  '>
            <Button variant="outline-primary ">{btnTitle}</Button>
          </div>
        ) : null}
      </div>
    </div>
  
  )
}

export default SubTitle