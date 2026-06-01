import {
  HomeCourseSchema,
  HomeFaqSchema,
  OrganizationSchema,
  WebSiteSchema,
} from "@/components/seo/StructuredData";

/** Rich results for the marketing homepage only (avoids duplicate Course schema site-wide). */
export function HomeStructuredData() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <HomeCourseSchema />
      <HomeFaqSchema />
    </>
  );
}
