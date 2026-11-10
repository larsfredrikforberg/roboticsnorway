const PHOTOGRAPHER = "Jonas Kloster";
const PHOTOGRAPHER_URL = "https://www.linkedin.com/in/jonas-kloster-03356b1a0/";

/** Renders a photo credit, linking the photographer's name to his LinkedIn profile. */
export function PhotoCredit({ text }: { text: string }) {
  const i = text.indexOf(PHOTOGRAPHER);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <a href={PHOTOGRAPHER_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
        {PHOTOGRAPHER}
      </a>
      {text.slice(i + PHOTOGRAPHER.length)}
    </>
  );
}
