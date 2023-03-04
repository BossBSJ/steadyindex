import { ComponentList } from "../interfaces/component.interface";

export function calculateRatios(componentList: ComponentList[]) {
  const componentLength = componentList.length;
  const newAllocation = Number((100 / componentLength).toFixed(2));
  let accumulateAllocated = 0;

  return componentList.map((cmp, idx) => {
    
    if (idx == componentLength - 1)
    return { ...cmp, allocation: Number((100 - accumulateAllocated).toFixed(2)), locked: false };
    
    accumulateAllocated += newAllocation;
    return { ...cmp, allocation: newAllocation, locked: false };
  });
}
