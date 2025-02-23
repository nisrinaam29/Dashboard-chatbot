import React from 'react'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const exportToPDF = componentRef => {
  // Get the component's HTML element
  const component = componentRef.current

  // Use html2canvas to capture the component as an image
  html2canvas(component).then(canvas => {
    // Convert canvas to PDF
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgWidth = pdf.internal.pageSize.getWidth()
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    pdf.save('component.pdf')
  })
}

export default exportToPDF
