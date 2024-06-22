interface SVGProps {
  className?: string;
  fill?: string;
  path: string[];
}

const SVG = ({
  className = 'w-4 h-4',
  fill = 'currentColor',
  path,
}: SVGProps) => {
  return (
    <svg
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox="0 0 20 20"
    >
      {path.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
};

export default SVG;
