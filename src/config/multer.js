import multer from 'multer'
import {v4} from 'uuid'
import {extname, resolve } from 'node:path'

/**Esse código configura o Multer para upload de arquivos. Ele define:
Destino (destination) → pasta uploads para salvar os arquivos.
Nome do arquivo (filename) → gera um UUID único + extensão original do arquivo, garantindo nomes únicos e evitando sobrescritas. */

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'uploads'),
        filename: (request, file, callback) => callback(null, v4() + extname(file.originalname)),
        }),
}