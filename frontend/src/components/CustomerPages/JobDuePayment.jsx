import React, { useState } from 'react';
import Table from '../Table/Table'

const JobDuePayment = () => {

  const [data,] = useState([
    [],
  ]);
  const Columns = ['Invoice Number','Customer', 'Total Amount','Due Amount'];

  return (
    <div>
      <div className="scrolling-container">
        <h4>Due Customers</h4>
        <Table
            data={data}
            columns={Columns}
            showButton={false}
          />
      </div>
    </div>
  )
}

export default JobDuePayment