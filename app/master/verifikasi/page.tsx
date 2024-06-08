"use client"
import moment from "moment";
import Update from "./action/Update"
import React, { useState, useEffect, useRef } from 'react';
import { Pagination, Badge } from 'react-bootstrap';
import { warnastatus } from "@/app/helper";
import DataTable from 'react-data-table-component';

const VerifikasiJobdesk = () => {
  const [datajobdesk, setDatajobdesk] = useState([])
  const [filterText, setFilterText] = React.useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetchDataJobdesk()
  }, [])

  const fetchDataJobdesk = async () => {
    try {
      const response = await fetch(`/master/api/verifikasi`);
      const result = await response.json();
      setDatajobdesk(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = datajobdesk.filter(
    (item: any) => item.namaJob && item.namaJob.toLowerCase().includes(filterText.toLowerCase()),
  );

  const columns = [
    {
      name: 'No',
      cell: (row: any, index: number) => <div>{(currentPage - 1) * itemsPerPage + index + 1}</div>,
      sortable: false,
      width: '80px'
    },
    {
      name: 'Nama Tugas',
      selector: (row: any) => row.namaJob,
      sortable: true,
      width: '320px'
    },
    {
      name: 'Tanggal Deadline',
      selector: (row: any) => moment(row.deadline).format("DD-MM-YYYY"),
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
      cell: (row: any) => (
        <div
          style={{
            backgroundColor: warnastatus(row.status),
            padding: '8px',
            borderRadius: '4px',
            color: 'black',
          }}
        >
          {row.status}
        </div>
      ),
      width: '150px'
    },
    {
      name: 'Action',
      cell: (row: any) => (
        <div className="d-flex">
          <Update jobdesk={row} reload={fetchDataJobdesk} />
        </div>
      ),
      width: '200px'
    },

  ];

  return (
    <div>
    <div className="row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">Verifikasi Tugas</h1>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-9">
              </div>
              <div className="col-md-3">
                <div className="input-group mb-3  input-success">
                  <span className="input-group-text border-0"><i className="mdi mdi-magnify"></i></span>
                  <input
                    id="search"
                    type="text"
                    placeholder="Search..."
                    aria-label="Search Input"
                    value={filterText}
                    onChange={(e: any) => setFilterText(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <DataTable
              columns={columns}
              data={filteredItems}
              pagination
              persistTableHead
              responsive
              paginationPerPage={itemsPerPage}
              paginationTotalRows={filteredItems.length}
              onChangePage={(page) => setCurrentPage(page)}
              onChangeRowsPerPage={handleRowsPerPageChange}
              paginationRowsPerPageOptions={[5, 10, 20]}
              customStyles={{
                headRow: {
                  style: {
                    backgroundColor: '#53d0b2',
                    fontSize: 15,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div >
  </div >
  )
}

export default VerifikasiJobdesk