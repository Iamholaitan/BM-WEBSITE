import { Reveal } from './reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={`mb-12 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      {eyebrow && <p className={`eyebrow ${dark ? '!text-gold-300' : ''}`}>{eyebrow}</p>}
      <h2
        className={`mt-3 font-display text-3xl font-bold sm:text-4xl ${
          dark ? 'text-white' : 'text-forest-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed ${dark ? 'text-cream-300/90' : 'text-ink-soft'}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
