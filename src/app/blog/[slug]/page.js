import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { notFound } from "next/navigation";

// Path to your markdown folder
const postsDirectory = path.join(process.cwd(), "public", "posts");

export async function generateStaticParams() {
  const files = fs.readdirSync(postsDirectory);
  return files.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}

export default async function BlogPost({ params }) {
  const { slug } = params;
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return (
    <main className="min-h-screen bg-gradient-to-b from-lavenderblush/50 via-background to-lavenderblush/40 text-foreground py-20 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col">
      {/* Back Button */}
      <div className="w-full mb-10 flex justify-start">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 bg-jordyblue text-white font-medium px-5 py-2.5 rounded-full shadow-md hover:bg-skyblue hover:shadow-lg transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
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

      {/* Blog Content */}
      <article
        className="
          w-full 
          prose prose-lg prose-slate
          prose-headings:font-bold 
          prose-p:my-6 prose-li:my-3
          prose-ul:list-disc prose-ol:list-decimal 
          prose-ul:pl-8 prose-ol:pl-8 
          prose-li:marker:text-jordyblue 
          leading-relaxed tracking-wide
          max-w-none 
          bg-white/80 backdrop-blur-sm rounded-xl shadow-sm 
          p-8 sm:p-12 border border-foreground/10
        "
      >
        <h1 className="text-5xl font-bold text-foreground mb-8">
          {data.title || slug}
        </h1>

        {data.date && (
          <p className="text-foreground/70 italic mb-12">{data.date}</p>
        )}

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside my-6 space-y-3" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="my-1 leading-relaxed" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="my-6 leading-relaxed" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </main>
  );
}
