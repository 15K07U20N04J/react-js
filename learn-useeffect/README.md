# React `useEffect` Hook

## 📌 Introduction

`useEffect` is a React Hook that lets you **perform side effects** in functional components.

A **side effect** is anything that interacts with something **outside React's rendering process**.

Examples:

* Fetching data from an API
* Updating the page title
* Setting timers
* Adding event listeners
* Connecting to WebSocket
* Accessing Local Storage

Without `useEffect`, React components should only calculate and return JSX.

---

# Table of Contents

1. What is useEffect?
2. Why use useEffect?
3. Syntax
4. How useEffect Works
5. Dependency Array Variations
6. Cleanup Function
7. Official React Example
8. Real-world Examples
9. Common Mistakes
10. Best Practices
11. Summary

---

# What is `useEffect`?

`useEffect` allows React components to perform work **after rendering**.

```jsx
useEffect(() => {
    // Side Effect
});
```

Think of it as saying:

> "After React updates the UI, run this code."

---

# Import

```jsx
import { useEffect } from "react";
```

---

# Syntax

```jsx
useEffect(() => {

    // Effect Code

    return () => {

        // Cleanup Code

    };

}, [dependencies]);
```

---

# Parameters

### 1. Effect Function

Runs after rendering.

```jsx
() => {

}
```

---

### 2. Cleanup Function (Optional)

Runs before:

* component unmounts
* effect runs again

```jsx
return () => {

};
```

---

### 3. Dependency Array

Controls **when** the effect executes.

```jsx
[]
```

---

# How `useEffect` Works

```
Component Renders
        │
        ▼
React Updates DOM
        │
        ▼
useEffect Runs
```

Unlike rendering, effects run **after** React paints the UI.

---

# Variation 1: No Dependency Array

```jsx
useEffect(() => {

    console.log("Runs");

});
```

Runs

```
✔ First Render

✔ Every Re-render
```

Example

```jsx
import { useState, useEffect } from "react";

function App() {

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("Effect");
    });

    return (
        <>
            <h1>{count}</h1>

            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </>
    );
}
```

Every click

```
Effect
```

---

# Variation 2: Empty Dependency Array

```jsx
useEffect(() => {

    console.log("Runs Once");

}, []);
```

Runs

```
✔ Initial Render

❌ Never Again
```

Equivalent to

```
componentDidMount()
```

Example

```jsx
useEffect(() => {

    console.log("Component Mounted");

}, []);
```

Output

```
Component Mounted
```

only once.

---

# Variation 3: Single Dependency

```jsx
useEffect(() => {

    console.log("Count Changed");

}, [count]);
```

Runs

```
✔ First Render

✔ Whenever count changes

❌ Other state changes
```

Example

```jsx
const [count, setCount] = useState(0);

useEffect(() => {

    document.title = `Count ${count}`;

}, [count]);
```

Every count update changes the browser tab title.

---

# Variation 4: Multiple Dependencies

```jsx
useEffect(() => {

    console.log("Runs");

}, [count, name]);
```

Runs when

```
count changes

OR

name changes
```

---

# Cleanup Function

Sometimes effects create resources.

Examples

* Timers
* Event Listeners
* API subscriptions
* WebSocket connections

Always clean them.

Syntax

```jsx
useEffect(() => {

    return () => {

        // Cleanup

    };

}, []);
```

---

# Timer Example

```jsx
useEffect(() => {

    const id = setInterval(() => {

        console.log("Hello");

    },1000);

    return () => {

        clearInterval(id);

    };

}, []);
```

Without cleanup

```
Memory Leak
```

With cleanup

```
Timer Removed
```

---

# Event Listener Example

```jsx
useEffect(() => {

    function resize(){

        console.log(window.innerWidth);

    }

    window.addEventListener("resize", resize);

    return () => {

        window.removeEventListener("resize", resize);

    };

}, []);
```

---

# Official React Example (Chat Room)

One of the most popular examples in the React documentation is synchronizing with an external system like a chat server.

```jsx
import { useEffect } from "react";

function ChatRoom({ roomId }) {

    useEffect(() => {

        const connection = createConnection(roomId);

        connection.connect();

        return () => {

            connection.disconnect();

        };

    }, [roomId]);

    return <h1>Welcome to the chat!</h1>;
}
```

---

# Explanation

### Initial Render

```
roomId = "general"
```

Effect runs

```
connect()
```

Connection established.

---

### User Changes Room

```
general

↓

sports
```

React first executes

```
disconnect()
```

Then

```
connect()
```

to the new room.

This prevents multiple active connections.

---

### Component Unmount

Cleanup runs.

```
disconnect()
```

No memory leaks.

---

# Official React Example (Video Player)

Another example from the React docs demonstrates synchronizing a video element with a prop.

```jsx
function VideoPlayer({ isPlaying }) {

    const ref = useRef(null);

    useEffect(() => {

        if(isPlaying){

            ref.current.play();

        }else{

            ref.current.pause();

        }

    },[isPlaying]);

    return <video ref={ref} />;
}
```

### Explanation

* React renders the `<video>` element first.
* After rendering, `useEffect` runs.
* If `isPlaying` is `true`, the video starts.
* If `false`, the video pauses.

This is a perfect example of synchronizing React state with an external browser API.

---

# Fetch API Example

```jsx
import { useEffect, useState } from "react";

function Users(){

    const [users,setUsers] = useState([]);

    useEffect(()=>{

        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res=>res.json())
        .then(data=>setUsers(data));

    },[]);

    return(

        <>
        {
            users.map(user=>(
                <h3 key={user.id}>{user.name}</h3>
            ))
        }
        </>

    );

}
```

Runs only once because of

```jsx
[]
```

---

# Document Title Example

```jsx
useEffect(() => {

    document.title = "React Hooks";

}, []);
```

---

# Local Storage Example

```jsx
useEffect(() => {

    localStorage.setItem("theme","dark");

}, []);
```

---

# Infinite Loop Example

❌ Wrong

```jsx
useEffect(() => {

    setCount(count+1);

});
```

Result

```
Render

↓

Effect

↓

State Update

↓

Render

↓

Effect

↓

Infinite Loop
```

---

# Correct

```jsx
useEffect(() => {

    setCount(100);

},[]);
```

Runs once.

---

# Best Practices

✅ Always specify dependencies.

✅ Always clean up subscriptions.

✅ Use multiple `useEffect`s for unrelated logic.

✅ Keep effects focused.

✅ Don't use `useEffect` for calculations that can be done during rendering.

---

# Common Mistakes

### Forgetting Dependency Array

```jsx
useEffect(()=>{

});
```

Runs every render.

---

### Missing Dependency

```jsx
useEffect(()=>{

    console.log(name);

},[]);
```

Should be

```jsx
useEffect(()=>{

    console.log(name);

},[name]);
```

---

### Forgetting Cleanup

Wrong

```jsx
window.addEventListener(...);
```

Correct

```jsx
return ()=>{

window.removeEventListener(...);

}
```

---

# When Should You Use `useEffect`?

Use it for:

* API Calls
* Timers
* Event Listeners
* WebSockets
* Browser APIs
* Updating document title
* Local Storage
* Synchronizing with external systems

Avoid using it for:

* Simple calculations
* Filtering arrays
* Sorting data
* Derived state

---

# Summary Table

| Dependency Array | Runs When                           |
| ---------------- | ----------------------------------- |
| No Array         | Every render                        |
| `[]`             | Initial render only                 |
| `[count]`        | Initial render + count changes      |
| `[count, name]`  | Initial render + count/name changes |

---

# Lifecycle Comparison

| Class Component      | useEffect                      |
| -------------------- | ------------------------------ |
| componentDidMount    | `useEffect(..., [])`           |
| componentDidUpdate   | `useEffect(..., [dependency])` |
| componentWillUnmount | Cleanup Function               |

---

# Key Takeaways

* `useEffect` performs side effects after rendering.
* The dependency array controls when the effect runs.
* Always clean up timers, subscriptions, and event listeners.
* React runs cleanup before re-running the effect and when the component unmounts.
* Use `useEffect` only for synchronization with external systems, not for normal rendering logic.

---

## 📚 Next Topics to Learn

After `useEffect`, you should learn:

1. `useRef`
2. `useMemo`
3. `useCallback`
4. `useContext`
5. Custom Hooks
6. React Router
7. Context API
8. Redux Toolkit
