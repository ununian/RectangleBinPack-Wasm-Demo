import { PackResultDto } from '../Dto/PackResultDto';
import { ResponseDto } from '../Dto/ResponseDto';
import { Algorithms } from '../model/Algorithms';
import { SourcePanelItem } from '../model/SourcePanelItem';
import { TargetPanelItem } from '../model/TargetPanelItem';
import { request } from '../util/request';
import { IPackService } from './IPackService';

export class PackService implements IPackService {
  public async pack(
    source: SourcePanelItem[],
    target: TargetPanelItem[],
    algorithms: Algorithms,
    algorithmsSetting: Record<string, boolean | string>
  ) {
    return request<PackResultDto>('pack-service/pack', {
      method: 'POST',
      data: {
        source,
        target,
        algorithms,
        [`${algorithms}Setting`]: algorithmsSetting,
      },
    });
  }
}
