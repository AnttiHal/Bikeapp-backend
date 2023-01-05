const Button = ({text, setValue, value}) => {
  const handleClick = () => {
    setValue(value)
  }
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

export default Button