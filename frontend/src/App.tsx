import { useEffect, useState } from "react"


const App = () => {
  const [name, setName] = useState({})

  useEffect(()=> {
    fetch('http://localhost:5000/')
    .then(res => res.json())
    .then(data=> setName(data))
  }, [])
  return (
    <div>
      <h1>The data</h1>
      <p>{name.data}</p>
      <p>{name.name}</p>
    </div>
  )
}

export default App