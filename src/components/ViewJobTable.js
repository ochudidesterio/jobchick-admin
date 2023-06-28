import React from 'react'

const ViewJobTable = ({job}) => {
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
                  Title
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
                  Category
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
                  Region
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
                  Type
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
                  Level
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
                  {job.title}
                </td>
                <td
                  style={{
                    padding: "8px",
                    fontSize: "13px",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {job.category}
                </td>
                <td
                  style={{
                    padding: "8px",
                    fontSize: "13px",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {job.region}
                </td>
                <td
                  style={{
                    padding: "8px",
                    fontSize: "13px",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {job.type}
                </td>
                <td
                  style={{
                    padding: "8px",
                    fontSize: "13px",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {job.level}
                </td>
              </tr>
            </tbody>
          </table>
  )
}

export default ViewJobTable