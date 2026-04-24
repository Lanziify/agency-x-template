import { Block, Field, Validate } from 'payload';

import { ItemAlignment } from '../config/alignment';
import { Background } from '../config/background';
import { RootBlock } from '../config/presentation';
import { Width } from '../config/width';
import { createBlockWithConfig } from '../util';
import { AccordionBlock } from './accordion';
import { ButtonBlock } from './button';
import { IntroBlock } from './intro';
import { MediaBlock } from './media';

const preventNestedColumnValidate: Validate = (value, { data, path }) => {
  if (value !== 'column') return true;

  let currentLevel = data;

  for (let i = 0; i < path.length - (path.length <= 3 ? 0 : 3); i++) {
    currentLevel = currentLevel?.[path[i]];
  }

  if (typeof currentLevel !== 'string' && currentLevel?.layoutType === 'column') {
    return 'Cannot use column layout if parent layout type is column.';
  }

  return true;
};

const childrenWidthValidate: Validate = (value, { siblingData }) => {
  if (!Array.isArray(value)) return true;

  const parentWidth = Number(siblingData?.width || 12);

  if (parentWidth === 1 && value.length > 0) {
    return 'Container with width 1/12 cannot contain children.';
  }

  const totalWidth = value.reduce((sum, child) => {
    return sum + Number(child?.width || 12);
  }, 0);

  if (totalWidth > parentWidth) {
    return `Children width (${totalWidth}) exceeds parent width (${parentWidth})`;
  }

  return true;
};

const layoutField: Field = {
  name: 'layoutType',
  type: 'select',
  required: true,
  options: [
    { label: 'Row (horizontal)', value: 'row' },
    { label: 'Column (vertical)', value: 'column' },
  ],
  defaultValue: 'row',
  validate: preventNestedColumnValidate,
};

function createNestedContainerBlock(maxDepth: number = 3): Block {
  const selfNested = maxDepth > 0 ? [createNestedContainerBlock(maxDepth - 1)] : [];

  return createBlockWithConfig('containerBlock', {
    content: [
      layoutField,
      {
        name: 'children',
        type: 'blocks',
        blocks: [...selfNested, IntroBlock, MediaBlock, ButtonBlock, AccordionBlock],
        validate: childrenWidthValidate,
      },
    ],
    presentation: [RootBlock, Width, ItemAlignment, Background],
  });
}

export const ContainerBlock = createNestedContainerBlock();
