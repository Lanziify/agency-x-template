import React from 'react';

import { PageBlock } from './page/types';

type BlockType = keyof PageBlock;
type BlockRenderer<T extends BlockType> = React.ComponentType<PageBlock[T]>;

interface BlockRegistry {
  register<T extends BlockType>(slug: T, renderer: BlockRenderer<T>): void;
  get<T extends BlockType>(slug: T): BlockRenderer<T> | null;
  has<T extends BlockType>(slug: T): boolean;
  getAll(): Map<BlockType, BlockRenderer<BlockType>>;
}

class BlockRegistryImpl implements BlockRegistry {
  private registry = new Map<BlockType, BlockRenderer<BlockType>>();

  register<T extends BlockType>(slug: T, renderer: BlockRenderer<T>) {
    if (this.registry.has(slug)) {
      console.warn(`Block renderer "${slug}" is already registered. Overwriting.`);
    }
    
    this.registry.set(slug, renderer as BlockRenderer<BlockType>);
  }

  get<T extends BlockType>(slug: T): BlockRenderer<T> | null {
    const block = this.registry.get(slug);

    if (!block) {
      console.error(`Registry missing key: ${slug}. Available:`, Array.from(this.registry.keys()));
      return null;
    }

    return block as BlockRenderer<T>;
  }

  has<T extends BlockType>(slug: T) {
    return this.registry.has(slug);
  }

  getAll() {
    return new Map(this.registry);
  }
}

export const blockRegistry = new BlockRegistryImpl();
