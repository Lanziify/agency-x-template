'use client';

import React from 'react';

import { TextFieldClientProps } from 'payload';
import { Button, CloseMenuIcon, Drawer, DrawerToggler, formatDrawerSlug, useField, useModal } from '@payloadcms/ui';

import { TypographyH2 } from '@components/ui/typography';

import type { IconData } from '@data/icons-data';
import { useVirtualizer } from '@tanstack/react-virtual';
import Fuse from 'fuse.js';
import { throttle } from 'lodash';
import { DynamicIcon, dynamicIconImports, IconName } from 'lucide-react/dynamic';
import { useDebounceValue } from 'usehooks-ts';

export const TAILWIND_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
} as const;

const ITEM_RATIO = 16 / 9;

export default function DrawerTest(props: TextFieldClientProps) {
  const { path, ...rest } = props;

  const slug = formatDrawerSlug({ slug: 'icon-picker', depth: 3 });
  const [loading, setLoading] = React.useState(true);
  const [icons, setIcons] = React.useState<IconData[]>([]);
  const [search, setSearch] = useDebounceValue('', 200);
  const drawerContentRef = React.useRef<HTMLDivElement>(null);
  const drawerHeaderRef = React.useRef<HTMLDivElement>(null);
  const [selectedIcon, setSelectedIcon] = React.useState<IconName>();
  const { value, setValue } = useField({ path: props.path });
  const { closeModal, openModal, modalState } = useModal();
  const [layout, setLayout] = React.useState({
    width: 0,
    height: 0,
    gap: 20,
    columns: 10,
  });

  const isOpen = React.useMemo(() => modalState[slug]?.isOpen, [modalState, slug]);

  const fuseInstance = React.useMemo(() => {
    return new Fuse(icons, {
      keys: ['name', 'tags', 'categories'],
      threshold: 0.3,
      ignoreLocation: true,
      includeScore: true,
    });
  }, [icons]);

  const filteredIcons = React.useMemo(() => {
    if (search.trim() === '') {
      return icons;
    }

    const results = fuseInstance.search(search.toLowerCase().trim());
    return results.map((result) => result.item);
  }, [search, icons, fuseInstance]);

  const getLayoutColumn = (width: number) => {
    if (width <= TAILWIND_BREAKPOINTS.sm) {
      return 3;
    }

    if (width <= TAILWIND_BREAKPOINTS.md) {
      return 5;
    }

    return 10;
  };

  const getItemWidth = (width: number, columns: number, gap: number) => {
    return Math.floor((width - (columns - 1) * gap) / columns);
  };

  const getItemHeight = (width: number, itemWidth: number) => {
    if (width >= TAILWIND_BREAKPOINTS.sm) {
      return itemWidth / ITEM_RATIO;
    }

    return itemWidth;
  };

  const resize = React.useMemo(
    () =>
      throttle((width: number, columns: number, gap: number) => {
        const layoutColumn = getLayoutColumn(width);
        const itemWidth = getItemWidth(width, layoutColumn, gap);
        const itemHeight = getItemHeight(width, itemWidth);

        setLayout((prev) => ({
          ...prev,
          width: itemWidth,
          height: itemHeight,
          columns: layoutColumn,
        }));
      }, 200),
    []
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(filteredIcons.length / layout.columns),
    getScrollElement: () => drawerContentRef.current,
    estimateSize: () => layout.height,
    gap: layout.gap,
    paddingEnd: layout.gap,
    overscan: 2,
  });

  const handleCloseDrawer = React.useCallback(() => {
    if (isOpen) {
      closeModal(slug);
    }
  }, [closeModal, isOpen, slug]);

  const handleIconSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);

      if (drawerContentRef.current) {
        drawerContentRef.current.scrollTop = 0;
      }

      rowVirtualizer.scrollOffset = 0;
    },

    [rowVirtualizer, setSearch]
  );

  const handleIconClick = React.useCallback(
    (icon: IconName) => {
      setSelectedIcon(icon);
      setValue(icon);
      handleCloseDrawer();
    },
    [handleCloseDrawer, setValue]
  );

  const renderVirtualIconItems = React.useCallback(
    (icon: IconData) => {
      return <IconButton key={icon.name} icon={icon} onClick={handleIconClick} />;
    },
    [handleIconClick]
  );

  const renderVirtualRows = React.useCallback(() => {
    return rowVirtualizer.getVirtualItems().map((virtualRow) => {
      const startIndex = virtualRow.index * layout.columns;
      const rowIcons = filteredIcons.slice(startIndex, startIndex + layout.columns);

      return (
        <div
          key={virtualRow.key}
          className="grid"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${virtualRow.size}px`,
            transform: `translateY(${virtualRow.start}px)`,
            gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))`,
            gap: layout.gap,
          }}>
          {rowIcons.map((icon) => renderVirtualIconItems(icon))}
        </div>
      );
    });
  }, [filteredIcons, layout.columns, layout.gap, renderVirtualIconItems, rowVirtualizer]);

  React.useEffect(() => {
    let isMounted = true;

    const lazyLoadIcons = async () => {
      const { iconsData } = await import('@data/icons-data');

      if (isMounted) {
        setIcons(iconsData.filter((icon: IconData) => icon.name in dynamicIconImports));
        setLoading(false);
      }
    };

    lazyLoadIcons();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!drawerHeaderRef.current || !drawerContentRef.current) return;

    const observer = new ResizeObserver(() => {
      if (!drawerHeaderRef.current || !drawerContentRef.current) return;

      const height = drawerHeaderRef.current!.clientHeight;
      const containerWidth = drawerContentRef.current!.clientWidth;
      drawerContentRef.current!.style.maxHeight = `calc(100% - ${height}px)`;

      if (!containerWidth) return;

      resize(containerWidth, layout.columns, layout.gap);
      rowVirtualizer.measure();
    });

    observer.observe(drawerHeaderRef.current);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, drawerContentRef.current, drawerHeaderRef.current]);

  React.useEffect(() => {
    return () => {
      resize.cancel();
    };
  }, [resize]);

  React.useEffect(() => {
    if (isOpen) {
      rowVirtualizer.scrollOffset = 0;
    }

    if (!isOpen) {
      setSearch('');
    }
  }, [isOpen, rowVirtualizer, setSearch]);

  return (
    <>
      {/* <DrawerToggler slug={slug} className="btn btn--style-pill my-0 flex gap-2 justify-center font-medium">
        {value || selectedIcon ? (
          <>
            <DynamicIcon name={(value ?? selectedIcon) as IconName} /> {value || selectedIcon}
          </>
        ) : (
          'Select An Icon'
        )}
      </DrawerToggler> */}
      <div className="flex">
        <Button
          buttonStyle="pill"
          {...((value || selectedIcon) && { icon: <DynamicIcon name={(value ?? selectedIcon) as IconName} /> })}
          className="my-0"
          iconPosition="left"
          onClick={() => openModal(slug)}>
          {String((value || selectedIcon) ?? 'Select An Icon')}
        </Button>
      </div>

      <Drawer
        slug={slug}
        Header={
          <div ref={drawerHeaderRef} className="w-full py-6">
            <Button buttonStyle="transparent" className="my-0 ml-auto block w-16 text-sm" onClick={handleCloseDrawer}>
              <CloseMenuIcon />
            </Button>

            <div className="space-y-4">
              <TypographyH2>Select an Icon</TypographyH2>
              <div className="field-type text">
                <input className="payload-input" type="text" onChange={handleIconSearch} />
              </div>
            </div>
          </div>
        }>
        <div ref={drawerContentRef} className="overflow-x-hidden overflow-y-auto [scrollbar-gutter:stable]">
          <div
            className="relative w-full"
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
            }}>
            {loading ? <span>Loading</span> : renderVirtualRows()}
          </div>
        </div>
      </Drawer>
    </>
  );
}

// Add this before the DrawerTest component
const IconButton = React.memo(({ icon, onClick }: { icon: IconData; onClick: (iconName: IconName) => void }) => {
  return (
    <Button buttonStyle="pill" className="m-0" onClick={() => onClick(icon.name as IconName)}>
      <div className="flex flex-col items-center justify-center gap-2">
        <DynamicIcon size={24} name={icon.name as IconName} />
        <span className="line-clamp-1 text-sm">{icon.name}</span>
      </div>
    </Button>
  );
});
IconButton.displayName = 'IconButton';
