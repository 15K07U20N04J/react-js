# 🌐 React Router

> **Official Documentation**
>
> 📖 https://reactrouter.com/
>
> React Router is the standard library for routing in React applications. It enables navigation between different pages without reloading the browser.

---

# 📚 Table of Contents

- What is React Router?
- Why React Router?
- Features
- Installation
- Basic Routing Flow
- BrowserRouter
- Routes
- Route
- Link
- NavLink
- useNavigate
- useParams
- useLocation
- useSearchParams
- Outlet
- Nested Routes
- Layout Routes
- Dynamic Routes
- Private Routes
- 404 Page
- Lazy Loading
- Folder Structure
- Best Practices
- Common Mistakes
- Interview Questions
- Cheat Sheet
- Useful Documentation

---

# What is React Router?

React Router is a library that enables **client-side routing** in React applications.

Instead of reloading the entire webpage, React Router updates only the required components, making navigation faster and providing a better user experience.

Without React Router:

```
Click Link

↓

Browser Requests New HTML

↓

Entire Page Reloads
```

With React Router:

```
Click Link

↓

URL Changes

↓

React Updates Component

↓

No Page Reload
```

---

# Why React Router?

Without React Router:

```html
<a href="/about">About</a>
```

Clicking the link reloads the whole application.

With React Router:

```jsx
<Link to="/about">
    About
</Link>
```

Only the displayed component changes.

---

# Features

- Client-side routing
- Dynamic routes
- Nested routes
- Route parameters
- Query parameters
- Navigation Hooks
- Protected Routes
- Lazy Loading
- Code Splitting
- Error Pages

---

# Installation

Using npm

```bash
npm install react-router-dom
```

Using Yarn

```bash
yarn add react-router-dom
```

---

# Import

```jsx
import {

BrowserRouter,

Routes,

Route

} from "react-router-dom";
```

---

# Basic Routing Flow

```
BrowserRouter

      │

      ▼

Routes

      │

      ▼

Route

      │

      ▼

Component Render
```

---

# BrowserRouter

Wrap your entire application.

```jsx
import { BrowserRouter } from "react-router-dom";

import App from "./App";

function Root(){

    return(

        <BrowserRouter>

            <App/>

        </BrowserRouter>

    );

}
```

It enables routing throughout your app.

---

# Routes

`Routes` groups all route definitions.

```jsx
<Routes>

    <Route path="/" element={<Home/>} />

    <Route path="/about" element={<About/>} />

</Routes>
```

---

# Route

Maps a URL to a React component.

```jsx
<Route

path="/contact"

element={<Contact/>}

/>
```

---

# Complete Example

```jsx
import {

BrowserRouter,

Routes,

Route

} from "react-router-dom";

function App(){

return(

<BrowserRouter>

<Routes>

<Route

path="/"

element={<Home/>}

/>

<Route

path="/about"

element={<About/>}

/>

<Route

path="/contact"

element={<Contact/>}

/>

</Routes>

</BrowserRouter>

);

}
```

---

# Link

Navigate without refreshing the page.

```jsx
import { Link } from "react-router-dom";

<Link to="/">Home</Link>

<Link to="/about">About</Link>
```

---

# NavLink

Same as `Link`, but automatically detects the active route.

```jsx
import { NavLink } from "react-router-dom";

<NavLink to="/about">

About

</NavLink>
```

Active example

```jsx
<NavLink

to="/about"

className={({isActive})=>

isActive ? "active" : ""

}

>

About

</NavLink>
```

---

# useNavigate()

Navigate programmatically.

```jsx
import { useNavigate } from "react-router-dom";

function Login(){

const navigate=useNavigate();

function handleLogin(){

navigate("/dashboard");

}

}
```

Navigate Back

```jsx
navigate(-1);
```

Navigate Forward

```jsx
navigate(1);
```

Replace History

```jsx
navigate("/home",{

replace:true

});
```

---

# useParams()

Read URL parameters.

Route

```jsx
<Route

path="/users/:id"

element={<User/>}

/>
```

Component

```jsx
import { useParams } from "react-router-dom";

function User(){

const {id}=useParams();

return <h2>{id}</h2>;

}
```

URL

```
/users/25
```

Output

```
25
```

---

# useLocation()

Access current URL information.

```jsx
import { useLocation } from "react-router-dom";

const location=useLocation();

console.log(location.pathname);
```

Useful for

- Analytics
- Active menus
- Breadcrumbs

---

# useSearchParams()

Read query parameters.

URL

```
/products?category=mobile
```

```jsx
import {

useSearchParams

} from "react-router-dom";

const [searchParams]=useSearchParams();

const category=

searchParams.get("category");
```

Output

```
mobile
```

---

# Outlet

Used for nested routes.

Parent

```jsx
import { Outlet } from "react-router-dom";

function Dashboard(){

return(

<>

<h2>Dashboard</h2>

<Outlet/>

</>

);

}
```

---

# Nested Routes

```jsx
<Route

path="/dashboard"

element={<Dashboard/>}

>

<Route

path="profile"

element={<Profile/>}

/>

<Route

path="settings"

element={<Settings/>}

/>

</Route>
```

URL

```
/dashboard/profile
```

renders

```
Dashboard

↓

Profile
```

---

# Layout Routes

Example

```jsx
function Layout(){

return(

<>

<Navbar/>

<Outlet/>

<Footer/>

</>

);

}
```

Every page shares the same layout.

---

# Dynamic Routes

```jsx
<Route

path="/product/:id"

element={<Product/>}

/>
```

Example

```
/product/101
```

```
/product/205
```

Same component

Different data

---

# Private Route

```jsx
function PrivateRoute({children}){

const isLoggedIn=true;

return isLoggedIn

?

children

:

<Navigate to="/login"/>;

}
```

Usage

```jsx
<Route

path="/dashboard"

element={

<PrivateRoute>

<Dashboard/>

</PrivateRoute>

}

/>
```

---

# 404 Page

```jsx
<Route

path="*"

element={<NotFound/>}

/>
```

---

# Lazy Loading

```jsx
import {

lazy,

Suspense

} from "react";

const Home=lazy(()=>import("./Home"));

<Suspense

fallback={<h2>Loading...</h2>}

>

<Home/>

</Suspense>
```

Useful for large applications.

---

# Folder Structure

```
src/

│

├── pages/

│     Home.jsx

│     About.jsx

│     Contact.jsx

│

├── components/

│     Navbar.jsx

│

├── routes/

│     AppRoutes.jsx

│

└── App.jsx
```

---

# React Router vs Traditional Routing

| Traditional | React Router |
|--------------|-------------|
| Full Page Reload | No Reload |
| Slow | Fast |
| Server Routing | Client Routing |
| HTML Request | Component Rendering |

---

# Common Use Cases

- Login System
- Dashboard
- E-commerce
- Blog
- Admin Panel
- Portfolio
- Multi-page Applications
- Authentication
- Product Details
- User Profiles

---

# Best Practices

✅ Use `Link` instead of `<a>`.

✅ Keep routes in one file.

✅ Use lazy loading for large pages.

✅ Use nested routes for dashboards.

✅ Protect private routes.

---

# Common Mistakes

❌ Using

```html
<a href="/about">
```

Use

```jsx
<Link to="/about">
```

---

❌ Forgetting

```jsx
<BrowserRouter>
```

Routing won't work.

---

❌ Forgetting

```jsx
<Outlet/>
```

Nested routes won't render.

---

❌ Hardcoding URLs

Prefer

```jsx
navigate("/dashboard");
```

instead of manipulating `window.location`.

---

# Interview Questions

### What is React Router?

A library for client-side routing in React.

---

### Difference between Link and NavLink?

`Link`

- Navigation only.

`NavLink`

- Navigation + active styling.

---

### Difference between BrowserRouter and Routes?

`BrowserRouter`

Provides routing context.

`Routes`

Contains route definitions.

---

### Difference between useNavigate and Link?

`Link`

Navigation using UI.

`useNavigate`

Navigation using JavaScript.

---

### What is Outlet?

A placeholder where child routes are rendered.

---

### What are Dynamic Routes?

Routes containing parameters.

Example

```
/users/:id
```

---

### What is a Private Route?

A route accessible only to authenticated users.

---

# Cheat Sheet

| Component / Hook | Purpose |
|------------------|----------|
| `BrowserRouter` | Enables routing |
| `Routes` | Groups routes |
| `Route` | Maps URL to component |
| `Link` | Navigation |
| `NavLink` | Navigation + Active State |
| `useNavigate` | Programmatic navigation |
| `useParams` | Read route parameters |
| `useLocation` | Current URL |
| `useSearchParams` | Query parameters |
| `Outlet` | Nested route rendering |
| `Navigate` | Redirect users |

---

# Complete Flow

```
BrowserRouter

      │

      ▼

Routes

      │

      ▼

User Clicks Link

      │

      ▼

URL Changes

      │

      ▼

Matching Route

      │

      ▼

Component Rendered
```

---

# Useful Documentation

### Official Website

https://reactrouter.com/

### Installation

https://reactrouter.com/start/framework/installation

### BrowserRouter

https://reactrouter.com/api/declarative-routers/BrowserRouter

### Route

https://reactrouter.com/api/components/Route

### Routes

https://reactrouter.com/api/components/Routes

### Link

https://reactrouter.com/api/components/Link

### NavLink

https://reactrouter.com/api/components/NavLink

### useNavigate

https://reactrouter.com/api/hooks/useNavigate

### useParams

https://reactrouter.com/api/hooks/useParams

### useLocation

https://reactrouter.com/api/hooks/useLocation

### useSearchParams

https://reactrouter.com/api/hooks/useSearchParams

### Outlet

https://reactrouter.com/api/components/Outlet

### Navigate

https://reactrouter.com/api/components/Navigate

---

# Key Takeaways

- React Router enables **client-side routing** without page reloads.
- `BrowserRouter` provides routing context.
- `Routes` and `Route` map URLs to components.
- `Link` and `NavLink` are used for navigation.
- Hooks like `useNavigate`, `useParams`, and `useLocation` simplify navigation and URL handling.
- Use `Outlet` for nested layouts.
- Protect sensitive pages with private routes.
- Lazy load routes to improve application performance.
- Organize routes in a dedicated folder for scalability.
````
