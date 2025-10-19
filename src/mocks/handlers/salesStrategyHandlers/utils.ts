export const compareValues = (a: unknown, b: unknown): number => {
  // null / undefined → в конец
  if (a == null && b == null) return 0
  if (a == null) return 1
  if (b == null) return -1

  // Числа
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b
  }

  // Даты (если оба — строки в ISO-формате)
  if (typeof a === 'string' && typeof b === 'string') {
    const dateA = new Date(a)
    const dateB = new Date(b)
    const isDateA = !isNaN(dateA.getTime())
    const isDateB = !isNaN(dateB.getTime())

    if (isDateA && isDateB) {
      return dateA.getTime() - dateB.getTime()
    }
  }

  // Строки (включая числа как строки)
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const strA = String(a).toLowerCase()
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const strB = String(b).toLowerCase()

  if (strA < strB) return -1
  if (strA > strB) return 1
  return 0
}
