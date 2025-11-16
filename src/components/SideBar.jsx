import "./SideBar.css"


function SideBar(prop) {
    
    
    return (
        <div className="main">
            {prop.list.map((item) => {
            return <div>
                <p>{item.name}</p>

            </div>



            })}
        </div>
    )
}

export default SideBar