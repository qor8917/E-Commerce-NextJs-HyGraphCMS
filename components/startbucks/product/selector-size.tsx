import { ProductSize } from '@/types/types';
import { RadioGroup } from '@headlessui/react';
import { useState } from 'react';

export default function SizeSelector({
  productSizes,
  updateOptions,
  currentOption,
}: {
  productSizes: ProductSize[];
  updateOptions: (key: string, option: Record<string, string>) => void;
  currentOption: Record<string, string | number> | null;
}) {
  const [selected, setSelected] = useState(
    currentOption?.name ?? productSizes[0].name
  );
  return (
    <RadioGroup
      className="flex items-center justify-center gap-x-4"
      value={selected}
      onChange={(value) => {
        setSelected(value);
        const found = productSizes.find((size) => size.name === value);
        updateOptions('size', found as any);
      }}
    >
      {productSizes.map((size: ProductSize, i: number) => {
        const { name, weight } = size;
        const lowercase = name.toLowerCase();
        return (
          <RadioGroup.Option value={name} key={i}>
            {({ checked }) => (
              <div className="flex flex-col justify-start gap-y-1 text-center">
                <div
                  className={`${
                    checked
                      ? `rounded-[50%] border-[2px] border-solid border-[#1F3933]  bg-[#D4E9E2]`
                      : ''
                  } flex h-[3.5rem] w-[3.5rem] cursor-pointer items-center justify-center bg-auto bg-center bg-no-repeat bg-origin-content p-2`}
                  style={
                    checked
                      ? { backgroundImage: `url(/${lowercase}-selected.svg)` }
                      : { backgroundImage: `url(/${lowercase}.svg)` }
                  }
                ></div>
                <div className="font-semibold">{name}</div>
                <div>
                  <span>{weight}</span> ft oz
                </div>
              </div>
            )}
          </RadioGroup.Option>
        );
      })}
    </RadioGroup>
  );
}
