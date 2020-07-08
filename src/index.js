// todo 
// setFirmness and amount not updating
import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Layout, Menu, Form, DatePicker, Radio, Button, Timeline, Card } from "antd";
import moment from "moment";
import MomentReact from 'react-moment';
import "antd/dist/antd.css";
import "./index.css";
import { SmileTwoTone } from '@ant-design/icons';


function App() {
  const [form] = Form.useForm();

  let date = new Date();

  const [dates, setPoop] = useState(()=>{
      return JSON.parse(localStorage.getItem('poops')) || [];
    });

  const [firmness, setFirmness] = useState([]);
  const [amount, setAmount] = useState();
  const [poodate, setDate] = useState(moment(date));

 const onFinish = values => {
    setPoop([
      ...dates,
      {
        id: dates.length + 1,
        date: poodate,
        firmness,
        amount
      }
    ]);
   form.resetFields();
   };

  useEffect((e) => {
    console.log(e)
    console.log(amount);
    console.log(firmness)
    console.log(dates)
  }, [firmness, amount, dates])

  useEffect(() => {
    localStorage.setItem("poops", JSON.stringify(dates));
  }, [dates]);

  function handleFirmnessChange(e) {
    setFirmness(e.target.value)

  }

  function handlePoopChange(e) {
    setAmount(e.target.value)
  }

  function handleDateChange(date, dateString) {
    console.log(date, dateString)
    setDate(dateString)
  }

  function handleDeleteClick(id) {
    console.log("test")
    console.log(id)
    setPoop("");
  }

  function handleDeletePoop(id) {
    setPoop(dates.filter(date => date.id !== id))
  }

  return (
    <Layout className="layout">
      <Menu mode="horizontal">
        <Menu.Item icon={<SmileTwoTone />}>
          Poo history
        </Menu.Item>
      </Menu>
      <div style={{ padding: '50px' }}>
        <Card 
          title="💩"
          style={{ marginBottom: 16}}>
          <Card type="inner" title="Last 💩 date"> 
          {dates.length <= 0 && <p>No poo</p>}
            {dates.length > 0 && <p>
              <MomentReact 
                date={dates[dates.length - 1].date} durationFromNow
              />
            </p>}

          
          </Card> 
        </Card>
      

        <Form
          name="poop"
          initialValues={{
            remember: true
          }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="radio-button"
            label="Firmness"
            rules={[
              {
                required: true,
                message: "Please input poop hardness!"
              }
            ]}
            defaultValue="normal"
          >
            <Radio.Group
              onChange={handleFirmnessChange}
            >
              <Radio.Button value="hard">Hard</Radio.Button>
              <Radio.Button value="normal">Normal</Radio.Button>
              <Radio.Button value="loose">Loose</Radio.Button>
              <Radio.Button value="diarrhea">Diarrhea</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="radio-button"
            label="Number of 💩"
            rules={[
              {
                required: true,
                message: "Please input poop amount!",
              }
            ]}
          >
            <Radio.Group on onChange={handlePoopChange}>
              <Radio.Button value="4">4 + 💩</Radio.Button>
              <Radio.Button value="3">3 💩</Radio.Button>
              <Radio.Button value="2">2 💩</Radio.Button>
              <Radio.Button value="1">
                1{" "}
                <span role="img" aria-lablelledby="poo">
                  💩
                </span>
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <div>
            <Form.Item
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please input a date!"
                }
              ]}
            >
              <DatePicker onChange={handleDateChange} />
            </Form.Item>
            <div style={{ marginTop: 20 }}>Selected Date: {dates.date}</div>
          </div>
          <Form.Item>
            <Button type="primary" value="Register" htmlType="submit">
              Add poo
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="secondary" value="delete"
              onClick={handleDeleteClick}>
              Delete poo
            </Button>
          </Form.Item>
        </Form>
        {dates.length > 0 && (
          <Timeline title="Poo log">
            {dates.map(dates => (
              <div>
                <Timeline.Item key={dates.length}>
                  <p>
                    {dates.date} {dates.firmness} {dates.amount} 💩
                </p>
                  <Button type="dashed"
                    danger
                    onClick={() => handleDeletePoop(dates.id)}>Delete</Button>
                </Timeline.Item>

              </div>
            ))}
          </Timeline>
        )}

        {dates.length <= 0 && <p>No poo</p>}
      </div>
      </Layout>
  );
}

render(<App />, document.getElementById("root"));
