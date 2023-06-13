// IMPORT ANY NEEDED COMPONENTS HERE
import { Dataset } from "./data/dataset"
import "./App.css"
import Chip from "./components/Chip/Chip"
import Header from "./components/Header/Header"
import Instructions from "./components/Instructions/Instructions"
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel"

import { useState } from "react"


// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!

export function App() {
  const { data, categories, restaurants } = Dataset.createDataSet()
  // const [isActive, setIsActive] = useState(false)
const [seletedCategory, setSelectedCategory] = useState(null)
const [seletedRestaurant, setSelectedRestaurant] = useState(null)
const [selectedItem, setSelectedItem] = useState(null)

function catEqual(eachData){
    return (eachData.restaurant === seletedRestaurant) && (eachData.food_category == seletedCategory)
}

let currentMenuItems = data.filter(catEqual)

  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
            {categories.map((category) => {

              let isActiveBool;
              if (category === "Burgers"){
                isActiveBool = true
              }
              return (
              <Chip key={category} label = {category} isActive = {seletedCategory===category} handleClick = {() => setSelectedCategory(category)} />
              // <p key={category}>{category}</p>
              )
            })}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        <Header title = {appInfo.title} tagline= {appInfo.tagline} description = {appInfo.description} />

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
          {restaurants.map((restaurant) => {
              let isActiveBool;
              if (restaurant === "In-N-Out Burger"){
                isActiveBool = true;
              }
              return (
              <Chip key={restaurant} label = {restaurant} isActive = {seletedRestaurant===restaurant} handleClick = {() => setSelectedRestaurant(restaurant)}/>
              // <p key={idx}>{restaurant}</p>
              )
            })}
          </div>
        </div>

        <Instructions instructions = {appInfo.instructions}/>

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {currentMenuItems.map((menuItem) => {
              return (<Chip key={menuItem.item_name} label = {menuItem.item_name} isActive = {selectedItem===menuItem} handleClick = {() => setSelectedItem(menuItem)} />)

            })}
          </div>
            
          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">
          {selectedItem ? <NutritionalLabel item={selectedItem} /> : null} 
          </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App



