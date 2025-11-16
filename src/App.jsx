import { useState } from "react";
import "./App.css";
import MainMap from "./components/MainMap.jsx"
import SideBar from "./components/SideBar.jsx"

function App() {
  const data = [
    {
      name: "KFC",
      category: "Soup kitchen",
      description: "Creating tasty chicken for all, high-quality fast fried chicken.",
      longDescription: "KFC’s mission is to serve craveable, high-quality fried chicken with pride in a fast, friendly, and welcoming environment, making sure every guest leaves happy by blending their iconic recipes with real-cooked freshness and a genuine hospitality.",
      link: "https://kfc.ca",
      lat: 49.267535,
      lng: -123.128936,
      img: "https://images.seeklogo.com/logo-png/17/1/kfc-logo-png_seeklogo-176326.png",
      categories: [
        "Restaurant",
        "Open 24/7"
      ],
      needs: [
        "Dry ingredients",
        "Frozen food",
        "Rat meat"
      ]
    },
    {
      name: "Vancouver Food Bank",
      category: "Food bank",
      description: "Local nonprofit organizing food delivery to the underpriveledged",
      longDescription: "Serving more than 800,000 visits each year, it distributes fresh and nutritious food both directly to clients and through over 160 community agencies such as shelters, school programs, and community kitchens. ",
      link: "https://foodbank.bc.ca",
      lat: 49.282630,
      lng: -123.134956,
      img: "data:image/png;base64,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",
      categories: [
        "Food Bank",
        "Feeding Homeless",
        "Accepting Donations"
      ],
      needs: [
        "Kids clothes",
        "Parents clothes",
        "Mitts and toques"
      ]
    },
    {
      name: "BC Cancer Foundation",
      category: "Medical research",
      description: "Donate towards research to save lives around the world.",
      longDescription: "BC Cancer Research (based in Vancouver) is dedicated to reducing the burden of cancer in British Columbia by integrating basic biomedical research, genomics, clinical trials, population health, and health services research. ",
      link: "https://bccancerfoundation.com/",
      lat: 49.263212,
      lng: -123.120524,
      img: "https://www.bccancer.bc.ca/SiteAssets/bcca-logo.png",
      categories: [
        "Medical research",
        "Financial donations",
        "Volunteering"
      ],
      needs: [
        "Financial donations",
        "Volunteers"
      ]
    },
  ]

  const [selected, setSelected] = useState(null);

  const onSelect = (id) => {
    setSelected(id)
  }

  return (
    <div>
      <div className="title">
      <h1>NeighbourGood</h1>
      <h2>Hackcamp 2025</h2>
    </div>
    <div className="app">
      
      <SideBar 
        list={data}
        selected={selected}
        onSelect={onSelect}
      />
      <MainMap
        list={data}
        selected={selected}
        onSelect={onSelect}
      />
    </div>
    </div>
  )
}

export default App