````md
# React State Lifting (Lifting State Up)

## 📌 Introduction

**State Lifting** (also called **Lifting State Up**) is a React pattern where the **state is moved from a child component to its nearest common parent component**.

Instead of each child managing its own state, the **parent component owns the state** and passes:

- Data to children using **props**
- Functions to children using **function props (callbacks)**

This allows multiple components to share and update the same data.

---

# Table of Contents

1. What is State Lifting?
2. Why Do We Need State Lifting?
3. Data Flow in React
4. Without State Lifting
5. With State Lifting
6. Passing Data from Child to Parent
7. Example 1: Updating Parent State
8. Example 2: Input Field
9. Example 3: Counter
10. Advantages
11. Best Practices
12. Common Mistakes
13. Summary

---

# What is State Lifting?

State Lifting means:

> Moving the state from a child component to its parent component so that multiple components can access and update the same state.

Although React only allows **data to flow from parent to child**, a child can still update the parent's state by calling a function passed down as a prop.

---

# Why Do We Need State Lifting?

Imagine two child components.

```
Parent

├── Child A
└── Child B
```

Suppose:

- Child A updates a username.
- Child B displays that username.

If Child A stores the state, Child B cannot access it.

Instead, store the state in the parent.

```
Parent (State)

├── Child A
└── Child B
```

Now both children can use the same data.

---

# React Data Flow

React follows **one-way data binding**.

```
Parent
   │
   ▼
 Child
```

Data always flows from **Parent → Child**.

To send data from Child → Parent, we pass a **function** from the parent.

```
Parent
   ▲
   │ callback function
Child
```

The child calls that function to update the parent's state.

---

# Without State Lifting

❌ Child owns the state.

```jsx
function Child() {
    const [count, setCount] = useState(0);
}
```

Problems

- Parent cannot access the count.
- Other children cannot use the count.
- State cannot be shared.

---

# With State Lifting

✅ Parent owns the state.

```jsx
function Parent() {
    const [count, setCount] = useState(0);

    return (
        <Child
            count={count}
            setCount={setCount}
        />
    );
}
```

Now:

- Parent controls the state.
- Child can update it.
- Other children can also use it.

---

# How Child Updates Parent State

### Step 1

Parent creates the state.

```jsx
const [name, setName] = useState("");
```

---

### Step 2

Parent passes a function.

```jsx
<Child updateName={setName} />
```

---

### Step 3

Child calls the function.

```jsx
updateName("John");
```

---

### Step 4

Parent state updates.

```
name = "John"
```

React automatically re-renders the parent and all affected children.

---

# Example 1: Child Updates Parent

## Parent Component

```jsx
import { useState } from "react";
import Child from "./Child";

function App() {

    const [message, setMessage] = useState("");

    return (
        <>
            <h2>{message}</h2>

            <Child
                updateMessage={setMessage}
            />
        </>
    );
}

export default App;
```

---

## Child Component

```jsx
function Child({ updateMessage }) {

    return (
        <button
            onClick={() => updateMessage("Hello from Child")}
        >
            Click Me
        </button>
    );
}

export default Child;
```

---

Output Before Click

```
(empty)

[Click Me]
```

After Clicking

```
Hello from Child

[Click Me]
```

---

# Example 2: Input Box

## Parent

```jsx
import { useState } from "react";
import Input from "./Input";

function App() {

    const [username, setUsername] = useState("");

    return (
        <>
            <h2>{username}</h2>

            <Input
                setUsername={setUsername}
            />
        </>
    );
}
```

---

## Child

```jsx
function Input({ setUsername }) {

    return (
        <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
        />
    );
}
```

Typing

```
John
```

Output

```
John
```

The input is inside the child component, but the state is stored in the parent.

---

# Example 3: Counter

## Parent

```jsx
import { useState } from "react";
import Counter from "./Counter";

function App() {

    const [count, setCount] = useState(0);

    return (
        <>
            <h1>{count}</h1>

            <Counter
                increment={() => setCount(count + 1)}
            />
        </>
    );
}
```

---

## Child

```jsx
function Counter({ increment }) {

    return (
        <button onClick={increment}>
            Increment
        </button>
    );
}
```

Output

```
0

[Increment]
```

After Click

```
1

[Increment]
```

---

# Real-World Example

Imagine an e-commerce website.

```
App

├── ProductList
├── Cart
└── Navbar
```

The cart count should update everywhere.

Instead of storing the cart in `ProductList`, store it in `App`.

```
App (cart state)

├── ProductList
├── Cart
└── Navbar
```

Now every component receives the same cart data.

---

# Advantages

- Single source of truth.
- Easy state sharing.
- Better code organization.
- Easier debugging.
- Components become more reusable.
- Prevents duplicate state.

---

# Best Practices

✅ Keep state in the nearest common parent.

✅ Pass only the required props.

✅ Pass callback functions to update state.

✅ Avoid duplicating the same state in multiple components.

---

# Common Mistakes

## 1. Keeping Duplicate State

❌ Wrong

Parent

```jsx
const [count, setCount] = useState(0);
```

Child

```jsx
const [count, setCount] = useState(0);
```

Now both states are different.

---

## 2. Trying to Modify Props

❌ Wrong

```jsx
props.count = 10;
```

Props are read-only.

Use a callback instead.

---

## 3. Forgetting to Pass the Callback

Parent

```jsx
<Child />
```

Child

```jsx
updateCount(10);
```

This causes an error because `updateCount` wasn't passed.

---

# State Lifting Flow

```
            Parent
     --------------------
     count = 0
     setCount()
     --------------------

          │
          │ Props
          ▼

       Child Component

          │
          │ Button Click
          ▼

setCount(count + 1)

          │
          ▼

Parent State Updates

          │
          ▼

React Re-renders UI
```

---

# When Should You Use State Lifting?

Use State Lifting when:

- Multiple components need the same data.
- A child needs to update the parent's state.
- Two sibling components need to share information.
- You want a single source of truth.

---

# Summary

| Concept | Description |
|---------|-------------|
| State Lifting | Moving state to the parent component |
| State Owner | Parent Component |
| Data Flow | Parent → Child |
| Child Updates Parent | Using callback function props |
| Benefit | Shared state across multiple components |

---

# Key Takeaways

- React data flows from **Parent → Child**.
- A child cannot directly change a parent's state.
- To update the parent, pass a callback function as a prop.
- Store shared state in the nearest common parent.
- State Lifting helps keep your application predictable, reusable, and easier to maintain.

---

## 📚 Next Topics to Learn

After learning State Lifting, you should learn:

1. Controlled Components
2. Context API
3. `useContext`
4. Prop Drilling
5. Custom Hooks
6. `useReducer`
7. Redux Toolkit
````
