# React `useState` Hook

## 📌 Introduction

`useState` is one of the most commonly used Hooks in React. It allows functional components to create and manage state without using class components.

A **state** is a variable that stores data and causes the component to re-render whenever its value changes.

---

# Syntax

```jsx
const [state, setState] = useState(initialValue);
```

### Explanation

- **state** → Current value of the state.
- **setState** → Function used to update the state.
- **initialValue** → Initial value of the state.

---

# Import

Before using `useState`, import it from React.

```jsx
import { useState } from "react";
```

---

# Example 1: Counter

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;
```

### Output

```
Count: 0

[Increment]
```

Clicking the button:

```
Count: 1
Count: 2
Count: 3
...
```

---

# How it Works

### Step 1

```jsx
const [count, setCount] = useState(0);
```

Initial value:

```
count = 0
```

---

### Step 2

User clicks the button.

```jsx
setCount(count + 1);
```

This becomes

```jsx
setCount(1);
```

React updates the state.

```
count = 1
```

---

### Step 3

React automatically re-renders the component.

The updated UI becomes

```
Count: 1
```

---

# Example 2: String State

```jsx
import { useState } from "react";

function App() {
  const [name, setName] = useState("John");

  return (
    <>
      <h1>{name}</h1>

      <button onClick={() => setName("David")}>
        Change Name
      </button>
    </>
  );
}
```

Initial Output

```
John
```

After clicking the button

```
David
```

---

# Example 3: Boolean State

```jsx
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <h2>
        {isLoggedIn ? "Welcome User" : "Please Login"}
      </h2>

      <button onClick={() => setIsLoggedIn(true)}>
        Login
      </button>
    </>
  );
}
```

Output before click

```
Please Login
```

Output after click

```
Welcome User
```

---

# Example 4: Array State

```jsx
import { useState } from "react";

function App() {
  const [fruits, setFruits] = useState(["Apple", "Banana"]);

  function addFruit() {
    setFruits([...fruits, "Orange"]);
  }

  return (
    <>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>

      <button onClick={addFruit}>
        Add Fruit
      </button>
    </>
  );
}
```

Output

```
Apple
Banana
```

After clicking

```
Apple
Banana
Orange
```

---

# Example 5: Object State

```jsx
import { useState } from "react";

function App() {
  const [user, setUser] = useState({
    name: "John",
    age: 22
  });

  function updateAge() {
    setUser({
      ...user,
      age: 23
    });
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h2>{user.age}</h2>

      <button onClick={updateAge}>
        Update Age
      </button>
    </>
  );
}
```

Output

```
John
22
```

After clicking

```
John
23
```

---

# Updating State Based on Previous State

When the new state depends on the previous state, use the callback form.

```jsx
setCount(previous => previous + 1);
```

Example

```jsx
function incrementThreeTimes() {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
}
```

Result

```
Previous Count = 0

New Count = 3
```

This is the recommended approach when updating state multiple times.

---

# Why Not Do This?

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

Result

```
Count = 1
```

Because all three updates use the same old value of `count`.

Instead, use

```jsx
setCount(prev => prev + 1);
```

---

# Rules of `useState`

- Only call Hooks at the top level of a component.
- Do not call Hooks inside loops or conditions.
- Only use Hooks inside React function components or custom Hooks.
- Never update state directly.

❌ Incorrect

```jsx
count = 10;
```

✅ Correct

```jsx
setCount(10);
```

---

# Common Mistakes

### 1. Mutating Arrays

❌

```jsx
fruits.push("Orange");
setFruits(fruits);
```

✅

```jsx
setFruits([...fruits, "Orange"]);
```

---

### 2. Mutating Objects

❌

```jsx
user.age = 25;
setUser(user);
```

✅

```jsx
setUser({
  ...user,
  age: 25
});
```

---

### 3. Forgetting to Import

❌

```jsx
const [count, setCount] = useState(0);
```

✅

```jsx
import { useState } from "react";
```

---

# Advantages

- Easy to understand.
- Works in functional components.
- Automatically re-renders the UI.
- Supports any data type.
- Makes code cleaner than class components.

---

# Disadvantages

- Large state objects can become difficult to manage.
- Updating nested objects requires extra care.
- Frequent state updates may affect performance if not optimized.

---

# When Should You Use `useState`?

Use `useState` when you need to manage local component data, such as:

- Counter values
- Form inputs
- Toggle buttons
- User information
- Theme switch (Dark/Light)
- Shopping cart items
- Todo list
- Modal open/close state

---

# Summary

| Feature | Description |
|---------|-------------|
| Hook Name | `useState` |
| Purpose | Manage state in functional components |
| Returns | State variable and setter function |
| Causes Re-render | ✅ Yes |
| Accepts | Any JavaScript value |
| Introduced In | React 16.8 |

---

# Key Takeaways

- `useState` adds state to functional components.
- Updating state re-renders the component.
- Always use the setter function to update state.
- Never mutate arrays or objects directly.
- Use the callback form (`prev => ...`) when the new state depends on the previous state.

---

## 📚 Next Topics to Learn

After understanding `useState`, you should learn:

1. `useEffect`
2. `useRef`
3. `useMemo`
4. `useCallback`
5. `useContext`
6. Custom Hooks
7. State Management (Redux, Zustand, Context API)
