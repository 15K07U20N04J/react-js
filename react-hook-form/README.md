# 📋 React Hook Form (RHF)

> **Official Documentation**
>
> 🌐 https://react-hook-form.com/
>
> 📖 API Reference
>
> https://react-hook-form.com/docs/useform

---

# 📚 Table of Contents

- What is React Hook Form?
- Why React Hook Form?
- Features
- Installation
- Basic Flow
- useForm()
- register()
- handleSubmit()
- Validation
- Error Handling
- watch()
- getValues()
- setValue()
- reset()
- Controller
- useFieldArray
- Real-world Examples
- RHF + Yup/Zod
- Best Practices
- Common Mistakes
- Interview Questions
- Cheat Sheet
- Useful Links

---

# What is React Hook Form?

**React Hook Form (RHF)** is a lightweight library used to **build forms in React** with:

- Better Performance
- Less Re-rendering
- Easy Validation
- Simple API
- Small Bundle Size

Unlike traditional React forms that rely heavily on `useState`, React Hook Form stores form data internally using **refs**, reducing unnecessary re-renders.

---

# Why React Hook Form?

Without RHF

```jsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [phone, setPhone] = useState("");
```

As forms grow, managing state becomes repetitive.

With RHF

```jsx
const {
    register,
    handleSubmit
} = useForm();
```

No need to create state for every input.

---

# Features

✅ Fast Performance

✅ Less Re-rendering

✅ Easy Validation

✅ Works with TypeScript

✅ Small Bundle Size

✅ Nested Forms

✅ Dynamic Fields

✅ Third-party UI Support

✅ Schema Validation

---

# Installation

```bash
npm install react-hook-form
```

or

```bash
yarn add react-hook-form
```

---

# Import

```jsx
import { useForm } from "react-hook-form";
```

---

# Basic Flow

```
useForm()

     │

     ▼

register()

     │

     ▼

User Input

     │

     ▼

Validation

     │

     ▼

handleSubmit()

     │

     ▼

Data Submitted
```

---

# useForm()

Main hook of React Hook Form.

```jsx
const {

    register,

    handleSubmit,

    watch,

    reset,

    setValue,

    getValues,

    control,

    formState: { errors }

} = useForm();
```

---

# register()

Connects an input with React Hook Form.

```jsx
<input

    {...register("name")}

/>
```

Now RHF tracks this field automatically.

---

# handleSubmit()

Validates the form before calling your submit function.

```jsx
const onSubmit = (data) => {

    console.log(data);

};

<form onSubmit={handleSubmit(onSubmit)}>
```

---

# First Example

```jsx
import { useForm } from "react-hook-form";

function App() {

    const {

        register,

        handleSubmit

    } = useForm();

    const onSubmit = (data) => {

        console.log(data);

    };

    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            <input

                {...register("name")}

                placeholder="Name"

            />

            <input

                {...register("email")}

                placeholder="Email"

            />

            <button>

                Submit

            </button>

        </form>

    );

}
```

Output

```
{

name: "John",

email: "john@gmail.com"

}
```

---

# Validation

Required

```jsx
<input

    {...register("name", {

        required: "Name is required"

    })}

/>
```

Minimum Length

```jsx
register("password",{

    minLength:{

        value:8,

        message:"Minimum 8 characters"

    }

})
```

Pattern

```jsx
register("email",{

    pattern:{

        value:/^\S+@\S+\.\S+$/,

        message:"Invalid Email"

    }

})
```

---

# Error Handling

```jsx
{

errors.name && (

<p>

{errors.name.message}

</p>

)

}
```

---

# Complete Validation Example

```jsx
const {

register,

handleSubmit,

formState:{errors}

}=useForm();
```

```jsx
<input

{...register("email",{

required:"Email Required",

pattern:{

value:/^\S+@\S+\.\S+$/,

message:"Invalid Email"

}

})}

/>

<p>{errors.email?.message}</p>
```

---

# watch()

Watch input values in real time.

```jsx
const name = watch("name");

console.log(name);
```

Useful for

- Live Preview
- Conditional Fields
- Dynamic UI

---

# getValues()

Read values without re-rendering.

```jsx
const values = getValues();

console.log(values);
```

---

# setValue()

Update form value programmatically.

```jsx
setValue(

"name",

"John Doe"

);
```

Useful when loading API data.

---

# reset()

Reset the form.

```jsx
reset();
```

Reset with values

```jsx
reset({

name:"John",

email:"abc@gmail.com"

});
```

---

# Controller

Used for third-party UI libraries like

- Material UI
- Ant Design
- React Select

Example

```jsx
<Controller

control={control}

name="city"

render={({field})=>(

<TextField

{...field}

/>

)}

/>
```

---

# useFieldArray()

Used for dynamic forms.

Example

```
Student 1

Student 2

Student 3
```

```jsx
const {

fields,

append,

remove

}=useFieldArray({

control,

name:"students"

});
```

Append

```jsx
append({

name:""

});
```

Remove

```jsx
remove(index);
```

---

# Real-world Example

Registration Form

```jsx
const {

register,

handleSubmit,

formState:{errors}

}=useForm();

<form

onSubmit={handleSubmit(onSubmit)}

>

<input

{...register("username",{

required:"Required"

})}

/>

<input

type="password"

{...register("password",{

required:"Required",

minLength:8

})}

/>

<button>

Register

</button>

</form>
```

---

# RHF + Yup Validation

Install

```bash
npm install yup
```

```bash
npm install @hookform/resolvers
```

Example

```jsx
resolver:yupResolver(schema)
```

---

# RHF + Zod Validation

Install

```bash
npm install zod
```

```bash
npm install @hookform/resolvers
```

Example

```jsx
resolver:

zodResolver(schema)
```

---

# Common Use Cases

- Login Form
- Registration Form
- Contact Form
- Checkout Form
- Survey Form
- Dynamic Forms
- Multi-Step Forms
- Admin Dashboard Forms
- Profile Update

---

# React Hook Form vs useState

| useState | React Hook Form |
|-----------|----------------|
| More Re-renders | Less Re-renders |
| Manual Validation | Built-in Validation |
| Large Boilerplate | Small Code |
| Slow for Large Forms | Optimized |

---

# Best Practices

✅ Use validation rules.

✅ Display meaningful error messages.

✅ Use `Controller` only when needed.

✅ Prefer schema validation (Yup/Zod) for complex forms.

✅ Keep validation logic separate from UI.

---

# Common Mistakes

❌ Forgetting

```jsx
register()
```

The input won't be tracked.

---

❌ Forgetting

```jsx
handleSubmit()
```

Validation won't run.

---

❌ Ignoring

```jsx
errors
```

Users won't know why submission failed.

---

❌ Using `Controller` unnecessarily.

Use `register()` for normal HTML inputs.

---

# Interview Questions

### What is React Hook Form?

A library for managing forms efficiently in React using hooks.

---

### Why is RHF faster?

Because it uses **uncontrolled components and refs**, reducing unnecessary re-renders.

---

### Difference between register() and Controller?

`register()`

- Native HTML inputs

`Controller`

- Third-party controlled components

---

### What does handleSubmit do?

Validates the form and passes validated data to your submit function.

---

### When should you use Controller?

When working with controlled UI libraries like Material UI, Ant Design, or React Select.

---

# Cheat Sheet

| Hook/API | Purpose |
|----------|----------|
| `useForm()` | Initialize form |
| `register()` | Register inputs |
| `handleSubmit()` | Handle form submission |
| `watch()` | Watch values |
| `getValues()` | Read values |
| `setValue()` | Update values |
| `reset()` | Reset form |
| `Controller` | Third-party components |
| `useFieldArray()` | Dynamic fields |

---

# Complete Flow

```
useForm()

      │

      ▼

register()

      │

      ▼

User Types

      │

      ▼

Validation

      │

      ▼

Errors?

 ┌────┴────┐

Yes        No

 │          │

 ▼          ▼

Show      handleSubmit()

Error         │

              ▼

          API Call

              │

              ▼

          Success
```

---

# Useful Documentation

## Official Website

https://react-hook-form.com/

---

## useForm

https://react-hook-form.com/docs/useform

---

## register

https://react-hook-form.com/docs/useform/register

---

## Controller

https://react-hook-form.com/docs/usecontroller/controller

---

## useFieldArray

https://react-hook-form.com/docs/usefieldarray

---

## Validation

https://react-hook-form.com/get-started

---

# Key Takeaways

- React Hook Form is a lightweight and high-performance form library.
- It uses **uncontrolled components** and **refs**, making it faster than managing every field with `useState`.
- `useForm()` initializes the form.
- `register()` connects inputs to the form state.
- `handleSubmit()` validates the form before submission.
- Use `watch()`, `getValues()`, `setValue()`, and `reset()` to manage form data.
- Use `Controller` for third-party UI components.
- Use `useFieldArray` for dynamic form fields.
- Prefer Yup or Zod for complex validation.

---

## 📚 Next Topics to Learn

1. Form Validation with Yup
2. Form Validation with Zod
3. Multi-Step Forms
4. File Uploads
5. React Query + Forms
6. Form Performance Optimization
7. Authentication Forms
8. Advanced React Hook Form Patterns
````
