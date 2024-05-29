/**
 * Capitalizes the first letter of everyword in a string
 */
export function capitalizeEach(str: string | null): string | null {
  if (!str) return null

  const words = str.split(" ")
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })

  return capitalizedWords.join(" ")
}