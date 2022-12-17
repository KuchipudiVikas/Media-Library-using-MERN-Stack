import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"

const AccountEdit = () => {
    const location = useLocation()
    const account = location.state;
    const [reduce, setReduce] = useState(0)
    const navigate = useNavigate()
    const handleChange = (e) => {
        if (account.size - e.target.value < 0) {
            setReduce('')
        } else {
            setReduce(e.target.value)
        }
    }
    const handleSubmit = () => {
        const gmail = account.gmail;
        const size = account.size - reduce
        axios.put(`/admin/accounts/${account._id}`, { gmail, size }).then(data => console.log(data))
    }

    const deleteAcc = () => {
        axios.delete(`/admin/accounts/${account._id}`).then(navigate('/admin/accounts'))
    }
    return (
        <div className="">
            <h1>Edit size</h1>
            <input type="text" name="size" value={account.size} />
            <input type="text" name="reducr" value={reduce} onChange={handleChange} />
            <button onClick={handleSubmit}>update</button>
            <button onClick={deleteAcc}>Delete</button>
        </div>
    )

}

export default AccountEdit