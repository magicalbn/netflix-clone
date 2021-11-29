import { useState, useEffect } from 'react'
import Menu from "./Menu"
import { IoMdNotifications, IoMdArrowDropdown } from 'react-icons/io'
import AccountsMenu from './AccountsMenu'


//redux
import { connect } from 'react-redux'
import { UserActionList, ReducerStoreState, } from '@/store/actions'

interface AppProps {
    
    logoutUser: () => {}
    AuthData: any

}

const Navbar: React.FC<AppProps> = (props) => {

    const [darkNav, setdarkNav] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", navTransition)
        return () => window.removeEventListener("scroll", navTransition)
    }, [])

    const navTransition = () => {
        if (window.scrollY > 100)
            setdarkNav(true)
        else setdarkNav(false)
    }

    const logout = () =>{
        props.logoutUser()
    }

    return (
        <div className={`Navbar ${darkNav ? 'dark' : null}`}>
            
            <div className="Content container">
                <div className="left">
                    <img className="logo" src={'https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'} />
                    <Menu />
                </div>
                <div className="right">
                    <div className="notifications">
                        <p>2</p>
                        <IoMdNotifications className="bell" />
                    </div>

                    <img className="avatar" src='/avatar/Netflix-avatar-1.png'></img>
                    <div className="accounts_hover">
                        <button className="arrow"><IoMdArrowDropdown  /></button>
                        <AccountsMenu userlogout={logout} />
                    </div>


                </div>

            </div>
        </div>
    )
}

const mapStatetoProps = (state: ReducerStoreState) => {
    return {
        AuthData: state.Authdata
    }
}


const mapDispacthtoProps = (dispatch: any) => {
    return {
      
        logoutUser: () => dispatch(UserActionList.userLogOut()),
    }
}
export default connect(mapStatetoProps, mapDispacthtoProps)(Navbar)
