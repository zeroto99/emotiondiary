import React, { useEffect, useReducer, useRef } from 'react';

import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

const reducer = (state, action) => {
  let newState = [];
  switch(action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    } 
    case 'EDIT': {
      newState = state.map((it) => it.id === action.data.id ? {...action.data} : it);
      break;
    }
    default:
      return state;
  }
  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {

  useEffect(() => {
    localStorage.setItem('item1', 10);
    const item1 = parseInt(localStorage.getItem('item1'));
    const item2 = localStorage.getItem('item2');
    const item3 = JSON.parse(localStorage.getItem('item3'));
    console.log({item1, item2, item3});
  }, []);

  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(6);
  
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE', 
      data: {
        id: dataId.current, 
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  }
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({type: 'REMOVE', targetId})
  }
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId, 
        date: new Date(date).getTime(),
        content,
        emotion,
      }
    })
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider 
        value={{
          onCreate, 
          onRemove, 
          onEdit
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;