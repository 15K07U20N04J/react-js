````md
# React `useContext` Hook

## 📌 Introduction

`useContext` is a React Hook that allows components to **access shared data without passing props manually through every level of the component tree**.

It is commonly used to avoid **prop drilling** and share global data such as:

- Theme (Light/Dark)
- Authentication
- Language
- User Information
- Shopping Cart
- Settings

---

# Table of Contents

1. What is `useContext`?
2. Why Use `useContext`?
3. Prop Drilling
4. Creating Context
5. Providing Context
6. Consuming Context
7. Official React Example
8. Updating Context
9. Multiple Contexts
10. Real-world Examples
11. Best Practices
12. Common Mistakes
13. Summary

---

# What is `useContext`?

`useContext` allows a component to read values from a **Context**.

Instead of passing props through multiple components,

```
App

↓

Navbar

↓

Sidebar

↓

Profile

↓

Avatar
```

we can directly access the shared data from any component.

---

# Why Use `useContext`?

Imagine you have:

```
App

├── Navbar
├── Sidebar
└── Dashboard
```

All components need the logged-in user.

Without Context:

```
App

↓

Navbar

↓

Sidebar

↓

Dashboard

↓

Profile
```

You pass props through every component.

This is called **Prop Drilling**.

With Context:

```
        Context

           ▲

     Any Component
```

Any component can directly access the shared data.

---

# What is Prop Drilling?

Prop Drilling means passing the same props through many intermediate components.

Example

```jsx
<App user={user} />

↓

<Navbar user={user} />

↓

<Sidebar user={user} />

↓

<Profile user={user} />
```

Even if `Navbar` and `Sidebar` don't use `user`, they must pass it down.

`useContext` solves this problem.

---

# Step 1: Create Context

```jsx
import { createContext } from "react";

const UserContext = createContext();
```

`createContext()` creates a Context object.

---

# Step 2: Provide Context

```jsx
import { useState } from "react";
import { UserContext } from "./UserContext";

function App() {

    const [user] = useState("John");

    return (

        <UserContext.Provider value={user}>

            <Profile />

        </UserContext.Provider>

    );
}
```

The `Provider` shares the value with all child components.

---

# Step 3: Consume Context

```jsx
import { useContext } from "react";
import { UserContext } from "./UserContext";

function Profile() {

    const user = useContext(UserContext);

    return <h2>{user}</h2>;

}
```

Output

```
John
```

---

# Flow Diagram

```
createContext()

        │

        ▼

Provider

        │

        ▼

useContext()

        │

        ▼

Shared Value
```

---

# Syntax

```jsx
const value = useContext(ContextName);
```

---

# Official React Example (Theme Context)

The React documentation demonstrates using Context to share a theme across components.

## Create Context

```jsx
import { createContext } from "react";

export const ThemeContext = createContext("light");
```

---

## Provider

```jsx
<ThemeContext.Provider value="dark">

    <Page />

</ThemeContext.Provider>
```

---

## Consumer

```jsx
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Button() {

    const theme = useContext(ThemeContext);

    return (

        <button>

            Theme : {theme}

        </button>

    );

}
```

Output

```
Theme : dark
```

### Explanation

1. `createContext()` creates the context.
2. `Provider` supplies the value (`dark`).
3. `Button` reads the value using `useContext()`.
4. Any descendant component can access the theme without props.

---

# Updating Context

Usually Context stores state.

```jsx
const [theme, setTheme] = useState("light");

<ThemeContext.Provider

    value={{theme,setTheme}}

>

    <App />

</ThemeContext.Provider>
```

Consume

```jsx
const {theme,setTheme} = useContext(ThemeContext);

<button

onClick={()=>setTheme("dark")}

>

Dark

</button>
```

Now every component using the context updates automatically.

---

# Multiple Contexts

React allows multiple contexts.

```jsx
<AuthContext.Provider value={user}>

    <ThemeContext.Provider value={theme}>

        <App/>

    </ThemeContext.Provider>

</AuthContext.Provider>
```

Consume

```jsx
const user = useContext(AuthContext);

const theme = useContext(ThemeContext);
```

---

# Real-world Example 1: Authentication

```jsx
const user = useContext(AuthContext);

return (

user

?

<h2>Welcome {user.name}</h2>

:

<h2>Please Login</h2>

);
```

---

# Real-world Example 2: Theme

```jsx
const {theme} = useContext(ThemeContext);

<div className={theme}>

Content

</div>
```

---

# Real-world Example 3: Shopping Cart

```jsx
const {cart} = useContext(CartContext);

<h2>

Items : {cart.length}

</h2>
```

Every page displays the same cart count.

---

# When Should You Use Context?

Use Context for:

- Theme
- Authentication
- Language
- Shopping Cart
- Notifications
- User Information
- Application Settings

Avoid Context for:

- Component-specific state
- Frequently changing local state
- Simple parent-child communication

Use `useState` instead.

---

# Best Practices

✅ Create separate contexts for different features.

✅ Keep Context focused.

✅ Store global state only.

✅ Combine `useContext` with `useReducer` for complex applications.

✅ Wrap only the components that need the context.

---

# Common Mistakes

## Forgetting Provider

❌

```jsx
const user = useContext(UserContext);
```

Without

```jsx
<UserContext.Provider>
```

The default value is returned.

---

## Using Context for Everything

Context is **not** a replacement for `useState`.

Use Context only for shared/global data.

---

## Creating Context Inside Component

❌

```jsx
function App(){

const UserContext=createContext();

}
```

Create it outside.

```jsx
const UserContext=createContext();
```

---

# Context vs Props

| Props | Context |
|--------|----------|
| Parent → Child | Global Sharing |
| Good for local data | Good for shared data |
| Causes Prop Drilling | Avoids Prop Drilling |

---

# Context vs Redux

| Context API | Redux |
|--------------|--------|
| Built into React | External Library |
| Small to Medium Apps | Large Apps |
| Easy to Learn | More Powerful |
| Less Boilerplate | Better for Complex State |

---

# Summary

| Hook | Purpose |
|------|----------|
| `createContext()` | Creates Context |
| `Provider` | Shares Value |
| `useContext()` | Reads Value |

---

# Complete Flow

```
createContext()

        │

        ▼

Provider

        │

        ▼

Children

        │

        ▼

useContext()

        │

        ▼

Shared Data
```

---

# Key Takeaways

- `useContext` allows components to share data without prop drilling.
- Use `createContext()` to create a context.
- Use `<Context.Provider>` to provide the value.
- Use `useContext()` to consume the value.
- Context is best for global or shared state such as themes, authentication, and language.
- Avoid using Context for every piece of state—`useState` is still the best choice for local component state.

---

## 📚 Next Topics to Learn

After `useContext`, you should learn:

1. `useReducer`
2. Custom Hooks
3. React Router
4. `useMemo`
5. `useCallback`
6. Context + `useReducer`
7. Redux Toolkit
8. Zustand
````
