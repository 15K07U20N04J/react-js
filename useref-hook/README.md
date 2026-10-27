# React `useRef` Hook

## 📌 Introduction

`useRef` is a React Hook that lets you **store a mutable value** that persists across renders **without causing the component to re-render**.

It is commonly used to:

- Access DOM elements
- Store previous values
- Store timers or intervals
- Focus input fields
- Scroll to elements
- Store mutable values without re-rendering

---

# Table of Contents

1. What is `useRef`?
2. Why use `useRef`?
3. Syntax
4. How `useRef` Works
5. Accessing DOM Elements
6. Storing Mutable Values
7. Difference Between `useRef` and `useState`
8. Common Use Cases
9. Official React Example
10. Best Practices
11. Common Mistakes
12. Summary

---

# What is `useRef`?

`useRef` returns a special object containing a single property called `current`.

```jsx
const ref = useRef(initialValue);
```

Output

```js
{
    current: initialValue
}
```

The value inside `current` persists between renders.

---

# Import

```jsx
import { useRef } from "react";
```

---

# Syntax

```jsx
const ref = useRef(initialValue);
```

Example

```jsx
const inputRef = useRef(null);
```

---

# How `useRef` Works

```
Component Render

      │

      ▼

useRef()

      │

      ▼

Returns

{
   current: value
}

      │

      ▼

Value persists across renders
```

Unlike `useState`, updating `ref.current` **does not trigger a re-render**.

---

# Accessing DOM Elements

One of the most common uses of `useRef` is accessing DOM elements.

```jsx
import { useRef } from "react";

function App() {

    const inputRef = useRef(null);

    function focusInput() {

        inputRef.current.focus();

    }

    return (

        <>

            <input ref={inputRef} />

            <button onClick={focusInput}>
                Focus Input
            </button>

        </>

    );
}

export default App;
```

### Output

Clicking the button automatically focuses the input field.

---

# Official React Example (Focus an Input)

The React documentation demonstrates using `useRef` to access an input element.

```jsx
import { useRef } from "react";

function Form() {

    const inputRef = useRef(null);

    function handleClick() {

        inputRef.current.focus();

    }

    return (

        <>

            <input ref={inputRef} />

            <button onClick={handleClick}>
                Focus Input
            </button>

        </>

    );

}
```

### Explanation

1. `useRef(null)` creates a reference object.
2. React attaches the input element to `inputRef.current`.
3. Clicking the button executes `focus()`.
4. The cursor moves into the input field.

Flow

```
Button Click

      │

      ▼

handleClick()

      │

      ▼

inputRef.current.focus()

      │

      ▼

Input Gets Focus
```

---

# Storing Mutable Values

`useRef` can store values that should **not** cause re-rendering.

```jsx
import { useRef } from "react";

function App() {

    const count = useRef(0);

    function increment() {

        count.current++;

        console.log(count.current);

    }

    return (

        <button onClick={increment}>
            Increment
        </button>

    );

}
```

Console

```
1
2
3
4
```

Notice that the UI does **not** update because `useRef` does not trigger a re-render.

---

# useRef vs useState

## useState

```jsx
const [count, setCount] = useState(0);
```

Updating

```jsx
setCount(count + 1);
```

Result

- State changes
- Component re-renders
- UI updates

---

## useRef

```jsx
const countRef = useRef(0);
```

Updating

```jsx
countRef.current++;
```

Result

- Value changes
- No re-render
- UI stays the same

---

# Comparison Table

| Feature | useState | useRef |
|----------|----------|---------|
| Causes Re-render | ✅ Yes | ❌ No |
| Stores Value | ✅ Yes | ✅ Yes |
| Stores DOM Reference | ❌ No | ✅ Yes |
| Mutable | ❌ (Use setter) | ✅ Yes |

---

# Example: Previous Value

```jsx
import { useState, useEffect, useRef } from "react";

function App() {

    const [count, setCount] = useState(0);

    const previous = useRef();

    useEffect(() => {

        previous.current = count;

    }, [count]);

    return (

        <>

            <h2>Current : {count}</h2>

            <h2>Previous : {previous.current}</h2>

            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>

        </>

    );

}
```

Output

```
Current : 2

Previous : 1
```

---

# Example: Scroll to Element

```jsx
import { useRef } from "react";

function App() {

    const sectionRef = useRef(null);

    function scrollToSection() {

        sectionRef.current.scrollIntoView({
            behavior: "smooth"
        });

    }

    return (

        <>

            <button onClick={scrollToSection}>
                Go to Section
            </button>

            <div style={{ height: "100vh" }}></div>

            <h2 ref={sectionRef}>
                React Section
            </h2>

        </>

    );

}
```

---

# Example: Store Timer ID

```jsx
import { useRef } from "react";

function App() {

    const timerRef = useRef(null);

    function startTimer() {

        timerRef.current = setInterval(() => {

            console.log("Running");

        }, 1000);

    }

    function stopTimer() {

        clearInterval(timerRef.current);

    }

    return (

        <>

            <button onClick={startTimer}>
                Start
            </button>

            <button onClick={stopTimer}>
                Stop
            </button>

        </>

    );

}
```

---

# Common Use Cases

- Focus an input field
- Scroll to an element
- Store previous values
- Store interval or timeout IDs
- Access video or audio elements
- Access canvas
- Measure element size
- Integrate third-party libraries (e.g., Chart.js, Leaflet)

---

# Best Practices

✅ Use `useRef` for DOM manipulation.

✅ Use `useRef` for mutable values that don't affect the UI.

✅ Use `useState` when the UI should update.

✅ Initialize refs with `null` for DOM elements.

---

# Common Mistakes

## Updating UI with useRef

❌ Wrong

```jsx
countRef.current++;
```

Expecting the UI to update.

`useRef` does **not** trigger a re-render.

---

## Forgetting `.current`

❌

```jsx
inputRef.focus();
```

✅

```jsx
inputRef.current.focus();
```

---

## Accessing Ref Before Mount

❌

```jsx
inputRef.current.focus();
```

before the component mounts.

`current` is `null` until React attaches the element.

---

# When Should You Use `useRef`?

Use `useRef` when:

- You need direct access to a DOM element.
- You need to store mutable values without re-rendering.
- You need to remember previous values.
- You need to store timer IDs.
- You need to interact with browser APIs.

Avoid using `useRef` for:

- Values that should update the UI.
- Application state.
- Data that should trigger rendering.

Use `useState` instead.

---

# Summary

| Hook | Purpose |
|------|----------|
| `useRef()` | Store mutable values and DOM references |
| `.current` | Holds the current value |
| Re-render | ❌ No |
| DOM Access | ✅ Yes |
| Previous Values | ✅ Yes |

---

# Complete Flow

```
useRef()

      │

      ▼

Returns

{
   current: value
}

      │

      ▼

Update current

      │

      ▼

No Re-render
```

---

# Key Takeaways

- `useRef` stores values that persist across renders.
- Updating `ref.current` does **not** re-render the component.
- Use `useRef` to access DOM elements such as inputs, videos, or canvas.
- Use `useRef` to store mutable values like timers and previous state.
- Choose `useState` when changes should be reflected in the UI, and `useRef` when they should not.

---

## 📚 Next Topics to Learn

After `useRef`, you should learn:

1. `useMemo`
2. `useCallback`
3. Custom Hooks
4. `useReducer`
5. React.memo
6. Forwarding Refs (`forwardRef`)
7. `useImperativeHandle`
8. Context + Reducer
