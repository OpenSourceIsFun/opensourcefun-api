import { Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { PrismaRepository } from 'repositories';

@Injectable()
export class ProjectsService {
  private readonly projectsRepository: Prisma.ProjectDelegate<Prisma.RejectOnNotFound>;

  constructor(private readonly prismaRepository: PrismaRepository) {
    this.projectsRepository = prismaRepository.project;
  }

  public async createProject(
    info: Prisma.ProjectUncheckedCreateInput
  ): Promise<Project> {
    return this.projectsRepository.create({
      data: info
    });
  }

  public async updateProjectById(
    id: string,
    info: Prisma.ProjectUncheckedCreateInput
  ): Promise<Project> {
    return this.projectsRepository.update({
      where: {
        id
      },
      data: info
    });
  }

  public async getProjectById(projectId: string): Promise<Project> {
    return this.projectsRepository.findUnique({
      where: {
        id: projectId
      },
      include: {
        logoFile: true,
        bannerFile: true
      }
    });
  }

  public async getProjectByAlias(alias: string): Promise<Project> {
    return this.projectsRepository.findUnique({
      where: {
        alias
      },
      include: {
        logoFile: true,
        bannerFile: true
      }
    });
  }

  public async getProjectByAddress(address: string): Promise<Project> {
    return this.projectsRepository.findFirst({
      where: {
        address
      }
    });
  }

  public getAllProjects(): Promise<Project[]> {
    return this.projectsRepository.findMany();
  }

  public async getProjectsList(
    search: string,
    offset = 0,
    count = 20,
    filters: any = {}
  ): Promise<[Project[], number]> {
    const rules: any = {
      where: {
        title: {
          contains: search
        }
      }
    };

    if (filters.network) {
      rules.where.network = filters.network;
    }

    const total = await this.projectsRepository.count(rules);

    const data = await this.projectsRepository.findMany({
      ...rules,
      include: {
        logoFile: true,
        bannerFile: true
      },
      skip: offset,
      take: count
    });

    return [data, total];
  }
}
