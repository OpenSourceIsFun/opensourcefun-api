import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { UserRoleTypes } from '@prisma/client';
import { ProjectsService, FilesService } from 'services';
import { CreateOrUpdateProjectDto } from 'dto/projects';
import { AvailableForRole } from 'decorators';
import { ProjectModel, ProjectsListModel } from 'models';
import { AuthGuard } from 'guards';
import { ListQueryDto } from 'dto/shared';
import { NotFoundException } from 'exceptions';

@Controller('projects')
@ApiTags('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly filesService: FilesService
  ) {}

  @Get('/list')
  @ApiResponse({
    status: 200,
    description: 'The found projects list',
    type: ProjectsListModel
  })
  async getProjectsList(
    @Query()
    { search, offset, count }: ListQueryDto
  ): Promise<ProjectsListModel> {
    const [data, total] = await this.projectsService.getProjectsList(
      search,
      offset,
      count
    );

    return {
      data,
      total
    };
  }

  @Get('/all')
  @ApiResponse({
    status: 200,
    description: 'The all projects',
    type: [ProjectModel]
  })
  getAllProjects(): Promise<ProjectModel[]> {
    return this.projectsService.getAllProjects();
  }

  @Get('/by-alias/:alias')
  @ApiOkResponse({ type: ProjectModel })
  async getProjectByAlias(
    @Param('alias') alias: string
  ): Promise<ProjectModel> {
    const project = await this.projectsService.getProjectByAlias(alias);

    if (!project) throw new NotFoundException('project-by-alias', alias);

    return project;
  }

  @Get('/by-id/:id')
  @ApiOkResponse({ type: ProjectModel })
  async getProjectById(@Param('id') id: string): Promise<ProjectModel> {
    const project = await this.projectsService.getProjectById(id);

    if (!project) throw new NotFoundException('project', id);

    return project;
  }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse()
  @UseGuards(AuthGuard)
  @AvailableForRole(UserRoleTypes.ADMIN)
  async createProject(
    @Body()
    { logoFileId, bannerFileId, ...createData }: CreateOrUpdateProjectDto
  ): Promise<ProjectModel> {
    const logoFile = logoFileId
      ? await this.filesService.getFileById(logoFileId)
      : null;

    if (logoFileId && !logoFile)
      throw new NotFoundException('logoFile', logoFileId);

    const bannerFile = bannerFileId
      ? await this.filesService.getFileById(bannerFileId)
      : null;

    if (bannerFileId && !bannerFile)
      throw new NotFoundException('logoFile', logoFileId);

    return this.projectsService.createProject({
      ...createData,
      logoFileId,
      bannerFileId
    });
  }

  @Put('/:id')
  @ApiBearerAuth()
  @ApiCreatedResponse()
  @UseGuards(AuthGuard)
  @AvailableForRole(UserRoleTypes.ADMIN)
  async updateProject(
    @Param('id') id: string,
    @Body()
    { logoFileId, bannerFileId, ...updateData }: CreateOrUpdateProjectDto
  ): Promise<ProjectModel> {
    const existProject = await this.projectsService.getProjectById(id);

    if (!existProject) throw new NotFoundException('project', id);

    const logoFile = logoFileId
      ? await this.filesService.getFileById(logoFileId)
      : null;

    if (logoFileId && !logoFile)
      throw new NotFoundException('logoFile', logoFileId);

    const bannerFile = bannerFileId
      ? await this.filesService.getFileById(bannerFileId)
      : null;

    if (bannerFileId && !bannerFile)
      throw new NotFoundException('logoFile', logoFileId);

    const updatedProject = await this.projectsService.updateProjectById(id, {
      ...updateData,
      logoFileId,
      bannerFileId
    });

    if (
      existProject.logoFileId &&
      existProject.logoFileId !== updatedProject.logoFileId
    ) {
      await this.filesService.deleteFileById(existProject.logoFileId);
    }

    if (
      existProject.bannerFileId &&
      existProject.bannerFileId !== updatedProject.bannerFileId
    ) {
      await this.filesService.deleteFileById(existProject.bannerFileId);
    }

    return updatedProject;
  }
}
