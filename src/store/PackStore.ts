import { defineStore } from 'pinia';
import { PackResultDto } from '../Dto/PackResultDto';
import { Algorithms } from '../model/Algorithms';
import { SourcePanelItem } from '../model/SourcePanelItem';
import { TargetPanelItem } from '../model/TargetPanelItem';
import { WasmPackService } from '../service/WasmPackService';
import { useService } from '../util/useService';

const service = new WasmPackService();

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const usePackStore = defineStore('pack', {
  // a function that returns a fresh state
  state: () => ({
    source: [] as SourcePanelItem[],
    target: [] as TargetPanelItem[],
    result: null as PackResultDto | null,
    algorithms: 'Shelf' as Algorithms,
    algorithmsSetting: {} as Record<string, boolean | string>,
  }),
  getters: {},
  actions: {
    async pack() {
      const res = await service.pack(
        this.source,
        this.target,
        this.algorithms,
        this.algorithmsSetting
      );
      if (res.Data && !res.Error) {
        this.result = res.Data;
      }
    },
  },
});
