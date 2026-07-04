import React, { useCallback, useEffect } from 'react'

const ExpensiveTask = () => {

    const [count, setCount] = React.useState(0)
    const [text, setText] = React.useState("")
    const prevFunctionRef = React.useRef()


    console.log("Expensive Task Component re render again");

    const expensiveTask = useCallback(() => {
        console.log("Expensive Task is running");
        let sum = 0;
        for (let i = 0; i < 1000000000; i++) {
            sum += i;
        }
        return sum;
    }, [count])

    useEffect(() => {
        debugger;

        if(prevFunctionRef.current && prevFunctionRef.current !== expensiveTask) {
            console.log("Function is changed");
        }

        prevFunctionRef.current = expensiveTask;

    }, [expensiveTask])


    return (
        <div>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <p>Expensice Task: {expensiveTask()}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <p>Count: {count}</p>
        </div>
    )
}

export default ExpensiveTask
