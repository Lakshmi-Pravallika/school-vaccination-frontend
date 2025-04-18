import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 

import './GenerateReport.css';

const GenerateReport = () => {
  const [reportData, setReportData] = useState([]);
  const [vaccineFilter, setVaccineFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReport = async (page = 1, filter = '') => {
    try {
      const res = await axios.get(`http://localhost:8081/api/status/report`, {
        params: { vaccineName: filter, page: page - 1, size: 10 },
      });
      setReportData(res.data.students);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Error fetching report:', err);
    }
  };

  useEffect(() => {
    fetchReport(currentPage, vaccineFilter);
  }, [currentPage, vaccineFilter]);

  const handleExportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    const excelBuffer = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'text/csv' });
    saveAs(data, 'Vaccination_Report.csv');
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'Vaccination_Report.xlsx');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['Name', 'Student ID', 'Class', 'Vaccine', 'Status', 'Date'];
    const tableRows = reportData.map(student => [
      student.name,
      student.studentId,
      student.studentClass,
      student.vaccineName,
      student.vaccinated ? 'Yes' : 'No',
      student.dateOfVaccination,
    ]);
    doc.text('Vaccination Report', 14, 15);
    doc.autoTable({ startY: 20, head: [tableColumn], body: tableRows });
    doc.save('Vaccination_Report.pdf');
  };

  return (
    <div className="report-container">
      <h2>📄 Generate Vaccination Report</h2>

      <div className="filter-section">
        <label>Filter by Vaccine Name:</label>
        <input
          type="text"
          value={vaccineFilter}
          onChange={(e) => setVaccineFilter(e.target.value)}
          placeholder="Enter vaccine name"
        />
      </div>

      <table className="report-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Student ID</th>
      <th>Class</th>
      <th>Vaccine Name</th>
      <th>Status</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    {reportData.length === 0 ? (
      <tr><td colSpan="6">No records found.</td></tr>
    ) : (
      reportData.map((student, index) => {
        const status = student.vaccinationStatuses?.[0]; // Get first status if exists
        return (
          <tr key={index}>
            <td>{student.name}</td>
            <td>{student.studentId}</td>
            <td>{student.studentClass}</td>
            <td>{status?.vaccineName || '-'}</td>
            <td>{status?.vaccinated ? 'Yes' : 'No'}</td>
            <td>{status?.dateOfVaccination || '-'}</td>
          </tr>
        );
      })
    )}
  </tbody>
</table>


      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
      </div>

      <div className="export-buttons">
        <button onClick={handleExportCSV}>Download CSV</button>
        <button onClick={handleExportExcel}>Download Excel</button>
        <button onClick={handleExportPDF}>Download PDF</button>
      </div>
    </div>
  );
};

export default GenerateReport;
