# React `useCallback` Hook

## 📌 Introduction

`useCallback` is a React Hook that **memoizes (caches) a function** so that React doesn't create a new function on every render.

It is mainly used to **improve performance** by preventing unnecessary re-renders of child components.

> **Think of `useCallback` as remembering a function.**
> React will reuse the same function until one of its dependencies changes.

---

# Table of Contents

1. What is `useCallback`?
2. Why use `useCallback`?
3. When should you use it?
4. Syntax
5. How `useCallback` Works
6. Without `useCallback`
7. With `useCallback`
8. Official React Example
9. Real-world Examples
10. `useCallback` vs `useMemo`
11. Best Practices
12. Common Mistakes
13. Summary

---

# What is `useCallback`?

`useCallback` returns a **memoized version of a function**.

Normally, every time a component renders, React creates **new function objects**.

```jsx
function handleClick() {
    console.log("Hello");
}
```

Even though the code looks the same, a **new function** is created on every render.

`useCallback` tells React:

> "Reuse the same function unless one of the dependencies changes."

---

# Why use `useCallback`?

Imagine a parent component passes a function to a child.

```jsx
<Child onClick={handleClick} />
```

Every parent render creates a **new `handleClick` function**.

The child sees a new function reference and may re-render unnecessarily.

`useCallback` prevents this by keeping the function reference stable.

---

# When Should You Use `useCallback`?

Use `useCallback` when:

- Passing functions to child components wrapped with `React.memo`
- Preventing unnecessary re-renders
- Passing callbacks to custom hooks
- Optimizing large applications
- Avoiding recreation of expensive callback functions

Avoid using it for every function. It also has a small performance cost.

---

# Import

```jsx
import { useCallback } from "react";
```

---

# Syntax

```jsx
const memoizedFunction = useCallback(() => {

    // Function Body

}, [dependencies]);
```

---

# Parameters

### Callback Function

The function you want React to remember.

```jsx
() => {

    console.log("Hello");

}
```

---

### Dependency Array

React recreates the function only if one of these values changes.

```jsx
[count]
```

---

# How `useCallback` Works

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

Create     Reuse

New        Old Function
Function
```

---

# Without `useCallback`

```jsx
import { useState } from "react";

function App() {

    const [count, setCount] = useState(0);

    function handleClick() {

        console.log("Clicked");

    }

    return (

        <>
            <button onClick={handleClick}>
                Click
            </button>

            <button
                onClick={() => setCount(count + 1)}
            >
                Increment
            </button>
        </>

    );

}
```

Every render

```
New handleClick Function
```

is created.

---

# With `useCallback`

```jsx
import { useCallback, useState } from "react";

function App() {

    const [count, setCount] = useState(0);

    const handleClick = useCallback(() => {

        console.log("Clicked");

    }, []);

    return (

        <>
            <button onClick={handleClick}>
                Click
            </button>

            <button
                onClick={() => setCount(count + 1)}
            >
                Increment
            </button>
        </>

    );

}
```

Now React keeps the **same function reference** because the dependency array is empty.

---

# Why Does This Matter?

Consider this component:

```jsx
const Button = React.memo(function Button({ onClick }) {

    console.log("Button Rendered");

    return (

        <button onClick={onClick}>
            Click
        </button>

    );

});
```

### Parent

```jsx
<Button onClick={handleClick} />
```

If `handleClick` changes on every render,

`React.memo` cannot prevent the child from rendering.

With `useCallback`, the child receives the same function reference and skips unnecessary renders.

---

# Official React Example (Shipping Form)

The React documentation demonstrates `useCallback` with a slow `ShippingForm` component.

```jsx
import { useCallback } from "react";

function ProductPage({ productId, referrer }) {

    const handleSubmit = useCallback((orderDetails) => {

        post("/product/" + productId + "/buy", {
            referrer,
            orderDetails
        });

    }, [productId, referrer]);

    return (

        <ShippingForm
            onSubmit={handleSubmit}
        />

    );

}
```

### Explanation

- `handleSubmit` is passed to `ShippingForm`.
- If `productId` and `referrer` don't change, React reuses the same function.
- `ShippingForm` can skip unnecessary renders when wrapped with `React.memo`.

---

# Real-world Example: Search

```jsx
const handleSearch = useCallback(() => {

    console.log(search);

}, [search]);
```

The function changes only when `search` changes.

---

# Real-world Example: Delete Button

```jsx
const deleteUser = useCallback((id) => {

    console.log(id);

}, []);
```

Useful when passing `deleteUser` to many child components.

---

# Real-world Example: Todo List

```jsx
const addTodo = useCallback(() => {

    setTodos(prev => [

        ...prev,

        "New Todo"

    ]);

}, []);
```

Using the functional updater (`prev => ...`) avoids adding `todos` to the dependency array.

---

# `useCallback` vs `useMemo`

| `useCallback` | `useMemo` |
|---------------|-----------|
| Caches a **function** | Caches a **value** |
| Returns a function | Returns the computed result |
| Used for callbacks | Used for expensive calculations |

Example

```jsx
const value = useMemo(() => {

    return count * 2;

}, [count]);
```

```jsx
const handleClick = useCallback(() => {

    console.log(count);

}, [count]);
```

---

# `useCallback` vs Normal Function

Normal Function

```jsx
function handleClick() {}
```

Every render

```
New Function
```

---

`useCallback`

```jsx
const handleClick = useCallback(() => {}, []);
```

Every render

```
Same Function
```

unless dependencies change.

---

# Best Practices

✅ Use `useCallback` when passing callbacks to `React.memo` components.

✅ Include all required dependencies.

✅ Prefer the functional state updater when appropriate.

✅ Measure performance before optimizing.

---

# Common Mistakes

## Using `useCallback` Everywhere

❌

```jsx
const sayHello = useCallback(() => {

    console.log("Hello");

}, []);
```

If the function isn't causing performance issues, memoization is unnecessary.

---

## Missing Dependencies

❌

```jsx
const greet = useCallback(() => {

    console.log(name);

}, []);
```

Correct

```jsx
const greet = useCallback(() => {

    console.log(name);

}, [name]);
```

---

## Expecting Faster Execution

`useCallback` **does not make your function run faster**.

It only keeps the **same function reference** between renders.

---

# When NOT to Use `useCallback`

Avoid it for:

- Small applications
- Simple components
- Functions that aren't passed to children
- Premature optimization

---

# Summary

| Hook | Purpose |
|------|----------|
| `useCallback` | Cache a function |
| Returns | Memoized function |
| Recreates | When dependencies change |
| Improves | Rendering performance |

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

Create     Reuse

New        Previous

Function   Function
```

---

# Interview Question

### Why do we use `useCallback`?

To prevent unnecessary recreation of functions, especially when passing them to memoized child components.

---

### When should you use `useCallback`?

- With `React.memo`
- Custom Hooks
- Expensive child components
- Performance optimization

---

### Difference Between `useMemo` and `useCallback`

| `useMemo` | `useCallback` |
|-----------|---------------|
| Memoizes values | Memoizes functions |
| Returns value | Returns function |
| Used for expensive calculations | Used for callback optimization |

---

# Key Takeaways

- `useCallback` memoizes **functions**, not values.
- It prevents unnecessary recreation of function references.
- It is most useful with `React.memo` and performance optimization.
- Don't use it everywhere—only where it provides a measurable benefit.
- `useMemo` caches **results**, while `useCallback` caches **functions**.

---

## 📚 Next Topics to Learn

After `useCallback`, you should learn:

1. `React.memo`
2. Custom Hooks
3. `useReducer`
4. `forwardRef`
5. `useImperativeHandle`
6. Code Splitting
7. Lazy Loading
8. React Performance Optimization
````
