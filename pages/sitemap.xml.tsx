import { GetServerSideProps } from "next";

interface postProps {
  slug: string;
  updated: string;
}

function generateSiteMap(posts: postProps[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${process.env.baseURL}</loc>
     </url>
     ${posts
       .map(({ slug, updated }) => {
         return `
       <url>
           <loc>${process.env.baseURL}/posts/${slug}</loc>
           <lastmod>${new Date(updated).toISOString()}</lastmod>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let posts: postProps[] = [];
  const fetchPosts = async (url: string) => {
    const request = await fetch(url);
    const data = await request.json();
    posts = posts.concat(data.results);
    if (data.next) await fetchPosts(data.next);
  };
  await fetchPosts(`${process.env.apiURL}/posts?page=1&size=5`);
  const sitemap = generateSiteMap(posts);
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
};

export default function SiteMap() {}
