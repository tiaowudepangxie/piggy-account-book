import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { getDocs, doc, collection } from "firebase/firestore"; 
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import Record from './Record';
import Loader from './Loader';

export default function MoneyList({records, loading}) {
  console.log("RFC", records);

  return (
    <>
    { loading && <Loader />}
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Title</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        { records.map(record => <Record record={record}/>) }
      </tbody>
    </Table>
    </>
  )
}
