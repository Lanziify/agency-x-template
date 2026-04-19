'use client';

import React from 'react';

import { TextFieldClientProps } from 'payload';
import { Button, useField } from '@payloadcms/ui';

import { Input } from '@components/ui/input';
import { Popover, PopoverContent, PopoverHeader, PopoverTrigger } from '@components/ui/popover';
import { Skeleton } from '@components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/ui/tooltip';

import { cn } from '@lib/utils';

import 'simplebar-react/dist/simplebar.min.css';

import type { IconData } from '@data/icons-data';
import { useVirtualizer } from '@tanstack/react-virtual';
import Fuse from 'fuse.js';
import { DynamicIcon, dynamicIconImports, IconName } from 'lucide-react/dynamic';
import SimpleBarCore from 'simplebar-core';
import SimpleBar from 'simplebar-react';
import { useDebounceValue } from 'usehooks-ts';

function IconPickerFieldClient(props: TextFieldClientProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [debouncedSearch] = useDebounceValue(inputValue, 100);
  const [loading, setLoading] = React.useState(true);
  const [icons, setIcons] = React.useState<IconData[]>([]);
  const parentContainer = React.useRef<SimpleBarCore>(null);
  const [selectedIcon, setSelectedIcon] = React.useState<IconName>();
  const { value, setValue } = useField({ path: props.path });

  React.useEffect(() => {
    let isMounted = true;

    async function loadIcons() {
      const { iconsData } = await import('@data/icons-data');

      const validIcons = iconsData.filter((icon: IconData) => {
        return icon.name in dynamicIconImports;
      });

      if (isMounted) {
        setIcons(validIcons);
        setLoading(false);
      }
    }

    loadIcons();

    return () => {
      isMounted = false;
    };
  }, [open]);

  const fuseIconData = React.useMemo(() => {
    return new Fuse(icons, {
      keys: ['name', 'categories', 'tags'],
      threshold: 0.3,
    });
  }, [icons]);

  const handleSearch = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  }, []);

  const handleIconClick = React.useCallback(
    (icon: IconName) => {
      setSelectedIcon(icon);
      setValue(icon);
      setOpen(false);
    },
    [setValue]
  );

  const filteredIcons = React.useMemo(() => {
    if (debouncedSearch.trim() === '') {
      return icons;
    }

    const results = fuseIconData.search(debouncedSearch.toLowerCase().trim());
    return results.map((result) => result.item);
  }, [fuseIconData, icons, debouncedSearch]);

  const columns = 5;
  const rowCount = Math.ceil(filteredIcons.length / columns);
  const rowHeight = 48;

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentContainer.current?.getScrollElement() ?? null,
    estimateSize: () => rowHeight,
    gap: 10,
    overscan: 15,
  });

  React.useEffect(() => {
    if (open && !loading) {
      setTimeout(() => rowVirtualizer.measure(), 0);

      parentContainer.current?.recalculate();
    }
  }, [open, loading, rowVirtualizer]);

  const renderVirtualizedIcon = React.useCallback(() => {
    return rowVirtualizer.getVirtualItems().map((virtualRow) => {
      const startIndex = virtualRow.index * columns;
      const rowIcons = filteredIcons.slice(startIndex, startIndex + columns);

      return (
        <div
          key={virtualRow.key}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${virtualRow.size}px`,
            transform: `translateY(${virtualRow.start}px)`,
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: 10,
          }}
          className="grid">
          {rowIcons.map((icon) => (
            <Tooltip key={icon.name}>
              <TooltipTrigger
                className={cn(
                  'hover:bg-foreground/10 rounded-md border p-2 transition dark:border-white/20 dark:text-white',
                  'flex items-center justify-center'
                )}
                onClick={() => handleIconClick(icon.name as IconName)}>
                <DynamicIcon name={icon.name as IconName} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{icon.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      );
    });
  }, [rowVirtualizer, filteredIcons, handleIconClick]);

  return (
    <TooltipProvider>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="m-0 justify-center font-semibold" onClick={() => setOpen(!open)}>
            {value || selectedIcon ? (
              <>
                <DynamicIcon name={(value ?? selectedIcon) as IconName} /> {value || selectedIcon}
              </>
            ) : (
              'Select An Icon'
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="twp dark:bg-accent-foreground w-md dark:border-white/20" align="start" key={`${open}-${icons.length}`}>
          <PopoverHeader>
            <Input onChange={handleSearch} className="twp" />
          </PopoverHeader>
          <SimpleBar ref={parentContainer} className="scrollbar-floating relative mt-4 overflow-auto" style={{ height: '320px' }}>
            {loading ? (
              <IconsSkeleton parentRef={parentContainer} gap={10} />
            ) : (
              <div
                className="relative w-full overscroll-contain"
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  width: '100%',
                  position: 'relative',
                }}>
                {renderVirtualizedIcon()}
              </div>
            )}
          </SimpleBar>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
}

type IconsSkeletonProps = {
  parentRef: React.RefObject<SimpleBarCore | null>;
  gap?: number;
};

const IconsSkeleton = ({ parentRef, gap: gridGap = 8 }: IconsSkeletonProps) => {
  const [layout, setLayout] = React.useState({
    columns: 0,
    rows: 0,
    gap: gridGap,
  });

  const maxItemWidth = 38;

  React.useEffect(() => {
    if (!parentRef.current || !parentRef.current?.getContentElement()) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;

      const gap = gridGap;
      const columns = Math.max(1, Math.floor((width + gap) / (maxItemWidth + gap)));

      const rows = Math.max(1, Math.floor((height + gap) / (maxItemWidth + gap)));

      setLayout({ columns, rows, gap });
    });

    observer.observe(parentRef.current.getContentElement() as Element);

    return () => observer.disconnect();
  }, [parentRef, gridGap]);

  const { columns, rows, gap } = layout;
  const total = columns * rows;

  if (!total) return null;

  return (
    <div
      className="grid place-items-center"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(${maxItemWidth}px, 1fr))`,
        gap,
      }}>
      {Array.from({ length: total }).map((_, i) => (
        <Skeleton
          key={i}
          className="flex aspect-square w-full items-center justify-center rounded-md border dark:text-white"
          style={{ maxWidth: maxItemWidth }}
        />
      ))}
    </div>
  );
};

export default React.memo(IconPickerFieldClient);
