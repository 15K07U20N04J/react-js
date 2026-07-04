import React from 'react'

const ChildComponent = React.memo(({ buttonName, handleClick }) => {

    console.log("Child Component re render again");

    return (
        <div>
            <button onClick={handleClick}>
                {buttonName}
            </button>
        </div>
    )
})

export default ChildComponent

// React.memo is a higher order component that will prevent the re-rendering of the child component if the props are not changed. It will only re-render if the props are changed.


// if you are sending function as a prop to the child component, then you should use useCallback hook to memoize the function so that it will not be re-created on every render. This will prevent the child component from re-rendering unnecessarily.