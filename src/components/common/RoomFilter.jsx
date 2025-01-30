import React, { useState, useEffect } from 'react';

const RoomFilter = ({ data, selectedFilteredData }) => {
    const [filter, setFilter] = useState("");
    const [roomTypes, setRoomTypes] = useState([]);


    useEffect(() => { 
        // Calculate room types when component mounts or when 'data' prop changes 
       
        const uniqueRoomTypes = [...new Set(data.map((room) => room.roomType))]; 
        setRoomTypes(uniqueRoomTypes); 
    }, [data]);

    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value;

        setFilter(selectedRoomType);
        const filteredRooms = data.filter((room) =>
            room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())
        );
        selectedFilteredData(filteredRooms);
    };

    const clearFilter = () => {
        setFilter("");
        selectedFilteredData(data);
    };
   
    return (
        <div className='input-group mb-3'>
            <span className='input-group-text' id='room-type-filter'>
                Filter rooms by type
            </span>
            <select
                className='form-select'
                value={filter}
                onChange={handleSelectChange}
                aria-labelledby='room-type-filter'
            >
                <option value="">Select a room type to filter...</option>
                {roomTypes.map((type, index) => (
                    <option key={index} value={String (type)}>
                        {String(type)}
                    </option>
                ))}
            </select>
            <button className='btn btn-hotel' type="button" onClick={clearFilter}>
                Clear Filter
            </button>
        </div>
    );
};

export default RoomFilter;
