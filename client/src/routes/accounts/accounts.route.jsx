import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect } from "react"
const Accounts = () => {
    const [query, setQuery] = useState('')
    const [account, setAccount] = useState({ gmail: '', size: '15' })
    const [accounts, setAccounts] = useState([{ gmail: '', size: '' }])
    useEffect(() => {
        fetch('/admin/accounts').then(response => response.json()).then(data => {
            setAccounts(data)
        })
    }, [])
    const handleChange = e => {
        const { name, value } = e.target;
        setAccount(prev => ({ ...account, [name]: value }))
        console.log(account)
    }
    const handleSubmit = () => {
        axios.post(`/admin/accounts`, account).then(
            response => {
                console.log('post was done')

            }
        )
    }

    const filteredAccounts = accounts.filter(account => {
        return parseFloat(account.size) >= query;
    })
    return (
        <div className="Accounts">
            <input type="text" onChange={e => setQuery(e.target.value)} />
            {filteredAccounts.length ? (
                filteredAccounts.map((acc) => {
                    return (
                        <div className="">
                            <p>{acc.gmail}</p>
                            <p>{acc.size}</p>
                            <Link to={`/admin/accounts/edit`} state={acc}>Edit</Link>
                        </div>
                    )
                })) : <a href="https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Fmyaccount.google.com%3Futm_source%3Daccount-marketing-page%26utm_medium%3Dcreate-account-button&flowName=GlifWebSignIn&flowEntry=SignUp" target='_blank'>Create new Account</a>
            }
            <input type="text" name="gmail" onChange={handleChange} />
            <input type="text" name="size" onChange={handleChange} value={account.size} />
            <button onClick={handleSubmit}>Add</button>
        </div>
    )
}

export default Accounts