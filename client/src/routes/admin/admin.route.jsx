import { useNavigate } from "react-router-dom"
const Admin = () => {
    const navigate = useNavigate()
    return (
        <div className="">
            <div>
                movies
            </div>
            <div onClick={() => navigate('/admin/accounts')}>
                Accounts
            </div>

            <div onClick={() => navigate('/admin/add')}>
                Add
            </div>

        </div>
    )
}

export default Admin