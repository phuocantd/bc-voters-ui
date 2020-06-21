/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL_VOTING } from "../../constants";
import { Card, Form, Input, Checkbox, Col, Row, Button, InputNumber, message } from "antd";

import "./index.css";

const infoStyle = {
  width: "50%",
  // textAlign: "center",
};

const voteStyle = {
  width: "50%",
};

function Home() {
  const [loading, setLoading] = useState(true);
  const [election, setElection] = useState("");
  const [list, setList] = useState([]);
  // const [infoVoter, setInfoVoter] = useState({
  //   cmnd: "",
  // });
  const [selecteds, setSelecteds] = useState([]);

  useEffect(() => {
    axios
      .all([
        axios({ method: "GET", url: `${URL_VOTING}/get-candidates` }),
        axios({ method: "GET", url: `${URL_VOTING}/get-election-name` }),
      ])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];

          // use/access the results
          setList(responseOne.data.candidates);
          setElection(responseTwo.data.election);
          setLoading(false);
        })
      )
      .catch((err) => console.log(err));

    // .then((res) => {
    //   setList(res.data.candidates);
    //   setLoading(false);
    // })
    // .catch((err) => console.log(err));
  }, []);

  // const handleSubmit = () => {
  //   console.log({ infoVoter, selecteds });
  // };

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = async (values) => {
    console.log(values, selecteds);
    try {
      await axios({
        method: "post",
        url: URL_VOTING + "/vote",
        data: values,
      });
      message.success("Vote succeed");
    } catch (error) {
      console.log(error);
      message.error("Vote failed");
    }
  };

  if (loading) {
    return <h1>loading</h1>;
  }

  return (
    <div className="container">
      <Card title={election} style={{ width: "80%" }}>
        <Card.Grid style={infoStyle}>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["user", "cmnd"]}
              label="CMND"
              rules={[
                {
                  required: true,
                },
                {
                  pattern: "^[0-9]*$",
                  message: "CMND includes number",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={["user", "name"]} label="Name">
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "age"]}
              label="Age"
              rules={[
                {
                  type: "number",
                  min: 18,
                  max: 99,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card.Grid>
        <Card.Grid style={voteStyle}>
          <Form>
            <Form.Item>
              <Checkbox.Group
                value={selecteds}
                onChange={(e) => {
                  setSelecteds(e);
                }}
              >
                <Row>
                  {list.map((name, idx) => (
                    <Col span={12} key={idx.toString()}>
                      <Checkbox
                        value={name}
                        style={{
                          lineHeight: "32px",
                        }}
                      >
                        {name}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Form>
        </Card.Grid>
      </Card>
    </div>
  );
}

export default Home;
