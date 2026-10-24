import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount, reset } from './redux/counterSlice'



function App() {

  const count = useSelector((state) => state.counter.value)

  const dispatch = useDispatch()

  const handleIncrement = () => {
    dispatch(increment())
  }

  const handleDecrement = () => {
    dispatch(decrement())
  }

  const handleIncrementByAmount = (amount) => {
    dispatch(incrementByAmount(amount))
  }

  const handleReset = () => {
    dispatch(reset())
  }


  return (
    <div>
      <div className="card">
        <button
          aria-label="Increment value"
          onClick={handleIncrement}
        >
          +
        </button>
        <span>Count : {count}</span>
        <button
          aria-label="Decrement value"
          onClick={handleDecrement}
        >
          -
        </button>
        <button
          aria-label="Increment by 5"
          onClick={() => handleIncrementByAmount(5)}
        >
          + 5
        </button>

        <button
          aria-label="Decrement by 5"
          onClick={() => handleIncrementByAmount(-5)}
        >
          - 5
        </button>

        <button
          aria-label="Reset"
          className="reset-button"
          onClick={() => handleReset()}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default App
