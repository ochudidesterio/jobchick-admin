import React from 'react'

const CompanyDetailTable = ({company}) => {
  return (
    <table
            style={{
              width: "90%",
              borderCollapse: "collapse",
              margin: "auto",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                    fontWeight: "600",
                    fontFamily: "Open Sans",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                    fontWeight: "600",
                    fontFamily: "Open Sans",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                    fontWeight: "600",
                    fontFamily: "Open Sans",
                  }}
                >
                  Location
                </th>
                
              
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    padding: "8px",
                    fontSize: "13px",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {company.name}
                </td>
                <td
                  style={{
                    padding: "8px",
                    fontSize: "13px",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {company.email}
                </td>
                <td
                  style={{
                    padding: "8px",
                    fontSize: "13px",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {company.location}
                </td>
                
                
              </tr>
            </tbody>
          </table>
  )
}

export default CompanyDetailTable