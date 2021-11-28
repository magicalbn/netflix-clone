interface Panelprops {
    imgLink: string,
    title: string,
    desc: string,
    swap?: boolean
}

const Panel: React.FC<Panelprops> = ({ imgLink, title, desc, swap }) => {
    return (
        <div className={`panel ${swap?'':'swap'}`}>
            <img src={imgLink} />
            <div className="desc">
                <h1>{title}</h1>
                <h3>{desc}</h3>
            </div>

        </div>
    )
}

export default Panel
