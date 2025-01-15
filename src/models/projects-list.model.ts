import { ApiProperty } from '@nestjs/swagger';
import { ProjectModel } from 'models/project.model';

export class ProjectsListModel {
  @ApiProperty({ type: [ProjectModel] })
  data: ProjectModel[];

  @ApiProperty()
  total: number;
}
