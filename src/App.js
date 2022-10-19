import 'bootstrap'
import './App.css'
import 'react-notifications-component/dist/theme.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartContextProvider } from './context/CartContext'

//import { getDocs, addDoc, collection, doc, updateDoc, where, query, documentId, writeBatch } from 'firebase/firestore'

//import { db } from './services/firebase'
import { ReactNotifications } from 'react-notifications-component'

import NavBar from './components/Navbar/Navbar.js'
import ItemListContainer from './components/ItemListContainer/ItemListContainer.js'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.js'
import Footer from "./components/Footer/Footer.js"

import { mockData } from './mockData'

//export const Context = createContext()

function App() {
  /*
  const doPopulate = async () => {

    const productsRef = collection(db, 'products')
    console.log(productsRef)
    console.log('----------')
    mockData.forEach( async product => {
      const productAdded = await addDoc(productsRef, product)
      console.log(product)
      //const newProductyRef = db.collection('products').doc();
      //const res = await newProductyRef.set(product)

      console.log('Added document with ID: ', productAdded.id);
    })
    console.log('----------')
  }
  doPopulate()
  */
  return (
    <div id="App">
      <ReactNotifications />
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
