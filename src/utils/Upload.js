import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Le chemin du dossier d'uploads
const uploadDir = path.join(__dirname, '../public/uploads');

// Vérifier si le dossier d'uploads existe, sinon le créer
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
};

// // Verification extension fichier
// const fileFilter = (req, file, cb) => {
//     // Get the type of file.
//     const ext = file?.mimetype?.split("/")[0];
//     if (ext != "image")
//         cb(new Error(`Le fichier uploadé n'est pas une image`));
// };

// const limits = {
//     fileSize: 2 * 1024 * 1024, // Limite de taille du fichier (ici, 2 Mo)
// };

// Destination fichier
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Configure storage engine instead of dest object.
export default multer({
    storage: storage,
    // fileFilter: fileFilter
    // limits: limits
}).array('files');