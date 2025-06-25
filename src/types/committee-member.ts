import type { Locale } from "@/i18n/routing";

export interface CommitteeMember {
  id: number;
  locale: Locale;
  name: string;
  position: string;
  affiliation: string;
}
