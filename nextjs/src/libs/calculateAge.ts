export const calculateAge = (birthdate, endDate) => {
  const birthDate = new Date(birthdate)
  const endDateObj = new Date(endDate)
  let age = endDateObj.getFullYear() - birthDate.getFullYear()
  const monthDiff = endDateObj.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && endDateObj.getDate() < birthDate.getDate())) {
    age--
  }

  // Cek jika usia pas 6 bulan
  const sixMonthsDate = new Date(birthDate)

  sixMonthsDate.setMonth(sixMonthsDate.getMonth() + 6)

  if (
    endDateObj.getFullYear() === sixMonthsDate.getFullYear() &&
    endDateObj.getMonth() === sixMonthsDate.getMonth() &&
    endDateObj.getDate() === sixMonthsDate.getDate()
  ) {
    // Jika pas 6 bulan
    const dayDiff = endDateObj.getDate() - birthDate.getDate()

    if (dayDiff > 15) {
      age++
    } else if (dayDiff < 15) {
      age--
    }
  } else if (monthDiff >= 6) {
    age++
  }

  return age
}
