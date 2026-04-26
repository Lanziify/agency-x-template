'use client';

import React from 'react';

import { TextFieldClientProps } from 'payload';
import { Button, CloseMenuIcon, Drawer, formatDrawerSlug, useField, useModal } from '@payloadcms/ui';

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

const baseRowStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
} as React.CSSProperties;

const IconPicker: React.FC<TextFieldClientProps> = ({ path }) => {
  const slug = formatDrawerSlug({ slug: `icon-picker.${path}`, depth: 3 });
  const [loading, setLoading] = React.useState(true);
  const [layoutSetup, setLayoutSetup] = React.useState(false);
  const [icons, setIcons] = React.useState<IconData[]>([]);
  const [input, setInput] = React.useState('');
  const [search] = useDebounceValue(input, 200);
  const drawerContentRef = React.useRef<HTMLDivElement>(null);
  const drawerHeaderRef = React.useRef<HTMLDivElement>(null);
  const { value, setValue } = useField<string>({ path: path });
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

    const results = fuseInstance.search(search.trim());
    return results.map((result) => result.item);
  }, [search, icons, fuseInstance]);

  const getLayoutColumn = React.useCallback((width: number) => {
    if (width <= TAILWIND_BREAKPOINTS.sm) {
      return 3;
    }

    if (width <= TAILWIND_BREAKPOINTS.md) {
      return 5;
    }

    return 10;
  }, []);

  const getItemWidth = React.useCallback(
    (width: number, columns: number) => {
      return Math.floor((width - (columns - 1) * layout.gap) / columns);
    },
    [layout.gap]
  );

  const getItemHeight = React.useCallback((width: number, itemWidth: number) => {
    if (width >= TAILWIND_BREAKPOINTS.sm) {
      return itemWidth / ITEM_RATIO;
    }

    return itemWidth;
  }, []);

  const resize = React.useMemo(
    () =>
      throttle((width: number) => {
        const layoutColumn = getLayoutColumn(width);
        const itemWidth = getItemWidth(width, layoutColumn);
        const itemHeight = getItemHeight(width, itemWidth);

        setLayout((prev) => ({
          ...prev,
          width: itemWidth,
          height: itemHeight,
          columns: layoutColumn,
        }));
      }, 200),
    [getItemHeight, getItemWidth, getLayoutColumn]
  );

  const rowCount = React.useMemo(() => Math.ceil(filteredIcons.length / layout.columns), [filteredIcons.length, layout.columns]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => drawerContentRef.current,
    estimateSize: () => layout.height,
    gap: layout.gap,
    paddingEnd: layout.gap,
    overscan: 2,
    useAnimationFrameWithResizeObserver: true,
  });

  const handleCloseDrawer = React.useCallback(() => {
    if (isOpen) {
      closeModal(slug);
    }
  }, [closeModal, isOpen, slug]);

  const handleIconSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);

      if (drawerContentRef.current) {
        drawerContentRef.current.scrollTop = 0;
      }
    },

    [setInput]
  );

  const handleIconClick = React.useCallback(
    (icon: IconName) => {
      setValue(icon);
      handleCloseDrawer();
    },
    [handleCloseDrawer, setValue]
  );

  const handleRemoveIcon = React.useCallback(() => {
    setValue('');
    handleCloseDrawer();
  }, [handleCloseDrawer, setValue]);

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
            ...baseRowStyle,
            width: '100%',
            height: `${virtualRow.size}px`,
            transform: `translateY(${virtualRow.start}px)`,
            gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))`,
            gap: layout.gap,
          }}>
          {/* {rowIcons.map((icon) => (
            <span key={icon.name}>{icon.name}</span>
          ))} */}
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
  }, []);

  React.useLayoutEffect(() => {
    if (!isOpen && rowVirtualizer) return;

    let resizeObserver: ResizeObserver | null = null;
    let cancelled = false;

    const rafId = requestAnimationFrame(() => {
      if (cancelled) return;

      resizeObserver = new ResizeObserver(() => {
        const headerHeight = drawerHeaderRef.current?.clientHeight || 0;
        if (drawerContentRef.current) {
          drawerContentRef.current.style.maxHeight = `calc(100% - ${headerHeight}px)`;

          resize(drawerContentRef.current.clientWidth);
          rowVirtualizer.measure();
        }
      });

      resizeObserver.observe(drawerContentRef.current!);
      setLayoutSetup(true);
      setInput('');
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
    };
  }, [isOpen, resize, rowVirtualizer]);

  React.useEffect(() => {
    if (!isOpen || !layoutSetup) return;

    const resetScroll = () => {
      if (!drawerContentRef.current) return;
      drawerContentRef.current.scrollTop = 0;
      rowVirtualizer.scrollOffset = 0;
    };

    resetScroll();

    const rafId = requestAnimationFrame(() => {
      resetScroll();
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isOpen, layoutSetup, rowVirtualizer]);

  React.useEffect(() => {
    return () => {
      resize.cancel();
    };
  }, [resize]);

  return (
    <>
      {Boolean(value) && (
        <Button buttonStyle="secondary" className="my-0 h-auto justify-center max-sm:mb-6" onClick={handleRemoveIcon}>
          <DynamicIcon size={24} name="x" />
        </Button>
      )}

      <Button
        buttonStyle="primary"
        {...(Boolean(value) && { icon: <DynamicIcon name={value as IconName} /> })}
        className="my-0 h-auto justify-center max-sm:mb-6"
        iconPosition="left"
        onClick={() => openModal(slug)}>
        {value && value.length > 0 ? value : 'Select An Icon'}
      </Button>

      <Drawer
        key={slug}
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
};

const LazyDynamicIcon = React.lazy(() =>
  import('lucide-react/dynamic').then((mod) => ({
    default: mod.DynamicIcon,
  }))
);

const IconButton = React.memo(({ icon, onClick }: { icon: IconData; onClick: (iconName: IconName) => void }) => {
  return (
    <Button buttonStyle="pill" className="m-0" onClick={() => onClick(icon.name as IconName)}>
      <div className="flex flex-col items-center justify-center gap-2">
        <React.Suspense fallback={<span className="h-6 w-6" />}>
          <LazyDynamicIcon size={24} name={icon.name as IconName} />
        </React.Suspense>
        <span className="line-clamp-1 text-sm">{icon.name}</span>
      </div>
    </Button>
  );
});
IconButton.displayName = 'IconButton';

export default React.memo(IconPicker);
