'use client'

import { usePathname } from "next/navigation";
import { useState } from "react"

export default function Main() {
  const [click] = useState('Main Page');
  const [brand, setBrand] = useState("Ford");
  const [model, setModel] = useState("Mustang");
  const [year, setYear] = useState("1964");
  const [color, setColor] = useState("red");
  const [car, setCar] = useState({
    brand: 'Tata',
    model: 'Punch EV',
    year: '2024',
    color: 'Pristine White'
  });

  const pathName = usePathname()

  const updateColor = () => {
    setCar(previousState => {
      return {...previousState, color: 'blue'}
    })
  }
  return (
    <div>

      <h1 className="mb-2">Welcome to {click}</h1>
      {/* <p>current pathName: {pathName}</p> */}
      <h1 className="mb-2">My {brand}</h1>
      <p className="mb-2">
        It is a {color} {model} from {year}.
      </p>

      <p className="mb-3">It is my {car.brand} {car.model} {car.color} of {car.year} model</p>
      
      <button type="button" onClick={updateColor} className="border border-warning text-info p-2">Blue</button>
    </div>
    
  );
}
