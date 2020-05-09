// todo 
// setFirmness and amount not updating
import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Form, Input, DatePicker, Radio, Button, Timeline } from "antd";
import moment from "moment";
import "antd/dist/antd.css";
import "./index.css";

function App() {
  let date = new Date();

  const [dates, setPoop] = useState(
    JSON.parse(localStorage.getItem('poops'))
  || []
  );
  const [firmness, setFirmness] = useState();
  const [amount, setAmount] = useState();
  const [poodate, setDate] = useState(moment(date));

  const onFinish = (values, dateString) => {
    console.log("Received values of form: ", values);
    console.log("Selected Time: ", date);
    console.log("Formatted Selected Time: ", dateString);
    console.log(firmness);
    setDate(moment(date));
    setPoop([
      ...dates,
      { id: dates.length, 
        date: dateString, 
        firmness, 
        amount 
      }
    ]);
    setDate("");
    console.log("poodate" + poodate);
  };

  useEffect(() => {
    localStorage.setItem("poops", JSON.stringify(dates));
  }, [dates]);

  const handleChange = (date, dateString) => {
    console.log("Selected Time: ", date);
    console.log("Formatted Selected Time: ", dateString);
    setPoop([
      ...dates,
      { id: dates.length, date: dateString, firmness, amount }
    ]);
    setDate("test");
  };

  const deletePoo = () => {
    setPoop('')
  }

  return (
    <div style={{ width: 400, margin: "100px auto" }}>
      {dates.length > 0 && (
        <Timeline>
          {dates.map(dates => (
            <Timeline.Item key={dates.length}>
              <p>
                {dates.date} {dates.firmness} {dates.amount} 💩
              </p>
            </Timeline.Item>
          ))}
        </Timeline>
      )}

      {dates.length <= 0 && <p>No poo</p>}

      <Form
        initialValues={{
          remember: true
        }}
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
        >
          <Radio.Group
            handleChange={e => setFirmness(e.target.value)}
            defaultValue="normal"
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
              type: "array"
            }
          ]}
        >
          <Radio.Group handleChange={e => setAmount(e.target.value)}>
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
        <div style={{ width: 400, margin: "100px auto" }}>
          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message: "Please input a date!"
              }
            ]}
          >
            <DatePicker onChange={onFinish} />
          </Form.Item>
          <div style={{ marginTop: 20 }}>Selected Date: {dates.date}</div>
        </div>
        <Form.Item>
          <Button type="primary" value="Register" htmlType="submit">
            Add poo
          </Button>
        </Form.Item>
      </Form>
      <Button type="primary" value="delete" 
        onChange={deletePoo}>
        Delete poo
      </Button>
    </div>
  );
}

render(<App />, document.getElementById("root"));
