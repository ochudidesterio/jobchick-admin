import React from 'react'
import { useTranslation } from 'react-i18next';


const CompanyDetailTable = ({company}) => {
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
                    fontWeight: "600",
                    textAlign: "right",

                    fontFamily: "Open Sans",
                  }}
                >
                  {t('name')}
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px",
                    fontWeight: "600",
                    textAlign: "right",

                    fontFamily: "Open Sans",
                  }}
                >
                  {t('email')}
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px",
                    fontWeight: "600",
                    textAlign: "right",

                    fontFamily: "Open Sans",
                  }}
                >
                  {t('location')}
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