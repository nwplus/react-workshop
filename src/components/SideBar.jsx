import { useState } from "react"
import "./SideBar.css"


const SideBarCharityPop = ({item, onClick}) => (
    <div className="charity" onClick={onClick}>
                
    <img className="image" src={item.img}/>
    <h2>{item.name}</h2>
    <p className="descriptor">{item.category}</p>
    <p className="description">{item.description}</p>
    <div className="categories">
    {item.categories.map(item => (
        <p className="categorya" key={item}>{item}</p>
    ))}
    </div>
    <h3>We need: </h3>
    <div className="categories">
    {item.needs.map(item => (
        <p className="needs" key={item}>{item}</p>
    ))}
    </div>

    </div>
)

function SideBar(prop) {

    const [selected, setSelected] = useState(null)

    return (
        <div className="main">
            {prop.list.map((item) => (
                <SideBarCharityPop
                    item={item}
                    onClick={() => setSelected(item)}
                />
            ))}
        </div>
    )
}

export default SideBar