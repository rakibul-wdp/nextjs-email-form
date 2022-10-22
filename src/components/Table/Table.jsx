import React from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space, Tag, Select, Input, Popconfirm } from 'antd';
import { useRef, useState } from 'react'
import { Form } from 'antd';
import DatePicker from "react-datepicker";
import './Table.css'
import Tags from '../Tags/Tags';


const Table = ({ todo, setTodo, count, setCount, originalTodo, setOriginalTodo }) => {

  const [editingRow, setEditingRow] = useState(null);
  const [editingRowTitle, setEditingRowTitle] = useState(null);
  const [editingRowDesc, setEditingRowDesc] = useState(null);
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState(todo.DueDate);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(null);
  const current = new Date();

  const [statusState, setStatusState] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDelete = (key) => {
    const newData = todo.filter((item) => item.id !== key);
    setOriginalTodo(newData)
    setTodo(newData);
  };

  const stat = ["Open", "Working", "Done", "Overdue"];


  const columns = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'TimeStamp',
      dataIndex: 'timeStamp',
      ellipsis: true,
      editable: false,
      sorter: (a, b) => a.timeStamp.toString().localeCompare(b.timeStamp.toString()),
      tip: 'Creation of note',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Invalid',
          },
        ],
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      ellipsis: true,
      editable: true,
      sorter: (a, b) => a.title.localeCompare(b.title),
      tip: 'Title of Todo note ',
      render: (text, record) => {
        const handleChange = (e) => {
          setEditingRowTitle(e.target.value)
        }

        if (editingRow === record.id) {
          return (<Form.Item
            name="title"
            rules={[{
              required: true,
              message: "Please Enter title",
            }]}
          >
            <Input onChange={handleChange} placeholder={record.title} />
          </Form.Item>);

        } else {
          return <p>{text}</p>
        }
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Invalid',
          },
        ],
      },
    },
    {
      title: 'Description',
      sorter: (a, b) => a.Description.localeCompare(b.Description),
      dataIndex: 'Description',
      tip: 'Description of the Todo ',
      editable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Invalid',
          },
        ],
      },
      render: (text, record) => {
        const handleChangeDesc = (e) => {
          setEditingRowDesc(e.target.value)
        }

        if (editingRow === record.id) {
          return (<Form.Item
            name="Description"
            rules={[{
              required: true,
              message: "Please Enter Description",
            }]}
          >
            <Input onChange={handleChangeDesc} placeholder={record.Description} />
          </Form.Item>);

        } else {
          return <p>{text}</p>
        }
      },
    },
    {
      title: 'Due Date',
      key: 'showTime',
      editable: true,
      dataIndex: 'DueDate',
      valueType: 'date',
      sorter: (a, b) => a.DueDate.toString().localeCompare(b.DueDate.toString()),
      hideInSearch: true,
      render: (text, record) => {

        if (editingRow === record.id) {
          return (<Form.Item
            name="DueDate"
            rules={[{
              required: true,
              message: "Please Enter valid Date",
            }]}
          >
            <DatePicker
              selected={startDate}
              onChange={(date) => { ((date.getDate() > current.getDate()) || (date.getMonth() > current.getMonth()) ? setStartDate(date) : alert("Invalid End Date ")) }}
              className="todo__date"
              placeholderText={(record.DueDate).toString()}
            />

          </Form.Item>);

        } else {
          return <p>{text}</p>
        }
      },
    },
    {
      disable: true,
      title: 'Tags for Importance',
      dataIndex: 'tags',
      filters: true,
      onFilter: (text, record) => {

        return record.labels.includes(text);

      },
      filters: [
        {
          text: 'Urgent',
          value: 'Urgent',
        },
        {
          text: 'Priority',
          value: 'Priority',
        },
        {
          text: 'Slow',
          value: 'Slow'
        },
        {
          text: 'Not Important',
          value: 'Not Important'
        }
      ],
      search: false,
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => {
        console.log(statusState)

        if (editingRow === record.id) {

          return (<Form.Item
            name="tags"
            rules={[{
              required: true,
              message: "Please Enter Tags",
            }]}
          >
            <Tags tags={tags} setTags={setTags} />

          </Form.Item>);


        } else {

          if (record.st === 'Done') {
            return (<Space>
              {record?.labels?.map((name) => (
                <Tag key={name}>
                  <s>{name}</s>
                </Tag>
              ))}
            </Space>)
          }
          else {
            return (<Space>
              {record?.labels?.map((name) => (
                <Tag key={name}>
                  {name}
                </Tag>
              ))}
            </Space>)
          }

        }
      },
    },
    {
      dataIndex: 'status',
      title: 'Status',
      onFilter: (value, record) => {

        return value === record.st;
      },
      filters: [
        {
          text: 'Open',
          value: 'Open',
        },
        {
          text: 'Working',
          value: 'Working',
        },
        {
          text: 'Done',
          value: 'Done'
        },
        {
          text: 'Overdue',
          value: 'Overdue'
        }
      ],

      render: (_, record) => (

        <Select placeholder={record.st} style={{ marginLeft: "10px" }} onSelect={(e) => { setStatusState(e); setSelectedRow(record.id); record.st = e; }}>
          {
            stat.map((status, index) => {
              return <Select.Option key={index} value={status}>{status}</Select.Option>
            })
          }
        </Select>
      ),
    },
    {
      title: 'Action',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => {
        // eslint-disable-next-line jsx-a11y/anchor-is-valid

        return (

          <>
            <Button type="link" style={{ marginLeft: 0, padding: 0 }} className={`edit-button-active edit-row-${record.id}`} onClick={() => {
              setIsEditing(true);
              console.log(record)
              setEditingRow(record.id);
              setEditingRowTitle(record.title)
              setEditingRowDesc(record.Description)

              console.log(todo)

              setStartDate(record.DueDate)
              setTags(record.labels)

              document.getElementsByClassName(`save-row-${record.id}`)[0].classList.add('save-button-active')
              document.getElementsByClassName(`save-row-${record.id}`)[0].classList.remove('save-button-unactive')

              document.getElementsByClassName(`edit-row-${record.id}`)[0].classList.add('edit-button-unactive')
              document.getElementsByClassName(`edit-row-${record.id}`)[1].classList.add('edit-button-unactive')

              document.getElementsByClassName(`edit-row-${record.id}`)[0].classList.remove('edit-button-active')
              document.getElementsByClassName(`edit-row-${record.id}`)[1].classList.remove('edit-button-active')


            }}>
              Edit
            </Button>

            <Button type='link' style={{ marginLeft: "15px", padding: 0 }}
              htmlType='submit'
              className={`save-button-unactive save-row-${record.id}`}
              onClick={() => {
                document.getElementsByClassName(`save-row-${record.id}`)[0].classList.add('save-button-unactive')
                document.getElementsByClassName(`save-row-${record.id}`)[0].classList.remove('save-button-active')

                document.getElementsByClassName(`edit-row-${record.id}`)[0].classList.add('edit-button-active')
                document.getElementsByClassName(`edit-row-${record.id}`)[1].classList.add('edit-button-active')

                document.getElementsByClassName(`edit-row-${record.id}`)[0].classList.remove('edit-button-unactive')
                document.getElementsByClassName(`edit-row-${record.id}`)[1].classList.remove('edit-button-unactive')
              }}
            >
              Save
            </Button>

            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
              <a style={{ marginLeft: "15px" }} className={`edit-button-active edit-row-${record.id}`} >Delete</a>
            </Popconfirm>
          </>
        )


      }
    }
  ]
  const actionRef = useRef();

  const [value, setValue] = useState('');

  const onFinish = (values) => {


    const UpdatedDataSource = [...todo]

    values = {
      title: editingRowTitle,
      Description: editingRowDesc,
      DueDate: startDate,
      labels: tags
    }

    UpdatedDataSource[editingRow - 1]['title'] = values.title;
    UpdatedDataSource[editingRow - 1]['Description'] = values.Description
    UpdatedDataSource[editingRow - 1]['DueDate'] = values.DueDate;
    UpdatedDataSource[editingRow - 1]['labels'] = values.labels;

    setTodo(UpdatedDataSource)
    setEditingRow(null)
    setEditingRowTitle(null)
    setEditingRowDesc(null)
    setStartDate(null)
    setTags(null);
    setIsEditing(false);
  }

  return (
    <><Input
      className='table__search'
      style={{ marginBottom: '10px' }}
      placeholder="Search Title ...."
      value={value}

      onSelect={() => {
        if (count === 0) {
          setOriginalTodo(todo);
          setCount(1);
        }
      }}

      onChange={e => {

        const currValue = e.target.value;

        console.log(originalTodo)

        const filteredData = originalTodo.filter(entry =>
          entry.title.includes(currValue)
        );

        setValue(currValue);
        setTodo(filteredData);
      }}
    />
      <Form form={form} onFinish={onFinish}>
        <ProTable
          dataSource={todo}
          actionRef={actionRef}
          columns={columns}
          cardBordered
          editable={{
            type: 'multiple',
          }}

          columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
          }}
          rowKey="id"
          options={{
            setting: {
              listsHeight: 400,
            },
          }}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
          }}
          toolBarRender={false}
          headerTitle="List"
          search={false} />
      </Form>
    </>

  )
}

export default Table