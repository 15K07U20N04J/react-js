# 🚀 React Redux Toolkit — Complete Guide

A complete, beginner-to-advanced guide to **Redux Toolkit (RTK)** with React. This README covers everything from basic concepts to real-world examples like Authentication and CRUD operations.

---

## 📚 Table of Contents

1. [What is Redux Toolkit?](#-what-is-redux-toolkit)
2. [Why use Redux Toolkit?](#-why-use-redux-toolkit)
3. [Installation](#-installation)
4. [Core Concepts](#-core-concepts)
   - [configureStore](#1-configurestore)
   - [createSlice](#2-createslice)
   - [Provider](#3-provider)
   - [useSelector](#4-useselector)
   - [useDispatch](#5-usedispatch)
   - [createAsyncThunk](#6-createasyncthunk)
   - [extraReducers](#7-extrareducers)
5. [Making API Calls](#-making-api-calls)
6. [RTK Query](#-rtk-query)
7. [Recommended Folder Structure](#-recommended-folder-structure)
8. [Authentication Example (Full)](#-authentication-example-full)
9. [CRUD Example (Full)](#-crud-example-full)
10. [Best Practices](#-best-practices)
11. [Common Mistakes](#-common-mistakes-to-avoid)
12. [Interview Questions](#-interview-questions)
13. [Cheat Sheet](#-cheat-sheet)
14. [Official Documentation](#-official-documentation)

---

## 🔹 What is Redux Toolkit?

**Redux Toolkit (RTK)** is the official, recommended way to write Redux logic. It was created by the Redux team to solve three common complaints about Redux:

- "Configuring a Redux store is too complicated"
- "I have to add a lot of packages to get Redux to do anything useful"
- "Redux requires too much boilerplate code"

RTK wraps around core Redux and includes utilities that simplify the most common tasks: store setup, creating reducers/actions, immutable update logic, and even async data fetching (RTK Query).

> In simple words: **Redux Toolkit = Redux + Best Practices + Less Code**

---

## 🔹 Why use Redux Toolkit?

| Plain Redux | Redux Toolkit |
|---|---|
| Lots of boilerplate | Minimal boilerplate |
| Manual immutability with spread operators | Uses Immer internally — write "mutating" code safely |
| Separate action types, action creators, reducers | All combined in `createSlice` |
| Manual store setup with middleware | `configureStore` sets up Redux DevTools + thunk automatically |
| No built-in async handling | `createAsyncThunk` and RTK Query built-in |
| Easy to make mistakes | Includes safety checks (e.g., detects accidental state mutation) |

**Key Benefits:**
- ✅ Official, recommended standard for Redux
- ✅ Less code, more readability
- ✅ Built-in Redux DevTools support
- ✅ Built-in `redux-thunk` for async logic
- ✅ Simplified immutable updates (via Immer)
- ✅ RTK Query for powerful data fetching & caching

---

## 🔹 Installation

Install Redux Toolkit and React-Redux together:

```bash
npm install @reduxjs/toolkit react-redux
```

or with yarn:

```bash
yarn add @reduxjs/toolkit react-redux
```

---

## 🔹 Core Concepts

### 1. `configureStore`

`configureStore` sets up the Redux store. It automatically combines reducers, adds `redux-thunk` middleware, and enables Redux DevTools.

```js
// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});
```

---

### 2. `createSlice`

A "slice" is a collection of Redux reducer logic and actions for a single feature. `createSlice` automatically generates action creators and action types.

```js
// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1; // Looks like mutation, but Immer handles it safely
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

---

### 3. `Provider`

The `Provider` component from `react-redux` makes the Redux store available to your entire React app.

```jsx
// main.jsx / index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

---

### 4. `useSelector`

`useSelector` is a hook that lets you extract (read) data from the Redux store state.

```jsx
import { useSelector } from 'react-redux';

function Counter() {
  const count = useSelector((state) => state.counter.value);

  return <h1>Count: {count}</h1>;
}
```

---

### 5. `useDispatch`

`useDispatch` gives you access to the `dispatch` function so you can send actions to the store.

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../features/counter/counterSlice';

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}

export default Counter;
```

---

### 6. `createAsyncThunk`

`createAsyncThunk` handles async logic (like API calls) and automatically dispatches `pending`, `fulfilled`, and `rejected` actions.

```js
// features/users/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
```

---

### 7. `extraReducers`

`extraReducers` lets a slice respond to actions defined **outside** of itself — most commonly used to handle the three states generated by `createAsyncThunk` (`pending`, `fulfilled`, `rejected`).

There are two syntax styles:

**Builder Callback (Recommended, used above)**
```js
extraReducers: (builder) => {
  builder.addCase(fetchUsers.fulfilled, (state, action) => {
    state.list = action.payload;
  });
}
```

**Object Syntax (Legacy, still works)**
```js
extraReducers: {
  [fetchUsers.fulfilled]: (state, action) => {
    state.list = action.payload;
  },
}
```

> 💡 Always prefer the **builder callback** syntax — it's type-safe and officially recommended.

---

## 🔹 Making API Calls

You can make API calls in two main ways with Redux Toolkit:

### Option A: `createAsyncThunk` + `axios`/`fetch` (manual approach)

```js
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      if (!res.ok) throw new Error('Failed to fetch');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
```

### Option B: RTK Query (modern, recommended approach)

RTK Query removes the need to write thunks, reducers, and loading/error state manually. See the next section.

---

## 🔹 RTK Query

**RTK Query** is a powerful data fetching and caching tool built into Redux Toolkit. It eliminates the need to write `useEffect`, `useState`, loading/error handling, and manual caching logic.

### Setup

```js
// features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: ['Posts'],
    }),
    addPost: builder.mutation({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = apiSlice;
```

### Register in Store

```js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
```

### Use in Component

```jsx
import { useGetPostsQuery, useAddPostMutation } from '../features/api/apiSlice';

function Posts() {
  const { data: posts, isLoading, isError } = useGetPostsQuery();
  const [addPost] = useAddPostMutation();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div>
      {posts.map((post) => (
        <h3 key={post.id}>{post.title}</h3>
      ))}
      <button onClick={() => addPost({ title: 'New Post', body: '...' })}>
        Add Post
      </button>
    </div>
  );
}
```

**RTK Query auto-generates hooks** like `useGetPostsQuery`, `useAddPostMutation`, handles caching, re-fetching, loading & error states — all automatically.

---

## 🔹 Recommended Folder Structure

RTK encourages a **"feature folder" (or "ducks")** pattern instead of separating by type (actions/reducers/types).

```
src/
│
├── app/
│   └── store.js                # Redux store configuration
│
├── features/
│   ├── auth/
│   │   ├── authSlice.js
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── counter/
│   │   ├── counterSlice.js
│   │   └── Counter.jsx
│   │
│   └── products/
│       ├── productSlice.js
│       ├── ProductList.jsx
│       └── ProductForm.jsx
│
├── api/
│   └── apiSlice.js              # RTK Query base API (optional)
│
├── components/                  # Shared/reusable UI components
│
├── App.jsx
└── main.jsx
```

**Why this structure?**
- Everything related to one feature (state + UI) lives together
- Easy to scale — just add a new folder under `features/`
- Easy to delete a feature without breaking others

---

## 🔹 Authentication Example (Full)

### 1. `authSlice.js`

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/login', credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
```

### 2. `Login.jsx`

```jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default Login;
```

### 3. Protecting Routes

```jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
```

---

## 🔹 CRUD Example (Full)

### 1. `productSlice.js`

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com/products';

// CREATE
export const addProduct = createAsyncThunk('products/add', async (product) => {
  const res = await axios.post(BASE_URL, product);
  return res.data;
});

// READ
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
});

// UPDATE
export const updateProduct = createAsyncThunk('products/update', async (product) => {
  const res = await axios.put(`${BASE_URL}/${product.id}`, product);
  return res.data;
});

// DELETE
export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
```

### 2. `ProductList.jsx`

```jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from './productSlice';

function ProductList() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {items.map((product) => (
        <li key={product.id}>
          {product.title}
          <button onClick={() => dispatch(deleteProduct(product.id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
```

---

## 🔹 Best Practices

- ✅ Use `createSlice` — never write reducers/actions manually
- ✅ Keep state **normalized** for large lists (avoid deeply nested state)
- ✅ Organize code by **feature**, not by type (actions/reducers/constants)
- ✅ Use `createAsyncThunk` or **RTK Query** for all API calls — don't call APIs directly inside components
- ✅ Prefer **RTK Query** over manual thunks for data-fetching heavy apps
- ✅ Keep selectors close to slices; use `createSelector` (from `reselect`, included in RTK) for derived/computed data
- ✅ Never mutate state outside of a slice's reducer (Immer only works inside `createSlice`/`createReducer`)
- ✅ Use TypeScript for larger apps to catch state-shape errors early
- ✅ Keep the store **serializable** — avoid storing things like class instances, functions, or Promises in state
- ✅ Split large slices into smaller, focused ones

---

## 🔹 Common Mistakes to Avoid

| ❌ Mistake | ✅ Correct Approach |
|---|---|
| Mutating state directly outside `createSlice` | Only mutate inside `createSlice` reducers (Immer handles it) |
| Calling API directly inside a component with `useEffect` + `axios` | Use `createAsyncThunk` or RTK Query |
| Forgetting to add the reducer in `configureStore` | Always register every slice reducer in the store |
| Using `extraReducers` object syntax in new projects | Use the builder callback syntax instead |
| Storing non-serializable data (functions, class instances) in state | Keep state plain and serializable |
| Not handling `pending` / `rejected` states | Always handle all three async states for good UX |
| Overusing `useSelector` and causing unnecessary re-renders | Select only the specific slice of state you need |
| Putting all logic into one giant slice | Split into multiple feature-based slices |
| Forgetting `middleware.concat(apiSlice.middleware)` for RTK Query | Always add RTK Query middleware to the store |

---

## 🔹 Interview Questions

**1. What is Redux Toolkit and why was it introduced?**
> RTK is the official recommended toolset for writing Redux logic. It was introduced to reduce boilerplate, simplify store setup, and enforce best practices out of the box.

**2. How does Redux Toolkit handle immutability?**
> RTK uses **Immer** internally, which allows you to write code that "looks like" it's mutating state directly, while it actually produces a new immutable state behind the scenes.

**3. What is the difference between `createSlice` and traditional Redux reducers?**
> `createSlice` automatically generates action types, action creators, and a reducer function in one place, removing the need to write them separately.

**4. What does `createAsyncThunk` do?**
> It generates a thunk function that handles async logic and automatically dispatches `pending`, `fulfilled`, and `rejected` actions based on the promise lifecycle.

**5. What is the purpose of `extraReducers`?**
> It allows a slice to respond to actions that were **not** defined in its own `reducers` field — commonly used for handling actions from `createAsyncThunk` or other slices.

**6. What is RTK Query and how is it different from `createAsyncThunk`?**
> RTK Query is a data-fetching and caching library built into RTK. Unlike `createAsyncThunk` (which you use to write your own thunks manually), RTK Query auto-generates hooks, manages caching, re-fetching, and loading/error states with almost no boilerplate.

**7. Why do we wrap the app with `<Provider>`?**
> `Provider` makes the Redux store accessible to all nested components via React Context, so any component can use `useSelector` / `useDispatch`.

**8. What happens if you mutate state outside of `createSlice`?**
> It will cause bugs since Redux expects immutable updates. Immer's mutation-style syntax only works safely inside RTK's `createSlice`/`createReducer`.

**9. How do you handle errors in `createAsyncThunk`?**
> By using `rejectWithValue` inside the thunk's catch block, so the rejected action's payload carries meaningful error data instead of the default error object.

**10. Why is normalizing state important in Redux?**
> Normalized state (using IDs as keys instead of nested arrays) avoids duplication, makes updates faster, and prevents deeply nested state that's hard to update immutably.

---

## 🔹 Cheat Sheet

```js
// Install
npm install @reduxjs/toolkit react-redux

// Store
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({ reducer: { ... } });

// Slice
import { createSlice } from '@reduxjs/toolkit';
const slice = createSlice({
  name: 'feature',
  initialState,
  reducers: { actionName: (state, action) => { state.x = action.payload } },
});
export const { actionName } = slice.actions;
export default slice.reducer;

// Provider
<Provider store={store}><App /></Provider>

// Read state
const value = useSelector((state) => state.feature.x);

// Dispatch action
const dispatch = useDispatch();
dispatch(actionName(payload));

// Async Thunk
const thunk = createAsyncThunk('feature/thunk', async (arg) => { ... });

// Handle async in slice
extraReducers: (builder) => {
  builder
    .addCase(thunk.pending, (state) => { state.loading = true })
    .addCase(thunk.fulfilled, (state, action) => { state.data = action.payload })
    .addCase(thunk.rejected, (state, action) => { state.error = action.error.message });
}

// RTK Query
const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '...' }),
  endpoints: (builder) => ({
    getData: builder.query({ query: () => 'endpoint' }),
  }),
});
export const { useGetDataQuery } = api;
```

---

## 🔹 Official Documentation

- 📘 Redux Toolkit Docs: https://redux-toolkit.js.org/
- 📘 RTK Query Docs: https://redux-toolkit.js.org/rtk-query/overview
- 📘 React-Redux Docs: https://react-redux.js.org/
- 📘 Redux Core Docs: https://redux.js.org/

---

### ⭐ Final Note

Redux Toolkit is now the **standard** way to use Redux. If you're starting a new project with Redux, always use RTK instead of plain Redux — and prefer **RTK Query** whenever your app is data-fetching heavy.

Happy coding! 🎉