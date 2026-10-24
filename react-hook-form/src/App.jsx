import { useForm } from "react-hook-form"
import './App.css'

function App() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(data)
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input className={errors.firstname ? "input-error" : ""} {...register("firstname", { required: { value: true, message: "First name is required" }, minLength: { value: 3, message: "First name must be at least 3 characters" }, maxLength: { value: 10, message: "First name must be less than 10 characters" } })} />
        {errors.firstname && <p className="input-error-message">{errors.firstname.message}</p>}
      </div>
      <br />
      <div>
        <label htmlFor="middlename">Middle Name</label>
        <input  {...register("middlename")} />
      </div>
      <br />
      <div>
        <label htmlFor="lastname">Last Name</label>
        <input  {...register("lastname")} />
      </div>
      <br />
      <div>
        <input type="submit" disabled={isSubmitting} value={isSubmitting ? "Submitting..." : "Submit"} />
      </div>
    </form>
  )
}

export default App
