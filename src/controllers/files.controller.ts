import {
  Controller,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Post
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { IncorrectFileException } from 'exceptions';
import { FilesService } from 'services';
import { AuthGuard } from 'guards';
import { FileModel } from 'models';

@ApiTags('files')
@Controller('files')
@UseGuards(AuthGuard)
export class FilesController {
  private filesService: FilesService;

  constructor(filesService: FilesService) {
    this.filesService = filesService;
  }

  @Post('images')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload file' })
  public async uploadFile(@UploadedFile() file): Promise<FileModel> {
    if (!file) throw new IncorrectFileException();

    const { buffer, size, originalname } = file;

    if (!(await this.filesService.filterFile(originalname, size, buffer)))
      throw new IncorrectFileException();

    return this.filesService.createFile('images', originalname, buffer);
  }
}
