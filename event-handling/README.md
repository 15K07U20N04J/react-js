````md
# React Event Handling

## 📌 Introduction

Event Handling in React allows your application to **respond to user interactions** such as:

- Clicking a button
- Typing in an input field
- Submitting a form
- Hovering over an element
- Pressing keyboard keys
- Moving the mouse

React events are similar to HTML events but use **camelCase naming** and receive a **SyntheticEvent** object.

---

# Table of Contents

1. What is Event Handling?
2. React vs HTML Events
3. Syntax
4. Click Events
5. Passing Arguments
6. Event Object
7. Common React Events
8. Event Handling in Forms
9. Prevent Default Behavior
10. Event Bubbling
11. Best Practices
12. Common Mistakes
13. Summary

---

# What is Event Handling?

An **event** is an action performed by the user.

Examples:

- Clicking a button
- Entering text
- Scrolling
- Dragging
- Pressing a keyboard key

An **event handler** is a function that executes when the event occurs.

---

# React vs HTML Events

## HTML

```html
<button onclick="showMessage()">
    Click Me
</button>
```

---

## React

```jsx
<button onClick={showMessage}>
    Click Me
</button>
```

### Differences

| HTML | React |
|------|-------|
| `onclick` | `onClick` |
| Lowercase | camelCase |
| String Function | JavaScript Function |
| Uses DOM Events | Uses SyntheticEvent |

---

# Syntax

```jsx
function App() {

    function handleClick() {
        console.log("Button Clicked");
    }

    return (
        <button onClick={handleClick}>
            Click Me
        </button>
    );
}
```

### Output

```
Button Clicked
```

Every time the button is clicked.

---

# Example 1: Button Click

```jsx
function App() {

    function greet() {
        alert("Welcome to React!");
    }

    return (
        <button onClick={greet}>
            Greet
        </button>
    );
}
```

Output

```
Welcome to React!
```

---

# Example 2: Using an Arrow Function

```jsx
function App() {

    return (
        <button
            onClick={() => alert("Hello React")}
        >
            Click
        </button>
    );
}
```

Use arrow functions when passing arguments.

---

# Example 3: Passing Arguments

```jsx
function App() {

    function greet(name) {
        alert(`Hello ${name}`);
    }

    return (
        <button
            onClick={() => greet("John")}
        >
            Say Hello
        </button>
    );
}
```

Output

```
Hello John
```

---

# Event Object

React automatically passes an **event object** to the event handler.

```jsx
function App() {

    function handleClick(event) {

        console.log(event);

    }

    return (
        <button onClick={handleClick}>
            Click
        </button>
    );
}
```

The event object contains useful information like:

- Target element
- Mouse position
- Keyboard key
- Event type

Example

```jsx
function handleClick(event) {

    console.log(event.target);

}
```

Output

```
<button>Click</button>
```

---

# Common React Events

| Event | Description |
|--------|-------------|
| `onClick` | Button click |
| `onChange` | Input value changes |
| `onSubmit` | Form submission |
| `onMouseEnter` | Mouse enters an element |
| `onMouseLeave` | Mouse leaves an element |
| `onMouseMove` | Mouse moves |
| `onKeyDown` | Key is pressed |
| `onKeyUp` | Key is released |
| `onFocus` | Input gains focus |
| `onBlur` | Input loses focus |

---

# Example: onChange

```jsx
import { useState } from "react";

function App() {

    const [name, setName] = useState("");

    return (
        <>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
            />

            <h2>{name}</h2>
        </>
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

---

# Example: onSubmit

```jsx
function App() {

    function handleSubmit(event) {

        event.preventDefault();

        alert("Form Submitted");

    }

    return (

        <form onSubmit={handleSubmit}>

            <button type="submit">

                Submit

            </button>

        </form>

    );
}
```

---

# Prevent Default Behavior

Normally,

```html
<form>
```

refreshes the page after submission.

Prevent this using

```jsx
event.preventDefault();
```

Example

```jsx
function handleSubmit(event){

    event.preventDefault();

}
```

---

# Mouse Events

```jsx
function App(){

    return(

        <div

            onMouseEnter={()=>console.log("Mouse Enter")}

            onMouseLeave={()=>console.log("Mouse Leave")}

        >

            Hover Me

        </div>

    );

}
```

---

# Keyboard Events

```jsx
function App(){

    function handleKey(event){

        console.log(event.key);

    }

    return(

        <input

            onKeyDown={handleKey}

        />

    );

}
```

Typing

```
A
```

Console

```
A
```

---

# Focus Events

```jsx
<input

    onFocus={()=>console.log("Focused")}

    onBlur={()=>console.log("Blurred")}

/>
```

---

# Official React Example

The React documentation demonstrates handling a click event using a button.

```jsx
function Button() {

    function handleClick() {

        alert("You clicked me!");

    }

    return (

        <button onClick={handleClick}>

            Click Me

        </button>

    );

}
```

### Explanation

1. User clicks the button.
2. React triggers the `onClick` event.
3. `handleClick()` executes.
4. Alert appears.

Flow

```
User Click

      │

      ▼

onClick Event

      │

      ▼

handleClick()

      │

      ▼

Alert Displayed
```

---

# Multiple Event Handlers

```jsx
function App(){

    function click(){

        console.log("Clicked");

    }

    function hover(){

        console.log("Hovered");

    }

    return(

        <button

            onClick={click}

            onMouseEnter={hover}

        >

            Button

        </button>

    );

}
```

---

# Event Bubbling

Events propagate from the child element to the parent.

```jsx
<div onClick={()=>console.log("Parent")}>

    <button onClick={()=>console.log("Child")}>

        Click

    </button>

</div>
```

Output

```
Child

Parent
```

To stop propagation

```jsx
function handleClick(event){

    event.stopPropagation();

}
```

---

# Best Practices

- Use descriptive function names.
- Keep event handlers small.
- Use arrow functions only when necessary.
- Prevent default behavior for forms.
- Avoid complex logic directly inside JSX.
- Reuse event handlers whenever possible.

---

# Common Mistakes

## Calling Function Immediately

❌ Wrong

```jsx
<button onClick={handleClick()}>
```

The function executes immediately during rendering.

---

✅ Correct

```jsx
<button onClick={handleClick}>
```

---

## Forgetting Arrow Function

❌

```jsx
<button onClick={greet("John")}>
```

---

✅

```jsx
<button onClick={() => greet("John")}>
```

---

## Forgetting preventDefault()

```jsx
<form onSubmit={handleSubmit}>
```

Without

```jsx
event.preventDefault();
```

the page refreshes.

---

# Summary

| Event | Usage |
|--------|-------|
| `onClick` | Button click |
| `onChange` | Input changes |
| `onSubmit` | Form submission |
| `onFocus` | Input focus |
| `onBlur` | Input blur |
| `onMouseEnter` | Mouse enters |
| `onMouseLeave` | Mouse leaves |
| `onKeyDown` | Keyboard press |

---

# Key Takeaways

- React events use **camelCase** (`onClick`, `onChange`, `onSubmit`).
- Event handlers are JavaScript functions.
- React passes a **SyntheticEvent** object to every event handler.
- Use `event.preventDefault()` to stop default browser behavior.
- Use `event.stopPropagation()` to stop event bubbling.
- Pass arguments using arrow functions.

---

## 📚 Next Topics to Learn

After Event Handling, you should learn:

1. `useState`
2. Forms and Controlled Components
3. Conditional Rendering
4. Lists and Keys
5. `useEffect`
6. State Lifting
7. Context API
8. React Router
````
