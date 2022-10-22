import React from 'react'
import "./AddNote.css"
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { Select, notification } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import Tags from '../Tags/Tags';
import { Modal } from '@mui/material';

const AddNote = ({ input, setInput, desc, setDesc, todo, setTodo, setOriginalTodo, handleClose, open }) => {


  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: 'Success',
      description:
        'Your Data has been stored Successfully',
      duration: 3.5,
    });
  };

  const stat = ["Open", "Working", "Done", "Overdue"];

  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [st, Setst] = useState("Select status");
  const current = new Date();
  var timeStamp = current.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })

  const onInputChange = (e) => {
    setInput(e.target.value);
  };
  const onDescSChange = (e) => {
    setDesc(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    openNotification();
    setOriginalTodo([...todo, { id: todo.length + 1, timeStamp: timeStamp, title: input, Description: desc, DueDate: startDate, labels: tags, st: st }]);
    setTodo([...todo, { id: todo.length + 1, timeStamp: timeStamp, title: input, Description: desc, DueDate: startDate, labels: tags, st: st }]);
    setTags([]);
    setInput("");
    setDesc("");
  };


  const handleStatus = (e) => {
    console.log(e);
    Setst(e);
  }

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current + 1 < dayjs().endOf('day');
  };
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  });


  return (<div className='form__container'>
    <form onSubmit={onFormSubmit} className='todo__form'>
      <div style={{ margin: "10px", marginLeft: "0", fontWeight: "500", fontSize: "1.5rem" }}>Enter Title of Note :-</div>
      <input
        type="text"
        placeholder='Enter a Note Title..'
        className='todo__input'
        value={input}
        required
        onChange={onInputChange}
      />
      <div style={{ margin: "10px", marginLeft: "0", fontWeight: "500", fontSize: "1.5rem" }}>Enter Description of Note :-</div>
      <textarea
        placeholder='Enter the description '
        className='todo__desc'
        value={desc}
        required
        onChange={onDescSChange}
      />
      <div style={{ margin: "10px", marginLeft: "0", fontWeight: "500", fontSize: "1.5rem" }}>Enter Any Tags for Note :-</div>
      <div className='todo__tag'>
        <Tags tags={tags} setTags={setTags} />
      </div>
      <div style={{ margin: "10px", marginLeft: "0", fontWeight: "500", fontSize: "1.5rem" }}>Enter Status of Note :-</div>
      <Select placeholder='Select status' onChange={handleStatus} value={st}>
        {
          stat.map((status, index) => {

            return <Select.Option key={index} value={status}>{status}</Select.Option>
          })
        }
      </Select>
      <div style={{ margin: "10px", marginLeft: "0", fontWeight: "500", fontSize: "1.5rem" }}>Select End Date :-</div>

      <DatePicker
        format="YYYY-MM-DD "
        disabledDate={disabledDate}
        disabledTime={disabledDateTime}
        showTime={{
          defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
        }}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className='todo__date'
      />
      {contextHolder}
      <button className='button__input'>Submit</button>
    </form>
  </div>
  )
}

export default AddNote;