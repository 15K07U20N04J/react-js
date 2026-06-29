function App() {

  const handleClick = () => {
    alert('Button clicked!')
  }

  const handleMouseHover = () => {
    alert('Mouse hovered over the paragraph!')
  }

  const handleInputChange = (event) => {
    alert(`Input changed: ${event.target.value}`)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    alert('Form submitted!')
  }




  return (
    <div>
      <p style={{ border: '1px solid black' }} onMouseEnter={handleMouseHover}>
        This is a paragraph.
      </p>
      <button
        onClick={handleClick}
      >
        Click me
      </button>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Enter text"  onChange={handleInputChange}/>
        <button type="submit">Submit</button>
      </form>

      <button onClick={alert('Immediate Invocation')}>Click me</button>
    </div>
  )
}

export default App
