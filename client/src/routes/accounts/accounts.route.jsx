import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
const Accounts = () => {
    const [query, setQuery] = useState('')
    const [account, setAccount] = useState({ gmail: '', size: '15' })
    const [accounts, setAccounts] = useState([{ gmail: '', size: '' }])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();



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
        setIsLoading(true)
        axios.post(`/admin/accounts`, account).then(
            response => {

                navigate('/admin/accounts')
            }
        )
    }

    const filteredAccounts = accounts.filter(account => {
        return parseFloat(account.size) >= query;
    })
    return (
        <div className="Accounts" style={{ 'display': 'flex' }}>
            <div className="column" style={{ 'flex': '50 %', 'padding': '10px' }}>
                <div className="mb-3">
                    <input className="form-control" type="text" onChange={(e) => setQuery(e.target.value)} required placeholder="enter size" />

                </div>
                <ul className="list-group">
                    {filteredAccounts.length ? (
                        filteredAccounts.map((acc) => {
                            return (
                                <li className="list-group-item">{acc.gmail} - {acc.size}GB &nbsp; &nbsp; <Link to={`/admin/accounts/edit`} state={acc}>Edit</Link></li>
                            )
                        })) :

                        <div class="alert alert-danger" role="alert">
                            <h4 class="alert-heading">Ohh!!</h4>
                            <p>Sorry no account found</p>
                            <hr />
                            <p class="mb-0"></p>
                            <a href="https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Fmyaccount.google.com%3Futm_source%3Daccount-marketing-page%26utm_medium%3Dcreate-account-button&flowName=GlifWebSignIn&flowEntry=SignUp" target='_blank'>Create new Account</a>
                        </div>
                    }
                </ul>
            </div>
            <div className="column" style={{ 'flex': '50 %', 'padding': '10px' }}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="title">Gmail</label>
                    <input className="form-control" type="text" id="title" name="gmail" onChange={handleChange} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="title">Size</label>
                    <input className="form-control" type="text" id="title" name="size" onChange={handleChange} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <button
                    className='btn btn-success'
                    onClick={handleSubmit}
                >
                    <i class="fa fa-plus"></i>&nbsp;&nbsp;
                    {isLoading ? 'Adding…' : 'Add'}
                </button>
            </div>
        </div>
    )
}

export default Accounts