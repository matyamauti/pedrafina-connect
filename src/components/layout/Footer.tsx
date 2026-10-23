import { FooterSection } from "@/components/ui/footer-section";

// O ano fica estável no prerender e é atualizado a cada deploy.
export async function Footer() {
  "use cache";

  return <FooterSection year={new Date().getFullYear()} />;
}
