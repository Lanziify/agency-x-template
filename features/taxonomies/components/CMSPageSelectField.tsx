'use client';

import React from 'react';

import { OptionObject } from 'payload';
import { SelectInput, useField } from '@payloadcms/ui';
import { Option } from '@payloadcms/ui/elements/ReactSelect';
import { SelectInputProps } from '@payloadcms/ui/fields/Select';

import { getCMSCollections } from '../lib/utils';

const CMSPageSelectField: React.FC<SelectInputProps> = ({ path, ...props }) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = React.useState<OptionObject[] | []>([]);

  React.useEffect(() => {
    const attachCollectionsToOptions = () => {
      const collections = getCMSCollections();
      setOptions(collections);
    };

    attachCollectionsToOptions();
  }, []);

  return (
    <div className="field-type select flex-[1_1_auto]">
      <label className="field-label">
        Page <span className="required">*</span>
      </label>
      <SelectInput
        {...props}
        id="field-select"
        path={path}
        options={options}
        name={path}
        value={value}
        onChange={(e) => {
          setValue((e as Option).value);
        }}
      />
    </div>
  );
};

export default CMSPageSelectField;
