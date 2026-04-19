import { FormBlock } from './form';
import { AccordionBlock } from './page/elements/accordion';
import { ContainerBlock } from './page/elements/container';
import { IntroBlockComponent } from './page/elements/intro';
import { FAQBlock } from './page/faq-block';
import { FeatureBlock } from './page/feature-block';
import { HeroBlock } from './page/hero-block';
import { PricingBlock } from './page/pricing-block';
import { SectionBlock } from './page/section-block';
import { TeamBlock } from './page/team-block';
import { TestimonialsBlock } from './page/testimonials-block';
import { blockRegistry } from './registry';

blockRegistry.register('introBlock', IntroBlockComponent);
blockRegistry.register('faqBlock', FAQBlock);
blockRegistry.register('featureBlock', FeatureBlock);
blockRegistry.register('formBlock', FormBlock);
blockRegistry.register('heroBlock', HeroBlock);
blockRegistry.register('pricingBlock', PricingBlock);
blockRegistry.register('teamBlock', TeamBlock);
blockRegistry.register('testimonialsBlock', TestimonialsBlock);

blockRegistry.register('sectionBlock', SectionBlock);
blockRegistry.register('containerBlock', ContainerBlock);

blockRegistry.register('accordionBlock', AccordionBlock);
