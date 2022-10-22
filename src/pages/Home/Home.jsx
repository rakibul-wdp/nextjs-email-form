import React, { useState } from 'react';
import "./Home.css";
import Header from '../../components/Header/Header';
import AddNote from '../../components/AddNote/AddNote';
import Table from '../../components/Table/Table';

const Home = () => {
  let date1 = new Date('December 17, 2022 03:24:00')
  let date2 = new Date('December 20, 2022 03:24:00')
  let Initial_obj = [
    {
      id: "1",
      timeStamp: "06:53 PM",
      title: "Buy A car",
      Description: "Car to Buy",
      DueDate: date1,
      labels: ['Silver', 'Sedan'],
      st: "Open"
    },
    {
      id: "2",
      timeStamp: "7:02 PM",
      title: "Buy A House",
      Description: "House to Buy",
      DueDate: date2,
      labels: ['Big', 'Luxury'],
      st: "Working"
    }
  ]
  const [input, setInput] = useState("");
  const [desc, setDesc] = useState("");
  const [todo, setTodo] = useState(Initial_obj);

  const [count, setCount] = useState(0);

  const [originalTodo, setOriginalTodo] = useState([]);

  return (
    <div className='parent__container'>
      <div className='parent__box'>
        <Header />
        <AddNote
          input={input}
          setInput={setInput}
          desc={desc}
          setDesc={setDesc}
          todo={todo}
          setTodo={setTodo}
          originalTodo={originalTodo}
          setOriginalTodo={setOriginalTodo}
        />
        <Table todo={todo} setTodo={setTodo} count={count} setCount={setCount} originalTodo={originalTodo}
          setOriginalTodo={setOriginalTodo} />
      </div>
    </div>
  )
}

export default Home;