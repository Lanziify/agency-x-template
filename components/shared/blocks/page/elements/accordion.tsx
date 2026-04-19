import { RichText } from '@components/shared/richtext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion';

import { PageBlock } from '../types';

export const AccordionBlock: React.FC<PageBlock['accordionBlock']> = (props) => {
  return (
    <Accordion type="single" className="self-stretch" collapsible>
      {props.collapsible.map((item, index) => {
        return (
          <AccordionItem key={index} value={`item-${index}`} className="dark:border-b-white/20">
            <AccordionTrigger className="font-medium dark:text-white">{item.trigger}</AccordionTrigger>
            <AccordionContent>
              <RichText data={item.content} className="text-muted-foreground" />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
