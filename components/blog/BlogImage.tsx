import Image from 'next/image';

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export default function BlogImage({
  src,
  alt,
  caption,
  width = 1200,
  height = 630,
}: BlogImageProps) {
  return (
    <figure className="my-8">
      <div className="relative w-full rounded-lg overflow-hidden bg-[#1e1e1e]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-[#f0ece2]/60 mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
