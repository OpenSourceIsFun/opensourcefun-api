import { Controller, Post, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DistributorService } from 'services';

@Controller('events-listener')
@ApiTags('events-listener')
export class EventsListenerController {
  constructor(private readonly distributorService: DistributorService) {}

  @Post('listen/:address')
  @ApiOkResponse()
  async listen(@Param('address') address: string) {
    await this.distributorService.listen(address);
  }
}
