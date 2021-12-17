const RowsSkeleton:React.FC = () => {

    let boxContent = new Array(5).fill('')

     



    return (
        <div className="row_loader">
            {
                boxContent.map((value,index)=>{
                    return <div data-animation-offset={index} key={index} className='box'></div>
                })
            }
        </div>
    )
}

export default RowsSkeleton
