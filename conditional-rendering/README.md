````md
# React Conditional Rendering

## 📌 Introduction

Conditional Rendering in React allows you to **display different UI elements based on certain conditions**.

Just like JavaScript uses conditions (`if`, `else`, `switch`, ternary operator, etc.), React also uses JavaScript conditions to decide **what should be rendered on the screen**.

For example:

- Show **Login** button if the user is logged out.
- Show **Logout** button if the user is logged in.
- Display **Loading...** while data is being fetched.
- Show **No Products Found** if the product list is empty.

---

# Table of Contents

1. What is Conditional Rendering?
2. Why Use Conditional Rendering?
3. Using `if` Statement
4. Returning `null`
5. Using Ternary Operator (`? :`)
6. Using Logical AND (`&&`)
7. Official React Example (Packing List)
8. Real-world Examples
9. Best Practices
10. Common Mistakes
11. Summary

---

# What is Conditional Rendering?

Conditional Rendering means **rendering different JSX based on a condition**.

Example:

```jsx
const isLoggedIn = true;
```

If the user is logged in:

```
Welcome User
```

Otherwise:

```
Please Login
```

React decides which UI to display based on the value of `isLoggedIn`.

---

# Why Use Conditional Rendering?

Conditional rendering helps us:

- Show or hide components.
- Display loading indicators.
- Handle authentication.
- Display different content for different users.
- Improve user experience.

---

# Method 1: Using `if` Statement

You can use a normal JavaScript `if` statement before returning JSX.

```jsx
function Greeting({ isLoggedIn }) {

    if (isLoggedIn) {
        return <h2>Welcome Back!</h2>;
    }

    return <h2>Please Login</h2>;
}
```

Usage

```jsx
<Greeting isLoggedIn={true} />
```

Output

```
Welcome Back!
```

---

# Method 2: Returning `null`

Sometimes you don't want to display anything.

Return `null`.

```jsx
function Message({ show }) {

    if (!show) {
        return null;
    }

    return <h2>Hello React</h2>;
}
```

Usage

```jsx
<Message show={false} />
```

Output

Nothing is rendered.

---

# Method 3: Ternary Operator (`? :`)

The ternary operator is the most commonly used method.

Syntax

```jsx
condition ? trueValue : falseValue
```

Example

```jsx
function Greeting({ isLoggedIn }) {

    return (
        <h2>
            {isLoggedIn ? "Welcome" : "Please Login"}
        </h2>
    );
}
```

Output

If

```jsx
isLoggedIn = true
```

```
Welcome
```

If

```jsx
isLoggedIn = false
```

```
Please Login
```

---

# Method 4: Logical AND (`&&`)

Use `&&` when you want to render something **only if a condition is true**.

```jsx
function Notification({ unread }) {

    return (
        <>
            {unread > 0 && (
                <h2>
                    You have {unread} unread messages.
                </h2>
            )}
        </>
    );
}
```

Output

```
You have 5 unread messages.
```

If

```jsx
unread = 0
```

Nothing is displayed.

---

# Official React Example (Packing List)

The following example is inspired by the **official React documentation**. It demonstrates how conditional rendering can be used to show different UI based on whether an item has been packed.

## Item Component

```jsx
function Item({ name, isPacked }) {

    if (isPacked) {
        return <li>{name} ✅</li>;
    }

    return <li>{name}</li>;
}
```

---

## Packing List Component

```jsx
function PackingList() {

    return (
        <section>
            <h1>Sally Ride's Packing List</h1>

            <ul>
                <Item
                    isPacked={true}
                    name="Space Suit"
                />

                <Item
                    isPacked={true}
                    name="Helmet with a Golden Leaf"
                />

                <Item
                    isPacked={false}
                    name="Photo of Tam"
                />
            </ul>
        </section>
    );
}

export default PackingList;
```

---

## Output

```
Sally Ride's Packing List

✅ Space Suit

✅ Helmet with a Golden Leaf

Photo of Tam
```

---

# Explanation

The `PackingList` component renders three `Item` components.

### First Item

```jsx
<Item
    isPacked={true}
    name="Space Suit"
/>
```

Since

```jsx
isPacked = true
```

The `if` statement executes.

```jsx
return <li>{name} ✅</li>;
```

Output

```
✅ Space Suit
```

---

### Second Item

```jsx
<Item
    isPacked={true}
    name="Helmet with a Golden Leaf"
/>
```

Again

```jsx
isPacked = true
```

Output

```
✅ Helmet with a Golden Leaf
```

---

### Third Item

```jsx
<Item
    isPacked={false}
    name="Photo of Tam"
/>
```

The condition becomes

```jsx
if(false)
```

The `if` block is skipped.

React executes

```jsx
return <li>{name}</li>;
```

Output

```
Photo of Tam
```

---

# Same Example Using Ternary Operator

```jsx
function Item({ name, isPacked }) {

    return (
        <li>
            {isPacked ? `${name} ✅` : name}
        </li>
    );
}
```

Output

```
✅ Space Suit

✅ Helmet with a Golden Leaf

Photo of Tam
```

The result is exactly the same, but the code is shorter.

---

# Same Example Using `&&`

```jsx
function Item({ name, isPacked }) {

    return (
        <li>
            {name}
            {isPacked && " ✅"}
        </li>
    );
}
```

Output

```
Space Suit ✅

Helmet with a Golden Leaf ✅

Photo of Tam
```

The check mark is rendered only when `isPacked` is `true`.

---

# Real-World Example 1: Login Button

```jsx
function App() {

    const isLoggedIn = false;

    return (
        <>
            {
                isLoggedIn
                    ? <button>Logout</button>
                    : <button>Login</button>
            }
        </>
    );
}
```

Output

```
Login
```

---

# Real-World Example 2: Loading State

```jsx
function App() {

    const loading = true;

    return (
        <>
            {
                loading
                    ? <h2>Loading...</h2>
                    : <h2>Data Loaded</h2>
            }
        </>
    );
}
```

Output

```
Loading...
```

---

# Real-World Example 3: Shopping Cart

```jsx
function Cart({ items }) {

    return (
        <>
            {
                items.length === 0
                    ? <h2>Your Cart is Empty</h2>
                    : <h2>Total Items: {items.length}</h2>
            }
        </>
    );
}
```

Output

If

```jsx
items = []
```

```
Your Cart is Empty
```

Otherwise

```
Total Items: 5
```

---

# Best Practices

- Use `if` for complex conditions.
- Use the ternary operator for simple true/false rendering.
- Use `&&` when you only need to render something if a condition is true.
- Return `null` when you don't want to render anything.
- Keep JSX clean and readable.

---

# Common Mistakes

## 1. Using `if` Inside JSX

❌ Wrong

```jsx
return (
    <div>
        if(isLoggedIn){
            <h1>Welcome</h1>
        }
    </div>
)
```

✅ Correct

```jsx
if (isLoggedIn) {
    return <h1>Welcome</h1>;
}
```

Or

```jsx
return (
    <>
        {isLoggedIn ? <h1>Welcome</h1> : <h1>Login</h1>}
    </>
)
```

---

## 2. Forgetting the False Case

❌

```jsx
{isLoggedIn && <h2>Welcome</h2>}
```

If `isLoggedIn` is `false`, nothing is shown.

If you need another UI, use a ternary operator.

---

## 3. Writing Complex Conditions in JSX

❌

```jsx
{
    condition1 &&
    condition2 &&
    condition3 &&
    condition4 &&
    <Component/>
}
```

Move complex logic outside the JSX to improve readability.

---

# Summary

| Method | Use Case |
|---------|----------|
| `if` Statement | Complex conditions |
| `return null` | Render nothing |
| Ternary (`? :`) | Two possible outputs |
| Logical AND (`&&`) | Render only if true |

---

# Key Takeaways

- Conditional Rendering allows React to display different UI based on conditions.
- React uses normal JavaScript conditions.
- `if`, `return null`, ternary (`? :`), and `&&` are the most common techniques.
- Use the method that keeps your code simple and readable.
- The official React **Packing List** example demonstrates how the same component can render different content depending on a prop.

---

## 📚 Next Topics to Learn

After Conditional Rendering, you should learn:

1. Rendering Lists with `map()`
2. React Keys
3. Event Handling
4. Forms
5. Controlled Components
6. `useState`
7. `useEffect`
````
