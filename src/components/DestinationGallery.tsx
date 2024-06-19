'use client';

import { useState } from 'react';
import Image from 'next/image';

const DestinationGallery = ({ name, images }: { name: string; images: string[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <article className="flex flex-col items-center gap-2 sm:min-w-96">
      <figure className="relative w-full overflow-hidden h-96 md:h-72 rounded-xl">
        <Image
          src={images[selectedIndex]}
          alt={`${name}-${selectedIndex}`}
          sizes="100%"
          fill
          priority
          className="object-cover"
        />
      </figure>
      <div className="flex justify-center w-full gap-2">
        {images.map((image, index) => (
          <figure
            key={index}
            className={`relative w-16 h-16 overflow-hidden border rounded-xl cursor-pointer ${
              selectedIndex === index ? 'border-primary border-4' : ''
            }`}
          >
            <Image
              src={image}
              alt={`${name}-${index}`}
              sizes="100%"
              fill
              priority
              className="object-cover"
              onClick={() => setSelectedIndex(index)}
            />
          </figure>
        ))}
      </div>
    </article>
  );
};

export default DestinationGallery;
