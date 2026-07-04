# React `useMemo` Hook

## 📌 Introduction

`useMemo` is a React Hook that **memoizes (caches) the result of an expensive calculation** so that React doesn't recalculate it on every render.

It improves the performance of your application by **avoiding unnecessary computations**.

> Think of `useMemo` as a **cache**. Once a value is calculated, React stores it and reuses it until one of its dependencies changes.

---

# Table of Contents

1. What is `useMemo`?
2. Why use `useMemo`?
3. When should you use it?
4. Syntax
5. How `useMemo` Works
6. Basic Example
7. Expensive Calculation Example
8. Filtering Data Example
9. Official React Example
10. `useMemo` vs `useState`
11. `useMemo` vs `useCallback`
12. Best Practices
13. Common Mistakes
14. Summary

---

# What is `useMemo`?

`useMemo` is a Hook that **stores the result of a function** and only recalculates it when one of its dependencies changes.

Without `useMemo`, the function executes on **every component render**.

With `useMemo`, React returns the **cached value** if the dependencies haven't changed.

---

# Why use `useMemo`?

Imagine you have a function that takes 2–3 seconds to execute.

```jsx
function calculateTotal() {

    console.log("Calculating...");

    return 1000000;

}
```

Every time your component re-renders, this function executes again, even if nothing related has changed.

`useMemo` solves this problem by caching the result.

---

# When Should You Use `useMemo`?

Use `useMemo` when:

- Performing expensive calculations
- Filtering large lists
- Sorting large datasets
- Transforming data
- Preventing unnecessary recalculations
- Optimizing slow components

Do **not** use `useMemo` for simple calculations.

---

# Import

```jsx
import { useMemo } from "react";
```

---

# Syntax

```jsx
const memoizedValue = useMemo(() => {

    return expensiveCalculation();

}, [dependencies]);
```

---

# Parameters

### Callback Function

Contains the calculation.

```jsx
() => {

    return result;

}
```

---

### Dependency Array

Controls when React recalculates the value.

```jsx
[count]
```

If `count` changes,

React recalculates.

Otherwise,

React returns the cached value.

---

# How `useMemo` Works

```
Component Render

      │

      ▼

Dependencies Changed?

      │

 ┌────┴────┐

 Yes       No

 │          │

 ▼          ▼

Run       Return

Function   Cached Value
```

---

# Without `useMemo`

```jsx
function App() {

    const [count, setCount] = useState(0);

    function square() {

        console.log("Calculating");

        return count * count;

    }

    return (

        <>

            <h2>{square()}</h2>

            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>

        </>

    );

}
```

Every render

```
Calculating
```

prints in the console.

---

# With `useMemo`

```jsx
import { useMemo, useState } from "react";

function App() {

    const [count, setCount] = useState(0);

    const square = useMemo(() => {

        console.log("Calculating");

        return count * count;

    }, [count]);

    return (

        <>

            <h2>{square}</h2>

            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>

        </>

    );

}
```

Now the calculation only runs when `count` changes.

---

# Example: Expensive Calculation

```jsx
import { useMemo, useState } from "react";

function App() {

    const [count, setCount] = useState(1);

    const [theme, setTheme] = useState("light");

    function slowSquare(num) {

        console.log("Calculating...");

        for (let i = 0; i < 1000000000; i++) {}

        return num * num;

    }

    const square = useMemo(() => {

        return slowSquare(count);

    }, [count]);

    return (

        <>

            <h2>{square}</h2>

            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>

            <button
                onClick={() =>
                    setTheme(theme === "light" ? "dark" : "light")
                }
            >
                Change Theme
            </button>

        </>

    );

}
```

### Explanation

- Changing `count` recalculates `square`.
- Changing `theme` **does not** run `slowSquare()` again.
- React uses the cached value.

---

# Example: Filtering Products

```jsx
const filteredProducts = useMemo(() => {

    return products.filter(product =>
        product.price < 1000
    );

}, [products]);
```

This avoids filtering the list on every render.

---

# Official React Example (Todo List)

The React documentation uses `useMemo` to avoid recalculating filtered todos.

```jsx
import { useMemo } from "react";

function TodoList({ todos, tab }) {

    const visibleTodos = useMemo(() => {

        return filterTodos(todos, tab);

    }, [todos, tab]);

    return (

        <ul>

            {visibleTodos.map(todo => (

                <li key={todo.id}>
                    {todo.text}
                </li>

            ))}

        </ul>

    );

}
```

### Explanation

Suppose:

```
Todos = 1000
```

Filtering them every render is expensive.

`useMemo` stores the filtered list.

React recalculates it only when:

- `todos` changes
- `tab` changes

Otherwise, it returns the cached list.

---

# Real-world Use Cases

### Search Filter

```jsx
const results = useMemo(() => {

    return users.filter(user =>
        user.name.includes(search)
    );

}, [users, search]);
```

---

### Sorting

```jsx
const sortedUsers = useMemo(() => {

    return [...users].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

}, [users]);
```

---

### Total Price

```jsx
const total = useMemo(() => {

    return cart.reduce(
        (sum, item) => sum + item.price,
        0
    );

}, [cart]);
```

---

# `useMemo` vs `useState`

| useMemo | useState |
|----------|----------|
| Caches computed values | Stores state |
| Doesn't manage state | Manages state |
| Improves performance | Triggers UI updates |

---

# `useMemo` vs `useCallback`

| useMemo | useCallback |
|----------|-------------|
| Caches a **value** | Caches a **function** |
| Returns result | Returns function |
| Used for expensive calculations | Used to prevent unnecessary function recreation |

---

# Best Practices

✅ Use `useMemo` only for expensive calculations.

✅ Add all required dependencies.

✅ Keep calculations pure.

✅ Use it when performance becomes a problem.

---

# Common Mistakes

## Using `useMemo` Everywhere

❌

```jsx
const value = useMemo(() => count + 1, [count]);
```

Simple calculations don't need memoization.

---

## Missing Dependencies

❌

```jsx
useMemo(() => {

    return count * multiplier;

}, [count]);
```

`multiplier` is missing.

Correct

```jsx
}, [count, multiplier]);
```

---

## Side Effects Inside `useMemo`

❌

```jsx
useMemo(() => {

    fetch("/users");

}, []);
```

`useMemo` is **not** for side effects.

Use `useEffect` instead.

---

# When NOT to Use `useMemo`

Avoid `useMemo` for:

- Simple arithmetic
- Small arrays
- Simple string operations
- Lightweight calculations

Memoization itself has a cost, so don't optimize prematurely.

---

# Summary

| Hook | Purpose |
|------|----------|
| `useMemo` | Cache calculated values |
| Returns | Memoized value |
| Recalculates | When dependencies change |
| Improves | Performance |

---

# Complete Flow

```
Component Render

      │

      ▼

Dependencies Changed?

      │

 ┌────┴────┐

 Yes       No

 │          │

 ▼          ▼

Run       Return

Function   Cached Value
```

---

# Key Takeaways

- `useMemo` caches the result of expensive calculations.
- It recalculates only when its dependencies change.
- It is useful for filtering, sorting, searching, and large computations.
- Don't use `useMemo` for simple calculations.
- `useMemo` improves performance but should be used only when necessary.

---

## 📚 Next Topics to Learn

After `useMemo`, you should learn:

1. `useCallback`
2. `React.memo`
3. Custom Hooks
4. `useReducer`
5. Context + Reducer
6. Performance Optimization
7. Lazy Loading
8. Code Splitting
````
