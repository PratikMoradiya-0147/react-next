'use client'

import { usePathname } from "next/navigation"

export default function About() {
    const pathname = usePathname()
    const arr1 = ['Pratik', 'is'];
    const arr2 = ['Billionare', 'He', 'has a' ];
    const arr3 = ['15 Lacs', 'Rupees'];

    const concatArray = arr1.concat(arr2, arr3);
  return (
    <div className="container m-3">
      concatArray: {concatArray}
        <form action="{inquireUS}">
      <div className="row">
        <div className="col">
          <label htmlFor="contact">Contact No</label>
          <input
            type="text"
            id="contact"
            name="contact"
            className="input-text"
          />
        </div>

        <div className="col">
          <label htmlFor="email">Email Id</label>
          <input
            type="text"
            id="email"
            name="email"
            className="input-text"
          />
        </div>

        <div className="col">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className="input-text"
          />
        </div>
        <p>current pathname: {pathname}</p>
      </div>
      </form>
      <button type="submit"></button>
    </div>
  )
}
  
