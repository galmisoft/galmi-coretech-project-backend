export const checkFiles = (req, res, next) => {
  if (req.files.length === 0) {
    return res.status(400).json({ msg: 'No files were uploaded' })
  }
  next()
}