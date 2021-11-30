interface AccontMenuChild {
    accounts? : string[],
    userlogout: ()=>void
}

const AccountsMenu: React.FC<AccontMenuChild> = ({accounts,userlogout}) => {
    return (
        <div className="drop_menu">
            <div className="top">
                <div className="account"><img src='/avatar/Netflix-avatar-2.png'/><p>Nehal</p></div>
                <div className="account"><img src='/avatar/children.png'/><p>Children</p></div>                
            </div>
            <div className="bottom">
                <p>Account</p>
                <p onClick={()=>userlogout()}>Sign out of Netflix</p>
            </div>

        </div>
    )
}

export default AccountsMenu
