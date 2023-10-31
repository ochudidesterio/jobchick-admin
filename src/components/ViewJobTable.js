import React from 'react'
import { useTranslation } from 'react-i18next';


const ViewJobTable = ({job}) => {
  const {t} = useTranslation()
  return (
    <table dir='rtl'
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
                    textAlign: "right",
                    fontWeight: "600",
                    fontFamily: "Open Sans",
                  }}
                >
                  {t('title')}
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "right",
                    fontWeight: "600",
                    fontFamily: "Open Sans",
                  }}
                >
                  {t('categories')}
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "right",
                    fontWeight: "600",
                    fontFamily: "Open Sans",
                  }}
                >
                  {t('regions')}
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "right",
                    fontWeight: "600",
                    fontFamily: "Open Sans",
                  }}
                >
                  {t('type')}
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "right",
                    fontWeight: "600",
                    fontFamily: "Open Sans",
                  }}
                >
                  {t('level')}
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