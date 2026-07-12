import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { blogPosts, getPostBySlug } from "@/lib/blog";
import { JsonLd, breadcrumbJsonLd, pageTitle } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: pageTitle(post.title),
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            image: post.image,
            author: {
              "@type": "Organization",
              name: siteConfig.name,
            },
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
            },
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
          {post.date} · {post.readTime}
        </p>
        <h1 className="mt-3 font-display text-4xl text-charcoal sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{post.description}</p>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[1.5rem]">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
        <div className="prose-clean mt-10">
          {post.content.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-teal-light px-3 py-1 text-xs font-semibold text-teal-dark"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href="/book"
          className="mt-10 inline-flex rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white hover:bg-coral-dark"
        >
          Get a cleaning quote
        </Link>
      </article>

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <h2 className="font-display text-3xl">More from the blog</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="rounded-2xl border border-line bg-white p-5 hover:border-teal"
            >
              <h3 className="font-display text-xl">{p.title}</h3>
              <p className="mt-2 text-sm text-muted line-clamp-3">
                {p.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
