import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { notFound } from "next/navigation";

const postsDirectory = path.join(process.cwd(), "public", "posts");

export async function generateStaticParams() {
  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"));
  return files.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden px-4 py-20 text-foreground sm:px-8 md:px-16 lg:px-24">
      <div className="absolute inset-0 -z-10 animated-gradient-bg" />
      <div className="mb-8 flex w-full justify-start">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-jordyblue to-skyblue px-5 py-2.5 font-bold text-white shadow-lg shadow-jordyblue/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </Link>
      </div>

      <article className="mx-auto w-full max-w-5xl rounded-[2rem] border border-white/70 bg-white/78 p-6 leading-8 shadow-xl shadow-slate-500/10 backdrop-blur-xl animate-fade-up sm:p-10 lg:p-12">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.34em] text-jordyblue">
          Blog post
        </p>
        <h1 className="animated-gradient-text mb-4 text-4xl font-black leading-tight sm:text-5xl">
          {data.title || slug}
        </h1>

        {data.date && (
          <p className="mb-10 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/52">
            {data.date}
          </p>
        )}

        <div className="space-y-6 text-base leading-8 text-foreground/78 sm:text-lg">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="mt-10 text-3xl font-black text-foreground"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="mt-10 text-2xl font-black text-foreground"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="mt-8 text-xl font-bold text-foreground"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="my-5 list-disc space-y-2 pl-6" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="my-5 list-decimal space-y-2 pl-6" {...props} />
              ),
              li: ({ node, ...props }) => <li className="pl-1" {...props} />,
              p: ({ node, ...props }) => <p className="my-5" {...props} />,
              a: ({ node, ...props }) => (
                <a
                  className="font-semibold text-jordyblue underline decoration-jordyblue/35 underline-offset-4 transition-colors hover:text-skyblue"
                  {...props}
                />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
