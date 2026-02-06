import React, { useEffect, useState, useRef } from 'react';

interface Props<C extends HTMLElement = HTMLElement, T extends HTMLElement = HTMLElement> {
  targetValue?: string | number;
  thumbEdge?: number;
  children: (
    containerRef: React.RefObject<C | null>,
    thumbRef: React.RefObject<T | null>
  ) => React.ReactNode;
}

function HorizontalScrollableBox<
  C extends HTMLElement = HTMLElement,
  T extends HTMLElement = HTMLElement,
>({ targetValue = '', thumbEdge = 0, children }: Props<C, T>) {
  const containerRef = useRef<C>(null);
  const thumbRef = useRef<T>(null);
  const factorRef = useRef(0);

  const [isDragging, setIsDragging] = useState(false);

  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const thumb = thumbRef.current;

    if (!container || !thumb) return;

    const onScroll = () => {
      const scrollLeft = container.scrollLeft;

      const thumbLeft = scrollLeft + scrollLeft * factorRef.current + thumbEdge;

      if (!isNaN(thumbLeft)) {
        thumb.style.transform = `translateX(${thumbLeft}px)`;
      }
    };

    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, [thumbEdge]);

  useEffect(() => {
    const container = containerRef.current;
    const thumb = thumbRef.current;

    if (!container || !thumb) return;

    const calculate = () => {
      const trackWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;
      const scrollable = scrollWidth - trackWidth;

      if (scrollable > 0) {
        const ratio = trackWidth / scrollWidth;

        const thumbWidth = Math.max(ratio * trackWidth, 20);

        thumb.style.width = `${thumbWidth}px`;
        thumb.style.display = 'block'; // 스크롤 가능하면 보임

        const availableTrackWidth = trackWidth - thumbEdge * 2;

        factorRef.current = (availableTrackWidth - thumbWidth) / scrollable;
      } else {
        thumb.style.width = '0px';
        thumb.style.display = 'none';
        thumb.style.opacity = '0';
        factorRef.current = 0;
      }
    };

    const observer = new MutationObserver(calculate);
    observer.observe(container, { childList: true, subtree: true });
    window.addEventListener('resize', calculate);

    calculate();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', calculate);
    };
  }, [thumbEdge]);

  useEffect(() => {
    const container = containerRef.current;
    const thumb = thumbRef.current;

    if (!container || !thumb) return;

    const onMouseEnter = () => {
      const isOverflowing = container.scrollWidth > container.clientWidth;

      if (isOverflowing) {
        thumb.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      if (!isDragging) {
        thumb.style.opacity = '0';
      }
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isDragging]);

  // 4. 드래그 로직 (Thumb 드래그 -> Container 스크롤 동기화)
  useEffect(() => {
    const container = containerRef.current;
    const thumb = thumbRef.current;

    if (!container || !thumb) return;

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragging(true);
      dragStartXRef.current = e.clientX;
      dragStartScrollLeftRef.current = container.scrollLeft;

      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      thumb.style.opacity = '1';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStartXRef.current;
      const trackWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;
      const scrollable = scrollWidth - trackWidth;
      const thumbWidth = parseFloat(thumb.style.width) || 20;

      const availableTrackWidth = trackWidth - thumbEdge * 2;
      const maxThumbLeft = availableTrackWidth - thumbWidth;

      const scrollRatio = scrollable / maxThumbLeft;
      const newScrollLeft = dragStartScrollLeftRef.current + deltaX * scrollRatio;

      const clampedScrollLeft = Math.max(0, Math.min(scrollable, newScrollLeft));

      container.scrollLeft = clampedScrollLeft;

      const thumbLeft = clampedScrollLeft + clampedScrollLeft * factorRef.current + thumbEdge;
      if (!isNaN(thumbLeft)) {
        thumb.style.transform = `translateX(${thumbLeft}px)`;
      }
    };

    const onMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    thumb.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      thumb.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, thumbEdge]);

  useEffect(() => {
    const container = containerRef.current;
    const thumb = thumbRef.current;

    if (!container || !thumb) return;

    const timeoutId = setTimeout(() => {
      container.scrollLeft = 0;
      thumb.style.transform = `translateX(${thumbEdge}px)`;
      thumb.style.opacity = '0';

      requestAnimationFrame(() => {
        const trackWidth = container.clientWidth;
        const scrollWidth = container.scrollWidth;
        const scrollable = scrollWidth - trackWidth;

        if (scrollable > 0) {
          const ratio = trackWidth / scrollWidth;
          const thumbWidth = Math.max(ratio * trackWidth, 20);

          thumb.style.width = `${thumbWidth}px`;

          const availableTrackWidth = trackWidth - thumbEdge * 2;
          factorRef.current = (availableTrackWidth - thumbWidth) / scrollable;
        } else {
          thumb.style.width = '0px';
          factorRef.current = 0;
        }
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [targetValue, thumbEdge]);

  return children(containerRef, thumbRef);
}

export default HorizontalScrollableBox;
