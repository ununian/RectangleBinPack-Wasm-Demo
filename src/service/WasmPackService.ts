import { PackResultDto } from '../Dto/PackResultDto';
import { ResponseDto } from '../Dto/ResponseDto';
import { Algorithms } from '../model/Algorithms';
import { SourcePanelItem } from '../model/SourcePanelItem';
import { TargetPanelItem } from '../model/TargetPanelItem';
import { IPackService } from './IPackService';
import type { RectangleBinPackModule as PackModule, Rect as WasmRect } from 'rectanglebinpack-wasm'
import PackWasmInit from 'rectanglebinpack-wasm';
import PackWasm from 'rectanglebinpack-wasm/dist/Warp.wasm?url'
import { range } from 'lodash';


type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

const toEnumValue = (enumObj: any, value: any) => enumObj[value]

type Rect = NonFunctionProperties<WasmRect>;

export class WasmPackService implements IPackService {

  private wasm?: PackModule;

  constructor() {
    PackWasmInit({ locateFile: (url) => url.endsWith('.wasm') ? PackWasm : url }).then(wasm => {
      this.wasm = wasm;
    })
  }

  public async pack(
    source: SourcePanelItem[],
    target: TargetPanelItem[],
    algorithms: Algorithms,
    setting: Record<string, boolean | string>
  ) {
    if (!this.wasm) return { Error: { Code: 1, Message: 'Wasm Not Loaded' } }
    if (source.length > 0 && target.length > 0) {
      const m = this.wasm;
      const targetSizes = new m.VectorRectSize();
      target
        .flatMap(t => range(0, Math.max(t.count, 0))
          .map(_ => new m.RectSize(t.width, t.height)))
        .forEach((i) => targetSizes.push_back(i));

      let resultRects = new m.VectorRect();
      let occupancy = 0.0;

      const sourceWidth = source[0].width;
      const sourceHeight = source[0].height;

      switch (algorithms) {
        case "Shelf":
          const shelf = new m.ShelfBinPack(sourceWidth, sourceHeight, setting['UseWasteMap'] as boolean);
          const heuristic = toEnumValue(m.ShelfBinPack_ShelfChoiceHeuristic, setting['Heuristic'])
          console.log(heuristic)
          for (let i = 0; i < targetSizes.size(); i++) {
            const item = targetSizes.get(i);
            resultRects.push_back(
              shelf.Insert_Single(
                item.width,
                item.height,
                heuristic
              ));
          }
          occupancy = shelf.Occupancy();
          shelf.delete();
          break;
        case "Skyline":
          const skyline = new m.SkylineBinPack(sourceWidth, sourceHeight, setting['UseWasteMap'] as boolean);
          skyline.Insert_Range(
            targetSizes,
            resultRects,
            toEnumValue(m.SkylineBinPack_LevelChoiceHeuristic, setting['LevelChoiceHeuristic'])
          );
          occupancy = skyline.Occupancy();
          skyline.delete();
          break;
        case "Guillotine":
          const guillotine = new m.GuillotineBinPack(sourceWidth, sourceHeight);
          guillotine.Insert_Range(
            targetSizes,
            setting['UseRectangleMerge'] as boolean,
            toEnumValue(m.GuillotineBinPack_FreeRectChoiceHeuristic, setting['FreeRectChoiceHeuristic']),
            toEnumValue(m.GuillotineBinPack_GuillotineSplitHeuristic, setting['GuillotineSplitHeuristic']),
          )
          resultRects.delete();
          resultRects = guillotine.GetUsedRectangles();
          occupancy = guillotine.Occupancy();
          guillotine.delete();
          break;
        case "MaxRects":
          const maxRects = new m.MaxRectsBinPack(sourceWidth, sourceHeight, setting['AllowFlip'] as boolean);
          maxRects.Insert_Range(
            targetSizes,
            resultRects,
            toEnumValue(m.MaxRectsBinPack_FreeRectChoiceHeuristic, setting['FreeRectChoiceHeuristic']));
          occupancy = maxRects.Occupancy();
          maxRects.delete();
          break;
      }
      const result: Rect[] = []
      for (let i = 0; i < resultRects.size(); i++) {
        const item = resultRects.get(i);
        result.push({ x: item.x, y: item.y, width: item.width, height: item.height })
      }
      targetSizes.delete();
      resultRects.delete();

      return {
        Data: {
          width: sourceWidth,
          height: sourceHeight,
          rects: result,
          svg: ''
        }
      }
    } else {
      return { Error: { Code: 2, Message: 'Source Target Is Empty' } }
    }


  }
}
