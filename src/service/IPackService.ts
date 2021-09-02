import { PackResultDto } from '../Dto/PackResultDto';
import { ResponseDto } from '../Dto/ResponseDto';
import { Algorithms } from '../model/Algorithms';
import { SourcePanelItem } from '../model/SourcePanelItem';
import { TargetPanelItem } from '../model/TargetPanelItem';


export interface IPackService {
  pack(
    source: SourcePanelItem[],
    target: TargetPanelItem[],
    algorithms: Algorithms,
    algorithmsSetting: Record<string, boolean | string>
  ): Promise<ResponseDto<PackResultDto>>
}
