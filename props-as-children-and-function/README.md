# React Props, Children, and Function Props

## 📌 Introduction

In React, **Props (Properties)** are used to pass data from a **parent component** to a **child component**. Props make components reusable because the same component can display different data based on the values it receives.

React also provides a special prop called **`children`**, which allows you to pass JSX elements between a component's opening and closing tags.

Additionally, React allows passing **functions as props**, enabling child components to communicate with their parent components.

---

# Table of Contents

1. What are Props?
2. Why Use Props?
3. Passing Simple Props
4. Passing Multiple Props
5. Passing Objects and Arrays
6. Default Props
7. Destructuring Props
8. What is `children`?
9. Using the `children` Prop
10. Passing Functions as Props
11. Callback Functions
12. Common Mistakes
13. Best Practices
14. Summary

---

# What are Props?

Props (short for **Properties**) are read-only values passed from a parent component to a child component.

Think of props like function parameters.

Example:

```jsx
function Welcome(props) {
  return <h1>Hello {props.name}</h1>;
}
```

Using the component:

```jsx
<Welcome name="John" />
```

Output

```
Hello John
```

---

# Why Use Props?

Props are used to:

- Pass data between components.
- Make components reusable.
- Customize component behavior.
- Share functions between components.

---

# Syntax

Passing Props

```jsx
<ComponentName propName={value} />
```

Receiving Props

```jsx
function ComponentName(props) {
    return (
        <h1>{props.propName}</h1>
    );
}
```

---

# Example 1: Passing a String

## Parent Component

```jsx
import User from "./User";

function App() {
  return (
    <>
      <User name="John" />
    </>
  );
}

export default App;
```

## Child Component

```jsx
function User(props) {
  return <h2>Hello {props.name}</h2>;
}

export default User;
```

Output

```
Hello John
```

---

# Example 2: Passing Multiple Props

Parent

```jsx
<User
    name="John"
    age={22}
    city="Surat"
/>
```

Child

```jsx
function User(props) {
  return (
    <>
      <h2>Name : {props.name}</h2>
      <h2>Age : {props.age}</h2>
      <h2>City : {props.city}</h2>
    </>
  );
}
```

Output

```
Name : John
Age : 22
City : Surat
```

---

# Example 3: Passing an Object

Parent

```jsx
const user = {
  name: "John",
  age: 22
};

<User user={user} />
```

Child

```jsx
function User(props) {
  return (
    <>
      <h2>{props.user.name}</h2>
      <h2>{props.user.age}</h2>
    </>
  );
}
```

Output

```
John
22
```

---

# Example 4: Passing an Array

Parent

```jsx
const fruits = ["Apple", "Banana", "Orange"];

<List fruits={fruits} />
```

Child

```jsx
function List(props) {
  return (
    <ul>
      {props.fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}
```

Output

```
Apple
Banana
Orange
```

---

# Destructuring Props

Instead of writing

```jsx
props.name
props.age
```

Use destructuring.

```jsx
function User({ name, age }) {
  return (
    <>
      <h2>{name}</h2>
      <h2>{age}</h2>
    </>
  );
}
```

This makes the code cleaner and easier to read.

---

# Default Props

If a parent doesn't pass a prop, you can provide a default value.

```jsx
function User({ name = "Guest" }) {
  return <h2>{name}</h2>;
}
```

Parent

```jsx
<User />
```

Output

```
Guest
```

---

# What is `children`?

`children` is a special prop provided automatically by React.

It represents everything placed between a component's opening and closing tags.

Example

```jsx
<Card>
    <h2>Hello React</h2>
</Card>
```

The `<h2>` element becomes the value of `children`.

---

# Example 5: Using `children`

## Parent

```jsx
<Card>
    <h2>Welcome</h2>
    <p>Learning React is fun.</p>
</Card>
```

## Child

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default Card;
```

Output

```
-------------------
| Welcome         |
| Learning React  |
-------------------
```

Everything inside `<Card>` is rendered through `children`.

---

# Why Use `children`?

`children` is useful for creating reusable wrapper components.

Examples:

- Card
- Modal
- Layout
- Sidebar
- Navbar
- Container
- Dialog

---

# Example 6: Reusable Card Component

```jsx
function Card({ children }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        margin: "10px"
      }}
    >
      {children}
    </div>
  );
}
```

Usage

```jsx
<Card>
    <h2>Product</h2>
    <p>MacBook Pro</p>
</Card>

<Card>
    <h2>User</h2>
    <p>John Doe</p>
</Card>
```

The same component can wrap different content.

---

# Passing Functions as Props

Functions can also be passed as props.

This allows a child component to notify or update the parent component.

---

# Example 7: Function Prop

## Parent Component

```jsx
import Button from "./Button";

function App() {

  function showMessage() {
    alert("Button Clicked!");
  }

  return (
    <>
      <Button onClick={showMessage} />
    </>
  );
}

export default App;
```

---

## Child Component

```jsx
function Button({ onClick }) {
  return (
    <button onClick={onClick}>
      Click Me
    </button>
  );
}

export default Button;
```

Output

```
[ Click Me ]
```

Clicking the button

```
Button Clicked!
```

---

# Example 8: Passing Parameters

Parent

```jsx
function App() {

  function greet(name) {
    alert(`Hello ${name}`);
  }

  return (
    <>
      <Button greet={greet} />
    </>
  );
}
```

Child

```jsx
function Button({ greet }) {
  return (
    <button
      onClick={() => greet("John")}
    >
      Greet
    </button>
  );
}
```

Output

```
Hello John
```

---

# Callback Functions

Function props are commonly called **callbacks** because the child component calls a function defined in the parent.

Flow

```
Parent
   │
   │ passes function
   ▼
Child
   │
   │ executes function
   ▼
Parent function runs
```

---

# Common Mistakes

## 1. Modifying Props

❌ Wrong

```jsx
props.name = "David";
```

Props are read-only.

---

## 2. Forgetting Curly Braces

❌

```jsx
<User age="25 + 5" />
```

✅

```jsx
<User age={25 + 5} />
```

---

## 3. Calling Function Immediately

❌

```jsx
<button onClick={showMessage()}>
```

This executes immediately.

✅

```jsx
<button onClick={showMessage}>
```

---

## 4. Forgetting `children`

❌

```jsx
function Card() {
  return <div></div>;
}
```

The content inside `<Card>` won't appear.

✅

```jsx
function Card({ children }) {
  return <div>{children}</div>;
}
```

---

# Best Practices

- Keep props immutable.
- Use destructuring.
- Use meaningful prop names.
- Use `children` for wrapper components.
- Pass callbacks instead of modifying parent state directly.
- Keep components reusable.

---

# Advantages

- Makes components reusable.
- Improves code organization.
- Enables parent-child communication.
- Simplifies UI customization.
- Promotes component composition.

---

# Summary

| Feature | Description |
|---------|-------------|
| Props | Pass data from parent to child |
| Children | Pass JSX inside component tags |
| Function Props | Pass functions to child components |
| Callback | Child triggers a parent function |
| Props are Mutable? | ❌ No |
| Props are Read-only? | ✅ Yes |

---

# Key Takeaways

- Props allow data to flow from parent to child.
- Props are read-only and should never be modified by the child.
- The `children` prop lets you build flexible wrapper components.
- Function props enable child components to trigger actions in the parent.
- Using props effectively helps create reusable, maintainable, and scalable React applications.

---

## 📚 Next Topics to Learn

After mastering Props, `children`, and Function Props, you should learn:

1. Event Handling
2. Conditional Rendering
3. Lists and Keys
4. `useState`
5. `useEffect`
6. Forms and Controlled Components
7. Context API
8. Custom Hooks