'use client'

import { useEffect, useState } from "react";

export default function Profile() {
    const [count,setCount] = useState(0);
    const [calculation, setCalculation] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setCount((count) => count + 1);
        }, 1000);

         setCalculation(() => count * 2)
    }, [count]);
    
    return (
        <div className="container col m-3">
            <h1 className="mb-2">My profile</h1> 
            <h1 className="mb-2">I have rendered {count} times!</h1>
            <button className="border border-info p-2 mr-2" onClick={() => setCount((c) => c+1) }>+</button>
            <button className="border border-warning p-2 mb-2" onClick={() => setCount((c) => c-1) }>-</button>
            <p>Calculation: {calculation}</p>
            
        </div>
)
}
