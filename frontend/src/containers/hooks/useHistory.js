import { useState } from "react";


const useHistory = (initialState) => {
  const [index, setIndex] = useState(0)

  const [history, setHistory] = useState([initialState])

  const setState = (action, overwrite = false) => {
    const newState = typeof action === 'function' ? action(history[index]) : action;

    if (overwrite) {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy)
    } else {
      const updateState = [...history].slice(0, index + 1)
      setHistory([...updateState, newState])
      setIndex(prevState => prevState + 1)
    }
  }

  const undo = () => index > 0 && setIndex(prevState => prevState - 1)
  const redo = () => index < history.length - 1 && setIndex(prevState => prevState + 1)


  return [history[index], setState, undo, redo];
}

export {useHistory}