import { SonnerProvider } from '@components/ui/sonner-provider';
import ContacForm from '@features/contact/components/form';

export default function ContactPage() {
  return (
    <div>
      <ContacForm />
      <SonnerProvider position="top-center" />
    </div>
  );
}
