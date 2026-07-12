import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { blogPosts } from "@/lib/blog";
import { pageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageTitle("Cleaning Tips Blog"),
  description:
    "Practical cleaning guides for Davenport and Central Florida homes — spring checklists, Airbnb turnovers, move-out tips, and more.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog" },
          ]}
        />
        <h1 className="font-display text-4xl text-charcoal sm:text-5xl">
          Cleaning tips for Davenport living
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Human-written guides to help you decide what to clean, how often, and
          when to call in a pro.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-[1.5rem] border border-line bg-white hover:shadow-md"
            >
              <div className="relative h-52">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                  {post.date} · {post.readTime}
                </p>
                <h2 className="mt-2 font-display text-2xl text-charcoal">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <CtaBand />
    </>
  );
}
