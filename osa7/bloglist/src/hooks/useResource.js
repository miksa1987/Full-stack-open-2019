import axios from 'axios'
import {useState, useEffect} from 'react'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  
  useEffect(() => {
    axios.get(baseUrl).then(response => setResources(response.data))
  }, [resources])

  const manipulator = {
    add: (data) => {
      axios.post(baseUrl, data).then(response => {
        updatedResources = resources.concat(data)
        setResources(updatedResources)
      })
    }
  }

  return [resources, manipulator]
}

export default useResource