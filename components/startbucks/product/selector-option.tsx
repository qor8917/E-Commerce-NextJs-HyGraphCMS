import { ProductOption } from '@/types/types';
import { Listbox } from '@headlessui/react';
import Image from 'next/image';
import { useState } from 'react';

export default function OptionSelector({
  option,
  updateOptions,
  currentOption,
}: {
  option: ProductOption;
  updateOptions: (key: string, option: Record<string, string>) => void;
  currentOption: Record<string, string | number> | null;
}) {
  switch (option.typeOfUi) {
    case 'Select':
      return (
        <Select
          option={option}
          updateOptions={updateOptions}
          currentOption={currentOption}
        />
      );
    case 'Range':
      return (
        <Range
          option={option}
          updateOptions={updateOptions}
          currentOption={currentOption}
        />
      );
  }
}

function Select({
  option,
  updateOptions,
  currentOption,
}: {
  option: ProductOption;
  updateOptions: (key: string, option: Record<string, string>) => void;
  currentOption: Record<string, string | number> | null;
}) {
  const [selected, setSelected] = useState(
    currentOption?.name ?? option.children[0].name
  );

  return (
    <div className="py-4 ">
      <Listbox
        value={selected}
        onChange={(value) => {
          setSelected(value);
          const found = option.children.find((select) => select.name === value);
          updateOptions(option.name, found as any);
        }}
      >
        <Listbox.Button className="relative block w-full rounded-[0.5rem] border-[2px] border-solid p-[0.75rem]">
          {({ value }) => {
            return (
              <div className="flex justify-between">
                <div>{value}</div>
                {value == option.children[0].name ? (
                  <div>
                    <Image
                      alt="down-arrow-green"
                      src="/down_arrow_green.svg"
                      width={24}
                      height={24}
                    />
                  </div>
                ) : (
                  <div>
                    <Image
                      alt="down-arrow-green"
                      src="/filled_down_arrow_green.svg"
                      width={24}
                      height={24}
                    />
                  </div>
                )}
                <Listbox.Label className="absolute -top-3 left-2 bg-white px-2 text-sm">
                  {option.name}
                </Listbox.Label>
              </div>
            );
          }}
        </Listbox.Button>
        <Listbox.Options className="relative mt-2 rounded-[0.5rem] bg-[#D4E9E2] overflow-hidden">
          {option.children.map((opt: any, i: number) => (
            <Listbox.Option
              key={i}
              value={opt.name}
              className="p-2 hover:bg-[#1F3933] hover:text-white "
            >
              <div className="flex gap-x-4 ">
                <span>
                  <Image
                    alt="customize"
                    src="/customize.svg"
                    width={24}
                    height={24}
                  />
                </span>
                <span>{opt.name}</span>
              </div>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
function Range({
  option,
  updateOptions,
  currentOption,
}: {
  option: ProductOption;
  updateOptions: (key: string, option: Record<string, string>) => void;
  currentOption: Record<string, string | number> | null;
}) {
  const { name, price, quantity } = option.children[0];
  const [_quantity, setQuantity] = useState(
    currentOption?.quantity ?? quantity
  );
  return (
    <div className="py-4">
      <div className="relative block w-full rounded-[0.5rem] border-[2px] border-solid p-[0.75rem]">
        <div className="flex justify-between">
          <div>{name}</div>
          <div className="flex gap-x-2">
            <button
              className={
                currentOption?.quantity ?? quantity === 1 ? 'hidden' : 'static'
              }
              onClick={() => {
                if (currentOption?.quantity ?? quantity === 1) {
                  return null;
                } else {
                  let updated;

                  if (currentOption) {
                    updated = {
                      ...currentOption,
                      quantity: (_quantity as number) - 1,
                    };
                    setQuantity((_quantity as number) - 1);
                  } else {
                    updated = {
                      ...option.children[0],
                      quantity: (_quantity as number) - 1,
                    };

                    setQuantity((_quantity as number) - 1);
                  }

                  updateOptions(option.name, updated as any);
                }
              }}
            >
              {quantity === 1 ? (
                <Image
                  alt="minus_green"
                  src="/minus_green.svg"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  alt="minus_green"
                  src="/filled_minus_green.svg"
                  width={24}
                  height={24}
                />
              )}
            </button>
            <div>{_quantity}</div>

            <button
              onClick={() => {
                // setQuantity(_quantity + 1);
                let updated;
                if (currentOption) {
                  updated = {
                    ...currentOption,
                    quantity: (_quantity as number) + 1,
                  };
                  setQuantity((_quantity as number) + 1);
                } else {
                  updated = {
                    ...option.children[0],
                    quantity: (_quantity as number) + 1,
                  };
                  setQuantity((_quantity as number) + 1);
                }
                updateOptions(option.name, updated as any);
              }}
            >
              {quantity === 1 ? (
                <Image
                  alt="plus_green"
                  src="/plus_green.svg"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  alt="plus_green"
                  src="/filled_plus_green.svg"
                  width={24}
                  height={24}
                />
              )}
            </button>
          </div>

          <label className="absolute -top-3 left-2 bg-white px-2 text-sm">
            {option.name}
          </label>
        </div>
      </div>
    </div>
  );
}
