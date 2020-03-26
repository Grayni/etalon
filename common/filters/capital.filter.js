export default word => {
  word = word.replace(/^\w/, x => x.toUpperCase())
  return word
}