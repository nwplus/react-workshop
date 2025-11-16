import { useState } from "react"
import "./SideBar.css"


const SideBarCharityPop = ({ item, onClick, isSelected }) => (
    <div className={`charity ${isSelected ? "selected" : ""}`} onClick={onClick}>
                
    <img className="image" src={item.img}/>
    <h2>{item.name}</h2>
    <p className="descriptor">{item.category}</p>
    {/* <p className="description">{item.description}</p> */}
    <div className="categories">
    {item.categories.map(item => (
        <p className="categorya" key={item}>{item}</p>
    ))}
    </div>
    <h3>About us:</h3>
    <p className="longDescription">{item.longDescription}</p>
    
    <h3>We need: </h3>
    <div className="categories">
    {item.needs.map(item => (
        <p className="needs" key={item}>{item}</p>
    ))}
    </div>

    <br></br>
    <a href={item.link} target="_blank">
    <button className="linka">Donate 🥰</button>
    </a>

    </div>
)

function SideBar(prop) {

    return (
        <div className="main">
            {prop.list.map((item) => (
                <SideBarCharityPop
                    item={item}
                    onClick={() => prop.onSelect(item)}
                    isSelected={prop.selected?.name===item.name}
                />
            ))}
        </div>
    )
}

export default SideBar