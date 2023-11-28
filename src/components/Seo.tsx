import { NextSeo, NextSeoProps } from 'next-seo';

type SeoProps = {
  title?: string;
  description?: string;
} & NextSeoProps;

export default function Seo({ title, description, ...rest }: SeoProps) {
  return (
    <NextSeo
      title={title}
      titleTemplate='%s | Information Security'
      description={
        description ??
        'Next.Js starter template with default design system, components, seo, prettier, eslint, husky, etc.'
      }
      {...rest}
      openGraph={{
        type: 'website',
        url: process.env.NEXT_PUBLIC_URL,
        title: 'Information Security',
        locale: 'in_ID',
        siteName: 'Information Security',
        description:
          'Next.Js starter template with default design system, components, seo, prettier, eslint, husky, etc.',
        images: [
          {
            url: `https://raw.githubusercontent.com/vronnn/nextjs-project-setup/main/public/next.svg`,
            width: 1200,
            height: 802,
            alt: 'Information Security',
          },
        ],
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
      ]}
      defaultTitle='Information Security'
    />
  );
}
