import 'bootstrap'
import './App.css'
import 'react-notifications-component/dist/theme.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartContextProvider } from './context/CartContext'

//import { getDocs, addDoc, collection, doc, updateDoc, where, query, documentId, writeBatch } from 'firebase/firestore'

//import { db } from './services/firebase'
import { ReactNotifications } from 'react-notifications-component'

import NavBar from './components/Navbar/Navbar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Checkout from './components/Checkout/Checkout'
import Cart from './components/Cart/Cart'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <div id="App">
      <ReactNotifications />
        <CartContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exact path="/" element={ <ItemListContainer greetings={`Bienvenidos al listado de los productos (msj greetings)`} />} />
            <Route path="/categoria/:categoryId" element={ <ItemListContainer greetings={`Bienvenidos al listado de los productos (msj greetings)`} />} />
            <Route path="/item/:itemId" element={<ItemDetailContainer />} />
            <Route path="/cart" element={ <Cart />} />
            <Route path="/checkout" element={ <Checkout />} />
            <Route path="*" element={ <ItemListContainer showAlert={1} greetings={`Eror 404. Pagina no encontrada`} />} />
          </Routes>
        </BrowserRouter>
        </CartContextProvider>
      <Footer />
    </div>
  );
}

export default App;
