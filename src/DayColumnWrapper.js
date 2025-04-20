/** @import DayColumnWrapper from "react-big-calendar/lib/DayColumnWrapper" */
import React from 'react'

const DayColumnWrapper = ({ children, className, style, innerRef }) => {
  return (
    <div className={className} style={style} ref={innerRef}>
      {children}
    </div>
  )
}
/** @type {DayColumnWrapper} */
export default React.forwardRef((props, ref) => (
  <DayColumnWrapper {...props} innerRef={ref} />
))
