import React from 'react'
import * as timeago from "timeago.js";

export default function Record({ record }) {
  return (
    <tr>
    {/* <td>record.date</td> */}
    <td>{record.date.toDate().toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })}</td>
    <td>{record.type}</td>
    <td>{record.title}</td>
    <td>{parseFloat(record.amount).toFixed(2)}</td>
  </tr>
  )
}
