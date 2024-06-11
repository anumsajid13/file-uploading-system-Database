
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/fileUploads', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const fileSchema = new mongoose.Schema({
  originalName: String,
  fileName: String,
  filePath: String,
  uploadDate: { type: Date, default: Date.now },
});

const File = mongoose.model('File', fileSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = file.mimetype.split('/')[0];
    const folderName = `${fileType}-folder`;
    const uploadPath = path.join(__dirname, 'uploads', folderName);

    // Check if folder exists, if not, create a new folder
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Route to upload the files
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const newFile = new File({
    originalName: req.file.originalname,
    fileName: req.file.filename,
    filePath: req.file.path,
  });

  try {
    await newFile.save();
    res.status(200).json({ message: 'File uploaded successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving file metadata.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
