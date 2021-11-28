import Link from 'next/link'

const Menu:React.FC = () => {
    return (
        <div className="menu_items">
            <ul>
                <Link href=""><p className="active">Home</p></Link>
                <Link href=""><p>TV Shows</p></Link>
                <Link href=""><p>Movies</p></Link>
                <Link href=""><p>New &amp; Popular</p></Link>
                <Link href=""><p>My List</p></Link>
            </ul>
            
        </div>
    )
}

export default Menu
