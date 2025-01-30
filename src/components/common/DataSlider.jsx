import React, { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";


const DataSlider = ({onDateChange, onFilterchange}) => {
    const[dateRange, setDateRange] = useState({
        startDate: undefined,
        endDate: undefined,
        key: 'selection'
    })

    const handleSelect = (ranges) => {
        setDateRange(ranges.selection)
        onDateChange(ranges.selection.startDate, ranges.selection.endDate)
        onFilterchange(ranges.selection.startDate,ranges.selection.endDate)
    }
    const handleClearFilter = () =>{
        setDateRange({
            startDate: undefined,
            endDate: undefined,
            key: 'selection'
        })
        onDateChange(null, null)
        onFilterchange(null, null)
       
    }
  return (
    <>
           <h5>Filter Bookings By Date </h5>
           <DateRangePicker
             ranges={[dateRange]}
             onChange={handleSelect}
             className="mb-4"
           />
           <button className="btn btn-secondary" onClick={handleClearFilter}>
            Clear Filter
           </button>
    </>
 
  )
}

export default DataSlider