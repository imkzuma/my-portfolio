import { HeadingText } from "@/components/typography/Heading";

export const TitleThread = ({ slug }: { slug: string }) => {
  const capitalize = (str: string) => {
    const deleteStrip = str.replace(/-/g, ' ');
    const capitalize = deleteStrip.replace(/\w\S*/g, (w: string) => (w.replace(/^\w/, (c: string) => c.toUpperCase())));
    return capitalize;
  }

  return (
    <HeadingText>
      {capitalize(slug as string)}
    </HeadingText>
  )
}