import {
  Box,
  Typography,
  Link,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Spt",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return monthNames[month] + " " + day + ", " + year;
};

interface MainProps {
  page: number;
  pageCount: number;
  posts: ReadonlyArray<{
    title: string;
    description: string;
    created: string;
    slug: string;
  }>;
}

export default function Main(props: MainProps) {
  const { posts, page, pageCount } = props;
  return (
    <>
      {posts.map((post) => (
        <Box key={post.title} sx={{ mb: 6 }}>
          <Box sx={{ mb: 2 }}>
            <Link
              color="inherit"
              underline="hover"
              variant="h4"
              sx={{ fontWeight: 600, color: "text.primary" }}
              href={`/posts/${post.slug}`}
            >
              {post.title}
            </Link>
            <Typography variant="subtitle1" color="text.secondary">
              {formatDate(post.created)}
            </Typography>
          </Box>
          <Typography variant="body1" color="text.primary">
            {post.description}
          </Typography>
        </Box>
      ))}
      <Stack alignItems="center" sx={{ mb: 6 }}>
        <Pagination
          count={pageCount}
          color="primary"
          page={page}
          size="large"
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              href={`/${item.page === 1 ? "" : `?page=${item.page}`}`}
              {...item}
            />
          )}
        />
      </Stack>
    </>
  );
}
