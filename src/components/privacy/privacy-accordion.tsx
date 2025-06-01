import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export interface AccordionItem {
  value: string;
  trigger: string;
  content: string;
}

const PrivacyAccordion = ({ items }: { items: AccordionItem[] }) => {
  return (
    <Accordion type={`single`} collapsible className="w-full">
      {items.map((item) => (
        <AccordionItem value={item.value} key={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent className="whitespace-pre-line text-muted-foreground">{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default PrivacyAccordion;
