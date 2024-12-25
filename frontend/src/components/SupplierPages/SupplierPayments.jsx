import React from 'react';
import Table from '../../components/Table/Table';

const columns = ['#', 'Store Name', 'Supplier Name/Position', 'Supplied Date','Cheque No','Cheque Given Date','Cheque Date', 'Total Amount', 'Paid', 'Outstanding', 'Status'];

const data = [
  ['1', 'ABC Store', 'John Doe/Manager', '2024-09-28 11.00AM', 'Cheque No 01', '2024-12-25', '2025-01-20', '5000', '5000', '0', ' Paid '],
  ['2', 'XYZ Store', 'Jane Smith/Supplier', '2024-09-28 11.00AM', 'Cheque No 02', '2024-12-25', '2025-01-20', '5000', '4000', '1000', 'Due Payment']
];

const btnName = ' + New Payment To Supplier ';

const title = 'Supplier Payment Details';
const invoice = 'Supplier Payment Details.pdf';

function SupplierPayments() {
  return (
    <div>
      <div className="scrolling-container">
        <h4>Supplier Payment Details</h4>
        <Table
          search={'Search by Supplier Name'}
          data={data}
          columns={columns}
          btnName={btnName}
          showDate={false}
          title={title}
          invoice={invoice}
        />
      </div>
    </div>
  );
}

export default SupplierPayments;
