import React, { useState } from "react";
import { render } from "react-dom";
import { DatePicker, Radio, Button, Timeline } from "antd";
import "antd/dist/antd.css";
import "./index.css";

function App() {
  const [dates, setPoop] = useState([]);
  const [firmness, setFirmness] = useState();
  const [amount, setAmount] = useState();

  const handleChange = (date, dateString) => {
    console.log("Selected Time: ", date);
    console.log("Formatted Selected Time: ", dateString);
    setPoop([
      ...dates,
      { id: dates.length, date: dateString, firmness, amount }
    ]);
  };

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
      <form onSubmit={handleChange}>
        <div style={{ marginBottom: 40 }}>
          <div>
            <h3>Stool firmness</h3>
            <Radio.Group onChange={e => setFirmness(e.target.value)}>
              <Radio.Button value="hard">Hard</Radio.Button>
              <Radio.Button value="normal">Normal</Radio.Button>
              <Radio.Button value="loose">Loose</Radio.Button>
              <Radio.Button value="diarrhea">Diarrhea</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <h3>Amount</h3>

            <Radio.Group
              onChange={e => setAmount(e.target.value)}
              defaultValue="normal"
            >
              <Radio.Button value="4">4 + 💩</Radio.Button>
              <Radio.Button value="3">3 💩</Radio.Button>
              <Radio.Button value="2">2 💩</Radio.Button>
              <Radio.Button value="1">1 💩</Radio.Button>
            </Radio.Group>
          </div>
        </div>
        <div style={{ width: 400, margin: "100px auto" }}>
          <DatePicker showTime onChange={handleChange} defaultValue={""} />
          <div style={{ marginTop: 20 }}>Selected Date: {dates.date}</div>
        </div>

        <Button onClick={handleChange} type="primary" value="Register">
          Add poo
        </Button>
      </form>
    </div>
  );
}

render(<App />, document.getElementById("root"));
