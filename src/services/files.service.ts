import { includes } from 'lodash';
import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { fromBuffer as fileTypeFromBuffer } from 'file-type';
import { Prisma, File } from '@prisma/client';
import { AwsService } from 'services/aws.service';
import { PrismaRepository } from 'repositories';

const MAX_FILE_SIZE = 4194304;

@Injectable()
export class FilesService extends AwsService {
  private readonly filesRepository: Prisma.FileDelegate<Prisma.RejectOnNotFound>;

  private readonly allowTypes: string[] = ['png', 'jpg', 'gif', 'heic', 'svg'];

  constructor(private readonly prismaRepository: PrismaRepository) {
    super();

    this.filesRepository = prismaRepository.file;
  }

  private getFileExtension = async (
    originalName: string,
    buffer: Buffer
  ): Promise<string | undefined> => {
    const typeFromBuffer = await fileTypeFromBuffer(buffer);

    return typeFromBuffer?.ext;
  };

  private generateFileKey = (file: File) => {
    return join(file.folder, `${file.id}.${file.extension}`);
  };

  public async filterFile(
    originalName: string,
    size: number,
    buffer: Buffer
  ): Promise<boolean> {
    if (size > MAX_FILE_SIZE) return false;

    const ext = await this.getFileExtension(originalName, buffer);

    return ext ? includes(this.allowTypes, ext) : false;
  }

  public async createFile(
    folderName: string,
    originalName: string,
    buffer: Buffer
  ): Promise<File> {
    const extension = await this.getFileExtension(originalName, buffer);

    const createdFile = await this.filesRepository.create({
      data: {
        folder: folderName,
        name: originalName,
        extension
      }
    });

    if (createdFile) {
      const fileKey = this.generateFileKey(createdFile);

      await this.saveFile(fileKey, buffer);
    }

    return createdFile;
  }

  public getFileById(fileId: string): Promise<File> {
    return this.filesRepository.findUnique({
      where: {
        id: fileId
      }
    });
  }

  public async deleteFileById(fileId: string): Promise<File> {
    const deletedFile = await this.filesRepository.delete({
      where: {
        id: fileId
      }
    });

    if (deletedFile) {
      await this.deleteFile(this.generateFileKey(deletedFile));
    }

    return deletedFile;
  }
}
