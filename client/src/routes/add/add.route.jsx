const Add = () => {
    fetch('/admin/add').then(console.log('done'))
    return (
        < frameset cols="70%, 30%" >
            <frame name="top" src=
                'https://colab.research.google.com/' />
            <frame name="main" src=
                'https://www.geeksforgeeks.org/html-frame-tag/' />

        </frameset>
    )
}

export default Add