import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getCustomers } from './apis/customers'

function App() {
  const [customers, setCustomers] = useState([])


  useEffect(() => {
    const getData = async () => {
      const customers = await getCustomers();
      setCustomers(customers);
    }

    getData();
  }, [])

  return (
    <div>
      {customers.map((customer) => <p key={customer.id}>{customer.name}</p>)}
    </div>
  )
}

export default App
