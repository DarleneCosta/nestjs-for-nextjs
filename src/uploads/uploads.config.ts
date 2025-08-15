import { memoryStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

//isto storage do multer
//O memoryStorage fica na memória do servidor
export const storage = memoryStorage();

export const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new BadRequestException('Somente imagens são permitidas'), false);
  } else {
    return cb(null, true);
  }
};

export const limits = {
  fileSize: 900 * 1024, // 900KB
};
