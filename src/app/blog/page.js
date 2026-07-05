import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function BlogIndex() {
  const postsDirectory = path.join(process.cwd(), "public", "posts");
  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"));

  const posts = files.map((filename) => {
    const fileContent = fs.readFileSync(
      path.join(postsDirectory, filename),
      "utf8",
    );
    const { data } = matter(fileContent);
    const slug = filename.replace(".md", "");
    return {
      slug,
      title: data.title || slug,
      date: data.date || "Unknown date",
      description: data.description || "",
    };
  });

  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden px-5 py-24 text-foreground sm:px-8">
      <div className="absolute inset-0 -z-10 animated-gradient-bg" />
      <div className="soft-orb left-[6%] top-24 h-32 w-32 bg-skyblue/22" />
      <div className="soft-orb right-[10%] top-40 h-40 w-40 bg-[#f9a8d4]/20 [animation-delay:1.4s]" />

      <section className="mb-12 max-w-5xl text-center animate-slide-down">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.34em] text-jordyblue">
          Writing
        </p>
        <h1 className="animated-gradient-text text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          The Blog ✍️
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-foreground/76 sm:text-lg">
          A growing collection of thoughts, reflections, and experiments —
          written in Markdown and crafted with care.
        </p>
      </section>

      <div className="custom-scrollbar h-[70vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/70 bg-white/38 p-3 shadow-xl shadow-slate-500/10 backdrop-blur-xl sm:p-5">
        <ul className="space-y-5">
          {sortedPosts.map((post, index) => (
            <li
              key={post.slug}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="magnetic-card group relative block overflow-hidden rounded-[1.6rem] border border-white/70 bg-white/72 p-6 shadow-sm backdrop-blur-md"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-jordyblue via-skyblue to-[#f9a8d4]" />
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-skyblue/18 blur-2xl transition-transform duration-500 group-hover:scale-150" />
                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-foreground transition-colors duration-300 group-hover:text-jordyblue">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/50">
                      {post.date}
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-gradient-to-r from-jordyblue/12 to-[#f9a8d4]/16 px-4 py-2 text-sm font-bold text-jordyblue transition-all duration-300 group-hover:bg-jordyblue group-hover:text-white">
                    Read →
                  </span>
                </div>
                <p className="relative mt-4 text-base leading-7 text-foreground/72 sm:text-lg">
                  {post.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
