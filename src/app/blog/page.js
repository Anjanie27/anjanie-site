import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function BlogIndex() {
  const postsDirectory = path.join(process.cwd(), "public", "posts");
  const files = fs.readdirSync(postsDirectory);

  // Parse metadata for each post
  const posts = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(postsDirectory, filename), "utf8");
    const { data } = matter(fileContent);
    const slug = filename.replace(".md", "");
    return {
      slug,
      title: data.title || slug,
      date: data.date || "Unknown date",
      description: data.description || "",
    };
  });

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-lavenderblush/50 via-background to-lavenderblush/40 text-foreground py-24 px-6 flex flex-col items-center">
      {/* Header */}
      <section className="max-w-5xl text-center animate-slide-down mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">The Blog ✍️</h1>
        <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
          A growing collection of thoughts, reflections, and experiments — written in Markdown and crafted with care.
        </p>
      </section>

      {/* Scrollable Blog List */}
      <div className="w-full max-w-3xl h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-jordyblue/50 scrollbar-track-transparent">
        <ul className="space-y-6 sm:space-y-8 px-2 sm:px-6">
          {sortedPosts.map((post) => (
            <li
              key={post.slug}
              className="transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01]"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block bg-white/70 backdrop-blur-sm border border-foreground/10 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold text-jordyblue mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-foreground/60 mb-2">{post.date}</p>
                <p className="text-foreground/80 leading-relaxed text-base sm:text-lg">
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
