const ICONS = {
  cricket: [
    'M11.105 18.79l-1 .992a4.159 4.159 0 0 1 -6.038 -5.715l.157 -.166l8.282 -8.401l1.5 1.5l3.45 -3.391a2.08 2.08 0 0 1 3.057 2.815l-.116 .126l-3.391 3.45l1.5 1.5l-3.668 3.617',
    'M10.5 7.5l6 6',
    'M14 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0',
  ],
  football: [
    'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0',
    'M12 7l4.76 3.45l-1.76 5.55h-6l-1.76 -5.55z',
    'M12 7v-4m3 13l2.5 3m-.74 -8.55l3.74 -1.45m-11.44 7.05l-2.56 2.95m.74 -8.55l-3.74 -1.45',
  ],
  entertainment: [
    'M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z',
    'M8 4l0 16',
    'M16 4l0 16',
    'M4 8l4 0',
    'M4 16l4 0',
    'M4 12l16 0',
    'M16 8l4 0',
    'M16 16l4 0',
  ],
  news: [
    'M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5.586 5.586a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5.586 -5.586a1 1 0 0 1 0 -1.414z',
    'M6 10l-3 3l3 3l3 -3',
    'M10 6l3 -3l3 3l-3 3',
    'M12 12l1.5 1.5',
    'M14.5 17a2.5 2.5 0 0 0 2.5 -2.5',
    'M15 21a6 6 0 0 0 6 -6',
  ],
} as any;

const StreamIcon = ({ type }: { type: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 hover:text-red-400"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      {ICONS[type].map((d: string, i: number) => (
        <path d={d} key={i} />
      ))}
    </svg>
  );
};

export default StreamIcon;
