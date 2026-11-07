import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      <div className="card relative flex aspect-square items-center justify-center overflow-hidden bg-white p-6 dark:bg-ink-900">
        {activeImage ? (
          <img
            key={activeImage}
            src={activeImage}
            alt={title}
            className="h-full w-full animate-fade-up object-contain"
          />
        ) : (
          <ImageOff className="h-12 w-12 text-ink-300" />
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={`aspect-square overflow-hidden rounded-xl border-2 bg-white p-1 transition ${
                index === activeIndex
                  ? 'border-primary-500 shadow-md'
                  : 'border-transparent opacity-70 hover:opacity-100 dark:bg-ink-900'
              }`}
            >
              <img src={image} alt="" className="h-full w-full object-contain" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
