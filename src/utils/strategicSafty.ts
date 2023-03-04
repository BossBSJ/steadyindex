import { ComponentList } from "../interfaces/component.interface";

export const strategicSafty = (componentList: ComponentList[]) => {
  const componentLength = componentList.length;
  let accumulateAllocated = 0;

  return componentList.map((cmp, idx) => {
    if (idx == componentLength - 1)
      return {
        ...cmp,
        allocation: Number((100 - accumulateAllocated).toFixed(2)),
      };

    accumulateAllocated += cmp.allocation;
    return cmp;
  });
};
