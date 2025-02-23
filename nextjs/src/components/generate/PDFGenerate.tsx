import ReactDOMServer from 'react-dom/server'
import { jsPDF } from 'jspdf'

import Export from '../Export/Export'

import styles from '@core/styles/table.module.css'

const ComponentDownlod = ({ text }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr style={{ backgroundColor: 'black' }}>
          <th>{text}</th>
          <th>{text}</th>
          <th>{text}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cek</td>
          <td>Cek</td>
          <td>Cek</td>
        </tr>
      </tbody>
    </table>
  )
}

const PDFGenerate = () => {
  const handleExportToPDF = () => {
    // Render React component to HTML
    const componentHtml = ReactDOMServer.renderToString(<ComponentDownlod text='Hello' />)

    // Create a new PDF document
    const pdf = new jsPDF()

    pdf.html(componentHtml, {
      callback: () => {
        // Save or download the PDF
        pdf.save('component.pdf')
      }
    })
  }

  return (
    <>
      <button onClick={handleExportToPDF}>Download</button>
    </>
  )
}

export default PDFGenerate
