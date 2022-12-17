const Form = () => {
    const { handleChange, handleSubmit, inputs } = props;
    return (
        <form onSubmit={handleSubmit}>
            {inputs.map((input, index) => (
                <div key={index}>
                    <label htmlFor={input.name}>{input.label}:</label>
                    <input type={input.type} name={input.name} value={input.value} onChange={input.onChange} />
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>

    )
}

export default Form;