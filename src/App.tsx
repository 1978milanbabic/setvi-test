// react core
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// UI libraries & styles
import './App.scss';

// components
import Header from './components/Header';
import Home from './pages/Home';
import ItemView from './pages/Item';
import Create from './pages/Create';
import NotFound from './pages/NotFound';

const App: React.FC = () => (
  <div id='app'>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create' element={<Create />} />
      <Route path='/item/:id' element={<ItemView />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </div>
);

export default App;
