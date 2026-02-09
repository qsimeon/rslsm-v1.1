declare module 'react-image-gallery' {
  import { Component } from 'react';

  export interface ReactImageGalleryItem {
    original: string;
    thumbnail?: string;
    originalHeight?: number;
    originalWidth?: number;
    originalAlt?: string;
    originalTitle?: string;
    thumbnailHeight?: number;
    thumbnailWidth?: number;
    thumbnailAlt?: string;
    thumbnailTitle?: string;
    description?: string;
    srcSet?: string;
    sizes?: string;
    bulletClass?: string;
    renderItem?: (item: ReactImageGalleryItem) => React.ReactNode;
    renderThumbInner?: (item: ReactImageGalleryItem) => React.ReactNode;
  }

  export interface ReactImageGalleryProps {
    items: ReactImageGalleryItem[];
    infinite?: boolean;
    lazyLoad?: boolean;
    showNav?: boolean;
    showThumbnails?: boolean;
    thumbnailPosition?: 'top' | 'right' | 'bottom' | 'left';
    showFullscreenButton?: boolean;
    useBrowserFullscreen?: boolean;
    showPlayButton?: boolean;
    showBullets?: boolean;
    showIndex?: boolean;
    autoPlay?: boolean;
    disableThumbnailScroll?: boolean;
    slideOnThumbnailOver?: boolean;
    disableKeyDown?: boolean;
    disableSwipe?: boolean;
    disableThumbnailSwipe?: boolean;
    onSlide?: (currentIndex: number) => void;
    onScreenChange?: (fullScreenElement: Element | null) => void;
    onThumbnailClick?: (event: React.MouseEvent<HTMLElement>, index: number) => void;
    onErrorImageURL?: string;
    onTouchMove?: (event: React.TouchEvent<HTMLElement>) => void;
    onTouchEnd?: (event: React.TouchEvent<HTMLElement>) => void;
    onTouchStart?: (event: React.TouchEvent<HTMLElement>) => void;
    onMouseOver?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    indexSeparator?: string;
    slideDuration?: number;
    swipingTransitionDuration?: number;
    slideInterval?: number;
    swipeThreshold?: number;
    flickThreshold?: number;
    renderCustomControls?: () => React.ReactNode;
    renderLeftNav?: (onClick: () => void, disabled: boolean) => React.ReactNode;
    renderRightNav?: (onClick: () => void, disabled: boolean) => React.ReactNode;
    renderPlayPauseButton?: (onClick: () => void, isPlaying: boolean) => React.ReactNode;
    renderFullscreenButton?: (onClick: () => void, isFullscreen: boolean) => React.ReactNode;
    startIndex?: number;
    useWindowKeyDown?: boolean;
  }

  export default class ImageGallery extends Component<ReactImageGalleryProps> {
    play: () => void;
    pause: () => void;
    fullScreen: () => void;
    exitFullScreen: () => void;
    slideToIndex: (index: number) => void;
    getCurrentIndex: () => number;
  }
}
