import React, { useEffect, useState } from 'react'
import { Form, Row, Col, FormControl, Button } from 'react-bootstrap';
import { GrAddCircle } from "react-icons/gr";
import DatePicker from "react-datepicker";
import { AiFillCalendar } from "react-icons/ai"
import "react-datepicker/dist/react-datepicker.css";
import { collection, addDoc, doc } from "firebase/firestore"; 
import { db } from '../firebase';
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function MoneyForm() {
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const { currentUser } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    if (type === '') {
      return 
    }

    try {
      await addDoc(collection(db, "records"), {
        date,
        title,
        amount,
        type,
        userId: doc(db, "users", currentUser.uid),
      });
      
      setTitle("");
      setAmount("");
      setType("");

    } catch (e) {
      console.log(e);
    }


  }


  /* make sure that the user is loged in. if the user is loged in, then they can add records as they wish
  * otherwise, jump to the login page and ask the user to login 
  */
  const history = useHistory();
  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    }
  }, [currentUser, history]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row className='align-items-center'>
          <Col sm={2} className='my-1'>
            <DatePicker
              required
              // showIcon
              selected={date}
              onChange={(date) => setDate(date)}
              maxDate={new Date()}
              isClearable
              showYearDropdown
              showTimeSelect
              className='form-control'
              dateFormat="yyyy/MM/dd"
            />
          </Col>
          <Col sm={2} className='my-1'>
            <Form.Select value={type} onChange={e => setType(e.target.value)} required>
              <option value="">Select Type</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </Form.Select>
          </Col>
          <Col sm={2} className='my-1'>
           <FormControl value={title} onChange={e => setTitle(e.target.value)} required placeholder='Title'/>
          </Col>
          <Col sm={2} className='my-1'>
           <FormControl 
            value={amount} 
            onChange={e => setAmount(e.target.value)} 
            required 
            placeholder='Amount' 
            type="number"
            step='0.01'
           />
          </Col>
          <Col xs="auto" className='my-1'>
            <Button type='submit'><GrAddCircle /> Add</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
