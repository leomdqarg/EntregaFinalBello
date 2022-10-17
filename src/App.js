import 'bootstrap'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"

import { CartContextProvider } from './context/CartContext'

import NavBar from './components/Navbar/Navbar.js'
import ItemListContainer from './components/ItemListContainer/ItemListContainer.js'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.js'
import Footer from "./components/Footer/Footer.js"



//export const Context = createContext()

function App() {

  return (
    <div id="App">
      {/* <Context.Provider value={'valor a compartir'}> */}
      {/*<CartContext.Provider value={{addItem, removeItem}}>*/}
        <CartContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exact path="/" element={ <ItemListContainer greetings={`Bienvenidos al listado de los productos (msj greetings)`} />} />
            <Route path="/categoria/:categoryId" element={ <ItemListContainer greetings={`Bienvenidos al listado de los productos (msj greetings)`} />} />
            <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          </Routes>
        </BrowserRouter>
        </CartContextProvider>
      {/* </CartContext.Provider>*/}
      {/* </Context.Provider> */}
      <Footer />
    </div>
  );
}

export default App;
